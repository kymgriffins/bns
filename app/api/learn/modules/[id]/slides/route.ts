import { NextRequest, NextResponse } from "next/server";
import { getModule, loadModuleSlides } from "@/app/learn/utils";
import type { StorySlide } from "@/app/learn/utils";

interface RouteParams {
  params: {
    id: string;
  };
}

// In-memory persistence for CRUD operations during runtime.
// Keyed by `${moduleId}:${level}`.
const slidesOverrides = new Map<string, StorySlide[]>();

function slidesKey(moduleId: string, level: string): string {
  return `${moduleId}:${level}`;
}

/**
 * GET /api/learn/modules/[id]/slides?level=basic|advanced|stories
 * Get module slides by level
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const level = searchParams.get("level") as "basic" | "advanced" | "stories" | null;

    // Validate level parameter
    if (!level || (level !== "basic" && level !== "advanced" && level !== "stories")) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing or invalid level parameter. Use 'basic', 'advanced', or 'stories'",
        },
        { status: 400 }
      );
    }

    // Check module exists
    const module = getModule(id);
    if (!module) {
      return NextResponse.json(
        {
          success: false,
          error: "Module not found",
        },
        { status: 404 }
      );
    }

    const key = slidesKey(id, level);

    // Prefer runtime overrides; otherwise fall back to JSON fetch.
    const overridden = slidesOverrides.get(key);
    const slides = overridden ?? (await loadModuleSlides(id, level));

    if (!slides) {
      return NextResponse.json(
        {
          success: false,
          error: `${level} slides not found for this module`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        moduleId: id,
        level,
        slideCount: slides.length,
        slides,
      },
    });
  } catch (error) {
    console.error("Error fetching module slides:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch module slides",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/learn/modules/[id]/slides?level=basic|advanced|stories
 * Update all slides for a level
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const level = searchParams.get("level") as "basic" | "advanced" | "stories" | null;

    // Check module exists
    const module = getModule(id);
    if (!module) {
      return NextResponse.json(
        {
          success: false,
          error: "Module not found",
        },
        { status: 404 }
      );
    }

    // Validate level parameter
    if (!level || (level !== "basic" && level !== "advanced" && level !== "stories")) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing or invalid level parameter",
        },
        { status: 400 }
      );
    }

    const slidesData = await request.json();

    // Validate slide structure
    if (!slidesData.slides || !Array.isArray(slidesData.slides)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid slide structure - must have 'slides' array",
        },
        { status: 400 }
      );
    }

    const key = slidesKey(id, level);
    slidesOverrides.set(key, slidesData.slides as StorySlide[]);

    return NextResponse.json({
      success: true,
      data: {
        ...slidesData,
        updatedAt: new Date().toISOString(),
        moduleId: id,
        level,
        slideCount: slidesData.slides.length,
      },
    });
  } catch (error) {
    console.error("Error updating slides:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update slides",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/learn/modules/[id]/slides?level=basic|advanced|stories
 * Add a new slide to a level
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const level = searchParams.get("level") as "basic" | "advanced" | "stories" | null;

    // Check module exists
    const module = getModule(id);
    if (!module) {
      return NextResponse.json(
        {
          success: false,
          error: "Module not found",
        },
        { status: 404 }
      );
    }

    // Validate level parameter
    if (!level || (level !== "basic" && level !== "advanced" && level !== "stories")) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing or invalid level parameter",
        },
        { status: 400 }
      );
    }

    const newSlide = await request.json();

    // Validate slide has required fields
    if (!newSlide.id || !newSlide.type) {
      return NextResponse.json(
        {
          success: false,
          error: "Slide must have 'id' and 'type' fields",
        },
        { status: 400 }
      );
    }

    const key = slidesKey(id, level);
    const existingSlides = slidesOverrides.get(key) ?? (await loadModuleSlides(id, level));

    if (!existingSlides) {
      return NextResponse.json(
        {
          success: false,
          error: `${level} slides not found for this module`,
        },
        { status: 404 }
      );
    }

    const updatedSlides = [...existingSlides, newSlide as StorySlide];
    slidesOverrides.set(key, updatedSlides);

    return NextResponse.json(
      {
        success: true,
        data: {
          ...newSlide,
          createdAt: new Date().toISOString(),
          moduleId: id,
          level,
          slideCount: updatedSlides.length,
          slides: updatedSlides,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding slide:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add slide",
      },
      { status: 500 }
    );
  }
}
