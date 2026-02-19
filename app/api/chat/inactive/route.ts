import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * POST /api/chat/inactive
 * Mark user as inactive in chat
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ success: true });
    }

    const body = await request.json();
    const { news_id } = body;

    if (!news_id) {
      return NextResponse.json({ error: "News ID is required" }, { status: 400 });
    }

    // Remove from active users
    const { error } = await supabase
      .from("chat_active_users")
      .delete()
      .eq("news_id", news_id)
      .eq("user_id", user.id);

    if (error && error.code !== '42P01') {
      console.error("Error marking inactive:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: true });
  }
}
