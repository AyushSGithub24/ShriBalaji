import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SBA  | Premium Signage & Printing Solutions',
  description: 'Transform your brand with premium signage, banners, acrylic displays, corporate stationery, and custom printing solutions. Professional design services available.',
  keywords: ['signage', 'banners', 'flex printing', 'acrylic letters', 'LED boards', 'corporate stationery', 'trophies', 'certificates'],
  
  openGraph: {
    title: 'SBA Signage | Premium Signage & Printing Solutions',
    description: 'Transform your brand with premium signage and printing solutions',
    type: 'website',
  },
  icons: {
    icon: "/sba-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: '#f8f7f4',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html  suppressHydrationWarning lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
