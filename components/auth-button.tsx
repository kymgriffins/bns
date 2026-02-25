"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import { useAuth } from "@/hooks/useAuth";

export function AuthButton() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="px-4">…</div>;
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email || user.username}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Subscribe</Link>
      </Button>
    </div>
  );
}
