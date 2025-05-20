"use client"

import type React from "react"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowUpDown,
  Bell,
  ChevronDown,
  Clock,
  Cpu,
  Database,
  Download,
  Filter,
  HardDrive,
  Laptop,
  Menu,
  MoreHorizontal,
  NetworkIcon as Ethernet,
  Plus,
  RefreshCw,
  Search,
  Server,
  Shield,
  Smartphone,
  Tablet,
  Wifi,
  X,
} from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type NavItem = {
  name: string
  icon: React.ElementType
  href: string
  alert?: number
}

const navItems: NavItem[] = [
  { name: "Dashboard", icon: HardDrive, href: "/" },
  { name: "Devices", icon: Laptop, href: "/devices", alert: 3 },
  { name: "Network", icon: Ethernet, href: "#" },
  { name: "Threats", icon: AlertTriangle, href: "#", alert: 5 },
  { name: "Firewall", icon: Shield, href: "#" },
]

type Device = {
  id: string
  name: string
  ip: string
  mac: string
  type: "Server" | "Workstation" | "Mobile" | "IoT" | "Network" | "Tablet"
  os?: string
  status: "Online" | "Offline" | "Warning"
  lastSeen: string
  risk: "Low" | "Medium" | "High"
  location?: string
  owner?: string
  manufacturer?: string
  model?: string
  firstSeen: string
  trafficIn: number
  trafficOut: number
}

const devices: Device[] = [
  {
    id: "DEV-001",
    name: "Main Server",
    ip: "192.168.1.10",
    mac: "00:1B:44:11:3A:B7",
    type: "Server",
    os: "Ubuntu 22.04 LTS",
    status: "Online",
    lastSeen: "Just now",
    risk: "Low",
    location: "Server Room",
    owner: "IT Department",
    manufacturer: "Dell",
    model: "PowerEdge R740",
    firstSeen: "2023-01-15",
    trafficIn: 1250,
    trafficOut: 860,
  },
  {
    id: "DEV-002",
    name: "Admin Workstation",
    ip: "192.168.1.15",
    mac: "00:1B:44:11:3A:C2",
    type: "Workstation",
    os: "Windows 11 Pro",
    status: "Online",
    lastSeen: "2 mins ago",
    risk: "Low",
    location: "IT Office",
    owner: "John Smith",
    manufacturer: "HP",
    model: "EliteDesk 800 G6",
    firstSeen: "2023-02-10",
    trafficIn: 450,
    trafficOut: 320,
  },
  {
    id: "DEV-003",
    name: "Database Server",
    ip: "192.168.1.20",
    mac: "00:1B:44:11:3A:D5",
    type: "Server",
    os: "CentOS 8",
    status: "Online",
    lastSeen: "Just now",
    risk: "Medium",
    location: "Server Room",
    owner: "IT Department",
    manufacturer: "Dell",
    model: "PowerEdge R640",
    firstSeen: "2023-01-15",
    trafficIn: 980,
    trafficOut: 750,
  },
  {
    id: "DEV-004",
    name: "CEO Laptop",
    ip: "192.168.1.35",
    mac: "00:1B:44:11:3B:F1",
    type: "Mobile",
    os: "macOS Ventura",
    status: "Offline",
    lastSeen: "3 hours ago",
    risk: "High",
    location: "Executive Office",
    owner: "Jane Doe",
    manufacturer: "Apple",
    model: "MacBook Pro 16",
    firstSeen: "2023-03-05",
    trafficIn: 320,
    trafficOut: 280,
  },
  {
    id: "DEV-005",
    name: "IoT Gateway",
    ip: "192.168.1.50",
    mac: "00:1B:44:11:3C:A2",
    type: "IoT",
    os: "Embedded Linux",
    status: "Online",
    lastSeen: "5 mins ago",
    risk: "Medium",
    location: "Operations Floor",
    owner: "Operations",
    manufacturer: "Cisco",
    model: "IoT Gateway 5000",
    firstSeen: "2023-04-20",
    trafficIn: 1800,
    trafficOut: 1650,
  },
  {
    id: "DEV-006",
    name: "Development Server",
    ip: "192.168.1.25",
    mac: "00:1B:44:11:3A:E7",
    type: "Server",
    os: "Ubuntu 20.04 LTS",
    status: "Online",
    lastSeen: "Just now",
    risk: "Low",
    location: "Server Room",
    owner: "Development Team",
    manufacturer: "HP",
    model: "ProLiant DL380 Gen10",
    firstSeen: "2023-02-01",
    trafficIn: 750,
    trafficOut: 680,
  },
  {
    id: "DEV-007",
    name: "Marketing Tablet",
    ip: "192.168.1.72",
    mac: "00:1B:44:11:3D:A8",
    type: "Tablet",
    os: "iPadOS 16",
    status: "Online",
    lastSeen: "10 mins ago",
    risk: "Low",
    location: "Marketing Office",
    owner: "Marketing Team",
    manufacturer: "Apple",
    model: "iPad Pro 12.9",
    firstSeen: "2023-05-15",
    trafficIn: 250,
    trafficOut: 180,
  },
  {
    id: "DEV-008",
    name: "Network Switch",
    ip: "192.168.1.2",
    mac: "00:1B:44:11:3A:01",
    type: "Network",
    status: "Online",
    lastSeen: "Just now",
    risk: "Low",
    location: "Server Room",
    owner: "IT Department",
    manufacturer: "Cisco",
    model: "Catalyst 9300",
    firstSeen: "2023-01-10",
    trafficIn: 8500,
    trafficOut: 8200,
  },
  {
    id: "DEV-009",
    name: "Sales Phone",
    ip: "192.168.1.85",
    mac: "00:1B:44:11:3E:C4",
    type: "Mobile",
    os: "Android 13",
    status: "Warning",
    lastSeen: "15 mins ago",
    risk: "Medium",
    location: "Sales Office",
    owner: "Robert Johnson",
    manufacturer: "Samsung",
    model: "Galaxy S23",
    firstSeen: "2023-06-10",
    trafficIn: 180,
    trafficOut: 150,
  },
  {
    id: "DEV-010",
    name: "Backup Server",
    ip: "192.168.1.30",
    mac: "00:1B:44:11:3A:F9",
    type: "Server",
    os: "Windows Server 2022",
    status: "Online",
    lastSeen: "Just now",
    risk: "Low",
    location: "Server Room",
    owner: "IT Department",
    manufacturer: "Dell",
    model: "PowerEdge R750",
    firstSeen: "2023-01-20",
    trafficIn: 2100,
    trafficOut: 1950,
  },
]

const deviceTypeIcons = {
  Server: <Server className="h-4 w-4 text-blue-500" />,
  Workstation: <Cpu className="h-4 w-4 text-emerald-500" />,
  Mobile: <Smartphone className="h-4 w-4 text-purple-500" />,
  Tablet: <Tablet className="h-4 w-4 text-indigo-500" />,
  IoT: <Database className="h-4 w-4 text-amber-500" />,
  Network: <Ethernet className="h-4 w-4 text-cyan-500" />,
}

const deviceTypeCount = {
  Server: devices.filter((d) => d.type === "Server").length,
  Workstation: devices.filter((d) => d.type === "Workstation").length,
  Mobile: devices.filter((d) => d.type === "Mobile").length,
  Tablet: devices.filter((d) => d.type === "Tablet").length,
  IoT: devices.filter((d) => d.type === "IoT").length,
  Network: devices.filter((d) => d.type === "Network").length,
}

const recentActivity = [
  {
    id: 1,
    device: "CEO Laptop",
    action: "Disconnected from network",
    time: "3 hours ago",
    icon: <Wifi className="h-4 w-4 text-red-500" />,
  },
  {
    id: 2,
    device: "Sales Phone",
    action: "Unusual traffic pattern detected",
    time: "15 mins ago",
    icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  },
  {
    id: 3,
    device: "IoT Gateway",
    action: "Firmware update available",
    time: "30 mins ago",
    icon: <RefreshCw className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 4,
    device: "New Device",
    action: "Connected to network",
    time: "1 hour ago",
    icon: <Plus className="h-4 w-4 text-emerald-500" />,
  },
  {
    id: 5,
    device: "Admin Workstation",
    action: "High CPU usage detected",
    time: "45 mins ago",
    icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  },
]

export default function DevicesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedDevices, setSelectedDevices] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.ip.includes(searchQuery) ||
      device.mac.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectAllDevices = () => {
    if (selectedDevices.length === filteredDevices.length) {
      setSelectedDevices([])
    } else {
      setSelectedDevices(filteredDevices.map((d) => d.id))
    }
  }

  const handleSelectDevice = (id: string) => {
    if (selectedDevices.includes(id)) {
      setSelectedDevices(selectedDevices.filter((deviceId) => deviceId !== id))
    } else {
      setSelectedDevices([...selectedDevices, id])
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
            <span>NetOrb</span>
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
                item.name === "Devices" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
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
                placeholder="Search devices..."
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

        {/* Devices Content */}
        <main className="flex-1 overflow-auto bg-zinc-950 p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Devices</h1>
              <p className="text-sm text-zinc-400">Manage and monitor all devices on your network</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Device
              </Button>
            </div>
          </div>

          {/* Device Stats */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Total Devices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <HardDrive className="mr-2 h-5 w-5 text-emerald-500" />
                  <span className="text-2xl font-bold text-white">{devices.length}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  {devices.filter((d) => d.status === "Online").length} online,{" "}
                  {devices.filter((d) => d.status === "Offline").length} offline,{" "}
                  {devices.filter((d) => d.status === "Warning").length} warning
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">High Risk Devices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-2xl font-bold text-white">
                    {devices.filter((d) => d.risk === "High").length}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Requires immediate attention</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">New Devices (30d)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Plus className="mr-2 h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Last device added 1 hour ago</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Total Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Ethernet className="mr-2 h-5 w-5 text-cyan-500" />
                  <span className="text-2xl font-bold text-white">16.7 GB</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">10.2 GB in, 6.5 GB out</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Device Table */}
            <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-white">Device Inventory</CardTitle>
                  <CardDescription className="text-zinc-400">
                    {filteredDevices.length} devices found
                    {searchQuery && ` matching "${searchQuery}"`}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
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
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>Online</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>Offline</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>Warning</DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>Server</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>Workstation</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>Mobile</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>IoT</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>Network</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px] border-zinc-800 bg-zinc-900 text-zinc-400 focus:ring-emerald-500">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sort by</SelectLabel>
                        <SelectItem value="all">All Devices</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                        <SelectItem value="risk">Risk Level</SelectItem>
                        <SelectItem value="type">Device Type</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-zinc-800">
                  <Table>
                    <TableHeader className="bg-zinc-800/50">
                      <TableRow className="hover:bg-zinc-800/70 border-zinc-800">
                        <TableHead className="w-[30px] text-zinc-400">
                          <Checkbox
                            checked={selectedDevices.length === filteredDevices.length && filteredDevices.length > 0}
                            onCheckedChange={handleSelectAllDevices}
                            aria-label="Select all devices"
                            className="border-zinc-700 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                          />
                        </TableHead>
                        <TableHead className="text-zinc-400">
                          <div className="flex items-center">
                            Device
                            <ArrowUpDown className="ml-1 h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead className="text-zinc-400">IP Address</TableHead>
                        <TableHead className="text-zinc-400">Type</TableHead>
                        <TableHead className="text-zinc-400">Status</TableHead>
                        <TableHead className="text-zinc-400">Risk</TableHead>
                        <TableHead className="text-zinc-400">Last Seen</TableHead>
                        <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDevices.map((device) => (
                        <TableRow key={device.id} className="hover:bg-zinc-800/50 border-zinc-800">
                          <TableCell>
                            <Checkbox
                              checked={selectedDevices.includes(device.id)}
                              onCheckedChange={() => handleSelectDevice(device.id)}
                              aria-label={`Select ${device.name}`}
                              className="border-zinc-700 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                            />
                          </TableCell>
                          <TableCell className="font-medium text-white">
                            <div className="flex items-center gap-2">
                              {deviceTypeIcons[device.type]}
                              <div>
                                <div>{device.name}</div>
                                <div className="text-xs text-zinc-500">{device.mac}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-zinc-400">{device.ip}</TableCell>
                          <TableCell className="text-zinc-400">{device.type}</TableCell>
                          <TableCell>
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
                          </TableCell>
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
                          <TableCell className="text-zinc-400">{device.lastSeen}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Device</DropdownMenuItem>
                                <DropdownMenuItem>Scan Device</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500">Block Device</DropdownMenuItem>
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

            {/* Device Stats and Activity */}
            <div className="flex flex-col gap-6">
              {/* Device Type Distribution */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Device Types</CardTitle>
                  <CardDescription className="text-zinc-400">Distribution by device category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(deviceTypeCount).map(
                      ([type, count]) =>
                        count > 0 && (
                          <div key={type} className="flex items-center">
                            <div className="mr-2">{deviceTypeIcons[type as keyof typeof deviceTypeIcons]}</div>
                            <div className="flex-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">{type}</span>
                                <span className="text-white font-medium">{count}</span>
                              </div>
                              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                                <div
                                  className={`h-full ${
                                    type === "Server"
                                      ? "bg-blue-500"
                                      : type === "Workstation"
                                        ? "bg-emerald-500"
                                        : type === "Mobile"
                                          ? "bg-purple-500"
                                          : type === "Tablet"
                                            ? "bg-indigo-500"
                                            : type === "IoT"
                                              ? "bg-amber-500"
                                              : "bg-cyan-500"
                                  }`}
                                  style={{ width: `${(count / devices.length) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-zinc-400">Latest device events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{activity.device}</p>
                          <p className="text-xs text-zinc-400">{activity.action}</p>
                          <div className="mt-1 flex items-center text-xs text-zinc-500">
                            <Clock className="mr-1 h-3 w-3" />
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
