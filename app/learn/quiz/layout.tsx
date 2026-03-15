import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz & reflect",
  description: "Budget detective quiz and reflection lab for the BPS 2026 civic hub.",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
