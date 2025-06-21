"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Scan,
  Brain,
  TrendingUp,
  Clock,
  Eye,
  Download,
  RefreshCw,
  Info,
} from "lucide-react"

const WEBHOOK_URL = "https://guptag.app.n8n.cloud/webhook/analyze-contract"

const iconMap: { [key: string]: React.ElementType } = {
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Scan,
  Brain,
  TrendingUp,
  Clock,
  Eye,
  Download,
  RefreshCw,
  Info,
}

interface ScanResult {
  id: string
  type: "success" | "warning" | "error" | "info"
  icon: any
  message: string
  detail?: string
  severity: "low" | "medium" | "high"
}

interface AIAnalysis {
  clauseCoverage: number
  legalCompliance: number
  riskScore: "Low" | "Medium" | "High"
  overallScore: number
}

export default function FraudDetectionPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [activeTab, setActiveTab] = useState("scan")
  const [scanResults, setScanResults] = useState<ScanResult[]>([
    {
      id: "1",
      type: "success",
      icon: CheckCircle,
      message: "All essential clauses are present",
      detail: "Rent amount, security deposit, lease duration, and termination clauses found.",
      severity: "low",
    },
    {
      id: "2",
      type: "warning",
      icon: AlertTriangle,
      message: "Missing termination clause details",
      detail: "Consider adding specific termination notice periods and conditions for both parties.",
      severity: "medium",
    },
    {
      id: "3",
      type: "success",
      icon: CheckCircle,
      message: "Security deposit terms are clear",
      detail: "Deposit amount and return conditions are properly specified.",
      severity: "low",
    },
    {
      id: "4",
      type: "info",
      icon: Shield,
      message: "Document authenticity verified",
      detail: "Digital signatures and timestamps are valid and secure.",
      severity: "low",
    },
    {
      id: "5",
      type: "error",
      icon: XCircle,
      message: "Potential unfair clause detected",
      detail: "Clause 7.3 may be considered unfavorable to tenant rights. Review recommended.",
      severity: "high",
    },
  ])

  const [aiAnalysis] = useState<AIAnalysis>({
    clauseCoverage: 92,
    legalCompliance: 88,
    riskScore: "Medium",
    overallScore: 85,
  })

  const [fraudStats] = useState([
    { label: "Documents Scanned", value: "1,247", change: "+12%", icon: FileText },
    { label: "Fraud Cases Detected", value: "23", change: "-8%", icon: AlertTriangle },
    { label: "Success Rate", value: "98.2%", change: "+0.3%", icon: CheckCircle },
    { label: "Processing Time", value: "2.3s", change: "-15%", icon: Clock },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const runScan = async () => {
    setIsScanning(true)
    setScanProgress(0)
    setScanComplete(false)

    // Simulate scanning process
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          setScanComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      case "low":
        return "border-green-200 bg-green-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      case "info":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getRiskScoreColor = (score: string) => {
    switch (score) {
      case "Low":
        return "text-green-600 bg-green-100"
      case "Medium":
        return "text-yellow-600 bg-yellow-100"
      case "High":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  // Handle file upload
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // reset so same file can be selected again
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
      // You can add further processing here (e.g., send to backend, parse, etc.)
      // alert(`Uploaded: ${e.target.files[0].name}`)
      analyzeDocument(e.target.files[0])
    }
  }

  const analyzeDocument = async (file: File) => {
    setIsScanning(true)
    setScanProgress(0)
    setScanComplete(false)
    setScanResults([])

    const progressInterval = setInterval(() => {
      setScanProgress((prev) => (prev < 90 ? prev + 10 : 90))
    }, 200)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setScanProgress(100)

      if (!response.ok) {
        throw new Error(`Webhook failed with status ${response.status}`)
      }

      const results = await response.json()

      const newResults = results.map((result: any) => ({
        ...result,
        icon: iconMap[result.icon] || Info,
      }))
      setScanResults(newResults)
    } catch (error: any) {
      console.error("Error analyzing document:", error)
      setScanResults([
        {
          id: "error-1",
          type: "error",
          icon: XCircle,
          message: "Failed to analyze document",
          detail: error.message,
          severity: "high",
        },
      ])
    } finally {
      setIsScanning(false)
      setScanComplete(true)
    }
  }

  // Export scan results as JSON
  const handleExportResults = () => {
    const dataStr = JSON.stringify(scanResults, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "scan-results.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Fraud Detection</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI analysis to detect fraud, missing clauses, and legal inconsistencies in rental agreements
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {fraudStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                    <Badge variant="secondary" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scan" className="flex items-center">
              <Scan className="w-4 h-4 mr-2" />
              Document Scan
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Scan History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Scan Control Panel */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Scan className="w-5 h-5 mr-2" />
                      Fraud Scanner
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                        {isScanning ? (
                          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
                        ) : (
                          <Shield className="w-12 h-12 text-blue-600" />
                        )}
                      </div>
                      {isScanning && (
                        <div className="space-y-2">
                          <Progress value={scanProgress} className="w-full" />
                          <p className="text-sm text-gray-600">Scanning... {scanProgress}%</p>
                        </div>
                      )}
                    </div>
                    <Button onClick={runScan} disabled={isScanning} className="w-full" size="lg">
                      {isScanning ? "Scanning..." : "Start Fraud Scan"}
                    </Button>
                    <div className="space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                      />
                      <Button variant="outline" className="w-full" onClick={handleUploadClick}>
                        <FileText className="w-4 h-4 mr-2" />
                        Upload Document
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleExportResults}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Scan Results */}
              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Scan Results</span>
                        {scanComplete && <Badge className="bg-green-100 text-green-800">Scan Complete</Badge>}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isScanning && scanResults.length === 0 ? (
                        <div className="text-center p-8">
                          <p>Analyzing document, please wait...</p>
                        </div>
                      ) : scanResults.length === 0 && scanComplete ? (
                        <div className="text-center p-8">
                          <p>No issues found, or the analysis returned no results.</p>
                        </div>
                      ) : (
                        scanResults.map((result, index) => (
                          <motion.div
                            key={result.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-lg border ${getSeverityColor(result.severity)}`}
                          >
                            <div className="flex items-start space-x-3">
                              <result.icon className={`w-6 h-6 ${getTypeColor(result.type)} flex-shrink-0 mt-0.5`} />
                              <div className="flex-1">
                                <h4 className={`font-medium ${getTypeColor(result.type)}`}>{result.message}</h4>
                                {result.detail && <p className="text-sm text-gray-600 mt-1">{result.detail}</p>}
                                <div className="flex items-center justify-between mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {result.severity.toUpperCase()} PRIORITY
                                  </Badge>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4 mr-1" />
                                    Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* Risk Assessment */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-teal-800 mb-2">Overall Risk Assessment</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">{aiAnalysis.overallScore}</span>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-teal-800">{aiAnalysis.riskScore} Risk</div>
                            <div className="text-sm text-teal-600">Security Score: {aiAnalysis.overallScore}/100</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getRiskScoreColor(aiAnalysis.riskScore)}>
                        {aiAnalysis.riskScore} Risk Level
                      </Badge>
                      <p className="text-sm text-teal-600 mt-2">Agreement meets most security standards</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      AI Analysis Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Clause Coverage</span>
                        <span className="text-sm font-bold text-gray-900">{aiAnalysis.clauseCoverage}%</span>
                      </div>
                      <Progress value={aiAnalysis.clauseCoverage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Legal Compliance</span>
                        <span className="text-sm font-bold text-gray-900">{aiAnalysis.legalCompliance}%</span>
                      </div>
                      <Progress value={aiAnalysis.legalCompliance} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Overall Security</span>
                        <span className="text-sm font-bold text-gray-900">{aiAnalysis.overallScore}%</span>
                      </div>
                      <Progress value={aiAnalysis.overallScore} className="h-2" />
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Risk Assessment</span>
                        <Badge className={getRiskScoreColor(aiAnalysis.riskScore)}>{aiAnalysis.riskScore}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Detailed Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Analysis Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Schedule Regular Scans
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Info className="w-4 h-4 mr-2" />
                      View Recommendations
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Scans</span>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, document: "Downtown Apartment Agreement", date: "2024-12-20", score: 92, risk: "Low" },
                      { id: 2, document: "Suburban House Lease", date: "2024-12-19", score: 78, risk: "Medium" },
                      { id: 3, document: "City Loft Contract", date: "2024-12-18", score: 95, risk: "Low" },
                      { id: 4, document: "Commercial Space Agreement", date: "2024-12-17", score: 65, risk: "High" },
                    ].map((scan) => (
                      <div key={scan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{scan.document}</h4>
                          <p className="text-sm text-gray-600">{scan.date}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">{scan.score}/100</div>
                            <Badge className={getRiskScoreColor(scan.risk)} variant="secondary">
                              {scan.risk}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
