import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default ({
    children,
}: {
    children: React.ReactNode,
}) => children
