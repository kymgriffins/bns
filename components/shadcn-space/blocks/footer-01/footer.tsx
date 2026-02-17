"use client";

import { Separator } from "@/components/ui/separator";
import { Twitter, Linkedin, Instagram, Facebook, Mail, MapPin, Phone, Youtube, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import Newsletter from "@/components/newsletter";

type FooterData = {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
};

const footerSections: FooterData[] = [
  {
    title: "Explore",
    links: [
      {
        title: "Reports",
        href: "/reports",
      },
      {
        title: "Analysis",
        href: "/insights",
      },
      {
        title: "Tracker",
        href: "/tracker",
      },
      {
        title: "Take Action",
        href: "/take-action",
      },
      {
        title: "Learn",
        href: "/learn",
      },
      {
        title: "News",
        href: "/news",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        title: "About Us",
        href: "/about",
      },
      {
        title: "Partner With Us",
        href: "/about",
      },
      {
        title: "Contact",
        href: "/about",
      },
    ],
  },
  {
    title: "Transparency",
    links: [
      {
        title: "Accuracy Commitment",
        href: "/accuracy",
      },
      {
        title: "Corrections",
        href: "/corrections",
      },
      {
        title: "Sources",
        href: "/sources",
      },
    ],
  },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61586898487932", icon: Facebook },
  { name: "YouTube", href: "https://www.youtube.com/@BudgetNdioStory", icon: Youtube },
  { name: "Instagram", href: "https://www.instagram.com/budgetndiostory", icon: Instagram },
  { name: "X (Twitter)", href: "https://x.com/BudgetNdioStory", icon: Twitter },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@budgetndiostory.org",
    href: "mailto:info@budgetndiostory.org",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+254711106814",
    href: "tel:+254711106814",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nairobi, Kenya",
    href: "#",
  },
];

const Footer2 = () => {
  const pathname = usePathname();
  
  // Routes where Footer should be hidden (admin/dashboard routes)
  const hideFooterRoutes = ["/admin", "/dashboard-shell-01", "/protected"];
  const shouldHideFooter = hideFooterRoutes.some((route) => pathname.startsWith(route));

  // Don't render Footer on admin routes
  if (shouldHideFooter) {
    return null;
  }

  return (
    <footer className="py-10 bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/10">
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto">
        <div className="flex flex-col gap-6 sm:gap-12">
          <div className="py-12 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-12 gap-x-8 gap-y-10 px-6 xl:px-0">
            {/* Subscribe Block - Spans 4 columns on lg */}
            <div className="col-span-full lg:col-span-4">
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                {/* Logo */}
                <Link href="/">
                  <div className="relative h-10 w-32">
                    <Image
                      src="/logo.svg"
                      alt="Budget Ndio Story"
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>

                <p className="text-base font-normal text-muted-foreground max-w-md">
                  We turn national and county budgets into clear insights, practical analysis, and trackable evidence to enhance youth participation and accountability.
                </p>


                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon size={20} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:block hidden"></div>

            {footerSections.map(({ title, links }, index) => (
              <div key={index} className="col-span-2">
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                  <p className="text-base font-medium text-foreground uppercase tracking-wider">
                    {title}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {links.map(({ title, href }) => (
                      <li key={title}>
                        <Link
                          href={href}
                          className="text-base font-normal text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div className="col-span-3">
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                <p className="text-base font-medium text-foreground uppercase tracking-wider">
                  Contact Details
                </p>
                <ul className="flex flex-col gap-3">
                  {contactInfo.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="flex items-start gap-2 text-base font-normal text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <item.icon size={16} className="mt-0.5 flex-shrink-0" />
                        <span>{item.value}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Separator orientation="horizontal" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-sm font-normal text-muted-foreground animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
              ©2026 BudgetNdioStory. All Rights Reserved
            </p>
            <p className="text-sm font-normal text-foreground animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
              Follow the Budget. Find the Story.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
