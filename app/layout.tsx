import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { APP_NAME, APP_SLOGAN, APP_DESCRIPTION } from "@/lib/constants";
import { ClientThemeProvider } from "@/components/ClientThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: `s% | ${APP_NAME}`,
    default: `${APP_NAME} | ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: "https://bitebazaer.vercel.app",
    siteName: APP_NAME,
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bitebazaar Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/assets/images/og-image.png"],
  },
};

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik.variable}`}>
      <body className="bg-background text-foreground">
        <ClientThemeProvider>
          {children}
          <Toaster />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
