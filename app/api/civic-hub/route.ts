import { NextResponse } from "next/server";
import seed from "@/data/civic-hub.seed.json";

export const runtime = "nodejs";

type Seed = typeof seed;

export async function GET() {
  return NextResponse.json(seed satisfies Seed, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  // Dummy backend endpoint for teachers: accepts an updated payload, validates shape lightly,
  // and echoes it back (persistence is handled client-side in localStorage for testability).
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Expected JSON object" }, { status: 400 });
  }

  const maybe = body as Partial<Seed>;
  if (!maybe.teachers || !maybe.modules) {
    return NextResponse.json(
      { ok: false, error: "Payload must include `teachers` and `modules`" },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, data: body }, { headers: { "Cache-Control": "no-store" } });
}

