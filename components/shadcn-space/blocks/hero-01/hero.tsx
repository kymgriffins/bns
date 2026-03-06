"use client";

import { Playfair_Display } from "next/font/google";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

export type AvatarList = {
  image: string;
};

type HeroSectionProps = {
  avatarList: AvatarList[];
};

function HeroSection({ avatarList }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100vh] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
      {/* Video: full-bleed, spans entire section, no white */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ minWidth: "100%", minHeight: "100%" }}
          poster="/bnsoo1.mp4"
        >
          <source src="/bnsoo1.mp4" type="video/mp4" />
        </video>
        {/* Overlays for text readability only; kept flat (no gradients) */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="w-full h-full relative z-10 flex flex-col items-center justify-center">
        <div className="w-full pt-24 md:pt-28 pb-20 md:pb-24 px-4">
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col max-w-4xl mx-auto gap-10 md:gap-12 text-center">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 self-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium uppercase tracking-widest text-white/90">
                  Kenya Budget Transparency
                </span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-4 md:space-y-5">
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-white drop-shadow-lg"
                >
                  Follow the Budget.{" "}
                  <span
                    className={`${playfairDisplay.className} block mt-1 md:mt-2 text-brand-300 italic font-normal`}
                  >
                    Find the Story.
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed font-normal"
                >
                  We turn Kenya&apos;s national and county budgets into clear insights, practical analysis, and trackable evidence to enhance youth participation and accountability.
                </motion.p>
              </div>

              {/* CTAs + Social proof */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                className="flex flex-col items-center gap-6 md:gap-8"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/auth/sign-up">
                    <Button
                      size="lg"
                      className="relative text-sm font-semibold rounded-full h-12 px-8 group transition-all duration-500 hover:scale-[1.02] w-fit overflow-hidden bg-white text-black hover:bg-white/95 shadow-xl shadow-black/20"
                    >
                      <span className="relative z-10 transition-all duration-500">
                        Get Started
                      </span>
                      <div className="absolute right-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-48px)] group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </div>
                    </Button>
                  </Link>
                  <Link href="/reports">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full h-12 px-8 border-2 border-white/60 bg-white/5 text-white hover:bg-white hover:text-black backdrop-blur-sm font-medium"
                    >
                      Explore Reports
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                  <div className="flex items-center gap-3">
                    <ul className="avatar flex flex-row items-center -space-x-2">
                      {avatarList.map((avatar, index) => (
                        <li key={index} className="ring-2 ring-black/40 rounded-full">
                          <img
                            src={avatar.image}
                            alt=""
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-white object-cover"
                          />
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col items-start text-left">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <img
                            key={i}
                            src="https://images.shadcnspace.com/assets/svgs/icon-star.svg"
                            alt=""
                            className="h-4 w-4"
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-white/90">
                        Trusted by 10,000+ Kenyans
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator — minimal, high-contrast */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span
            className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/80"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
          >
            Scroll
          </span>
         
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
