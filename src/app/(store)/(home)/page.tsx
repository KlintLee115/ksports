import Footer from '@/components/Footer'
import NavBar from '@/components/store/NavBar'
import SearchBar from '@/components/store/SearchBar'
import SideNav from '@/components/store/SideNav/SideNav'
import Banner from '@/components/store/home/banner/Banner'
import RecommendedSection from '@/components/store/home/recommended/RecommendedSection'
import { Suspense } from 'react'

export default function Home({ searchParams }: { searchParams: { [key: string]: string } }) {

  return <div style={{ width: "90vw", overflowX: "hidden", margin: '0 auto' }}>
    <SideNav />
    {!(searchParams.sideNav === "true") ? (<>
      <Suspense fallback={<h1>Loading...</h1>}>
        <NavBar />
        <SideNav />
        <SearchBar />
      </Suspense>
      <Banner/>
      <RecommendedSection />
      <Footer />
    </>) : <></>
    }
  </div>
}
