import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import React from 'react'
import { getServerSession } from 'next-auth'
import SessionProviderClientComponent from '@/components/SessionProviderClientComponent'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession()

  return (
    <html lang="en">

      <body className={inter.className}>
        <SessionProviderClientComponent session={session}>
          <Header />

          <main className="md:mx-8">
            {children}
          </main>
        </SessionProviderClientComponent>
        <SpeedInsights />

      </body>

    </html>
  )
}
