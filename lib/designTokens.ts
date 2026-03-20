/**
 * Design Tokens for Learning Platform
 * Centralized design system values for consistency across the application
 * Derived from civic-hub-premium.html
 */

// ============================================================================
// COLORS
// ============================================================================

export const COLORS = {
  // Reds
  red: '#E53E3E',
  red2: '#FC4444',
  redDim: 'rgba(229, 62, 62, 0.1)',
  redBorder: 'rgba(229, 62, 62, 0.22)',

  // Golds
  gold: '#F5C842',
  gold2: '#FFD54F',
  goldDim: 'rgba(245, 200, 66, 0.1)',
  goldBorder: 'rgba(245, 200, 66, 0.22)',

  // Teals
  teal: '#38B2AC',
  tealDim: 'rgba(56, 178, 172, 0.1)',
  tealBorder: 'rgba(56, 178, 172, 0.22)',

  // Greens
  green: '#48BB78',
  greenDim: 'rgba(72, 187, 120, 0.1)',

  // Purples
  purple: '#9F7AEA',
  purpleDim: 'rgba(159, 122, 234, 0.1)',

  // Coral
  coral: '#F06060',

  // Dark theme
  dark: {
    bg: '#0D0D14',
    surface: '#13131F',
    surface2: '#1A1A2C',
    surface3: '#222238',
    surface4: '#2A2A42',
    border: 'rgba(255, 255, 255, 0.07)',
    borderHover: 'rgba(255, 255, 255, 0.14)',
    borderSubtle: 'rgba(255, 255, 255, 0.04)',
    text: '#F0EDE6',
    textMuted: 'rgba(240, 237, 230, 0.58)',
    textDim: 'rgba(240, 237, 230, 0.3)',
    textExtra: 'rgba(240, 237, 230, 0.16)',
    shadow: 'rgba(0, 0, 0, 0.55)',
    shadow2: 'rgba(0, 0, 0, 0.35)',
  },

  // Light theme
  light: {
    bg: '#F8F7F2',
    surface: '#FFFFFF',
    surface2: '#F4F2EB',
    surface3: '#ECEAE1',
    surface4: '#E4E2D8',
    border: 'rgba(0, 0, 0, 0.08)',
    borderHover: 'rgba(0, 0, 0, 0.15)',
    borderSubtle: 'rgba(0, 0, 0, 0.04)',
    text: '#1A1A10',
    textMuted: 'rgba(26, 26, 16, 0.6)',
    textDim: 'rgba(26, 26, 16, 0.35)',
    textExtra: 'rgba(26, 26, 16, 0.15)',
    shadow: 'rgba(0, 0, 0, 0.12)',
    shadow2: 'rgba(0, 0, 0, 0.06)',
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const FONTS = {
  display: "'Fraunces', serif",
  body: "'DM Sans', sans-serif",
  mono: "'DM Mono', monospace",
};

export const FONT_SIZES = {
  xs: '0.62rem',    // 9.92px
  sm: '0.68rem',    // 10.88px
  base: '0.8rem',   // 12.8px
  md: '0.82rem',    // 13.12px
  lg: '0.85rem',    // 13.6px
  xl: '0.87rem',    // 13.92px
  '2xl': '0.9rem',  // 14.4px
  '3xl': '0.92rem', // 14.72px
  '4xl': '1.1rem',  // 17.6px
  '5xl': '1.3rem',  // 20.8px
  '6xl': '1.4rem',  // 22.4px
  '7xl': '1.8rem',  // 28.8px
  '8xl': '2.8rem',  // 44.8px
};

export const FONT_WEIGHTS = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

// ============================================================================
// SPACING
// ============================================================================

export const SPACING = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '3rem',    // 48px
  '4xl': '4rem',    // 64px
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const RADIUS = {
  sm: '9px',
  md: '14px',
  lg: '20px',
  full: '100px',
};

// ============================================================================
// TRANSITIONS & EASING
// ============================================================================

export const EASING = {
  soft: 'cubic-bezier(0.34, 1.56, 0.64, 1)',      // --ease-s
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',          // --ease-o
  default: 'ease-in-out',
};

export const TRANSITIONS = {
  fast: '0.15s',
  normal: '0.2s',
  slow: '0.25s',
  slower: '0.3s',
  slowest: '0.4s',
  verySlows: '0.6s',
};

// ============================================================================
// DIMENSIONS
// ============================================================================

export const DIMENSIONS = {
  navHeight: '56px',
  sidebarWidth: '260px',
};

// ============================================================================
// Z-INDEX
// ============================================================================

export const Z_INDEX = {
  background: 0,
  base: 1,
  dropdown: 10,
  nav: 100,
  sidebar: 50,
  modal: 200,
  overlay: 999,
  toast: 999,
};

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  xs: 0,
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

export const MEDIA_QUERIES = {
  mobile: '(max-width: 480px)',
  tablet: '(max-width: 768px)',
  desktop: '(min-width: 1024px)',
  tabletOnly: '(max-width: 1024px)',
};

// ============================================================================
// SHADOW DEPTHS
// ============================================================================

export const SHADOWS = {
  none: 'none',
  sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
  md: '0 4px 8px rgba(0, 0, 0, 0.15)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.2)',
  xl: '0 12px 24px rgba(0, 0, 0, 0.25)',
};

// ============================================================================
// GRADIENT DEFINITIONS
// ============================================================================

export const GRADIENTS = {
  progress: 'linear-gradient(90deg, #F5C842, #38B2AC)',
  heroGold: 'linear-gradient(135deg, rgba(159, 122, 234, 0.45) 0%, rgba(245, 200, 66, 0.25) 100%)',
  heroTeal: 'linear-gradient(135deg, rgba(56, 178, 172, 0.35) 0%, rgba(245, 200, 66, 0.18) 100%)',
  heroRed: 'linear-gradient(135deg, rgba(229, 62, 62, 0.3) 0%, rgba(245, 200, 66, 0.2) 100%)',
  heroPurple: 'linear-gradient(135deg, rgba(159, 122, 234, 0.3) 0%, rgba(245, 200, 66, 0.15) 100%)',
};

// ============================================================================
// CATEGORY COLORS (for module categories)
// ============================================================================

export const CATEGORY_COLORS = {
  budgetBasics: {
    color: '#38B2AC',
    bg: 'rgba(56, 178, 172, 0.12)',
  },
  advanced: {
    color: '#9F7AEA',
    bg: 'rgba(159, 122, 234, 0.12)',
  },
  intermediate: {
    color: '#F5C842',
    bg: 'rgba(245, 200, 66, 0.12)',
  },
  expert: {
    color: '#E53E3E',
    bg: 'rgba(229, 62, 62, 0.12)',
  },
};

// ============================================================================
// BADGE COLORS (Status badges)
// ============================================================================

export const BADGE_COLORS = {
  basic: {
    background: 'rgba(56, 178, 172, 0.12)',
    color: '#38B2AC',
  },
  advanced: {
    background: 'rgba(159, 122, 234, 0.12)',
    color: '#9F7AEA',
  },
  new: {
    background: 'rgba(245, 200, 66, 0.1)',
    color: '#F5C842',
  },
  progress: {
    background: 'rgba(56, 178, 172, 0.1)',
    color: '#38B2AC',
  },
  done: {
    background: 'rgba(72, 187, 120, 0.1)',
    color: '#48BB78',
  },
};

// ============================================================================
// CONTENT TYPE PILLS
// ============================================================================

export const CONTENT_TYPE_COLORS = {
  stories: {
    background: 'rgba(229, 62, 62, 0.1)',
    color: '#E53E3E',
    border: 'rgba(229, 62, 62, 0.2)',
  },
  learn: {
    background: 'rgba(245, 200, 66, 0.1)',
    color: '#F5C842',
    border: 'rgba(245, 200, 66, 0.2)',
  },
  videos: {
    background: 'rgba(56, 178, 172, 0.1)',
    color: '#38B2AC',
    border: 'rgba(56, 178, 172, 0.2)',
  },
  quiz: {
    background: 'rgba(159, 122, 234, 0.1)',
    color: '#9F7AEA',
    border: 'rgba(159, 122, 234, 0.2)',
  },
};

// ============================================================================
// BUTTON STYLES
// ============================================================================

export const BUTTON_STYLES = {
  primary: {
    bg: '#F5C842',
    text: '#1A1200',
    hover: '#FFD54F',
  },
  secondary: {
    bg: 'transparent',
    border: 'rgb(255, 255, 255, 0.2)',
    text: '#F0EDE6',
  },
  danger: {
    bg: '#E53E3E',
    text: '#FFFFFF',
    hover: '#FC4444',
  },
};

// ============================================================================
// SECTION DEFAULTS
// ============================================================================

export const SECTION_PADDING = {
  mobile: SPACING.md,
  tablet: `${SPACING.lg} ${SPACING.md}`,
  desktop: `2rem 1.5rem 4rem`,
};

// ============================================================================
// ANIMATION KEYFRAMES
// ============================================================================

export const ANIMATIONS = {
  fadeUp: `
    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }
  `,
  bounceIn: `
    @keyframes bounceIn {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  slideUp: `
    @keyframes slideUp {
      from {
        transform: translateY(100px);
      }
      to {
        transform: translateY(0);
      }
    }
  `,
  pulseDot: `
    @keyframes pulseDot {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.4);
      }
      50% {
        box-shadow: 0 0 0 5px rgba(229, 62, 62, 0);
      }
    }
  `,
  confFall: `
    @keyframes confFall {
      0% {
        transform: translateY(-20px) rotate(0);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(540deg);
        opacity: 0;
      }
    }
  `,
};

// ============================================================================
// HELPER: Generate CSS Variable String
// ============================================================================

export function generateCSSVariables(theme: 'dark' | 'light' = 'dark'): string {
  const themeColors = theme === 'dark' ? COLORS.dark : COLORS.light;

  return `
    :root {
      --red: ${COLORS.red};
      --red2: ${COLORS.red2};
      --red-dim: ${COLORS.redDim};
      --gold: ${COLORS.gold};
      --gold2: ${COLORS.gold2};
      --gold-dim: ${COLORS.goldDim};
      --teal: ${COLORS.teal};
      --teal-dim: ${COLORS.tealDim};
      --green: ${COLORS.green};
      --green-dim: ${COLORS.greenDim};
      --purple: ${COLORS.purple};
      --purple-dim: ${COLORS.purpleDim};
      --coral: ${COLORS.coral};
      
      --font-d: ${FONTS.display};
      --font-b: ${FONTS.body};
      --font-m: ${FONTS.mono};
      
      --r: ${RADIUS.md};
      --rsm: ${RADIUS.sm};
      --rlg: ${RADIUS.lg};
      
      --ease-s: ${EASING.soft};
      --ease-o: ${EASING.out};
      
      --nav-h: ${DIMENSIONS.navHeight};
      --sidebar-w: ${DIMENSIONS.sidebarWidth};
    }

    [data-theme="dark"] {
      --bg: ${themeColors.bg};
      --surf: ${themeColors.surface};
      --surf2: ${themeColors.surface2};
      --surf3: ${themeColors.surface3};
      --surf4: ${themeColors.surface4};
      --border: ${themeColors.border};
      --border-h: ${themeColors.borderHover};
      --border-s: ${themeColors.borderSubtle};
      --text: ${themeColors.text};
      --text-m: ${themeColors.textMuted};
      --text-d: ${themeColors.textDim};
      --text-x: ${themeColors.textExtra};
      --sh: ${themeColors.shadow};
      --sh2: ${themeColors.shadow2};
    }

    [data-theme="light"] {
      --bg: ${themeColors.bg};
      --surf: ${themeColors.surface};
      --surf2: ${themeColors.surface2};
      --surf3: ${themeColors.surface3};
      --surf4: ${themeColors.surface4};
      --border: ${themeColors.border};
      --border-h: ${themeColors.borderHover};
      --border-s: ${themeColors.borderSubtle};
      --text: ${themeColors.text};
      --text-m: ${themeColors.textMuted};
      --text-d: ${themeColors.textDim};
      --text-x: ${themeColors.textExtra};
      --sh: ${themeColors.shadow};
      --sh2: ${themeColors.shadow2};
    }
  `;
}
