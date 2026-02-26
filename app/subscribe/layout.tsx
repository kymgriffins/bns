import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate - Support Budget Ndio Story",
  description: "Support our mission to make budget information accessible to all Kenyans. Your donation helps us continue our work.",
};

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
