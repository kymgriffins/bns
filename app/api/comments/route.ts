import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// Safety filtering configuration
const BLOCKED_WORDS = [
  // Spam/Advertising
  'spam', 'scam', 'phishing', 'malware', 'virus', 'hack',
  'buy now', 'click here', 'free money', 'winner', 'lottery',
  'earn money', 'work from home', 'make money', 'cash bonus',
  // Inappropriate content
  'hate', 'violence', 'threat', 'kill', 'death', 'attack',
  // Personal info requests
  'password', 'credit card', 'ssn', 'social security',
];

const SUSPICIOUS_PATTERNS = [
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, // Phone
  /(http|https):\/\/[^\s]+/i, // URLs
  /\b\w+\.(com|org|net|io|co)\b/i, // Domain mentions
  /(.+)\1{3,}/, // Repeated characters
];

/**
 * Content Safety Filter
 * Returns { isSafe: boolean, filteredContent: string, reason?: string }
 */
function filterContent(content: string): { isSafe: boolean; filteredContent: string; reason?: string } {
  if (!content || content.trim().length === 0) {
    return { isSafe: false, filteredContent: '', reason: 'Content cannot be empty' };
  }

  if (content.length > 5000) {
    return { isSafe: false, filteredContent: '', reason: 'Content exceeds maximum length (5000 characters)' };
  }

  const lowerContent = content.toLowerCase();

  // Check for blocked words
  for (const word of BLOCKED_WORDS) {
    if (lowerContent.includes(word)) {
      return { 
        isSafe: false, 
        filteredContent: content, 
        reason: 'Content contains inappropriate or prohibited words' 
      };
    }
  }

  // Check for suspicious patterns
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(content)) {
      return { 
        isSafe: false, 
        filteredContent: content, 
        reason: 'Content contains suspicious patterns (links, emails, or repeated characters)' 
      };
    }
  }

  // Basic sanitization
  let filtered = content
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  return { isSafe: true, filteredContent: filtered };
}

/**
 * GET /api/comments
 * Fetch comments for a news article
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const newsId = searchParams.get("news_id");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!newsId) {
      return NextResponse.json(
        { error: "News ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // Fetch approved comments with user info
    const { data: comments, error } = await supabase
      .from("comments")
      .select(`
        *,
        user:profiles(
          id,
          first_name,
          last_name,
          avatar_url
        )
      `)
      .eq("news_id", newsId)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      // Table might not exist, return empty array
      if (error.code === '42P01') {
        return NextResponse.json({ data: [], success: true });
      }
      throw error;
    }

    // Transform comments
    const transformedComments = (comments || []).map((comment: any) => ({
      id: comment.id,
      news_id: comment.news_id,
      user_id: comment.user_id,
      user_name: comment.user 
        ? `${comment.user.first_name || ''} ${comment.user.last_name || ''}`.trim() || 'Anonymous'
        : 'Anonymous',
      user_avatar: comment.user?.avatar_url,
      content: comment.content,
      parent_id: comment.parent_id,
      likes_count: comment.likes_count || 0,
      created_at: comment.created_at,
      is_edited: comment.is_edited || false,
    }));

    // Get total count
    const { count } = await supabase
      .from("comments")
      .select("*", { count: 'exact', head: true })
      .eq("news_id", newsId)
      .eq("status", "approved");

    return NextResponse.json({
      data: transformedComments,
      total: count || 0,
      success: true
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments", data: [] },
      { status: 500 }
    );
  }
}

/**
 * POST /api/comments
 * Create a new comment (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required to post comments" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { news_id, content, parent_id } = body;

    // Validate required fields
    if (!news_id || !content) {
      return NextResponse.json(
        { error: "News ID and content are required" },
        { status: 400 }
      );
    }

    // Apply safety filter
    const filterResult = filterContent(content);
    if (!filterResult.isSafe) {
      return NextResponse.json(
        { error: filterResult.reason },
        { status: 400 }
      );
    }

    // Check if user is blocked
    const { data: userProfile } = await supabase
      .from("profiles")
      .select("is_blocked")
      .eq("id", user.id)
      .single();

    if (userProfile?.is_blocked) {
      return NextResponse.json(
        { error: "Your account has been blocked from commenting" },
        { status: 403 }
      );
    }

    // Check for recent spam (rate limiting)
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
    const { count: recentComments } = await supabase
      .from("comments")
      .select("*", { count: 'exact', head: true })
      .eq("user_id", user.id)
      .gte("created_at", oneMinuteAgo);

    if (recentComments && recentComments >= 3) {
      return NextResponse.json(
        { error: "Please wait before posting another comment (rate limited)" },
        { status: 429 }
      );
    }

    // Insert comment (auto-approved for authenticated users)
    const { data, error } = await supabase
      .from("comments")
      .insert({
        news_id,
        user_id: user.id,
        content: filterResult.filteredContent,
        parent_id: parent_id || null,
        status: "approved", // Auto-approve for authenticated users
      })
      .select(`
        *,
        user:profiles(
          id,
          first_name,
          last_name,
          avatar_url
        )
      `)
      .single();

    if (error) {
      // Table might not exist, create it
      if (error.code === '42P01') {
        // Create the comments table
        await supabase.rpc('create_comments_table', { 
          news_id_param: news_id,
          user_id_param: user.id,
          content_param: filterResult.filteredContent,
          parent_id_param: parent_id || null
        }).catch(() => {
          // If RPC fails, return error
          return NextResponse.json(
            { error: "Comments system not available. Please try again later." },
            { status: 503 }
          );
        });
      }
      throw error;
    }

    // Transform response
    const transformedComment = {
      ...data,
      user_name: data.user 
        ? `${data.user.first_name || ''} ${data.user.last_name || ''}`.trim() || 'Anonymous'
        : 'Anonymous',
      user_avatar: data.user?.avatar_url,
      likes_count: 0,
      is_edited: false,
    };

    return NextResponse.json({ data: transformedComment, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/comments
 * Update a comment (requires authentication)
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, content } = body;

    if (!id || !content) {
      return NextResponse.json(
        { error: "Comment ID and content are required" },
        { status: 400 }
      );
    }

    // Verify ownership
    const { data: existing } = await supabase
      .from("comments")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!existing || existing.user_id !== user.id) {
      return NextResponse.json(
        { error: "You can only edit your own comments" },
        { status: 403 }
      );
    }

    // Apply safety filter
    const filterResult = filterContent(content);
    if (!filterResult.isSafe) {
      return NextResponse.json(
        { error: filterResult.reason },
        { status: 400 }
      );
    }

    // Update comment
    const { data, error } = await supabase
      .from("comments")
      .update({
        content: filterResult.filteredContent,
        is_edited: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/comments
 * Delete a comment (requires authentication)
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    // Verify ownership or admin
    const { data: existing } = await supabase
      .from("comments")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    // Allow deletion if owner or admin (check user role)
    if (existing.user_id !== user.id) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      
      if (!profile || profile.role !== 'admin') {
        return NextResponse.json(
          { error: "You can only delete your own comments" },
          { status: 403 }
        );
      }
    }

    // Delete comment (soft delete by changing status)
    const { error } = await supabase
      .from("comments")
      .update({ status: "deleted" })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
