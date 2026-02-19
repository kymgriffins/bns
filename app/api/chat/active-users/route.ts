import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * GET /api/chat/active-users
 * Get active users in chat for a news article
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const newsId = searchParams.get("news_id");

    if (!newsId) {
      return NextResponse.json({ error: "News ID is required" }, { status: 400 });
    }

    const supabase = await createServerClient();

    // Get users active in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 300000).toISOString();

    const { data: activeUsers, error } = await supabase
      .from("chat_active_users")
      .select(`
        *,
        user:profiles(id, first_name, last_name, avatar_url)
      `)
      .eq("news_id", newsId)
      .gte("last_active", fiveMinutesAgo)
      .order("joined_at", { ascending: false });

    if (error) {
      if (error.code === '42P01') {
        return NextResponse.json({ data: [], success: true });
      }
      // Don't throw, just return empty
      return NextResponse.json({ data: [], success: true });
    }

    const transformed = (activeUsers || []).map((item: any) => ({
      id: item.user_id,
      user_name: item.user 
        ? `${item.user.first_name || ''} ${item.user.last_name || ''}`.trim() || 'Anonymous'
        : 'Anonymous',
      user_avatar: item.user?.avatar_url,
      joined_at: item.joined_at,
    }));

    return NextResponse.json({ data: transformed, success: true });
  } catch (error) {
    console.error("Error fetching active users:", error);
    return NextResponse.json({ data: [], success: true });
  }
}
