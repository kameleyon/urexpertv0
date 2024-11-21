import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://urexpert.ai'),
  title: 'URExpert - Medical Chart Analysis & Review',
  description: 'Professional medical chart analysis tool for healthcare providers. Automated patient chart review, status recommendations, and InterQual assessments.',
  keywords: 'medical chart review, patient assessment, healthcare AI, InterQual, clinical documentation, medical analysis, healthcare automation, patient status determination, medical decision support, healthcare technology',
  authors: [{ name: 'URExpert' }],
  openGraph: {
    title: 'URExpert - Medical Chart Analysis & Review',
    description: 'Professional medical chart analysis tool for healthcare providers.',
    url: 'https://urexpert.ai',
    siteName: 'URExpert',
    images: [
      {
        url: '/urexpertlogo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URExpert - Medical Chart Analysis & Review',
    description: 'Professional medical chart analysis tool for healthcare providers.',
    images: ['/urexpertlogo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
