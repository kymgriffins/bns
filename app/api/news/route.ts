import { NextRequest, NextResponse } from "next/server";

// simple proxy for all methods; the frontend hooks can still talk to /api/news
// and we forward to the Django REST framework server defined by NEXT_PUBLIC_API_URL

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

// for every HTTP verb we simply forward the request to the corresponding
// backend endpoint.  additional transformation can be inserted here if needed.

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.search;
    return proxy(request, `/api/v1/content/news/${query}`);
  } catch (error) {
    console.error("Proxy error fetching news:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    return proxy(request, `/api/v1/content/news/`);
  } catch (error) {
    console.error("Proxy error posting news:", error);
    return NextResponse.json({ error: "Failed to post news" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    return proxy(request, `/api/v1/content/news/`);
  } catch (error) {
    console.error("Proxy error updating news:", error);
    return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const query = request.nextUrl.search;
    return proxy(request, `/api/v1/content/news/${query}`);
  } catch (error) {
    console.error("Proxy error deleting news:", error);
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
  }
}
