import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate - Support Budget Ndio Story",
  description:
    "Give once or monthly. Your donation funds reports, trainings, and youth-led budget stories across Kenya. M-Pesa and card accepted.",
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
