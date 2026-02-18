import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const limit = searchParams.get("limit") || "10";
    const offset = searchParams.get("offset") || "0";

    let query = supabase
      .from("blogs")
      .select(`
        *,
        category:categories(id, name, slug, color)
      `)
      .order("created_at", { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (status) {
      query = query.eq("status", status);
    }

    if (category) {
      query = query.eq("category_id", category);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      cover_image,
      category_id,
      status = "draft",
      is_premium = false,
      is_featured = false,
      reading_time_minutes,
      seo_title,
      seo_description,
    } = body;

    // Validate required fields
    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const { data: existing } = await supabase
      .from("blogs")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "A blog with this slug already exists" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("blogs")
      .insert({
        title,
        slug,
        excerpt,
        content: JSON.stringify({ html: content, plain: content?.replace(/<[^>]*>/g, "") || "" }),
        cover_image,
        category_id,
        author_id: user.id,
        status,
        is_premium,
        is_featured,
        reading_time_minutes,
        published_at: status === "published" ? new Date().toISOString() : null,
        seo_title,
        seo_description,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      id,
      title,
      slug,
      excerpt,
      content,
      cover_image,
      category_id,
      status,
      is_premium,
      is_featured,
      reading_time_minutes,
      seo_title,
      seo_description,
    } = body;

    // Validate required fields
    if (!id || !title || !slug) {
      return NextResponse.json(
        { error: "ID, title, and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists for another blog
    const { data: existing } = await supabase
      .from("blogs")
      .select("id")
      .eq("slug", slug)
      .neq("id", id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "A blog with this slug already exists" },
        { status: 400 }
      );
    }

    const updateData: any = {
      title,
      slug,
      excerpt,
      content: JSON.stringify({ html: content, plain: content?.replace(/<[^>]*>/g, "") || "" }),
      cover_image,
      category_id,
      is_premium,
      is_featured,
      reading_time_minutes,
      seo_title,
      seo_description,
    };

    if (status) {
      updateData.status = status;
      if (status === "published") {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabase
      .from("blogs")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
