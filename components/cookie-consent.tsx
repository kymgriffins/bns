'use client';

import { useState } from 'react';
import { useConsent } from '@/hooks/useConsent';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Cookie, 
  Shield, 
  BarChart3, 
  Target, 
  Settings,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieConsentBanner() {
  const { 
    showBanner, 
    hideBanner, 
    acceptAll, 
    denyAll,
    preferences,
    setPreferences 
  } = useConsent();

  const [showPreferences, setShowPreferences] = useState(false);

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {/* Main Banner */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-4 right-4 z-50 p-0 pointer-events-none"
      >
        <div className="pointer-events-auto">
          <div className="max-w-sm md:max-w-md rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40">
                <Cookie className="h-4 w-4 text-amber-700 dark:text-amber-300" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Cookies for a smoother visit
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  We use a few cookies to keep the site running and understand what&apos;s working. You
                  can accept all or choose only what you need.
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] dark:bg-slate-800">
                    <Shield className="h-3 w-3 text-emerald-500" />
                    Necessary
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] dark:bg-slate-800">
                    <BarChart3
                      className={`h-3 w-3 ${
                        preferences.analytics ? 'text-emerald-500' : 'text-slate-400'
                      }`}
                    />
                    Analytics
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] dark:bg-slate-800">
                    <Target
                      className={`h-3 w-3 ${
                        preferences.marketing ? 'text-emerald-500' : 'text-slate-400'
                      }`}
                    />
                    Marketing
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Button
                    onClick={acceptAll}
                    size="sm"
                    className="h-8 rounded-full px-3 text-xs font-medium"
                  >
                    Accept all
                  </Button>
                  <Button
                    onClick={denyAll}
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full px-3 text-xs"
                  >
                    Reject
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowPreferences(true)}
                    className="ml-auto text-[11px] font-medium text-slate-600 underline-offset-2 hover:underline dark:text-slate-300"
                  >
                    More options
                  </button>
                </div>
              </div>
              <button
                onClick={hideBanner}
                className="ml-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                aria-label="Close cookie banner"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. Necessary cookies are always enabled.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Necessary */}
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <Label className="font-medium">Necessary</Label>
                  <p className="text-xs text-slate-500">Required for the website to function</p>
                </div>
              </div>
              <Checkbox checked disabled />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                <div>
                  <Label htmlFor="analytics" className="font-medium cursor-pointer">Analytics</Label>
                  <p className="text-xs text-slate-500">Help us understand how visitors interact</p>
                </div>
              </div>
              <Checkbox
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) => setPreferences({ analytics: checked as boolean })}
              />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-purple-500" />
                <div>
                  <Label htmlFor="marketing" className="font-medium cursor-pointer">Marketing</Label>
                  <p className="text-xs text-slate-500">Used to deliver personalized advertisements</p>
                </div>
              </div>
              <Checkbox
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) => setPreferences({ marketing: checked as boolean })}
              />
            </div>

            {/* Functional */}
            <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Cookie className="w-5 h-5 text-orange-500" />
                <div>
                  <Label htmlFor="functional" className="font-medium cursor-pointer">Functional</Label>
                  <p className="text-xs text-slate-500">Enable enhanced functionality</p>
                </div>
              </div>
              <Checkbox
                id="functional"
                checked={preferences.functional}
                onCheckedChange={(checked) => setPreferences({ functional: checked as boolean })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowPreferences(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowPreferences(false);
                // Save current preferences
              }}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}
