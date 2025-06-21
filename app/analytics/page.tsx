"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Home,
  Users,
  Shield,
  Download,
  Filter,
  Calendar,
  MapPin,
  BarChart3,
  PieChartIcon,
} from "lucide-react"

const rentData = [
  { month: "Jan", rent: 1200, occupancy: 85, disputes: 2, agreements: 45 },
  { month: "Feb", rent: 1250, occupancy: 90, disputes: 1, agreements: 52 },
  { month: "Mar", rent: 1300, occupancy: 88, disputes: 0, agreements: 48 },
  { month: "Apr", rent: 1350, occupancy: 92, disputes: 1, agreements: 58 },
  { month: "May", rent: 1400, occupancy: 95, disputes: 0, agreements: 62 },
  { month: "Jun", rent: 1450, occupancy: 93, disputes: 1, agreements: 55 },
  { month: "Jul", rent: 1500, occupancy: 96, disputes: 0, agreements: 68 },
  { month: "Aug", rent: 1525, occupancy: 94, disputes: 2, agreements: 64 },
  { month: "Sep", rent: 1475, occupancy: 91, disputes: 1, agreements: 59 },
  { month: "Oct", rent: 1450, occupancy: 89, disputes: 3, agreements: 53 },
  { month: "Nov", rent: 1425, occupancy: 87, disputes: 2, agreements: 49 },
  { month: "Dec", rent: 1400, occupancy: 85, disputes: 1, agreements: 47 },
]

const propertyTypeData = [
  { name: "Apartments", value: 45, color: "#3B82F6" },
  { name: "Houses", value: 30, color: "#10B981" },
  { name: "Condos", value: 15, color: "#F59E0B" },
  { name: "Commercial", value: 10, color: "#EF4444" },
]

const regionData = [
  { region: "Downtown", avgRent: 1800, properties: 125, growth: 8.5 },
  { region: "Suburbs", avgRent: 1400, properties: 89, growth: 5.2 },
  { region: "Waterfront", avgRent: 2200, properties: 67, growth: 12.1 },
  { region: "University Area", avgRent: 1100, properties: 156, growth: 3.8 },
  { region: "Business District", avgRent: 1950, properties: 78, growth: 9.7 },
]

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("12months")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")

  const keyMetrics = [
    {
      title: "Average Rent",
      value: "$1,425",
      change: "+5.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      title: "Occupancy Rate",
      value: "91.2%",
      change: "+2.1%",
      trend: "up",
      icon: Home,
      color: "text-green-600",
    },
    {
      title: "Active Agreements",
      value: "847",
      change: "+12.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Dispute Rate",
      value: "0.8%",
      change: "-15.2%",
      trend: "down",
      icon: Shield,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Rent Analytics</h1>
              <p className="text-xl text-gray-600">Comprehensive rental market insights and performance metrics</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="12months">Last 12 Months</SelectItem>
                  <SelectItem value="24months">Last 2 Years</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    <Badge
                      variant="secondary"
                      className={`${metric.trend === "up" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.title}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="regions" className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Regions
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center">
              <PieChartIcon className="w-4 h-4 mr-2" />
              Properties
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Rent vs Occupancy Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={rentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="rent"
                          stackId="1"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.6}
                        />
                        <Line yAxisId="right" type="monotone" dataKey="occupancy" stroke="#10B981" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Side Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Filters & Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Time Period</label>
                      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6months">Last 6 Months</SelectItem>
                          <SelectItem value="12months">Last 12 Months</SelectItem>
                          <SelectItem value="24months">Last 2 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Property Type</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="apartment">Apartments</SelectItem>
                          <SelectItem value="house">Houses</SelectItem>
                          <SelectItem value="condo">Condos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">
                      <Filter className="w-4 h-4 mr-2" />
                      Apply Filters
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Export Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download CSV
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF Report
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Report
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Agreements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={rentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="agreements" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Dispute Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={rentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="disputes" stroke="#EF4444" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionData.map((region, index) => (
                      <div key={region.region} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{region.region}</h4>
                          <p className="text-sm text-gray-600">{region.properties} properties</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${region.avgRent.toLocaleString()}</div>
                          <Badge
                            variant="secondary"
                            className={`${
                              region.growth > 5 ? "text-green-600 bg-green-100" : "text-blue-600 bg-blue-100"
                            }`}
                          >
                            +{region.growth}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Property Type Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={propertyTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {propertyTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Property Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {propertyTypeData.map((type, index) => (
                      <div key={type.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: type.color }} />
                          <span className="font-medium text-gray-900">{type.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{type.value}%</div>
                          <div className="text-sm text-gray-600">of portfolio</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
