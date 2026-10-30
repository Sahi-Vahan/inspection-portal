import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component for Specialist App
 * Ensures whenever specialist navigates between jobs, checkin, checklist, submit,
 * wallet, quality, or profile, the window and main containers scroll immediately to top.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace(/^#/, '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });

    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    const mainContainers = document.querySelectorAll<HTMLElement>(
      'main, [data-scroll-container]'
    );
    mainContainers.forEach((container) => {
      container.scrollTop = 0;
    });

    const rafId = requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      mainContainers.forEach((container) => {
        container.scrollTop = 0;
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
