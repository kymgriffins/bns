"use client";

import { useState } from "react";
import { useConsent } from "@/hooks/useConsent";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Cookie, Shield, BarChart3, Target, Settings2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function CookieConsentBanner() {
  const {
    showBanner,
    hideBanner,
    acceptAll,
    denyAll,
    preferences,
    setPreferences,
  } = useConsent();

  const [showPreferences, setShowPreferences] = useState(false);

  const handleSavePreferences = () => {
    setPreferences({ ...preferences });
    setShowPreferences(false);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:bottom-6 md:left-auto md:right-6 md:max-w-md md:p-0"
      >
        <div
          className={cn(
            "rounded-2xl border shadow-xl overflow-hidden",
            "bg-card border-border",
            "backdrop-blur-sm"
          )}
        >
          <div className="p-4 sm:p-5">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Cookie className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-foreground">
                  We value your privacy
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  We use cookies to run the site and improve your experience. You can accept all or
                  choose what you allow.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button
                    onClick={acceptAll}
                    size="sm"
                    className="rounded-full text-xs font-medium"
                  >
                    Accept all
                  </Button>
                  <Button
                    onClick={denyAll}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs"
                  >
                    Essential only
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowPreferences(true)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Customise
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={hideBanner}
                className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close cookie banner"
              >
                <span className="sr-only">Close</span>
                <span aria-hidden className="text-lg leading-none">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-md rounded-2xl border-border bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Settings2 className="h-5 w-5 text-primary" />
              Cookie preferences
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Necessary cookies are always on. Turn others on or off below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <Label className="font-medium text-foreground">Necessary</Label>
                  <p className="text-xs text-muted-foreground">Required for the site to work</p>
                </div>
              </div>
              <Checkbox checked disabled className="opacity-70" />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="analytics" className="font-medium text-foreground cursor-pointer">
                    Analytics
                  </Label>
                  <p className="text-xs text-muted-foreground">Help us see how the site is used</p>
                </div>
              </div>
              <Checkbox
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) => setPreferences({ analytics: checked as boolean })}
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="marketing" className="font-medium text-foreground cursor-pointer">
                    Marketing
                  </Label>
                  <p className="text-xs text-muted-foreground">For relevant ads and campaigns</p>
                </div>
              </div>
              <Checkbox
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) => setPreferences({ marketing: checked as boolean })}
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
              <div className="flex items-center gap-3">
                <Cookie className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="functional" className="font-medium text-foreground cursor-pointer">
                    Functional
                  </Label>
                  <p className="text-xs text-muted-foreground">Chat and personalisation</p>
                </div>
              </div>
              <Checkbox
                id="functional"
                checked={preferences.functional}
                onCheckedChange={(checked) => setPreferences({ functional: checked as boolean })}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setShowPreferences(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>
              Save preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}
