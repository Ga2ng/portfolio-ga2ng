import type { Metadata } from "next";
import {
  Bangers,
  Fredoka,
  Nunito,
  Space_Grotesk,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Display / hero font — comic book style
const bangers = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
  display: "swap",
});

// Section heading — rounded cartoon
const fredoka = Fredoka({
  weight: "400",
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
});

// UI / nav / buttons — bold & friendly
const nunito = Nunito({
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

// Body text — clean & readable
const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmad Gagang Prakasa — Web Developer Surabaya",
  description:
    "Portfolio Ahmad Gagang Prakasa, Web Developer berbasis di Surabaya, Jawa Timur. Spesialis Laravel, PHP, MySQL. Membangun sistem informasi pemerintahan, portal perizinan, manajemen apartemen, dan landing page modern.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "Ahmad Gagang Prakasa",
    "Gagang Prakasa",
    "GA2NG",
    "Web Developer Surabaya",
    "Laravel Developer Surabaya",
    "AI Agent Tools Developer",
    "AI-Assisted Web Developer",
    "PHP Developer",
    "MySQL Developer",
    "Full Stack Developer Surabaya",
    "Jasa Pembuatan Website Surabaya",
    "Ga2ng",
    "gagang",
    "web developer indonesia",
  ],
  authors: [{ name: "Ahmad Gagang Prakasa", url: "https://github.com/Ga2ng" }],
  creator: "Ahmad Gagang Prakasa",
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Ahmad Gagang Prakasa — Web Developer Surabaya",
    description:
      "Portfolio Ahmad Gagang Prakasa, Web Developer berbasis di Surabaya. Spesialis Laravel, PHP, MySQL, dan sistem informasi.",
    siteName: "GA2NG Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Gagang Prakasa — Web Developer Surabaya",
    description:
      "Portfolio Ahmad Gagang Prakasa, Web Developer berbasis di Surabaya. Spesialis Laravel, PHP, MySQL.",
    creator: "@ga2ng",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${bangers.variable} ${fredoka.variable} ${nunito.variable} ${spaceGrotesk.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ahmad Gagang Prakasa",
              alternateName: "GA2NG",
              url: "https://portfolio-ga2ng.vercel.app",
              sameAs: [
                "https://github.com/Ga2ng",
                "https://www.linkedin.com/in/ahmad-gagang-prakasa-a32948285",
              ],
              jobTitle: "Web Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Surabaya",
                addressRegion: "Jawa Timur",
                addressCountry: "ID",
              },
              email: "gagangprakasa@gmail.com",
              knowsAbout: ["Laravel", "PHP", "MySQL", "Web Development", "React", "Next.js"],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)" }} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
