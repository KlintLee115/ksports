import Footer from '@/components/Footer'
import NavBar from '@/components/store/NavBar'
import SearchBar from '@/components/store/SearchBar'
import Banner from '@/components/store/home/banner/Banner'
import RecommendedSection from '@/components/store/home/recommended/RecommendedSection'
import { Suspense } from 'react'

export default function Home() {

  return <div className='relative z-10 mx-6'>
    <Suspense fallback={<h1>Loading...</h1>}>
      <NavBar />
      <SearchBar />
    </Suspense>
    <Banner />
    <RecommendedSection />
    <Footer />
  </div>
}
