import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function proxy(request: Request, endpoint: string) {
  const url = `${BACKEND_BASE}${endpoint}`;
  const init: RequestInit = {
    method: request.method,
    headers: {
      ...Object.fromEntries(request.headers),
      'Content-Type': request.headers.get('content-type') || 'application/json',
    },
    body: request.body,
    credentials: 'include',
  };
  const resp = await fetch(url, init);
  const body = await resp.text();
  return new NextResponse(body, {
    status: resp.status,
    headers: resp.headers,
  });
}

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.search;
    return proxy(request, `/api/v1/content/categories/${query}`);
  } catch (error) {
    console.error("Proxy error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    return proxy(request, `/api/v1/content/categories/`);
  } catch (error) {
    console.error("Proxy error creating category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    return proxy(request, `/api/v1/content/categories/`);
  } catch (error) {
    console.error("Proxy error updating category:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const query = request.nextUrl.search;
    return proxy(request, `/api/v1/content/categories/${query}`);
  } catch (error) {
    console.error("Proxy error deleting category:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
