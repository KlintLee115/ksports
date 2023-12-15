"use client"

import Footer from '@/components/Footer'
import NavBar from '@/components/store/NavBar'
import SearchBar from '@/components/store/SearchBar'
import Banner from '@/components/store/home/banner/Banner'
import RecommendedSection from '@/components/store/home/recommended/RecommendedSection'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useRef } from 'react'

export default function Home() {
  const router = useRouter()
  const mainSectionRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  return <div className='relative z-10 mx-6' ref={mainSectionRef}>
    <Suspense fallback={<h1>Loading...</h1>}>
      <NavBar />
      <SearchBar />
    </Suspense>
    <Banner />
    <RecommendedSection />
    <Footer />
  </div>
}
