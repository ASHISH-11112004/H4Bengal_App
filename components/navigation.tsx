"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  LayoutDashboard,
  FileText,
  Shield,
  BarChart3,
  Users,
  Menu,
  LucideIcon,
} from "lucide-react"

type NavItem = {
  name: string
  href: string
  icon: LucideIcon
}

const navigation: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Create Agreement", href: "/create-agreement", icon: FileText },
  { name: "Fraud Detection", href: "/fraud-detection", icon: Shield },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "About", href: "/about", icon: Users },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TenantTrust
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                asChild
                variant={pathname === item.href ? "default" : "ghost"}
                size="sm"
                className="h-9"
              >
                <Link href={item.href} className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* Desktop Auth Button */}
          <div className="hidden md:flex">
            <Button asChild>
              <Link href="/auth" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Login with Civic</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Button
                    key={item.name}
                    asChild
                    variant={pathname === item.href ? "default" : "ghost"}
                    className="justify-start h-12"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={item.href} className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                ))}
                <Button asChild className="mt-6">
                  <Link href="/auth" className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Login with Civic</span>
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
