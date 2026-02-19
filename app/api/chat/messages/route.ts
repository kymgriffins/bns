import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// Content filter for chat messages
const BLOCKED_WORDS = [
  'spam', 'scam', 'phishing', 'malware', 'virus', 'hack',
  'buy now', 'click here', 'free money', 'winner', 'lottery',
  'earn money', 'work from home', 'make money', 'cash bonus',
];

function filterContent(content: string): { isSafe: boolean; filteredContent: string; reason?: string } {
  if (!content || content.trim().length === 0) {
    return { isSafe: false, filteredContent: '', reason: 'Message cannot be empty' };
  }

  if (content.length > 1000) {
    return { isSafe: false, filteredContent: '', reason: 'Message exceeds maximum length' };
  }

  const lowerContent = content.toLowerCase();

  for (const word of BLOCKED_WORDS) {
    if (lowerContent.includes(word)) {
      return { isSafe: false, filteredContent: content, reason: 'Inappropriate content detected' };
    }
  }

  let filtered = content
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return { isSafe: true, filteredContent: filtered };
}

/**
 * GET /api/chat/messages
 * Fetch chat messages for a news article
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const newsId = searchParams.get("news_id");
    const limit = parseInt(searchParams.get("limit") || "50");

    if (!newsId) {
      return NextResponse.json({ error: "News ID is required" }, { status: 400 });
    }

    const supabase = await createServerClient();

    const { data: messages, error } = await supabase
      .from("chat_messages")
      .select(`
        *,
        user:profiles(id, first_name, last_name, avatar_url)
      `)
      .eq("news_id", newsId)
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) {
      // Table might not exist
      if (error.code === '42P01') {
        return NextResponse.json({ data: [], success: true });
      }
      throw error;
    }

    const transformed = (messages || []).map((msg: any) => ({
      id: msg.id,
      news_id: msg.news_id,
      user_id: msg.user_id,
      user_name: msg.user 
        ? `${msg.user.first_name || ''} ${msg.user.last_name || ''}`.trim() || 'Anonymous'
        : 'Anonymous',
      user_avatar: msg.user?.avatar_url,
      content: msg.content,
      created_at: msg.created_at,
    }));

    return NextResponse.json({ data: transformed, success: true });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages", data: [] }, { status: 500 });
  }
}

/**
 * POST /api/chat/messages
 * Send a chat message (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const { news_id, content } = body;

    if (!news_id || !content) {
      return NextResponse.json({ error: "News ID and content are required" }, { status: 400 });
    }

    // Apply filter
    const filterResult = filterContent(content);
    if (!filterResult.isSafe) {
      return NextResponse.json({ error: filterResult.reason }, { status: 400 });
    }

    // Rate limiting - max 10 messages per minute
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
    const { count } = await supabase
      .from("chat_messages")
      .select("*", { count: 'exact', head: true })
      .eq("user_id", user.id)
      .gte("created_at", oneMinuteAgo);

    if (count && count >= 10) {
      return NextResponse.json({ error: "Please slow down" }, { status: 429 });
    }

    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        news_id,
        user_id: user.id,
        content: filterResult.filteredContent,
      })
      .select(`
        *,
        user:profiles(id, first_name, last_name, avatar_url)
      `)
      .single();

    if (error) {
      if (error.code === '42P01') {
        return NextResponse.json({ error: "Chat not available" }, { status: 503 });
      }
      throw error;
    }

    const transformed = {
      id: data.id,
      news_id: data.news_id,
      user_id: data.user_id,
      user_name: data.user 
        ? `${data.user.first_name || ''} ${data.user.last_name || ''}`.trim() || 'Anonymous'
        : 'Anonymous',
      user_avatar: data.user?.avatar_url,
      content: data.content,
      created_at: data.created_at,
    };

    return NextResponse.json({ data: transformed, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
