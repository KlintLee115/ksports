import SideNav from '@/components/store/SideNav/SideNav'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children, }: { children: React.ReactNode }) {
    return children
}
