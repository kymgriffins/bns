import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Learn – Budget Ndio Story",
    template: "%s · Learn",
  },
  description:
    "Casual, Gen Z‑friendly lessons on Kenya's budget. Start with interactive Budget 101, then dive into modules on the BPS, budget cycle, and more.",
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
