"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  FileText,
  Shield,
  ChevronRight,
  Plus,
  Download,
  Eye,
  AlertTriangle,
  DollarSign,
  Activity,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState("Alex Johnson")
  const [trustScore] = useState(92)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [formData, setFormData] = useState({
    landlordName: "",
    tenantName: "",
    rent: "",
    deposit: "",
    address: "",
    duration: "12",
  })
  const router = useRouter()

  const [pastAgreements] = useState([
    { id: 1, title: "Downtown Apartment", date: "Dec 15, 2024", status: "active", tenant: "Sarah Wilson", rent: 2500 },
    { id: 2, title: "Suburban House", date: "Nov 1, 2024", status: "completed", tenant: "Mike Chen", rent: 3200 },
    { id: 3, title: "City Loft", date: "Oct 20, 2024", status: "pending", tenant: "Emma Davis", rent: 2800 },
  ])

  const [quickStats] = useState([
    { label: "Active Agreements", value: "3", icon: FileText, color: "text-blue-600" },
    { label: "Trust Score", value: `${trustScore}/100`, icon: Shield, color: "text-green-600" },
    { label: "Total Revenue", value: "$8,500", icon: DollarSign, color: "text-purple-600" },
    { label: "Fraud Prevented", value: "12", icon: AlertTriangle, color: "text-orange-600" },
  ])

  useEffect(() => {
    // Check for saved draft
    const savedDraft = localStorage.getItem("dashboardAgreementDraft")
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft))
    }

    // Check authentication status
    const checkAuth = () => {
      const authStatus = localStorage.getItem("civic_authenticated")
      const savedUserInfo = localStorage.getItem("civic_user_info")

      if (authStatus === "true" && savedUserInfo) {
        setIsAuthenticated(true)
        const userData = JSON.parse(savedUserInfo)
        setUserInfo(userData)
        setSelectedUser(userData.id || "Alex Johnson")
      } else {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveDraft = () => {
    localStorage.setItem("dashboardAgreementDraft", JSON.stringify(formData))
    alert("Draft saved successfully!")
  }

  const handleDownloadTxtFromPreview = () => {
    const content = `
Rental Agreement Summary
========================
Landlord: ${formData.landlordName || "Not specified"}
Tenant: ${formData.tenantName || "Not specified"}
Monthly Rent: $${formData.rent || "0"}
Security Deposit: $${formData.deposit || "0"}
Duration: ${formData.duration} months
Property: ${formData.address || "Not specified"}
`
    const blob = new Blob([content.trim()], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "agreement-summary.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    const content = `
Rental Agreement
================

### Parties
- Landlord: ${formData.landlordName}
- Tenant: ${formData.tenantName}

### Property
- Address: ${formData.address}

### Financial Terms
- Monthly Rent: $${formData.rent}
- Security Deposit: $${formData.deposit}
- Lease Duration: ${formData.duration} months
`

    const blob = new Blob([content.trim()], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "rental-agreement.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    // Clear form and draft after submission
    setFormData({
      landlordName: "",
      tenantName: "",
      rent: "",
      deposit: "",
      address: "",
      duration: "12",
    })
    localStorage.removeItem("dashboardAgreementDraft")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please authenticate with Civic to access your dashboard.</p>
            <Button asChild className="w-full">
              <Link href="/auth">Login with Civic Auth</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {selectedUser}!</h1>
              <p className="text-gray-600">Manage your rental agreements and monitor your trust score.</p>
              {userInfo && (
                <div className="mt-2">
                  <Badge className="bg-green-100 text-green-800">
                    Verified with Civic • {userInfo.verificationLevel}
                  </Badge>
                </div>
              )}
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild>
                <Link href="/create-agreement" className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Agreement
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedUser}</h3>
                      <p className="text-sm text-gray-600">Civic Verified User</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Trust Score</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                            style={{ width: `${trustScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-green-600">{trustScore}/100</span>
                      </div>
                    </div>
                    {userInfo && (
                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        Verified: {new Date(userInfo.verifiedAt).toLocaleDateString()}
                      </div>
                    )}
                    <Button className="w-full" variant="outline">
                      <Activity className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Past Agreements */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Agreements</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/agreements">View All</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    {pastAgreements.slice(0, 3).map((agreement) => (
                      <div
                        key={agreement.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 text-sm">{agreement.title}</h4>
                            <Badge className={getStatusColor(agreement.status)} variant="secondary">
                              {agreement.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600">{agreement.date}</p>
                          <p className="text-xs text-gray-500">Tenant: {agreement.tenant}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/fraud-detection">
                        <Shield className="w-4 h-4 mr-2" />
                        Run Fraud Check
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/analytics">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content - Create Agreement Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Create New Agreement
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="landlordName">Landlord Name *</Label>
                        <Input
                          id="landlordName"
                          value={formData.landlordName}
                          onChange={(e) => handleInputChange("landlordName", e.target.value)}
                          placeholder="Enter landlord's full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="tenantName">Tenant Name *</Label>
                        <Input
                          id="tenantName"
                          value={formData.tenantName}
                          onChange={(e) => handleInputChange("tenantName", e.target.value)}
                          placeholder="Enter tenant's full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="rent">Monthly Rent *</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            id="rent"
                            type="number"
                            value={formData.rent}
                            onChange={(e) => handleInputChange("rent", e.target.value)}
                            placeholder="0"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="deposit">Security Deposit *</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            id="deposit"
                            type="number"
                            value={formData.deposit}
                            onChange={(e) => handleInputChange("deposit", e.target.value)}
                            placeholder="0"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Select
                          value={formData.duration}
                          onValueChange={(value) => handleInputChange("duration", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 months</SelectItem>
                            <SelectItem value="12">12 months</SelectItem>
                            <SelectItem value="24">24 months</SelectItem>
                            <SelectItem value="36">36 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Property Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter complete property address including city, state, and postal code"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button type="button" variant="outline" className="flex-1" onClick={handleSaveDraft}>
                        Save as Draft
                      </Button>
                      <Button type="submit" className="flex-1">
                        Generate Agreement
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Agreement Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Agreement Preview</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Rental Agreement Summary</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Landlord:</strong> {formData.landlordName || "Not specified"}
                      </p>
                      <p>
                        <strong>Tenant:</strong> {formData.tenantName || "Not specified"}
                      </p>
                      <p>
                        <strong>Monthly Rent:</strong> ${formData.rent || "0"}
                      </p>
                      <p>
                        <strong>Security Deposit:</strong> ${formData.deposit || "0"}
                      </p>
                      <p>
                        <strong>Duration:</strong> {formData.duration} months
                      </p>
                      <p>
                        <strong>Property:</strong> {formData.address || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Full Document
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleDownloadTxtFromPreview}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Text File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
