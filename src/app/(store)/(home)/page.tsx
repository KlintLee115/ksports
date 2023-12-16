"use client"

import Footer from '@/components/Footer'
import NavBar from '@/components/store/NavBar'
import SearchBar from '@/components/store/SearchBar'
import SideNav from '@/components/store/SideNav/SideNav'
import Banner from '@/components/store/home/banner/Banner'
import RecommendedSection from '@/components/store/home/recommended/RecommendedSection'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const mainSectionRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isEnterClicked, setIsEnterClicked] = useState<boolean>(false)

  const handleMainSectionClick = () => {
    if (searchParams.get('sideNav') === 'true') {
      router.push(pathname);
    }
  };

  const handleEnterDown = (e: KeyboardEvent) => {
    e.code === "Enter" && setIsEnterClicked(true)
  };

  const handleEnterUp = (e: KeyboardEvent) => {
    e.code === "Enter" && setIsEnterClicked(false)
  };
  useEffect(() => {
    const mainSection = mainSectionRef.current!!;

    window.addEventListener('keydown', handleEnterDown)

    window.addEventListener('keyup', handleEnterUp)

    if (mainSection) {
      mainSection.addEventListener('click', handleMainSectionClick)
    }

    return () => {
      mainSection.removeEventListener('click', handleMainSectionClick)
      window.removeEventListener('keydown', handleEnterDown)
      window.removeEventListener('keydown', handleEnterUp)
    }

  }, [searchParams.get('sideNav')])


  return <div>
    <SideNav />
    <div className='relative z-10 mx-6' ref={mainSectionRef}>
      <NavBar />
      <SearchBar isEnterClicked={isEnterClicked} />
      <Banner />
      <RecommendedSection />
      <Footer />
    </div>
  </div>
}