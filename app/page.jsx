"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Users,
  Lock,
  TrendingUp,
  CheckCircle,
  Bell,
  ArrowRight,
  Sparkles,
  FileText,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const features = [
  {
    icon: Shield,
    title: "AI Clause Checker",
    description: "Detects risky or missing legal clauses instantly using advanced AI analysis.",
    color: "bg-blue-100 text-blue-600",
    delay: 0.1,
  },
  {
    icon: Users,
    title: "Guardian Co-Sign",
    description: "Let parents digitally co-sign rental agreements with secure verification.",
    color: "bg-green-100 text-green-600",
    delay: 0.2,
  },
  {
    icon: Lock,
    title: "Dispute Lock",
    description: "Freeze agreements during conflicts for fair resolution and mediation.",
    color: "bg-purple-100 text-purple-600",
    delay: 0.3,
  },
  {
    icon: TrendingUp,
    title: "Rent Analytics",
    description: "Compare area-wise average rents, deposits and market trends.",
    color: "bg-orange-100 text-orange-600",
    delay: 0.4,
  },
  {
    icon: CheckCircle,
    title: "Verified Users",
    description: "Trust badges for tenants and landlords with clean rental history.",
    color: "bg-teal-100 text-teal-600",
    delay: 0.5,
  },
  {
    icon: Bell,
    title: "Smart Rent Reminders",
    description: "UPI-based auto-pay reminders and comprehensive payment logs.",
    color: "bg-red-100 text-red-600",
    delay: 0.6,
  },
]

const stats = [
  { label: "Active Users", value: "10K+", icon: Users },
  { label: "Agreements Created", value: "25K+", icon: FileText },
  { label: "Fraud Prevented", value: "99.8%", icon: Shield },
  { label: "User Satisfaction", value: "4.9/5", icon: CheckCircle },
]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Rental Platform
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TenantTrust
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Verified rentals. No brokers. No fraud.
            </p>

            <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
              Your all-in-one secure and AI-powered rental agreement platform. From fraud prevention and smart contract
              clauses to verified identity login and guardian co-signing—TenantTrust makes renting smarter and safer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="px-8 py-4 text-lg font-semibold">
                <Link href="/create-agreement">
                  Create Agreement
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                <Link href="/auth">
                  Login with Civic Auth
                  <Shield className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

   

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for secure rental agreements, powered by cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 ${feature.color}`}
                    >
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of landlords and tenants who trust TenantTrust for secure, transparent rental agreements
            </p>
            <Button asChild size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold">
              <Link href="/dashboard">
                Go to Dashboard
                <BarChart3 className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
