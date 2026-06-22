import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmad Gagang Prakasa — Web Developer Surabaya",
  description:
    "Portfolio Ahmad Gagang Prakasa, Web Developer berbasis di Surabaya, Jawa Timur. Spesialis Laravel, PHP, MySQL. Membangun sistem informasi pemerintahan, portal perizinan, manajemen apartemen, dan landing page modern.",
  keywords: [
    "Ahmad Gagang Prakasa",
    "Gagang Prakasa",
    "GA2NG",
    "Web Developer Surabaya",
    "Laravel Developer Surabaya",
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
    <html lang="id" className={`${inter.variable} scroll-smooth antialiased`}>
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
      <body className="min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
