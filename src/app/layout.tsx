import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const space = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RatherLabs Challenge",
  description: "First prototype animation",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={space.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
