"use client"

import SideNav from '@/components/store/SideNav/SideNav'
import { Inter } from 'next/font/google'
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children, }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()
    const mainSectionRef = useRef<HTMLDivElement>(null)

    const handleMainSectionClick = () => {
        if (searchParams.get('sideNav') === 'true') {
            router.push(pathname);
        }
    };

    useEffect(() => {
        const mainSection = mainSectionRef.current;

        if (mainSection) {

            mainSection.addEventListener('click', handleMainSectionClick)

            return () => mainSection.removeEventListener('click', handleMainSectionClick)
        }
    }, [searchParams.get('sideNav')])

    return <div>
        <SideNav />
        <div ref={mainSectionRef}>{children}</div>
    </div>
}
