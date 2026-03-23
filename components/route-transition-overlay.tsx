"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const ROUTE_INTENT_COPY: Record<string, { title: string; subtitle: string }> = {
  "/reports": {
    title: "Budget Reports",
    subtitle: "Detailed budget documents, analysis snapshots, and fiscal evidence.",
  },
  "/tracker": {
    title: "Budget Tracker",
    subtitle: "Track spending movement, milestones, and public-finance accountability.",
  },
  "/learn": {
    title: "Learning Hub",
    subtitle: "Lessons, stories, videos, and quizzes for practical civic literacy.",
  },
  "/blogs": {
    title: "Articles",
    subtitle: "Context-rich explainers and field-based civic journalism insights.",
  },
  "/about": {
    title: "About BNS",
    subtitle: "Who we are, why we exist, and how we decentralize budget knowledge.",
  },
  "/subscribe": {
    title: "Subscribe",
    subtitle: "Stay updated with curated reports, explainers, and civic opportunities.",
  },
  "/donate": {
    title: "Support Our Work",
    subtitle: "Help power youth-led budget transparency and public accountability.",
  },
  "/take-action": {
    title: "Take Action",
    subtitle: "Turn knowledge into action pathways for your county and community.",
  },
};

const TRANSITION_ROUTES = Object.keys(ROUTE_INTENT_COPY);

function getRouteKey(pathname: string): string | null {
  const hit = TRANSITION_ROUTES.find((route) => pathname.startsWith(route));
  return hit ?? null;
}

export function RouteTransitionOverlay() {
  const pathname = usePathname() || "/";
  const previousPathRef = useRef<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [routeKey, setRouteKey] = useState<string | null>(null);

  const content = useMemo(() => {
    if (!routeKey) return null;
    return ROUTE_INTENT_COPY[routeKey];
  }, [routeKey]);

  useEffect(() => {
    const currentKey = getRouteKey(pathname);
    const previousPath = previousPathRef.current;
    const previousKey = previousPath ? getRouteKey(previousPath) : null;

    if (previousPath && (currentKey || previousKey)) {
      setRouteKey(currentKey || previousKey);
      setVisible(true);
      const timer = window.setTimeout(() => setVisible(false), 650);
      previousPathRef.current = pathname;
      return () => window.clearTimeout(timer);
    }

    previousPathRef.current = pathname;
  }, [pathname]);

  if (!visible || !content) return null;

  return (
    <div
      className="fixed inset-0 z-[120] pointer-events-none bg-background/88 backdrop-blur-md flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${content.title}`}
    >
      <div className="w-[min(92vw,560px)] rounded-2xl border border-border bg-card/95 px-6 py-8 text-center shadow-2xl">
        <div className="mx-auto relative h-14 w-40 mb-5">
          <Image src="/logo.svg" alt="Budget Ndio Story" fill className="object-contain" priority />
        </div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-2">Loading</p>
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{content.title}</h2>
        <p className="text-sm md:text-base text-muted-foreground">{content.subtitle}</p>
        <div className="mx-auto mt-5 h-1.5 w-40 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}

