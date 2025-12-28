// app/analytics.tsx (or app/components/Analytics.tsx if organized)
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '../lib/gtag';

export default function Analytics() {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            gtag.pageview(pathname);
        }
    }, [pathname]);

    return null;
}
