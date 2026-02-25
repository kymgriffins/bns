import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST() {
  // forward logout to the Django backend (if applicable) then redirect
  try {
    await fetch(`${BACKEND_BASE}/api/v1/auth/logout/`, { method: 'POST', credentials: 'include' });
  } catch {}

  revalidatePath("/", "layout");
  redirect("/");
}
