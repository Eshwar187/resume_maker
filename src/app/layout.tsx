import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FeedbackButton from "@/components/common/FeedbackButton";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Resume Analyzer & Maker | Free AI-Powered Resume Builder with 25+ ATS Templates",
  description: "Create professional resumes with 25+ ATS-optimized templates. Get AI-powered analysis, real-time editing, and instant PDF download. 100% free resume builder and analyzer.",
  keywords: [
    "resume builder",
    "resume analyzer", 
    "ATS friendly",
    "free resume maker",
    "AI resume feedback",
    "resume templates",
    "CV builder",
    "job application",
    "professional resume",
    "resume optimization",
    "applicant tracking system",
    "resume creator",
    "CV maker"
  ],
  authors: [{ name: "Resume Analyzer Team", url: "https://resume-analyzer.com" }],
  creator: "Resume Analyzer Team",
  publisher: "Resume Analyzer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://resume-analyzer.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Resume Analyzer & Maker | 25+ Free ATS Templates",
    description: "Build professional resumes with AI-powered analysis and 25+ ATS-optimized templates. Free resume builder with real-time editing and instant PDF export.",
    type: "website",
    locale: "en_US",
    url: "https://resume-analyzer.com",
    siteName: "Resume Analyzer & Maker",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Resume Analyzer & Maker - Free AI-Powered Resume Builder"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Analyzer & Maker | 25+ Free ATS Templates",
    description: "Build professional resumes with AI-powered analysis and 25+ ATS-optimized templates. Free resume builder with real-time editing.",
    images: ["/og-image.jpg"],
    creator: "@resumeanalyzer"
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
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Resume Analyzer & Maker",
    "description": "Free AI-powered resume builder with 25+ ATS-optimized templates, real-time editing, and instant PDF download.",
    "url": "https://resume-analyzer.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2847"
    },
    "features": [
      "25+ ATS-optimized resume templates",
      "AI-powered resume analysis",
      "Real-time editing",
      "Instant PDF download",
      "Free forever"
    ]
  };

return (
    <AuthProvider>
      <html lang="en">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="icon" href="/api/icons/32" type="image/svg+xml" sizes="32x32" />
          <link rel="icon" href="/api/icons/16" type="image/svg+xml" sizes="16x16" />
          <link rel="apple-touch-icon" sizes="180x180" href="/api/icons/180" />
          <link rel="icon" type="image/svg+xml" sizes="192x192" href="/api/icons/192" />
          <link rel="icon" type="image/svg+xml" sizes="512x512" href="/api/icons/512" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#3b82f6" />
          <meta name="msapplication-TileColor" content="#3b82f6" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Resume Analyzer" />
        </head>
        <body
          className={`${inter.variable} font-sans antialiased bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen`}
        >
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          <FeedbackButton />
        </body>
      </html>
    </AuthProvider>
  );
}
