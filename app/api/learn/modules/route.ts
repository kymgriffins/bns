import { NextRequest, NextResponse } from "next/server";
import {
  getAllModules,
  getModule,
  registerModule,
  getUnlockedModules,
  getModuleStats,
} from "@/app/learn/utils";

/**
 * GET /api/learn/modules
 * List all available learning modules
 * Query params:
 *   - unlocked: boolean (default: false) - only return unlocked modules
 *   - category: string - filter by category
 *   - stats: boolean (default: false) - include statistics
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unlocked = searchParams.get("unlocked") === "true";
    const category = searchParams.get("category");
    const includeStats = searchParams.get("stats") === "true";

    let modules = unlocked ? getUnlockedModules() : getAllModules();

    // Filter by category if provided
    if (category) {
      modules = modules.filter((m) => m.category === category);
    }

    const response: any = {
      success: true,
      data: modules,
      count: modules.length,
    };

    if (includeStats) {
      response.stats = getModuleStats();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching modules:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch modules",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/learn/modules
 * Submit a new learning module
 * Body: ModuleMetadata with slides
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.id || !body.title || !body.description) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: id, title, description",
        },
        { status: 400 }
      );
    }

    // Check if module already exists
    if (getModule(body.id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Module with this ID already exists",
        },
        { status: 409 }
      );
    }

    // Register the module
    const success = registerModule(body);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to register module",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Module registered successfully",
        module: body,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering module:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to register module",
      },
      { status: 500 }
    );
  }
}
