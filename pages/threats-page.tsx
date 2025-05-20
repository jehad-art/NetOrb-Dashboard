"use client"

import type React from "react"

import { useState } from "react"
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  ChevronRight,
  Clock,
  Cpu,
  Database,
  NetworkIcon as Ethernet,
  Eye,
  Filter,
  HardDrive,
  Home,
  Laptop,
  Menu,
  MoreHorizontal,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Smartphone,
  Tablet,
  X,
} from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

type NavItem = {
  name: string
  icon: React.ElementType
  href: string
  alert?: number
}

const navItems: NavItem[] = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Devices", icon: Laptop, href: "/devices", alert: 3 },
  { name: "Network", icon: Ethernet, href: "#" },
  { name: "Threats", icon: AlertTriangle, href: "/threats", alert: 5 },
  { name: "Firewall", icon: Shield, href: "#" },
]

type DeviceType = "Server" | "Workstation" | "Mobile" | "IoT" | "Network" | "Tablet"

type ThreatSeverity = "Critical" | "High" | "Medium" | "Low"

type ThreatStatus = "Active" | "Investigating" | "Remediation" | "Resolved" | "False Positive"

type Threat = {
  id: string
  name: string
  description: string
  type: string
  severity: ThreatSeverity
  status: ThreatStatus
  detectedAt: string
  category: string
  source: string
  affectedResource: string
  impactLevel: "High" | "Medium" | "Low"
  recommendedAction: string
  cve?: string
}

type Device = {
  id: string
  name: string
  type: DeviceType
  ip: string
  status: "Online" | "Offline" | "Warning"
  threats: Threat[]
}

const devices: Device[] = [
  {
    id: "DEV-001",
    name: "Main Server",
    type: "Server",
    ip: "10.20.51.10",
    status: "Online",
    threats: [
      {
        id: "THR-001",
        name: "Suspicious Login Attempt",
        type: "Intrusion Attempt",
        description:
          "Multiple failed login attempts detected from unusual IP address. Pattern suggests brute force attack.",
        severity: "High",
        status: "Active",
        detectedAt: "2023-05-20T10:30:00Z",
        category: "Authentication",
        source: "172.16.254.1",
        affectedResource: "/admin",
        impactLevel: "Medium",
        recommendedAction: "Block source IP and review authentication logs",
        cve: "CVE-2023-1234",
      },
      {
        id: "THR-002",
        name: "Outdated SSL Certificate",
        type: "Configuration Issue",
        description: "SSL certificate will expire in less than 7 days. This may lead to security warnings for users.",
        severity: "Medium",
        status: "Investigating",
        detectedAt: "2023-05-19T14:15:00Z",
        category: "Configuration",
        source: "System",
        affectedResource: "HTTPS Service",
        impactLevel: "Low",
        recommendedAction: "Renew SSL certificate immediately",
      },
    ],
  },
  {
    id: "DEV-002",
    name: "Database Server",
    type: "Server",
    ip: "192.168.1.20",
    status: "Warning",
    threats: [
      {
        id: "THR-003",
        name: "Unusual Database Query Pattern",
        type: "SQL Injection",
        description: "Potential SQL injection attempt detected. Unusual query patterns with malformed SQL statements.",
        severity: "Critical",
        status: "Active",
        detectedAt: "2023-05-20T09:45:00Z",
        category: "Database",
        source: "Web Application",
        affectedResource: "Customer Database",
        impactLevel: "High",
        recommendedAction: "Patch application and review database access logs",
        cve: "CVE-2023-5678",
      },
    ],
  },
  {
    id: "DEV-003",
    name: "CEO Laptop",
    type: "Mobile",
    ip: "192.168.1.35",
    status: "Offline",
    threats: [
      {
        id: "THR-004",
        name: "Malware Detected",
        type: "Trojan",
        description: "Trojan horse detected in email attachment. File has been quarantined but may have executed.",
        severity: "Critical",
        status: "Remediation",
        detectedAt: "2023-05-18T16:20:00Z",
        category: "Malware",
        source: "Email",
        affectedResource: "File System",
        impactLevel: "High",
        recommendedAction: "Run full system scan and update antivirus definitions",
        cve: "CVE-2023-9012",
      },
    ],
  },
  {
    id: "DEV-004",
    name: "Marketing Tablet",
    type: "Tablet",
    ip: "192.168.1.72",
    status: "Online",
    threats: [],
  },
  {
    id: "DEV-005",
    name: "IoT Gateway",
    type: "IoT",
    ip: "192.168.1.50",
    status: "Warning",
    threats: [
      {
        id: "THR-005",
        name: "Firmware Vulnerability",
        type: "Known Vulnerability",
        description: "Known vulnerability in current firmware version that could allow remote code execution.",
        severity: "High",
        status: "Investigating",
        detectedAt: "2023-05-17T11:10:00Z",
        category: "Vulnerability",
        source: "System",
        affectedResource: "Firmware v2.1.3",
        impactLevel: "High",
        recommendedAction: "Update firmware to latest version immediately",
        cve: "CVE-2023-3456",
      },
      {
        id: "THR-006",
        name: "Unusual Traffic Pattern",
        type: "Suspicious Activity",
        description: "Unexpected outbound traffic to unknown IP addresses. May indicate command and control activity.",
        severity: "Medium",
        status: "Active",
        detectedAt: "2023-05-20T08:30:00Z",
        category: "Network",
        source: "Device",
        affectedResource: "Network Interface",
        impactLevel: "Medium",
        recommendedAction: "Block outbound connections and investigate traffic patterns",
      },
    ],
  },
  {
    id: "DEV-006",
    name: "Network Switch",
    type: "Network",
    ip: "192.168.1.2",
    status: "Online",
    threats: [
      {
        id: "THR-007",
        name: "Port Scan Detected",
        type: "Reconnaissance",
        description: "Systematic port scan from internal network. May indicate compromised device or insider threat.",
        severity: "Medium",
        status: "Resolved",
        detectedAt: "2023-05-16T13:25:00Z",
        category: "Network",
        source: "192.168.1.100",
        affectedResource: "All Ports",
        impactLevel: "Low",
        recommendedAction: "Identify source device and investigate",
      },
    ],
  },
  {
    id: "DEV-007",
    name: "Admin Workstation",
    type: "Workstation",
    ip: "192.168.1.15",
    status: "Online",
    threats: [],
  },
  {
    id: "DEV-008",
    name: "Sales Phone",
    type: "Mobile",
    ip: "192.168.1.85",
    status: "Online",
    threats: [
      {
        id: "THR-008",
        name: "Suspicious App Detected",
        type: "Potentially Unwanted Application",
        description:
          "Application with excessive permissions detected. Requesting access to contacts, location, and camera.",
        severity: "Low",
        status: "False Positive",
        detectedAt: "2023-05-19T09:15:00Z",
        category: "Application",
        source: "App Store",
        affectedResource: "User Data",
        impactLevel: "Low",
        recommendedAction: "Review application permissions and consider removal",
      },
    ],
  },
]

const deviceTypeIcons = {
  Server: <Server className="h-5 w-5 text-blue-500" />,
  Workstation: <Cpu className="h-5 w-5 text-emerald-500" />,
  Mobile: <Smartphone className="h-5 w-5 text-purple-500" />,
  Tablet: <Tablet className="h-5 w-5 text-indigo-500" />,
  IoT: <Database className="h-5 w-5 text-amber-500" />,
  Network: <Ethernet className="h-5 w-5 text-cyan-500" />,
}

const threatSeverityIcons = {
  Critical: <ShieldX className="h-5 w-5 text-red-500" />,
  High: <ShieldAlert className="h-5 w-5 text-amber-500" />,
  Medium: <Shield className="h-5 w-5 text-blue-500" />,
  Low: <ShieldCheck className="h-5 w-5 text-emerald-500" />,
}

export function ThreatsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedDevices, setExpandedDevices] = useState<string[]>([])
  const [severityFilter, setSeverityFilter] = useState<ThreatSeverity[]>(["Critical", "High", "Medium", "Low"])
  const [statusFilter, setStatusFilter] = useState<ThreatStatus[]>([
    "Active",
    "Investigating",
    "Remediation",
    "Resolved",
    "False Positive",
  ])

  // Filter devices based on search query
  const filteredDevices = devices.filter(
    (device) => device.name.toLowerCase().includes(searchQuery.toLowerCase()) || device.ip.includes(searchQuery),
  )

  // Count total threats that match filters
  const totalThreats = devices.reduce((count, device) => {
    return (
      count +
      device.threats.filter(
        (threat) => severityFilter.includes(threat.severity) && statusFilter.includes(threat.status),
      ).length
    )
  }, 0)

  // Count active threats
  const activeThreats = devices.reduce((count, device) => {
    return (
      count + device.threats.filter((threat) => threat.status === "Active" || threat.status === "Investigating").length
    )
  }, 0)

  // Toggle device expansion
  const toggleDeviceExpansion = (deviceId: string) => {
    if (expandedDevices.includes(deviceId)) {
      setExpandedDevices(expandedDevices.filter((id) => id !== deviceId))
    } else {
      setExpandedDevices([...expandedDevices, deviceId])
    }
  }

  // Toggle severity filter
  const toggleSeverityFilter = (severity: ThreatSeverity) => {
    if (severityFilter.includes(severity)) {
      setSeverityFilter(severityFilter.filter((s) => s !== severity))
    } else {
      setSeverityFilter([...severityFilter, severity])
    }
  }

  // Toggle status filter
  const toggleStatusFilter = (status: ThreatStatus) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter((s) => s !== status))
    } else {
      setStatusFilter([...statusFilter, status])
    }
  }

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
                item.name === "Threats" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
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
                placeholder="Search devices or threats..."
                className="w-full bg-zinc-800 pl-8 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-6 w-6 text-zinc-500 hover:text-white"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
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

        {/* Threats Content */}
        <main className="flex-1 overflow-auto bg-zinc-950 p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Security Threats</h1>
              <p className="text-sm text-zinc-400">
                {totalThreats} threats detected across {devices.length} devices
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={severityFilter.includes("Critical")}
                    onCheckedChange={() => toggleSeverityFilter("Critical")}
                  >
                    Critical
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={severityFilter.includes("High")}
                    onCheckedChange={() => toggleSeverityFilter("High")}
                  >
                    High
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={severityFilter.includes("Medium")}
                    onCheckedChange={() => toggleSeverityFilter("Medium")}
                  >
                    Medium
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={severityFilter.includes("Low")}
                    onCheckedChange={() => toggleSeverityFilter("Low")}
                  >
                    Low
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("Active")}
                    onCheckedChange={() => toggleStatusFilter("Active")}
                  >
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("Investigating")}
                    onCheckedChange={() => toggleStatusFilter("Investigating")}
                  >
                    Investigating
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("Remediation")}
                    onCheckedChange={() => toggleStatusFilter("Remediation")}
                  >
                    Remediation
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("Resolved")}
                    onCheckedChange={() => toggleStatusFilter("Resolved")}
                  >
                    Resolved
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("False Positive")}
                    onCheckedChange={() => toggleStatusFilter("False Positive")}
                  >
                    False Positive
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px] border-zinc-800 bg-zinc-900 text-zinc-400 focus:ring-emerald-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    <SelectItem value="all">All Threats</SelectItem>
                    <SelectItem value="severity">Severity</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
                Run Security Scan
              </Button>
            </div>
          </div>

          {/* Status Cards */}
          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Total Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-2xl font-bold text-white">{totalThreats}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Across all devices</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Active Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ShieldAlert className="mr-2 h-5 w-5 text-amber-500" />
                  <span className="text-2xl font-bold text-white">{activeThreats}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Requiring attention</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Critical Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ShieldX className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-2xl font-bold text-white">
                    {devices.reduce(
                      (count, device) =>
                        count + device.threats.filter((threat) => threat.severity === "Critical").length,
                      0,
                    )}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Highest priority</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Affected Devices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <HardDrive className="mr-2 h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold text-white">
                    {devices.filter((device) => device.threats.length > 0).length}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Out of {devices.length} total devices</p>
              </CardContent>
            </Card>
          </div>

          {/* Devices with Threats */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Devices with Security Threats</CardTitle>
              <CardDescription className="text-zinc-400">
                Click on a device to view detailed threat information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredDevices.length === 0 ? (
                <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed border-zinc-800 p-4 text-center">
                  <p className="text-sm text-zinc-400">No devices match your search criteria</p>
                  <Button variant="link" className="mt-2 text-emerald-500" onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </div>
              ) : (
                filteredDevices.map((device) => (
                  <Collapsible
                    key={device.id}
                    open={expandedDevices.includes(device.id)}
                    onOpenChange={() => toggleDeviceExpansion(device.id)}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/50"
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex cursor-pointer items-center justify-between p-4 hover:bg-zinc-800/50">
                        <div className="flex items-center gap-3">
                          {expandedDevices.includes(device.id) ? (
                            <ChevronDown className="h-5 w-5 text-zinc-400" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-zinc-400" />
                          )}
                          {deviceTypeIcons[device.type]}
                          <div>
                            <h3 className="font-medium text-white">{device.name}</h3>
                            <p className="text-xs text-zinc-400">{device.ip}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={device.status === "Online" ? "outline" : "secondary"}
                            className={`${
                              device.status === "Online"
                                ? "border-emerald-500 text-emerald-500"
                                : device.status === "Warning"
                                  ? "border-amber-500 text-amber-500"
                                  : "border-zinc-600 text-zinc-400"
                            }`}
                          >
                            {device.status}
                          </Badge>
                          {device.threats.length > 0 ? (
                            <Badge
                              className={`${
                                device.threats.some((t) => t.severity === "Critical")
                                  ? "bg-red-500/10 text-red-500"
                                  : device.threats.some((t) => t.severity === "High")
                                    ? "bg-amber-500/10 text-amber-500"
                                    : "bg-blue-500/10 text-blue-500"
                              }`}
                            >
                              {device.threats.length} {device.threats.length === 1 ? "Threat" : "Threats"}
                            </Badge>
                          ) : (
                            <Badge className="bg-emerald-500/10 text-emerald-500">Secure</Badge>
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {device.threats.length > 0 ? (
                        <div className="space-y-4 p-4 pt-0">
                          <Separator className="bg-zinc-800" />
                          {device.threats
                            .filter(
                              (threat) =>
                                severityFilter.includes(threat.severity) && statusFilter.includes(threat.status),
                            )
                            .map((threat) => (
                              <div key={threat.id} className="rounded-md border border-zinc-800 bg-zinc-900 p-4">
                                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    {threatSeverityIcons[threat.severity]}
                                    <div>
                                      <h4 className="font-medium text-white">{threat.name}</h4>
                                      <p className="text-xs text-zinc-400">{threat.type}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <Badge
                                      className={`${
                                        threat.severity === "Critical"
                                          ? "bg-red-500/10 text-red-500"
                                          : threat.severity === "High"
                                            ? "bg-amber-500/10 text-amber-500"
                                            : threat.severity === "Medium"
                                              ? "bg-blue-500/10 text-blue-500"
                                              : "bg-emerald-500/10 text-emerald-500"
                                      }`}
                                    >
                                      {threat.severity}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className={`${
                                        threat.status === "Active"
                                          ? "border-red-500 text-red-500"
                                          : threat.status === "Investigating"
                                            ? "border-amber-500 text-amber-500"
                                            : threat.status === "Remediation"
                                              ? "border-blue-500 text-blue-500"
                                              : threat.status === "Resolved"
                                                ? "border-emerald-500 text-emerald-500"
                                                : "border-zinc-500 text-zinc-500"
                                      }`}
                                    >
                                      {threat.status}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="mb-4 rounded-md bg-zinc-800/50 p-3">
                                  <p className="text-sm text-zinc-300">{threat.description}</p>
                                </div>

                                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                  <div className="rounded-md bg-zinc-800/30 p-3">
                                    <h5 className="mb-1 text-xs font-medium uppercase text-zinc-500">Category</h5>
                                    <p className="text-sm text-zinc-300">{threat.category}</p>
                                  </div>
                                  <div className="rounded-md bg-zinc-800/30 p-3">
                                    <h5 className="mb-1 text-xs font-medium uppercase text-zinc-500">Source</h5>
                                    <p className="text-sm text-zinc-300">{threat.source}</p>
                                  </div>
                                  <div className="rounded-md bg-zinc-800/30 p-3">
                                    <h5 className="mb-1 text-xs font-medium uppercase text-zinc-500">
                                      Affected Resource
                                    </h5>
                                    <p className="text-sm text-zinc-300">{threat.affectedResource}</p>
                                  </div>
                                  <div className="rounded-md bg-zinc-800/30 p-3">
                                    <h5 className="mb-1 text-xs font-medium uppercase text-zinc-500">Impact Level</h5>
                                    <p className="text-sm text-zinc-300">{threat.impactLevel}</p>
                                  </div>
                                </div>

                                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                  <div className="rounded-md bg-zinc-800/30 p-3">
                                    <h5 className="mb-1 text-xs font-medium uppercase text-zinc-500">
                                      Recommended Action
                                    </h5>
                                    <p className="text-sm text-zinc-300">{threat.recommendedAction}</p>
                                  </div>
                                  <div className="rounded-md bg-zinc-800/30 p-3">
                                    <h5 className="mb-1 text-xs font-medium uppercase text-zinc-500">
                                      Detection Details
                                    </h5>
                                    <div className="flex items-center text-sm text-zinc-300">
                                      <Clock className="mr-1 h-3 w-3" />
                                      {new Date(threat.detectedAt).toLocaleString()}
                                    </div>
                                    {threat.cve && (
                                      <div className="mt-1 text-sm text-zinc-300">
                                        <span className="font-medium">CVE:</span> {threat.cve}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
                                    Investigate
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                  >
                                    <Eye className="mr-1 h-4 w-4" />
                                    View Details
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                                      <DropdownMenuItem>Assign to Team</DropdownMenuItem>
                                      <DropdownMenuItem>Export Details</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-red-500">
                                        Mark as False Positive
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            ))}
                          {device.threats.filter(
                            (threat) =>
                              severityFilter.includes(threat.severity) && statusFilter.includes(threat.status),
                          ).length === 0 && (
                            <div className="flex h-24 flex-col items-center justify-center rounded-md border border-dashed border-zinc-800 p-4 text-center">
                              <p className="text-sm text-zinc-400">No threats match your current filters</p>
                              <Button
                                variant="link"
                                className="mt-2 text-emerald-500"
                                onClick={() => {
                                  setSeverityFilter(["Critical", "High", "Medium", "Low"])
                                  setStatusFilter([
                                    "Active",
                                    "Investigating",
                                    "Remediation",
                                    "Resolved",
                                    "False Positive",
                                  ])
                                }}
                              >
                                Reset filters
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex h-24 flex-col items-center justify-center p-4 pt-0 text-center">
                          <ShieldCheck className="mb-2 h-6 w-6 text-emerald-500" />
                          <p className="text-sm text-zinc-400">No threats detected on this device</p>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                ))
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
