import { redirect } from "next/navigation";

export default function BlogsPage() {
  // Redirect to /news as blogs are no longer used
  redirect("/news");
}
