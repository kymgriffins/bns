import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createLoginRedirectUrl } from "@/lib/auth-redirect";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return null;
  }

  return data.user;
}

async function ProfileContent() {
  const user = await getUser();

  if (!user) {
    const loginUrl = createLoginRedirectUrl("/profile");
    redirect(loginUrl);
  }

  // Get initials for avatar
  const email = user.email || "";
  const initials = email.substring(0, 2).toUpperCase();

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{user.email}</CardTitle>
            <p className="text-sm text-muted-foreground">Subscriber</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="mt-1">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">User ID</label>
              <p className="mt-1 text-sm font-mono">{user.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email Confirmed</label>
              <p className="mt-1">{user.email_confirmed_at ? "Yes" : "No"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Created At</label>
              <p className="mt-1">
                {user.created_at 
                  ? new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <form action="/auth/signout" method="post">
          <Button variant="destructive" type="submit">
            Sign Out
          </Button>
        </form>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}

function ProfileLoading() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
}
