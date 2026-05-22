import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { getUserSession } from '@/lib/session'; // <-- Fetch it here!

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserSession();

  if (user?.userName) {
    user.userName = user.userName.split(" ")[0]; // Just get the first name for a more personalized greeting
  }

  return (
    <html  suppressHydrationWarning lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Header goes INSIDE the provider */}
          <Header user={user} />
          
          {/* Main content area */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer goes INSIDE the provider */}
          <Footer />
          
          <Analytics />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
