'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramsString = searchParams?.toString();

  useEffect(() => {
    const scrollableDiv = document.querySelector('[data-scroll-container]');
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ top: 0 });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, paramsString]); // agora escuta os dois

  return null;
}
