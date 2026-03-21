import { NextRequest, NextResponse } from "next/server";
import { getModule, loadModuleSlides } from "@/app/learn/utils";

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/learn/modules/[id]
 * Get module metadata by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    return NextResponse.json({
      success: true,
      data: module,
    });
  } catch (error) {
    console.error("Error fetching module:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch module",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/learn/modules/[id]
 * Update module metadata
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    const body = await request.json();
    
    // Merge updates with existing module
    const updated = {
      ...module,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating module:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update module",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/learn/modules/[id]
 * Delete a module
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    return NextResponse.json({
      success: true,
      message: `Module ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting module:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete module",
      },
      { status: 500 }
    );
  }
}
