import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site";
import { Analytics } from "@vercel/analytics/react";

export const viewport: Viewport = {
  themeColor: "#1E1B4B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: "Host2uls Showcase | Websites We've Built That Actually Work",
    template: "%s | Host2uls Showcase",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Host2uls",
    "web services Nigeria",
    "website designer Lagos",
    "ecommerce website Nigeria",
    "school website developer",
    "church website design",
    "portfolio website Lagos",
    "Next.js developer Nigeria",
  ],
  authors: [{ name: "Host2uls - web services", url: SITE_CONFIG.siteUrl }],
  creator: "Host2uls",
  publisher: "Host2uls",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_CONFIG.showcaseUrl,
    siteName: SITE_CONFIG.name,
    title: "Host2uls Showcase | Websites We've Built That Actually Work",
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Host2uls - web services Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Host2uls Showcase | Websites We've Built That Actually Work",
    description: SITE_CONFIG.description,
    images: ["/logo.png"],
    creator: "@host_2uls",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-cream text-brandText flex flex-col font-sans antialiased selection:bg-coral selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
