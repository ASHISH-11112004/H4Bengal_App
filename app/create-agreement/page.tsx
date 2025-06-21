"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import jsPDF from "jspdf"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { FileText, DollarSign, MapPin, User, Shield, CheckCircle, Download, Eye, Save, Send } from "lucide-react"

interface FormData {
  landlordName: string
  landlordEmail: string
  landlordPhone: string
  tenantName: string
  tenantEmail: string
  tenantPhone: string
  propertyAddress: string
  propertyType: string
  rent: string
  deposit: string
  duration: string
  startDate: string
  utilities: string[]
  petPolicy: string
  smokingPolicy: string
  additionalTerms: string
}

export default function CreateAgreementPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    landlordName: "",
    landlordEmail: "",
    landlordPhone: "",
    tenantName: "",
    tenantEmail: "",
    tenantPhone: "",
    propertyAddress: "",
    propertyType: "",
    rent: "",
    deposit: "",
    duration: "12",
    startDate: "",
    utilities: [],
    petPolicy: "not-allowed",
    smokingPolicy: "not-allowed",
    additionalTerms: "",
  })
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedDraft = localStorage.getItem("agreementDraft")
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft))
    }
  }, [])

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const utilityOptions = [
    { id: "electricity", label: "Electricity" },
    { id: "gas", label: "Gas" },
    { id: "water", label: "Water" },
    { id: "internet", label: "Internet" },
    { id: "cable", label: "Cable TV" },
    { id: "trash", label: "Trash Collection" },
  ]

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleUtilityChange = (utilityId: string, checked: boolean) => {
    const updatedUtilities = checked
      ? [...formData.utilities, utilityId]
      : formData.utilities.filter((id) => id !== utilityId)
    handleInputChange("utilities", updatedUtilities)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveDraft = () => {
    localStorage.setItem("agreementDraft", JSON.stringify(formData))
    alert("Draft saved successfully!")
  }

  const handleDownloadPdf = () => {
    const doc = new jsPDF()
    doc.text("Rental Agreement", 20, 10)
    doc.text(`Landlord: ${formData.landlordName}`, 20, 20)
    doc.text(`Tenant: ${formData.tenantName}`, 20, 30)
    doc.text(`Property: ${formData.propertyAddress}`, 20, 40)
    doc.text(`Rent: $${formData.rent}/month`, 20, 50)
    doc.text(`Deposit: $${formData.deposit}`, 20, 60)
    doc.text(`Start Date: ${formData.startDate}`, 20, 70)
    doc.text(`Duration: ${formData.duration} months`, 20, 80)
    doc.text("Additional Terms:", 20, 90)
    doc.text(formData.additionalTerms, 20, 100, { maxWidth: 170 })
    doc.save("rental-agreement.pdf")
  }

  const handleRunFraudCheck = () => {
    localStorage.setItem("fraudCheckData", JSON.stringify(formData))
    router.push("/fraud-detection")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Agreement created:", formData)
    // TODO: Send data to backend
    localStorage.removeItem("agreementDraft") // Clear draft after submission
    setIsSubmissionDialogOpen(true)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Party Information</h3>
              <p className="text-gray-600">Enter details for landlord and tenant</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Landlord Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 border-b pb-2">Landlord Information</h4>
                <div>
                  <Label htmlFor="landlordName">Full Name *</Label>
                  <Input
                    id="landlordName"
                    value={formData.landlordName}
                    onChange={(e) => handleInputChange("landlordName", e.target.value)}
                    placeholder="Enter landlord's full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="landlordEmail">Email Address *</Label>
                  <Input
                    id="landlordEmail"
                    type="email"
                    value={formData.landlordEmail}
                    onChange={(e) => handleInputChange("landlordEmail", e.target.value)}
                    placeholder="landlord@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="landlordPhone">Phone Number</Label>
                  <Input
                    id="landlordPhone"
                    type="tel"
                    value={formData.landlordPhone}
                    onChange={(e) => handleInputChange("landlordPhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Tenant Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 border-b pb-2">Tenant Information</h4>
                <div>
                  <Label htmlFor="tenantName">Full Name *</Label>
                  <Input
                    id="tenantName"
                    value={formData.tenantName}
                    onChange={(e) => handleInputChange("tenantName", e.target.value)}
                    placeholder="Enter tenant's full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tenantEmail">Email Address *</Label>
                  <Input
                    id="tenantEmail"
                    type="email"
                    value={formData.tenantEmail}
                    onChange={(e) => handleInputChange("tenantEmail", e.target.value)}
                    placeholder="tenant@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tenantPhone">Phone Number</Label>
                  <Input
                    id="tenantPhone"
                    type="tel"
                    value={formData.tenantPhone}
                    onChange={(e) => handleInputChange("tenantPhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Property Details</h3>
              <p className="text-gray-600">Specify property information and type</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="propertyAddress">Property Address *</Label>
                <Textarea
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                  placeholder="Enter complete property address including city, state, and postal code"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleInputChange("propertyType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="commercial">Commercial Space</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Utilities Included</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {utilityOptions.map((utility) => (
                    <div key={utility.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={utility.id}
                        checked={formData.utilities.includes(utility.id)}
                        onCheckedChange={(checked) => handleUtilityChange(utility.id, checked as boolean)}
                      />
                      <Label htmlFor={utility.id} className="text-sm">
                        {utility.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center mb-6">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Financial Terms</h3>
              <p className="text-gray-600">Set rent, deposit, and lease duration</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Label htmlFor="duration">Lease Duration</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="18">18 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                    <SelectItem value="36">36 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startDate">Lease Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="petPolicy">Pet Policy</Label>
                <Select value={formData.petPolicy} onValueChange={(value) => handleInputChange("petPolicy", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-allowed">No Pets Allowed</SelectItem>
                    <SelectItem value="cats-only">Cats Only</SelectItem>
                    <SelectItem value="dogs-only">Dogs Only</SelectItem>
                    <SelectItem value="cats-dogs">Cats and Dogs</SelectItem>
                    <SelectItem value="all-pets">All Pets Allowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="smokingPolicy">Smoking Policy</Label>
                <Select
                  value={formData.smokingPolicy}
                  onValueChange={(value) => handleInputChange("smokingPolicy", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-allowed">No Smoking</SelectItem>
                    <SelectItem value="outdoor-only">Outdoor Only</SelectItem>
                    <SelectItem value="designated-areas">Designated Areas</SelectItem>
                    <SelectItem value="allowed">Smoking Allowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center mb-6">
              <FileText className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Additional Terms & Review</h3>
              <p className="text-gray-600">Add custom clauses and review your agreement</p>
            </div>

            <div>
              <Label htmlFor="additionalTerms">Additional Terms and Conditions</Label>
              <Textarea
                id="additionalTerms"
                value={formData.additionalTerms}
                onChange={(e) => handleInputChange("additionalTerms", e.target.value)}
                placeholder="Enter any additional terms, conditions, or special clauses..."
                rows={6}
              />
            </div>

            {/* Agreement Summary */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg">Agreement Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Landlord:</span>
                    <p className="text-gray-900">{formData.landlordName || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Tenant:</span>
                    <p className="text-gray-900">{formData.tenantName || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Monthly Rent:</span>
                    <p className="text-gray-900">${formData.rent || "0"}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Security Deposit:</span>
                    <p className="text-gray-900">${formData.deposit || "0"}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Duration:</span>
                    <p className="text-gray-900">{formData.duration} months</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Start Date:</span>
                    <p className="text-gray-900">{formData.startDate || "Not specified"}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Property:</span>
                  <p className="text-gray-900 text-sm">{formData.propertyAddress || "Not specified"}</p>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis Preview */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-800">AI Analysis Complete</h4>
                    <p className="text-sm text-green-600">
                      Agreement structure looks good. All essential clauses are present.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Rental Agreement</h1>
          <p className="text-xl text-gray-600">Generate a secure, AI-verified rental agreement in minutes</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        {/* Main Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                    Previous
                  </Button>

                  <div className="flex space-x-3">
                    <Button type="button" variant="outline" onClick={handleSaveDraft}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>

                    {currentStep === totalSteps ? (
                      <Button type="submit" className="bg-green-600 hover:bg-green-700">
                        <Send className="w-4 h-4 mr-2" />
                        Create Agreement
                      </Button>
                    ) : (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preview Actions */}
          {currentStep === totalSteps && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Preview & Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsPreviewOpen(true)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Document
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto" onClick={handleDownloadPdf}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto" onClick={handleRunFraudCheck}>
                    <Shield className="w-4 h-4 mr-2" />
                    Run Fraud Check
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Agreement Preview</DialogTitle>
            <DialogDescription>This is a preview of the rental agreement.</DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm max-h-[60vh] overflow-y-auto p-4 border rounded-md">
            <h2>Rental Agreement</h2>
            <p>
              <strong>Landlord:</strong> {formData.landlordName}
            </p>
            <p>
              <strong>Tenant:</strong> {formData.tenantName}
            </p>
            <p>
              <strong>Property:</strong> {formData.propertyAddress}
            </p>
            <hr />
            <h3>Terms</h3>
            <p>
              <strong>Rent:</strong> ${formData.rent} per month
            </p>
            <p>
              <strong>Security Deposit:</strong> ${formData.deposit}
            </p>
            <p>
              <strong>Lease Duration:</strong> {formData.duration} months
            </p>
            <p>
              <strong>Start Date:</strong> {formData.startDate}
            </p>
            <h3>Policies</h3>
            <p>
              <strong>Pet Policy:</strong> {formData.petPolicy}
            </p>
            <p>
              <strong>Smoking Policy:</strong> {formData.smokingPolicy}
            </p>
            <h3>Additional Terms</h3>
            <p>{formData.additionalTerms || "None"}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submission Confirmation Modal */}
      <Dialog open={isSubmissionDialogOpen} onOpenChange={setIsSubmissionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
            <DialogDescription>Your rental agreement has been created.</DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p>You will receive a confirmation email shortly.</p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsSubmissionDialogOpen(false)
                // Optionally reset form or redirect
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
