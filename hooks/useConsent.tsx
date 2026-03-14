'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ConsentPreferences = {
  necessary: boolean; // Always required
  analytics: boolean; // Google Analytics, etc.
  marketing: boolean; // Facebook Pixel, advertising
  functional: boolean; // Chat widgets, preferences
  social: boolean; // Social media sharing
};

export type ConsentState = 'unknown' | 'denied' | 'granted';

interface ConsentContextType {
  consentState: ConsentState;
  preferences: ConsentPreferences;
  setPreferences: (prefs: Partial<ConsentPreferences>) => void;
  acceptAll: () => void;
  denyAll: () => void;
  showBanner: boolean;
  hideBanner: () => void;
}

const defaultPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
  social: false,
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const COOKIE_NAME = 'bns_consent_preferences';

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consentState, setConsentState] = useState<ConsentState>('unknown');
  const [preferences, setPreferencesState] = useState<ConsentPreferences>(defaultPreferences);
  const [showBanner, setShowBanner] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load consent from cookies on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedConsent = localStorage.getItem(COOKIE_NAME);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferencesState(parsed);
        setConsentState(parsed.analytics || parsed.marketing || parsed.functional || parsed.social ? 'granted' : 'denied');
        
        // Load scripts if consent was previously granted
        if (parsed.analytics || parsed.marketing || parsed.functional || parsed.social) {
          loadConsentScripts(parsed);
        }
      } catch (e) {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
    setIsInitialized(true);
  }, []);

  const savePreferences = (prefs: ConsentPreferences) => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(COOKIE_NAME, JSON.stringify(prefs));
    setPreferencesState(prefs);
    
    const hasAnyConsent = prefs.analytics || prefs.marketing || prefs.functional || prefs.social;
    setConsentState(hasAnyConsent ? 'granted' : 'denied');
    
    // Reload scripts based on new preferences
    loadConsentScripts(prefs);
  };

  const setPreferences = (prefs: Partial<ConsentPreferences>) => {
    const newPrefs = { ...preferences, ...prefs, necessary: true };
    savePreferences(newPrefs);
    setShowBanner(false);
  };

  const acceptAll = () => {
    const allGranted: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      social: true,
    };
    savePreferences(allGranted);
    setShowBanner(false);
  };

  const denyAll = () => {
    const denied: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      social: false,
    };
    savePreferences(denied);
    setShowBanner(false);
    removeConsentScripts();
  };

  const hideBanner = () => {
    setShowBanner(false);
  };

  return (
    <ConsentContext.Provider
      value={{
        consentState,
        preferences,
        setPreferences,
        acceptAll,
        denyAll,
        showBanner: isInitialized && showBanner,
        hideBanner,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}

// Function to load marketing/analytics scripts based on consent
function loadConsentScripts(prefs: ConsentPreferences) {
  if (typeof window === 'undefined') return;

  // Remove existing scripts
  removeConsentScripts();

  // Load Analytics (Google Analytics)
  if (prefs.analytics) {
    loadGoogleAnalytics();
  }

  // Load Marketing (Facebook Pixel, etc.)
  if (prefs.marketing) {
    loadFacebookPixel();
    loadGoogleAds();
  }

  // Load Functional (Chat widgets, etc.)
  if (prefs.functional) {
    loadFunctionalScripts();
  }
}

function loadGoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  if (!gaId) return;

  // Load gtag.js
  const script1 = document.createElement('script');
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script1.async = true;
  script1.id = 'google-analytics';
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.id = 'google-analytics-config';
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}', {
      'allow_google_analytics_features': true,
      'anonymize_ip': true
    });
  `;
  document.head.appendChild(script2);
}

function loadFacebookPixel() {
  const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  if (!fbPixelId) return;

  const script = document.createElement('script');
  script.id = 'facebook-pixel';
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${fbPixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);

  // Add noscript pixel
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1"/>`;
  document.head.appendChild(noscript);
}

function loadGoogleAds() {
  const gAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!gAdsId) return;

  const script = document.createElement('script');
  script.id = 'google-ads';
  script.src = `https://www.googleadservices.com/pagead/conversion_async.js`;
  script.async = true;
  document.head.appendChild(script);
}

function loadFunctionalScripts() {
  // Load additional functional scripts like chat widgets
  // This can be extended based on needs
}

function removeConsentScripts() {
  if (typeof window === 'undefined') return;

  // Remove Google Analytics
  const ga = document.getElementById('google-analytics');
  const gaConfig = document.getElementById('google-analytics-config');
  if (ga) ga.remove();
  if (gaConfig) gaConfig.remove();

  // Remove Facebook Pixel
  const fb = document.getElementById('facebook-pixel');
  if (fb) fb.remove();

  // Remove Google Ads
  const gAds = document.getElementById('google-ads');
  if (gAds) gAds.remove();

  // Clear dataLayer
  if (window.dataLayer) {
    window.dataLayer.length = 0;
  }
}

// Export trackEvent for marketing analytics
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  // Google Analytics event
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Facebook Pixel event
  if (window.fbq) {
    window.fbq('track', eventName, params);
  }
}

// Type declarations for window objects
declare global {
  interface Window {
    gtag: any;
    fbq: any;
    dataLayer: any[];
  }
}
