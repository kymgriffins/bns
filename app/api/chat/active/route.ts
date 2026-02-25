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

// simply forward chat active updates to backend
export async function POST(request: NextRequest) {
  try {
    return proxy(request, "/api/v1/chat/active/");
  } catch (error) {
    console.error("Proxy error marking chat active", error);
    return NextResponse.json({ success: true });
  }
}
