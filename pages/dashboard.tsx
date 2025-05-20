"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  Cpu,
  Database,
  NetworkIcon as Ethernet,
  FileText,
  HardDrive,
  Home,
  Layers,
  Lock,
  type LucideIcon,
  Menu,
  MoreHorizontal,
  Search,
  Server,
  Settings,
  Shield,
  Wifi,
} from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type NavItem = {
  name: string
  icon: LucideIcon
  href: string
  alert?: number
}

const navItems: NavItem[] = [
  { name: "Dashboard", icon: Home, href: "#" },
  { name: "Devices", icon: HardDrive, href: "#", alert: 3 },
  { name: "Network", icon: Ethernet, href: "#" },
  { name: "Threats", icon: AlertTriangle, href: "#", alert: 5 },
  { name: "Firewall", icon: Shield, href: "#" },
  { name: "Logs", icon: FileText, href: "#" },
  { name: "Servers", icon: Server, href: "#" },
  { name: "Settings", icon: Settings, href: "#" },
]

const devices = [
  {
    id: "DEV-001",
    name: "Main Server",
    ip: "192.168.1.10",
    mac: "00:1B:44:11:3A:B7",
    type: "Server",
    status: "Online",
    lastSeen: "Just now",
    risk: "Low",
  },
  {
    id: "DEV-002",
    name: "Admin Workstation",
    ip: "192.168.1.15",
    mac: "00:1B:44:11:3A:C2",
    type: "Workstation",
    status: "Online",
    lastSeen: "2 mins ago",
    risk: "Low",
  },
  {
    id: "DEV-003",
    name: "Database Server",
    ip: "192.168.1.20",
    mac: "00:1B:44:11:3A:D5",
    type: "Server",
    status: "Online",
    lastSeen: "Just now",
    risk: "Medium",
  },
  {
    id: "DEV-004",
    name: "Guest Laptop",
    ip: "192.168.1.35",
    mac: "00:1B:44:11:3B:F1",
    type: "Mobile",
    status: "Offline",
    lastSeen: "3 hours ago",
    risk: "High",
  },
  {
    id: "DEV-005",
    name: "IoT Gateway",
    ip: "192.168.1.50",
    mac: "00:1B:44:11:3C:A2",
    type: "IoT",
    status: "Online",
    lastSeen: "5 mins ago",
    risk: "Medium",
  },
  {
    id: "DEV-006",
    name: "Development Server",
    ip: "192.168.1.25",
    mac: "00:1B:44:11:3A:E7",
    type: "Server",
    status: "Online",
    lastSeen: "Just now",
    risk: "Low",
  },
]

const ports = [
  { id: 1, name: "Port 1", status: "active", type: "RJ45", speed: "1 Gbps", device: "Main Server" },
  { id: 2, name: "Port 2", status: "active", type: "RJ45", speed: "1 Gbps", device: "Admin Workstation" },
  { id: 3, name: "Port 3", status: "active", type: "RJ45", speed: "1 Gbps", device: "Database Server" },
  { id: 4, name: "Port 4", status: "inactive", type: "RJ45", speed: "1 Gbps", device: "None" },
  { id: 5, name: "Port 5", status: "warning", type: "RJ45", speed: "100 Mbps", device: "IoT Gateway" },
  { id: 6, name: "Port 6", status: "active", type: "RJ45", speed: "1 Gbps", device: "Development Server" },
  { id: 7, name: "Port 7", status: "inactive", type: "RJ45", speed: "1 Gbps", device: "None" },
  { id: 8, name: "Port 8", status: "inactive", type: "RJ45", speed: "1 Gbps", device: "None" },
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
            <h1 className="text-2xl font-bold text-white">Network Security Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white">
                Export
              </Button>
              <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Scan Network</Button>
            </div>
          </div>

          {/* Status Cards */}
          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Connected Devices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <HardDrive className="mr-2 h-5 w-5 text-emerald-500" />
                  <span className="text-2xl font-bold text-white">24</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">5 new devices today</p>
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
                <p className="mt-2 text-xs text-zinc-500">2 critical threats</p>
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
                <p className="mt-2 text-xs text-zinc-500">12.4 GB/s current throughput</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Security Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-amber-500" />
                  <span className="text-2xl font-bold text-white">86/100</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">3 recommendations</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Device Table */}
            <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-white">Connected Devices</CardTitle>
                  <CardDescription className="text-zinc-400">All devices on your network</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Refresh</DropdownMenuItem>
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-zinc-800">
                  <Table>
                    <TableHeader className="bg-zinc-800/50">
                      <TableRow className="hover:bg-zinc-800/70 border-zinc-800">
                        <TableHead className="text-zinc-400">Device</TableHead>
                        <TableHead className="text-zinc-400">IP Address</TableHead>
                        <TableHead className="text-zinc-400">Status</TableHead>
                        <TableHead className="text-zinc-400">Last Seen</TableHead>
                        <TableHead className="text-zinc-400">Risk</TableHead>
                        <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {devices.map((device) => (
                        <TableRow key={device.id} className="hover:bg-zinc-800/50 border-zinc-800">
                          <TableCell className="font-medium text-white">
                            <div className="flex items-center gap-2">
                              {device.type === "Server" ? (
                                <Server className="h-4 w-4 text-blue-500" />
                              ) : device.type === "Workstation" ? (
                                <Cpu className="h-4 w-4 text-emerald-500" />
                              ) : device.type === "Mobile" ? (
                                <Wifi className="h-4 w-4 text-purple-500" />
                              ) : device.type === "IoT" ? (
                                <Database className="h-4 w-4 text-amber-500" />
                              ) : (
                                <HardDrive className="h-4 w-4 text-zinc-500" />
                              )}
                              {device.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-zinc-400">{device.ip}</TableCell>
                          <TableCell>
                            <Badge
                              variant={device.status === "Online" ? "outline" : "secondary"}
                              className={`${
                                device.status === "Online"
                                  ? "border-emerald-500 text-emerald-500"
                                  : "border-zinc-600 text-zinc-400"
                              }`}
                            >
                              {device.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-zinc-400">{device.lastSeen}</TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                device.risk === "Low"
                                  ? "bg-emerald-500/10 text-emerald-500"
                                  : device.risk === "Medium"
                                    ? "bg-amber-500/10 text-amber-500"
                                    : "bg-red-500/10 text-red-500"
                              }`}
                            >
                              {device.risk}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Block Device</DropdownMenuItem>
                                <DropdownMenuItem>Scan Device</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Port Layout Panel */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Port Layout</CardTitle>
                <CardDescription className="text-zinc-400">Network switch port status</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="status">
                  <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
                    <TabsTrigger value="status">Status</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  <TabsContent value="status" className="mt-4">
                    <div className="grid grid-cols-4 gap-2">
                      {ports.map((port) => (
                        <div
                          key={port.id}
                          className={`flex aspect-square flex-col items-center justify-center rounded-md border p-2 text-xs ${
                            port.status === "active"
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                              : port.status === "warning"
                                ? "border-amber-500/20 bg-amber-500/10 text-amber-500"
                                : "border-zinc-800 bg-zinc-800/50 text-zinc-500"
                          }`}
                        >
                          <Ethernet
                            className={`mb-1 h-5 w-5 ${
                              port.status === "active"
                                ? "text-emerald-500"
                                : port.status === "warning"
                                  ? "text-amber-500"
                                  : "text-zinc-500"
                            }`}
                          />
                          <span className="font-medium">{port.name}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="details">
                    <div className="rounded-md border border-zinc-800">
                      <Table>
                        <TableHeader className="bg-zinc-800/50">
                          <TableRow className="hover:bg-zinc-800/70 border-zinc-800">
                            <TableHead className="text-zinc-400">Port</TableHead>
                            <TableHead className="text-zinc-400">Status</TableHead>
                            <TableHead className="text-zinc-400">Device</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ports.map((port) => (
                            <TableRow key={port.id} className="hover:bg-zinc-800/50 border-zinc-800">
                              <TableCell className="font-medium text-white">{port.name}</TableCell>
                              <TableCell>
                                <Badge
                                  className={`${
                                    port.status === "active"
                                      ? "bg-emerald-500/10 text-emerald-500"
                                      : port.status === "warning"
                                        ? "bg-amber-500/10 text-amber-500"
                                        : "bg-zinc-800 text-zinc-400"
                                  }`}
                                >
                                  {port.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-zinc-400">{port.device}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}