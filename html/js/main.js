/**
 * Budget Ndio Story - Main JavaScript
 * Interactive functionality for the HTML version
 */

(function() {
  'use strict';

  // ==========================================================================
  // DOM Ready
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initStickyHeader();
    initThemeToggle();
    initAnimations();
    initScrollEffects();
    initNewsletterForm();
    initMobileNav();
  });

  // ==========================================================================
  // Mobile Menu
  // ==========================================================================
  function initMobileMenu() {
    const menuBtn = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.querySelector('[data-menu-close]');

    if (!menuBtn || !mobileMenu) return;

    function openMenu() {
      mobileMenu.classList.add('open');
      mobileOverlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      mobileOverlay?.classList.remove('open');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    mobileOverlay?.addEventListener('click', closeMenu);

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close on link click
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ==========================================================================
  // Mobile Navigation
  // ==========================================================================
  function initMobileNav() {
    // Handle mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle && mainNav) {
      navToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        navToggle.classList.toggle('active');
      });
    }
  }

  // ==========================================================================
  // Sticky Header
  // ==========================================================================
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    function handleScroll() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll >= scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
  }

  // ==========================================================================
  // Theme Toggle (Light/Dark Mode)
  // ==========================================================================
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme
    function applyTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
      const sunIcon = themeToggle.querySelector('.icon-sun');
      const moonIcon = themeToggle.querySelector('.icon-moon');
      
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        } else {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        }
      }
    }

    // Initialize theme
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    // Toggle on click
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // ==========================================================================
  // Animations
  // ==========================================================================
  function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Stagger animation for grid items
    const staggerItems = document.querySelectorAll('.stagger-item');
    staggerItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  }

  // ==========================================================================
  // Scroll Effects
  // ==========================================================================
  function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });

      backToTop.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // ==========================================================================
  // Newsletter Form
  // ==========================================================================
  function initNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-form, .subscribe-form');
    
    forms.forEach(form => {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (!emailInput || !submitBtn) return;
        
        const email = emailInput.value;
        
        if (!validateEmail(email)) {
          showMessage(form, 'Please enter a valid email address.', 'error');
          return;
        }

        // Disable button during submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';

        try {
          // Simulate API call (replace with actual endpoint)
          await simulateApiCall({ email });
          
          showMessage(form, 'Thank you for subscribing!', 'success');
          emailInput.value = '';
        } catch (error) {
          showMessage(form, 'Something went wrong. Please try again.', 'error');
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Subscribe';
        }
      });
    });
  }

  // ==========================================================================
  // Utility Functions
  // ==========================================================================
  
  /**
   * Validate email format
   */
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * Show message to user
   */
  function showMessage(form, message, type) {
    // Remove existing message
    const existingMsg = form.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    // Create message element
    const msgEl = document.createElement('div');
    msgEl.className = `form-message mt-3 text-sm ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
    msgEl.textContent = message;
    
    form.appendChild(msgEl);

    // Remove after 5 seconds
    setTimeout(() => msgEl.remove(), 5000);
  }

  /**
   * Simulate API call
   */
  function simulateApiCall(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Newsletter subscription:', data);
        resolve({ success: true });
      }, 1000);
    });
  }

  // ==========================================================================
  // Search Functionality
  // ==========================================================================
  const searchToggle = document.getElementById('search-toggle');
  const searchContainer = document.getElementById('search-container');

  if (searchToggle && searchContainer) {
    searchToggle.addEventListener('click', function(e) {
      e.preventDefault();
      searchContainer.classList.toggle('active');
      if (searchContainer.classList.contains('active')) {
        const input = searchContainer.querySelector('input');
        input?.focus();
      }
    });

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        searchContainer.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // Dropdown Menu
  // ==========================================================================
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('[data-dropdown-trigger]');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (!trigger || !menu) return;

    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });

    // Close on click outside
    document.addEventListener('click', function() {
      dropdown.classList.remove('active');
    });
  });

  // ==========================================================================
  // Lazy Loading Images
  // ==========================================================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ==========================================================================
  // Tab Functionality
  // ==========================================================================
  const tabButtons = document.querySelectorAll('[data-tab]');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.dataset.tab;
      
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Hide all tab content
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(content => content.classList.add('hidden'));
      
      // Show target tab content
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.remove('hidden');
      }
    });
  });

  // ==========================================================================
  // Accordion Functionality
  // ==========================================================================
  const accordions = document.querySelectorAll('.accordion');
  
  accordions.forEach(accordion => {
    const header = accordion.querySelector('.accordion-header');
    const content = accordion.querySelector('.accordion-content');
    
    if (!header || !content) return;

    header.addEventListener('click', function() {
      const isActive = accordion.classList.contains('active');
      
      // Close all accordions
      accordions.forEach(acc => {
        acc.classList.remove('active');
        const accContent = acc.querySelector('.accordion-content');
        if (accContent) accContent.style.maxHeight = null;
      });
      
      // Open clicked accordion if it wasn't active
      if (!isActive) {
        accordion.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ==========================================================================
  // Counter Animation
  // ==========================================================================
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    
    updateCounter();
  }

  // Initialize counter animations
  const counters = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.counter, 10);
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ==========================================================================
  // Copy to Clipboard
  // ==========================================================================
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async function() {
      const targetId = this.dataset.copy;
      const target = document.getElementById(targetId);
      
      if (!target) return;

      try {
        await navigator.clipboard.writeText(target.textContent);
        this.textContent = 'Copied!';
        setTimeout(() => {
          this.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });

})();
