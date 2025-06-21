import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatWidget } from "@/components/chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TenantTrust",
  description:
    "AI-powered rental agreement platform with fraud prevention, verified users, and smart contract features.",
  icons: {
    icon: "/assets/TenuntTrust (1).png",
  },
  generator: 'ashish'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
