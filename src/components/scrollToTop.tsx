// ScrollToTop.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollableDiv = document.querySelector('[data-scroll-container]');
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ top: 0 });
    }
  }, [pathname]);

  return null;
}
