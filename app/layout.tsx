import type { Metadata } from 'next'
import { Inter, Amiri, Scheherazade_New } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['arabic'],
  weight: ['400', '700'],
})

const scheherazade = Scheherazade_New({
  variable: '--font-scheherazade',
  subsets: ['arabic'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Al-Quran | Premium Quran Reading Experience',
  description:
    'A modern, minimal, and premium Quran reading experience built with Next.js.',
}

import Navbar from '@/components/Navbar'
import { QuranProvider } from '@/store/QuranContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${amiri.variable} ${scheherazade.variable}`}>
      <body className="font-sans antialiased text-foreground bg-background transition-colors duration-300">
        <QuranProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-5rem)] flex flex-col">{children}</main>
        </QuranProvider>
      </body>
    </html>
  )
}
