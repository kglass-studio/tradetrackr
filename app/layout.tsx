// app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import ServiceWorkerRegister from "@/components/service-worker-register" // ✅ NEW
import Head from "next/head"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SaltCRM",
  description: "Simple CRM for small service businesses.",
}

export const viewport = {
  themeColor: "#2563eb",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <Head>
  <link rel="manifest" href="/manifest.webmanifest" />
  <meta name="theme-color" content="#2563eb" />
  <link rel="icon" href="/icon-192.png" />
  <title>SaltCRM</title>
  <meta name="description" content="Simple CRM for small service businesses." />
</Head>

      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
          <ServiceWorkerRegister /> {/* ✅ Render the component here */}
        </AuthProvider>
      </body>
    </html>
  )
}
