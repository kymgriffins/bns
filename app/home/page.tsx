import { redirect } from "next/navigation";

/** Legacy /home: redirect to root so / is the single home route. */
export default function HomeRedirect() {
  redirect("/");
}
