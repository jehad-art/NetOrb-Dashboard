"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  Clock,
  NetworkIcon as Ethernet,
  FileText,
  HardDrive,
  Home,
  Layers,
  type LucideIcon,
  Menu,
  MoreHorizontal,
  Search,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react"
import Image from "next/image"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

type NavItem = {
  name: string
  icon: LucideIcon
  href: string
  alert?: number
}

const navItems: NavItem[] = [
  { name: "Dashboard", icon: Home, href: "#" },
  { name: "Devices", icon: HardDrive, href: "/devices", alert: 3 },
  { name: "Network", icon: Ethernet, href: "#" },
  { name: "Threats", icon: AlertTriangle, href: "#", alert: 5 },
  { name: "Firewall", icon: Shield, href: "#" },
  { name: "Logs", icon: FileText, href: "#" },
  { name: "Servers", icon: Server, href: "#" },
  { name: "Settings", icon: Settings, href: "#" },
]

// Security score data
const securityScoreData = [
  { name: "Firewall", score: 92, color: "#10b981" },
  { name: "Endpoints", score: 78, color: "#f59e0b" },
  { name: "Network", score: 85, color: "#3b82f6" },
  { name: "Data", score: 90, color: "#8b5cf6" },
  { name: "Access", score: 72, color: "#ec4899" },
]

// Overall security score
const overallSecurityScore = Math.round(
  securityScoreData.reduce((acc, item) => acc + item.score, 0) / securityScoreData.length,
)

// Device status data
const deviceStatusData = [
  { name: "Online", value: 24, color: "#10b981" },
  { name: "Offline", value: 3, color: "#6b7280" },
  { name: "Warning", value: 5, color: "#f59e0b" },
  { name: "Critical", value: 2, color: "#ef4444" },
]

// Network traffic data
const networkTrafficData = [
  { name: "00:00", inbound: 2.1, outbound: 1.5 },
  { name: "02:00", inbound: 1.8, outbound: 1.2 },
  { name: "04:00", inbound: 1.5, outbound: 0.9 },
  { name: "06:00", inbound: 2.3, outbound: 1.3 },
  { name: "08:00", inbound: 5.4, outbound: 3.2 },
  { name: "10:00", inbound: 6.2, outbound: 4.5 },
  { name: "12:00", inbound: 7.1, outbound: 5.2 },
  { name: "14:00", inbound: 8.5, outbound: 6.8 },
  { name: "16:00", inbound: 7.6, outbound: 5.9 },
  { name: "18:00", inbound: 5.8, outbound: 4.2 },
  { name: "20:00", inbound: 4.2, outbound: 3.1 },
  { name: "22:00", inbound: 3.1, outbound: 2.3 },
]

// Threat detection data
const threatDetectionData = [
  { name: "Mon", threats: 3 },
  { name: "Tue", threats: 5 },
  { name: "Wed", threats: 2 },
  { name: "Thu", threats: 7 },
  { name: "Fri", threats: 4 },
  { name: "Sat", threats: 1 },
  { name: "Sun", threats: 3 },
]

// Device type distribution
const deviceTypeData = [
  { name: "Servers", value: 8, color: "#3b82f6" },
  { name: "Workstations", value: 12, color: "#10b981" },
  { name: "Mobile", value: 7, color: "#8b5cf6" },
  { name: "IoT", value: 5, color: "#f59e0b" },
  { name: "Network", value: 2, color: "#06b6d4" },
]

// Active threats
const activeThreats = [
  {
    id: 1,
    name: "Suspicious Login Attempt",
    device: "Admin Workstation",
    severity: "High",
    time: "10 minutes ago",
    status: "Active",
  },
  {
    id: 2,
    name: "Unusual Network Traffic",
    device: "IoT Gateway",
    severity: "Medium",
    time: "25 minutes ago",
    status: "Investigating",
  },
  {
    id: 3,
    name: "Outdated Firmware",
    device: "Network Switch",
    severity: "Medium",
    time: "1 hour ago",
    status: "Remediation",
  },
  {
    id: 4,
    name: "Malware Detected",
    device: "Sales Laptop",
    severity: "Critical",
    time: "30 minutes ago",
    status: "Quarantined",
  },
  {
    id: 5,
    name: "Unauthorized Access Attempt",
    device: "Database Server",
    severity: "High",
    time: "15 minutes ago",
    status: "Active",
  },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-zinc-900 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-white">
            <Shield className="h-6 w-6 text-emerald-500" />
            <span>NetSecure</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-zinc-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-1 px-2 py-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                item.name === "Dashboard"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
              {item.alert && (
                <Badge variant="destructive" className="ml-auto">
                  {item.alert}
                </Badge>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-zinc-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search..."
                className="w-full bg-zinc-800 pl-8 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-zinc-400 hover:text-white">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    width={32}
                    height={32}
                    alt="User"
                    className="rounded-full"
                  />
                  <span>Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto bg-zinc-950 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Security Dashboard</h1>
              <p className="text-sm text-zinc-400">Last updated: Today at 10:45 AM</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white">
                Export Report
              </Button>
              <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Run Security Scan</Button>
            </div>
          </div>

          {/* Status Cards */}
          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Security Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  {overallSecurityScore >= 80 ? (
                    <ShieldCheck className="mr-2 h-5 w-5 text-emerald-500" />
                  ) : overallSecurityScore >= 60 ? (
                    <Shield className="mr-2 h-5 w-5 text-amber-500" />
                  ) : (
                    <ShieldAlert className="mr-2 h-5 w-5 text-red-500" />
                  )}
                  <span className="text-2xl font-bold text-white">{overallSecurityScore}/100</span>
                </div>
                <div className="mt-2 flex items-center text-xs">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">+3 points</span>
                  <span className="ml-1 text-zinc-500">since last week</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Active Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-2xl font-bold text-white">5</span>
                </div>
                <div className="mt-2 flex items-center text-xs">
                  <ArrowDownRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">-2 threats</span>
                  <span className="ml-1 text-zinc-500">since yesterday</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Network Load</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold text-white">68%</span>
                </div>
                <div className="mt-2 flex items-center text-xs">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-amber-500" />
                  <span className="text-amber-500">+12%</span>
                  <span className="ml-1 text-zinc-500">peak at 10:30 AM</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Device Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <HardDrive className="mr-2 h-5 w-5 text-emerald-500" />
                  <span className="text-2xl font-bold text-white">34</span>
                </div>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-emerald-500">24 online</span>
                  <span className="mx-1 text-zinc-500">•</span>
                  <span className="text-amber-500">5 warning</span>
                  <span className="mx-1 text-zinc-500">•</span>
                  <span className="text-red-500">2 critical</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="mb-6 grid gap-6 lg:grid-cols-2">
            {/* Security Score Breakdown */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Security Score Breakdown</CardTitle>
                <CardDescription className="text-zinc-400">Score by security category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityScoreData.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm text-zinc-400">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium text-white">{item.score}/100</span>
                      </div>
                      <Progress
                        value={item.score}
                        className={`h-2 bg-zinc-800 [&>div]:${
                          item.score >= 90
                            ? "bg-emerald-500"
                            : item.score >= 80
                              ? "bg-green-500"
                              : item.score >= 70
                                ? "bg-amber-500"
                                : "bg-red-500"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Network Traffic */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Network Traffic</CardTitle>
                <CardDescription className="text-zinc-400">24-hour traffic pattern (GB)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      inbound: {
                        label: "Inbound",
                        color: "hsl(var(--chart-1))",
                      },
                      outbound: {
                        label: "Outbound",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={networkTrafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-inbound)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--color-inbound)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-outbound)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--color-outbound)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="inbound"
                          stroke="var(--color-inbound)"
                          fillOpacity={1}
                          fill="url(#colorInbound)"
                        />
                        <Area
                          type="monotone"
                          dataKey="outbound"
                          stroke="var(--color-outbound)"
                          fillOpacity={1}
                          fill="url(#colorOutbound)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="mb-6 grid gap-6 lg:grid-cols-3">
            {/* Device Status Distribution */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Device Status</CardTitle>
                <CardDescription className="text-zinc-400">Current device status distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[250px] items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {deviceStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} devices`, name]}
                        contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "6px" }}
                        itemStyle={{ color: "#f4f4f5" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  {deviceStatusData.map((item) => (
                    <div key={item.name} className="flex items-center">
                      <div className="mr-1 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs text-zinc-400">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Type Distribution */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Device Types</CardTitle>
                <CardDescription className="text-zinc-400">Distribution by device category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[250px] items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {deviceTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} devices`, name]}
                        contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "6px" }}
                        itemStyle={{ color: "#f4f4f5" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  {deviceTypeData.map((item) => (
                    <div key={item.name} className="flex items-center">
                      <div className="mr-1 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs text-zinc-400">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Threat Detection Trend */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Threat Detection</CardTitle>
                <CardDescription className="text-zinc-400">7-day threat detection trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={threatDetectionData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        formatter={(value) => [`${value} threats`, "Detected"]}
                        contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "6px" }}
                        itemStyle={{ color: "#f4f4f5" }}
                      />
                      <Bar dataKey="threats" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Threats */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Active Threats</CardTitle>
              <CardDescription className="text-zinc-400">
                Current security incidents requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeThreats.map((threat) => (
                  <div
                    key={threat.id}
                    className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-900 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="mb-3 flex items-center sm:mb-0 sm:w-1/4">
                      <div
                        className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${
                          threat.severity === "Critical"
                            ? "bg-red-500/10"
                            : threat.severity === "High"
                              ? "bg-amber-500/10"
                              : "bg-blue-500/10"
                        }`}
                      >
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            threat.severity === "Critical"
                              ? "text-red-500"
                              : threat.severity === "High"
                                ? "text-amber-500"
                                : "text-blue-500"
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{threat.name}</h4>
                        <p className="text-xs text-zinc-400">{threat.device}</p>
                      </div>
                    </div>
                    <div className="mb-3 flex items-center sm:mb-0 sm:w-1/4">
                      <Badge
                        className={`${
                          threat.severity === "Critical"
                            ? "bg-red-500/10 text-red-500"
                            : threat.severity === "High"
                              ? "bg-amber-500/10 text-amber-500"
                              : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {threat.severity}
                      </Badge>
                    </div>
                    <div className="mb-3 flex items-center sm:mb-0 sm:w-1/4">
                      <Badge
                        variant="outline"
                        className={`${
                          threat.status === "Active"
                            ? "border-red-500 text-red-500"
                            : threat.status === "Investigating"
                              ? "border-amber-500 text-amber-500"
                              : threat.status === "Remediation"
                                ? "border-blue-500 text-blue-500"
                                : "border-emerald-500 text-emerald-500"
                        }`}
                      >
                        {threat.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between sm:w-1/4 sm:justify-end">
                      <div className="flex items-center text-xs text-zinc-400">
                        <Clock className="mr-1 h-3 w-3" />
                        {threat.time}
                      </div>
                      <Button variant="ghost" size="icon" className="ml-2 text-zinc-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
