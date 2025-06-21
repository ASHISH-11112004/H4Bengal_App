"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Target,
  Heart,
  Lightbulb,
  Globe,
  Lock,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "We prioritize the security and privacy of our users' data above all else, implementing enterprise-grade encryption and security measures.",
  },
  {
    icon: Heart,
    title: "Trust & Transparency",
    description:
      "Building trust through transparent processes, clear communication, and honest business practices in every interaction.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Continuously innovating with cutting-edge AI and blockchain technology to solve real-world rental challenges.",
  },
  {
    icon: Users,
    title: "Community Focus",
    description:
      "Empowering both landlords and tenants with tools that create fair, secure, and efficient rental experiences.",
  },
];

const features = [
  {
    icon: CheckCircle,
    title: "Civic Auth Login",
    description: "Verified identity prevents fraud.",
  },
  {
    icon: Lightbulb,
    title: "AI Clause Checker",
    description: "Highlights unfair or missing terms.",
  },
  {
    icon: Shield,
    title: "Smart Clause Recommendation",
    description: "One-click standard legal clauses.",
  },
  {
    icon: Users,
    title: "Guardian Co-Signer Mode",
    description: "Legal support for students.",
  },
  {
    icon: Lock,
    title: "Red Flag Alerts",
    description: "AI warnings in simple language.",
  },
  {
    icon: CheckCircle,
    title: "Tamper-Proof PDFs",
    description: "Signed, secure, non-editable documents.",
  },
  {
    icon: TrendingUp,
    title: "Rent Analytics Dashboard",
    description: "Area-wise rent data & alerts.",
  },
  {
    icon: CheckCircle,
    title: "Verified User Badges",
    description: "Trust score based on history.",
  },
  {
    icon: Lightbulb,
    title: "LegalBot Assistant",
    description: "Instant answers to legal rental FAQs.",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former PropTech executive with 10+ years in real estate technology and AI implementation.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Blockchain and AI expert, previously led engineering teams at major fintech companies.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Dr. Priya Patel",
    role: "Head of AI Research",
    bio: "PhD in Machine Learning, specializing in natural language processing and legal document analysis.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "James Thompson",
    role: "Head of Legal & Compliance",
    bio: "Real estate attorney with expertise in rental law and regulatory compliance across multiple jurisdictions.",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const stats = [
  { label: "Active Users", value: "50,000+", icon: Users },
  { label: "Agreements Processed", value: "125,000+", icon: Shield },
  { label: "Fraud Cases Prevented", value: "2,500+", icon: CheckCircle },
  { label: "Countries Supported", value: "15+", icon: Globe },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center"
          >
            🌟 Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <feature.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
