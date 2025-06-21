"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, User, CheckCircle, Lock, Globe, Loader2, ArrowRight, Eye, Clock } from "lucide-react"

export default function AuthPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [verificationStep, setVerificationStep] = useState(0)
  const router = useRouter()

  const verificationSteps = [
    { label: "Identity Check", icon: User, completed: false },
    { label: "Age Verification", icon: Clock, completed: false },
    { label: "Location Verification", icon: Globe, completed: false },
  ]

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem("civic_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      const savedUserInfo = localStorage.getItem("civic_user_info")
      if (savedUserInfo) {
        setUserInfo(JSON.parse(savedUserInfo))
      }
    }
  }, [])

  const handleCivicLogin = async () => {
    setIsLoading(true)
    setShowAuthModal(true)
    setVerificationStep(0)

    // Simulate step-by-step verification
    const steps = [0, 1, 2]
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setVerificationStep(step + 1)
    }

    // Complete authentication
    setTimeout(() => {
      const userData = {
        id: "civic_user_123",
        verificationLevel: "Trusted",
        country: "United States",
        age: "18+",
        verifiedAt: new Date().toISOString(),
      }

      setIsAuthenticated(true)
      setUserInfo(userData)
      setIsLoading(false)
      setShowAuthModal(false)

      // Store authentication state
      localStorage.setItem("civic_authenticated", "true")
      localStorage.setItem("civic_user_info", JSON.stringify(userData))

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 1000)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserInfo(null)
    setVerificationStep(0)
    localStorage.removeItem("civic_authenticated")
    localStorage.removeItem("civic_user_info")
  }

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  if (showAuthModal) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        >
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Civic Identity Verification</h3>
            <p className="text-gray-600 mb-8">Securely verifying your identity...</p>

            <div className="space-y-4 mb-8">
              {verificationSteps.map((step, index) => (
                <div
                  key={step.label}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all duration-500 ${
                    index < verificationStep
                      ? "bg-green-50 border border-green-200"
                      : index === verificationStep
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <step.icon
                      className={`w-5 h-5 ${
                        index < verificationStep
                          ? "text-green-600"
                          : index === verificationStep
                            ? "text-blue-600"
                            : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        index < verificationStep
                          ? "text-green-800"
                          : index === verificationStep
                            ? "text-blue-800"
                            : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < verificationStep ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : index === verificationStep ? (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-700 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Your personal information is encrypted and never stored on our servers
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (isAuthenticated && userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-10 h-10" />
                    <div>
                      <CardTitle className="text-3xl font-bold mb-2">Authentication Successful</CardTitle>
                      <p className="text-green-100 text-lg">Welcome to your secure TenantTrust dashboard</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    Logout
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <User className="w-6 h-6 text-green-600" />
                        <h3 className="text-xl font-semibold text-gray-800">User Profile</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">ID:</span>
                          <span className="text-gray-800">{userInfo.id}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-600">Status:</span>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {userInfo.verificationLevel}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-emerald-50 border-emerald-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Globe className="w-6 h-6 text-emerald-600" />
                        <h3 className="text-xl font-semibold text-gray-800">Verification Details</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">Country:</span>
                          <span className="text-gray-800">{userInfo.country}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">Age:</span>
                          <span className="text-gray-800">{userInfo.age}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gray-50 border-gray-200 mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Lock className="w-6 h-6 text-gray-600" />
                      <h3 className="text-xl font-semibold text-gray-800">Security Information</h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-600">
                        <span className="font-medium">Verified at:</span>{" "}
                        {new Date(userInfo.verifiedAt).toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-500">Secure connection established</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 flex items-center">🎉 Welcome to the trusted network!</h3>
                    <p className="text-green-100 text-lg leading-relaxed mb-6">
                      Your identity has been verified using Civic's decentralized identity platform. You now have access
                      to secure rental agreements and trusted services while maintaining your privacy.
                    </p>
                    <p className="text-green-100 mb-6">Redirecting to dashboard in a few seconds...</p>
                    <Button
                      onClick={goToDashboard}
                      size="lg"
                      variant="secondary"
                      className="bg-white text-green-600 hover:bg-gray-100"
                    >
                      Go to Dashboard Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-8 shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">Secure Identity Verification</h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access trusted rental services with Civic's privacy-preserving identity verification. Prove your identity
              without revealing personal information.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">Privacy First</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Your personal data stays with you. We only verify what's needed without storing sensitive
                    information on our servers.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">Instant Verification</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Get verified in seconds with our streamlined process. No lengthy forms or document uploads required.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                      <Globe className="w-7 h-7 text-teal-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">Global Access</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Use your verified identity across multiple platforms and services worldwide with full
                    interoperability.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Login */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="shadow-2xl border-0 h-full">
                <CardContent className="p-10">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Get Started</h2>
                    <p className="text-gray-600 text-lg">
                      Click below to begin your secure identity verification process
                    </p>
                  </div>

                  <div className="space-y-4 mb-10">
                    {[
                      { icon: CheckCircle, label: "Age verification" },
                      { icon: Globe, label: "Location confirmation" },
                      { icon: Eye, label: "Identity validation" },
                    ].map((item, index) => (
                      <div
                        key={item.label}
                        className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-100"
                      >
                        <item.icon className="w-6 h-6 text-green-500" />
                        <span className="text-gray-700 font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleCivicLogin}
                    disabled={isLoading}
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-3">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Connecting to Civic...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Shield className="w-6 h-6" />
                        <span>Login with Civic Auth</span>
                      </div>
                    )}
                  </Button>

                  <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 text-center leading-relaxed">
                      By continuing, you agree to Civic's Terms of Service and Privacy Policy. Your data is protected
                      with enterprise-grade encryption and zero-knowledge protocols.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-500 text-lg">Powered by Civic Identity Platform • Secure • Private • Trusted</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
