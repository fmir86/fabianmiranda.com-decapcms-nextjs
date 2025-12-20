import { useState, useEffect } from 'react';

/**
 * Hook to detect if viewport is mobile
 * Returns true if viewport width <= breakpoint (default 768px)
 */
export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(true); // Default true for SSR (mobile-first)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Check on mount
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}
