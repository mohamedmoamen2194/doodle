import { Bricolage_Grotesque, Hanken_Grotesk, Space_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-label',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Doodle | Stay Kinetic',
  description:
    'Premium stationery for the creative spirit. Discover hand-drawn journals, vibrant notebooks, and artistic tools at Stitch Vibrant Doodle Stationery Hub.',
  icons: [{ rel: 'icon', url: '/logo.svg' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${spaceMono.variable}`}
    >
      <body className="bg-background text-on-surface font-body antialiased min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  )
}
