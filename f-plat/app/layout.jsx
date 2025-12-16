import "./globals.css";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinHeal",
  description: "A One-stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900`}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="min-h-screen pt-40">{children}</main>

            {/* Footer */}
            <footer className="bg-black py-6">
              <div className="container mx-auto px-4 text-center">
                <p>Made By Ruke</p>
              </div>
            </footer>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
