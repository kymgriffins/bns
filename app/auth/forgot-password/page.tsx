import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <div className="card-2026 p-6 md:p-8 rounded-2xl shadow-sm">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
