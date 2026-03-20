/**
 * Learning Layout Component
 * Main wrapper for the learning platform
 * Manages authentication, theme, and global state
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { DESIGN_TOKENS } from '@/lib/designTokens';
import styles from './learning.module.css';

interface LearningLayoutProps {
  children: React.ReactNode;
  initialTab?: 'stories' | 'learn' | 'videos' | 'quiz';
}

export const LearningLayout: React.FC<LearningLayoutProps> = ({
  children,
  initialTab = 'stories',
}) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    // Apply theme to root
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  if (isLoading) {
    return (
      <div className={styles['layout-loading']}>
        <div className={styles['spinner']} />
        <p>Loading your learning journey...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles['layout-no-auth']}>
        <div className={styles['no-auth-card']}>
          <h2>Sign In to Continue</h2>
          <p>You need to be signed in to access the learning platform.</p>
          <a href="/auth/signin" className={styles['button-primary']}>
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles['learning-layout']}
      style={{
        '--primary-color': DESIGN_TOKENS.COLORS.PRIMARY[isDark ? 'dark' : 'light'],
        '--secondary-color': DESIGN_TOKENS.COLORS.SECONDARY[isDark ? 'dark' : 'light'],
        '--bg-primary': DESIGN_TOKENS.COLORS.BACKGROUND[isDark ? 'dark' : 'light'],
        '--text-primary': DESIGN_TOKENS.COLORS.TEXT[isDark ? 'dark' : 'light'],
      } as React.CSSProperties}
    >
      {/* Header */}
      <header className={styles['header']}>
        <div className={styles['header-left']}>
          <button
            className={styles['sidebar-toggle']}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h1 className={styles['logo']}>📚 Budget & Civic Learning Hub</h1>
        </div>

        <div className={styles['header-right']}>
          <button
            className={styles['theme-toggle']}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <div className={styles['user-info']}>
            <span>{user?.email?.split('@')[0] || 'User'}</span>
            <a href="/auth/signout" className={styles['signout-btn']}>
              Out
            </a>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className={styles['content-area']}>
        {/* Sidebar - optional, toggleable on mobile */}
        {sidebarOpen && (
          <aside className={styles['sidebar']}>
            <nav className={styles['sidebar-nav']}>
              <a href="/learn" className={styles['nav-link']}>
                📖 Learning Hub
              </a>
              <a href="/learn/dashboard" className={styles['nav-link']}>
                📊 My Progress
              </a>
              <a href="/learn/certificates" className={styles['nav-link']}>
                🏆 Certificates
              </a>
              <a href="/profile" className={styles['nav-link']}>
                👤 Profile
              </a>
            </nav>
          </aside>
        )}

        {/* Main content */}
        <main className={styles['main-content']}>
          {children}
        </main>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className={`${styles['toast']} ${styles[`toast-${toast.type}`]}`}>
          {toast.message}
          <button onClick={() => setToast(null)}>×</button>
        </div>
      )}

      {/* CSS Variables for dynamic theming */}
      <style>{`
        :root {
          --color-primary-red: ${DESIGN_TOKENS.COLORS.PRIMARY.RED};
          --color-primary-gold: ${DESIGN_TOKENS.COLORS.PRIMARY.GOLD};
          --color-primary-teal: ${DESIGN_TOKENS.COLORS.PRIMARY.TEAL};
          --color-primary-green: ${DESIGN_TOKENS.COLORS.PRIMARY.GREEN};
          --color-primary-purple: ${DESIGN_TOKENS.COLORS.PRIMARY.PURPLE};
          
          --font-display: ${DESIGN_TOKENS.FONTS.DISPLAY};
          --font-body: ${DESIGN_TOKENS.FONTS.BODY};
          --font-mono: ${DESIGN_TOKENS.FONTS.MONO};
          
          --spacing-xs: ${DESIGN_TOKENS.SPACING.XS};
          --spacing-sm: ${DESIGN_TOKENS.SPACING.SM};
          --spacing-md: ${DESIGN_TOKENS.SPACING.MD};
          --spacing-lg: ${DESIGN_TOKENS.SPACING.LG};
          --spacing-xl: ${DESIGN_TOKENS.SPACING.XL};
          --spacing-2xl: ${DESIGN_TOKENS.SPACING['2XL']};
        }
      `}</style>
    </div>
  );
};

export default LearningLayout;
