import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { BookProvider } from "@/components/providers/book-provider";
import { ImageCacheProvider } from "@/components/providers/image-cache-provider";
import { TestProvider } from "@/components/providers/test-provider";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Generational Handbook",
  description: "Navigate intergenerational workplace dynamics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <ImageCacheProvider>
              <BookProvider>
                <TestProvider>
                  {children}
                </TestProvider>
              </BookProvider>
            </ImageCacheProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Toaster
          position="top-center"
          richColors
          expand={true}
          toastOptions={{
            style: {
              animation: "slideDown 0.2s ease-out", // ← Più lento (era 0.2s default)
            },
          }}
        />
      </body>
    </html>
  );
}
