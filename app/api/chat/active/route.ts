import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * POST /api/chat/active
 * Mark user as active in chat
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      // Anonymous users can be active
      return NextResponse.json({ success: true });
    }

    const body = await request.json();
    const { news_id } = body;

    if (!news_id) {
      return NextResponse.json({ error: "News ID is required" }, { status: 400 });
    }

    // Upsert active user (insert or update)
    const { error } = await supabase
      .from("chat_active_users")
      .upsert(
        {
          news_id,
          user_id: user.id,
          last_active: new Date().toISOString(),
        },
        { onConflict: 'news_id,user_id' }
      );

    if (error && error.code !== '42P01') {
      // Ignore table not exists error
      console.error("Error marking active:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: true });
  }
}
