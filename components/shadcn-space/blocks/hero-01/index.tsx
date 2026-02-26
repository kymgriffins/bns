import HeroSection from "@/components/shadcn-space/blocks/hero-01/hero";
import type { NavigationSection } from "@/components/shadcn-space/blocks/hero-01/header";
import Header from "@/components/shadcn-space/blocks/hero-01/header";
import BrandSlider, { BrandList } from "@/components/shadcn-space/blocks/hero-01/brand-slider";
import type { AvatarList } from "@/components/shadcn-space/blocks/hero-01/hero";

type AgencyHeroSectionProps = {
  showHeader?: boolean;
};

export default function AgencyHeroSection({ showHeader = true }: AgencyHeroSectionProps) {
  const avatarList: AvatarList[] = [
    {
      image: "https://images.shadcnspace.com/assets/profiles/user-1.jpg",
    },
    {
      image: "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
    },
    {
      image: "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
    },
    {
      image: "https://images.shadcnspace.com/assets/profiles/user-5.jpg",
    },
  ];

  const navigationData: NavigationSection[] = [
    {
      title: "About us",
      href: "#",
    },
    {
      title: "Services",
      href: "#",
    },
    {
      title: "Work",
      href: "#",
    },
    {
      title: "Team",
      href: "#",
    },
    {
      title: "Pricing",
      href: "#",
    },
    {
      title: "Awards",
      href: "#",
    },
  ];

  //  Budget Ndio Story is a Kenya wide consortium led by The Continental Pot, Colour Twist Media, and Sen Media & Events, translating public budgets into clear, usable, youth friendly information. We convene creators, civil society, universities, and partners to pair fiscal analysis with creator-led storytelling, grow budget literacy, and strengthen accountability from priorities to results.
  const brandList: BrandList[] = [
    {
      image: "https://continentalpot.africa/wp-content/uploads/2025/02/The-Continental-Pot-Vertical.png",
      lightimg: "https://continentalpot.africa/wp-content/uploads/2025/02/The-Continental-Pot-Vertical.png",
      name: "The Continental Pot",
    },
    {
      image: "https://colortwistmedia.co.ke/wp-content/uploads/2024/08/logo.png",
      lightimg: "https://colortwistmedia.co.ke/wp-content/uploads/2024/08/logo.png",
      name: "Colour Twist Media",
    },
   
    {
      image: "/senmedia.png",
      lightimg: "/senmedia.png",
      name: "Sen Media & Events",
    },
    
  ];

  return (
    <div className="relative">
      {showHeader && <Header navigationData={navigationData} />}
      <main>
        <HeroSection avatarList={avatarList} />
      </main>
    </div>
  );
}
