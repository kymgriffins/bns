"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logout as apiLogout } from "@/lib/api";

export function LogoutButton({ redirectTo = "/auth/login" }: { redirectTo?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } finally {
      router.push(redirectTo);
    }
  };

  return (
    <Button size="sm" variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
