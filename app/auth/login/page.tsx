import { LoginForm } from "@/components/login-form";
import { validateRedirectUrl, DEFAULT_REDIRECT_URL } from "@/lib/auth-redirect";

export default function Page({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  // Validate the redirect URL from search params
  const redirectUrl = validateRedirectUrl(searchParams.redirect) ?? DEFAULT_REDIRECT_URL;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm defaultRedirectUrl={redirectUrl} />
      </div>
    </div>
  );
}
