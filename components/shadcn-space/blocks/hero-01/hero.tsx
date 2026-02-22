"use client";

import { Instrument_Serif } from "next/font/google";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const instrumentSerif = Instrument_Serif({
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
    <section>
      <div className="w-full h-full relative">
        <div className="relative w-full pt-16 md:pt-16 pb-4 md:pb-6 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-brand-50 before:via-white before:to-gray-100 before:rounded-full before:top-20 before:blur-3xl before:-z-10 dark:before:from-brand-900 dark:before:via-black dark:before:to-gray-900 dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col max-w-5xl mx-auto gap-8">
              <div className="relative flex flex-col text-center items-center sm:gap-6 gap-4">
                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="lg:text-6xl md:text-5xl text-4xl font-medium leading-tight md:leading-tight lg:leading-tight"
                >
                  Follow the Budget.{" "}
                  <span
                    className={`${instrumentSerif.className} tracking-tight`}
                  >
                  <br/>Find the Story.
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
                  className="text-base font-normal max-w-2xl text-muted-foreground"
                >
                  We turn Kenya's national and county budgets into clear insights, practical analysis, and trackable evidence to enhance youth participation and accountability..
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                className="flex items-center flex-col md:flex-row justify-center gap-4 md:gap-8"
              >
                <Link href="/auth/sign-up">
                  <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden">
                    <span className="relative z-10 transition-all duration-500">
                      Get Started
                    </span>
                    <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                      <ArrowUpRight size={16} />
                    </div>
                  </Button>
                </Link>
                <Link href="/reports">
                  <Button variant="outline" className="relative text-sm font-medium rounded-full h-12 px-6 group">
                    <span>Explore Reports</span>
                  </Button>
                </Link>
                <div className="flex items-center sm:gap-7 gap-3">
                  <ul className="avatar flex flex-row items-center">
                    {avatarList.map((avatar, index) => (
                      <li key={index} className="-mr-2 z-1 avatar-hover:ml-2">
                        <img
                          src={avatar.image}
                          alt="Avatar"
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-white"
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="gap-1 flex flex-col items-start">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <img
                          key={index}
                          src="https://images.shadcnspace.com/assets/svgs/icon-star.svg"
                          alt="star"
                          className="h-4 w-4"
                        />
                      ))}
                    </div>
                    <p className="sm:text-sm text-xs font-normal text-muted-foreground">
                      Trusted by 10,000+ Kenyans
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
