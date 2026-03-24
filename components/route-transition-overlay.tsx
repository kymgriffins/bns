"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ROUTE_INTENT_COPY: Record<string, { title: string; subtitle: string; color: string }> = {
  "/": {
    title: "Budget Ndio Story",
    subtitle: "Powering youth-led budget transparency and public accountability.",
    color: "#BB0631"
  },
  "/reports": {
    title: "Fiscal Reports",
    subtitle: "Detailed budget documents and accountability snapshots.",
    color: "#BB0631"
  },
  "/tracker": {
    title: "Project Tracker",
    subtitle: "Monitoring public spending and milestone progress.",
    color: "#F5C842"
  },
  "/learn": {
    title: "Learning Hub",
    subtitle: "Empowering citizens through practical civic literacy.",
    color: "#006400"
  },
  "/blogs": {
    title: "Articles & Insights",
    subtitle: "The stories and data behind national budget movements.",
    color: "#BB0631"
  },
  "/about": {
    title: "About BNS",
    subtitle: "Decentralizing knowledge for a transparent future.",
    color: "#006400"
  },
  "/subscribe": {
    title: "Join Foundation",
    subtitle: "Get curated budget reports and civic alerts.",
    color: "#F5C842"
  },
  "/donate": {
    title: "Support Our Work",
    subtitle: "Help power youth-led budget oversight across Kenya.",
    color: "#BB0631"
  },
  "/take-action": {
    title: "Take Action",
    subtitle: "Turning budget insights into local community impact.",
    color: "#006400"
  },
};

const TRANSITION_ROUTES = Object.keys(ROUTE_INTENT_COPY).filter(r => r !== "/");

function getRouteKey(pathname: string): string | null {
  if (pathname === "/") return "/";
  // Find longest match
  const hits = Object.keys(ROUTE_INTENT_COPY)
    .filter(route => route !== "/" && pathname.startsWith(route))
    .sort((a, b) => b.length - a.length);
  return hits[0] || "/"; 
}

export function RouteTransitionOverlay() {
  const pathname = usePathname() || "/";
  const previousPathRef = useRef<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [routeKey, setRouteKey] = useState<string | null>(null);

  useEffect(() => {
    const currentKey = getRouteKey(pathname);
    const previousPath = previousPathRef.current;
    
    // Show transition whenever the pathname changes
    if (previousPath !== null && previousPath !== pathname) {
      if (currentKey) {
        setRouteKey(currentKey);
        setVisible(true);
        const timer = window.setTimeout(() => setVisible(false), 2200); // 2.2s — readable and cinematic
        previousPathRef.current = pathname;
        return () => window.clearTimeout(timer);
      }
    }

    previousPathRef.current = pathname;
  }, [pathname]);

  const content = routeKey ? ROUTE_INTENT_COPY[routeKey] : null;

  return (
    <AnimatePresence>
      {visible && content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050508] text-white"
          role="status"
          aria-live="polite"
        >
          {/* Ambient Background Glow */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none blur-[120px]"
            style={{ 
              background: `radial-gradient(circle at center, ${content.color}40 0%, transparent 70%)` 
            }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-8">
            {/* Logo Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-16 w-48 mb-12"
            >
              <Image 
                src="/logo.svg" 
                alt="BNS" 
                fill 
                className="object-contain" 
                priority 
              />
            </motion.div>

            {/* Separator Line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 0.2, duration: 0.6, ease: "circOut" }}
              className="h-[1px] bg-white/10 mb-10"
            />

            {/* Content Text */}
            <div className="text-center space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30"
              >
                Now Opening
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-2xl md:text-4xl font-bold tracking-tight"
              >
                {content.title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-sm md:text-base text-white/40 font-medium leading-relaxed"
              >
                {content.subtitle}
              </motion.p>
            </div>

            {/* Loading Indicator */}
            <div className="mt-16 relative w-48 h-[2px] bg-white/5 overflow-hidden rounded-full">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mt-4 text-[9px] font-mono text-white/10 uppercase tracking-[0.2em]"
            >
              Preparing Insight...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

