"use client"
import axios from "axios"
import type React from "react"

import { useState } from "react"
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  ChevronRight,
  Clock,
  NetworkIcon as Ethernet,
  Filter,
  Home,
  Laptop,
  Lock,
  Menu,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Save,
  Search,
  Shield,
  User,
  Wifi,
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
import { Label } from "@/components/ui/label"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"


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
  { name: "Discovered", icon: Wifi, href: "/discovered", alert: 8 },
  { name: "Firewall", icon: Shield, href: "#" },
]

type DiscoveredDevice = {
  id: string
  ip: string
  mac: string
  firstSeen: string
  lastSeen: string
  ports: string[]
  signalStrength: number
  manufacturer?: string
  confidence: "High" | "Medium" | "Low"
  status: "New" | "Seen Before" | "Suspicious"
}

const discoveredDevices: DiscoveredDevice[] = [
  {
    id: "DISC-001",
    ip: "10.20.51.10",
    mac: "00:1B:44:11:3A:B7",
    firstSeen: "2025-05-20T08:30:00Z",
    lastSeen: "2025-05-20T10:45:00Z",
    ports: ["22", "80", "443"],
    signalStrength: 85,
    manufacturer: "Dell Inc.",
    confidence: "High",
    status: "New",
  },
  {
    id: "DISC-002",
    ip: "10.10.10.51",
    mac: "00:1B:44:11:3B:C8",
    firstSeen: "2025-05-20T09:15:00Z",
    lastSeen: "2025-05-20T10:30:00Z",
    ports: ["23", "80","443"],
    signalStrength: 72,
    confidence: "Medium",
    status: "Suspicious",
  },
  {
    id: "DISC-003",
    ip: "10.10.10.52",
    mac: "00:1B:44:11:3C:D9",
    firstSeen: "2025-05-19T14:20:00Z",
    lastSeen: "2025-05-20T10:40:00Z",
    ports: ["80", "443", "23"],
    signalStrength: 90,
    manufacturer: "Cisco Systems",
    confidence: "High",
    status: "Seen Before",
  },
  {
    id: "DISC-004",
    ip: "10.10.10.53",
    mac: "00:1B:44:11:3D:E0",
    firstSeen: "2025-05-20T10:05:00Z",
    lastSeen: "2025-05-20T10:45:00Z",
    ports: ["80", "443", "23"],
    signalStrength: 65,
    confidence: "Low",
    status: "New",
  },
  {
    id: "DISC-005",
    ip: "192.168.1.124",
    mac: "00:1B:44:11:3E:F1",
    firstSeen: "2023-05-20T07:30:00Z",
    lastSeen: "2023-05-20T10:15:00Z",
    ports: ["22", "80", "443", "8443"],
    signalStrength: 88,
    manufacturer: "Apple Inc.",
    confidence: "High",
    status: "New",
  },
  {
    id: "DISC-006",
    ip: "192.168.1.125",
    mac: "00:1B:44:11:3F:G2",
    firstSeen: "2023-05-18T16:45:00Z",
    lastSeen: "2023-05-20T09:30:00Z",
    ports: ["22", "23"],
    signalStrength: 70,
    confidence: "Medium",
    status: "Suspicious",
  },
  {
    id: "DISC-007",
    ip: "192.168.1.126",
    mac: "00:1B:44:11:40:H3",
    firstSeen: "2023-05-20T08:15:00Z",
    lastSeen: "2023-05-20T10:40:00Z",
    ports: ["80", "443", "3306"],
    signalStrength: 82,
    manufacturer: "HP Inc.",
    confidence: "High",
    status: "New",
  },
  {
    id: "DISC-008",
    ip: "192.168.1.127",
    mac: "00:1B:44:11:41:I4",
    firstSeen: "2023-05-19T11:20:00Z",
    lastSeen: "2023-05-20T10:25:00Z",
    ports: ["22", "80"],
    signalStrength: 75,
    confidence: "Medium",
    status: "Seen Before",
  },
]

type DeviceFormData = {
  deviceType: string
  protocol: string
  username: string
  password: string
}

export default function DiscoveredPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedDevices, setExpandedDevices] = useState<string[]>([])
  const [formData, setFormData] = useState<Record<string, DeviceFormData>>({})
  const [statusFilter, setStatusFilter] = useState<string[]>(["New", "Seen Before", "Suspicious"])

  // Initialize form data for each device
  useState(() => {
    const initialFormData: Record<string, DeviceFormData> = {}
    discoveredDevices.forEach((device) => {
      initialFormData[device.id] = {
        deviceType: "",
        protocol: "",
        username: "",
        password: "",
      }
    })
    setFormData(initialFormData)
  })

  // Filter devices based on search query and status filter
  const filteredDevices = discoveredDevices.filter(
    (device) =>
      (device.ip.includes(searchQuery) ||
        device.mac.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (device.manufacturer && device.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      statusFilter.includes(device.status),
  )

  // Toggle device expansion
  const toggleDeviceExpansion = (deviceId: string) => {
    if (expandedDevices.includes(deviceId)) {
      setExpandedDevices(expandedDevices.filter((id) => id !== deviceId))
    } else {
      setExpandedDevices([...expandedDevices, deviceId])
    }
  }

  // Toggle status filter
  const toggleStatusFilter = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter((s) => s !== status))
    } else {
      setStatusFilter([...statusFilter, status])
    }
  }

  // Handle form input change
  const handleInputChange = (deviceId: string, field: keyof DeviceFormData, value: string) => {
    setFormData({
      ...formData,
      [deviceId]: {
        ...formData[deviceId],
        [field]: value,
      },
    })
  }

  // Handle form submission
  const handleSubmit = async (deviceId: string) => {
    const device = discoveredDevices.find((d) => d.id === deviceId);
    const deviceData = formData[deviceId];
  
    if (!deviceData.deviceType || !deviceData.protocol) {
      toast({
        title: "Validation Error",
        description: "Device type and protocol are required",
        variant: "destructive",
      });
      return;
    }
  
    const updatedDevice = {
      ip: device?.ip,
      device_type: deviceData.deviceType,
      credentials: {
        username: deviceData.username,
        password: deviceData.password,
        protocol: deviceData.protocol,
      },
    };
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/devices/${device?.ip}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDevice),
      });
  
      if (res.ok) {
        toast({
          title: "Device Added",
          description: `Device ${device?.ip} has been successfully added.`,
        });
      } else {
        const errorText = await res.text();
        toast({
          title: "Backend Error",
          description: errorText,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Network Error",
        description: err.message || "Unknown error",
        variant: "destructive",
      });
    }
  
    // Reset form and close expansion
    setFormData({
      ...formData,
      [deviceId]: {
        deviceType: "",
        protocol: "",
        username: "",
        password: "",
      },
    });
    setExpandedDevices(expandedDevices.filter((id) => id !== deviceId));
  };

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
                item.name === "Discovered"
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

        {/* Discovered Devices Content */}
        <main className="flex-1 overflow-auto bg-zinc-950 p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Discovered Devices</h1>
              <p className="text-sm text-zinc-400">
                {filteredDevices.length} unknown devices discovered on your network
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Rescan
              </Button>
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
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("New")}
                    onCheckedChange={() => toggleStatusFilter("New")}
                  >
                    New
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("Seen Before")}
                    onCheckedChange={() => toggleStatusFilter("Seen Before")}
                  >
                    Seen Before
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("Suspicious")}
                    onCheckedChange={() => toggleStatusFilter("Suspicious")}
                  >
                    Suspicious
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Device
              </Button>
            </div>
          </div>

          {/* Status Cards */}
          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Total Discovered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Wifi className="mr-2 h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold text-white">{discoveredDevices.length}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Unknown devices on network</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">New Devices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Plus className="mr-2 h-5 w-5 text-emerald-500" />
                  <span className="text-2xl font-bold text-white">
                    {discoveredDevices.filter((d) => d.status === "New").length}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">First time seen</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Suspicious</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                  <span className="text-2xl font-bold text-white">
                    {discoveredDevices.filter((d) => d.status === "Suspicious").length}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Potential security risks</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-sm font-medium">Last Scan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-purple-500" />
                  <span className="text-2xl font-bold text-white">10:45 AM</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Today, May 20, 2023</p>
              </CardContent>
            </Card>
          </div>

          {/* Discovered Devices */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Unknown Devices</CardTitle>
              <CardDescription className="text-zinc-400">
                Configure and add these devices to your network inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full max-w-xs grid-cols-2 bg-zinc-800">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="mt-4">
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
                        className="mb-4 rounded-lg border border-zinc-800 bg-zinc-900/50"
                      >
                        <CollapsibleTrigger asChild>
                          <div className="flex cursor-pointer items-center justify-between p-4 hover:bg-zinc-800/50">
                            <div className="flex items-center gap-3">
                              {expandedDevices.includes(device.id) ? (
                                <ChevronDown className="h-5 w-5 text-zinc-400" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-zinc-400" />
                              )}
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                  device.status === "New"
                                    ? "bg-emerald-500/10 text-emerald-500"
                                    : device.status === "Suspicious"
                                      ? "bg-amber-500/10 text-amber-500"
                                      : "bg-blue-500/10 text-blue-500"
                                }`}
                              >
                                <Wifi className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{device.ip}</h3>
                                <p className="text-xs text-zinc-400">{device.mac}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="hidden text-right sm:block">
                                <p className="text-sm text-zinc-300">Signal: {device.signalStrength}%</p>
                                <p className="text-xs text-zinc-500">
                                  First seen: {new Date(device.firstSeen).toLocaleString()}
                                </p>
                              </div>
                              <Badge
                                className={`${
                                  device.status === "New"
                                    ? "bg-emerald-500/10 text-emerald-500"
                                    : device.status === "Suspicious"
                                      ? "bg-amber-500/10 text-amber-500"
                                      : "bg-blue-500/10 text-blue-500"
                                }`}
                              >
                                {device.status}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`${
                                  device.confidence === "High"
                                    ? "border-emerald-500 text-emerald-500"
                                    : device.confidence === "Medium"
                                      ? "border-amber-500 text-amber-500"
                                      : "border-zinc-500 text-zinc-500"
                                }`}
                              >
                                {device.confidence} Confidence
                              </Badge>
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="space-y-4 p-4 pt-0">
                            <Separator className="bg-zinc-800" />

                            {/* Device Information */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                              <div className="rounded-md bg-zinc-800/30 p-3">
                                <h5 className="mb-1 text-xs font-medium uppercase text-zinc-500">IP Address</h5>
                                <p className="text-sm text-zinc-300">{device.ip}</p>
                              </div>
                              <div className="rounded-md bg-zinc-800/30 p-3">
                                <h5 className="mb-1 text-xs font-medium uppercase text-zinc-500">MAC Address</h5>
                                <p className="text-sm text-zinc-300">{device.mac}</p>
                              </div>
                              <div className="rounded-md bg-zinc-800/30 p-3">
                                <h5 className="mb-1 text-xs font-medium uppercase text-zinc-500">Open Ports</h5>
                                <p className="text-sm text-zinc-300">{device.ports.join(", ")}</p>
                              </div>
                              <div className="rounded-md bg-zinc-800/30 p-3">
                                <h5 className="mb-1 text-xs font-medium uppercase text-zinc-500">Manufacturer</h5>
                                <p className="text-sm text-zinc-300">{device.manufacturer || "Unknown"}</p>
                              </div>
                            </div>

                            {/* Device Configuration Form */}
                            <div className="rounded-md border border-zinc-800 bg-zinc-900 p-4">
                              <h4 className="mb-4 text-lg font-medium text-white">Configure Device</h4>
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                  <Label htmlFor={`device-type-${device.id}`} className="text-zinc-400">
                                    Device Type
                                  </Label>
                                  <Select
                                    value={formData[device.id]?.deviceType || ""}
                                    onValueChange={(value) => handleInputChange(device.id, "deviceType", value)}
                                  >
                                    <SelectTrigger
                                      id={`device-type-${device.id}`}
                                      className="border-zinc-800 bg-zinc-900 text-white focus:ring-emerald-500"
                                    >
                                      <SelectValue placeholder="Select device type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Device Types</SelectLabel>
                                        <SelectItem value="server">Server</SelectItem>
                                        <SelectItem value="workstation">Workstation</SelectItem>
                                        <SelectItem value="mobile">Mobile Device</SelectItem>
                                        <SelectItem value="iot">IoT Device</SelectItem>
                                        <SelectItem value="network">Network Equipment</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`protocol-${device.id}`} className="text-zinc-400">
                                    Protocol
                                  </Label>
                                  <Select
                                    value={formData[device.id]?.protocol || ""}
                                    onValueChange={(value) => handleInputChange(device.id, "protocol", value)}
                                  >
                                    <SelectTrigger
                                      id={`protocol-${device.id}`}
                                      className="border-zinc-800 bg-zinc-900 text-white focus:ring-emerald-500"
                                    >
                                      <SelectValue placeholder="Select protocol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Protocols</SelectLabel>
                                        <SelectItem value="ssh">SSH</SelectItem>
                                        <SelectItem value="http">HTTP</SelectItem>
                                        <SelectItem value="https">HTTPS</SelectItem>
                                        <SelectItem value="telnet">Telnet</SelectItem>
                                        <SelectItem value="snmp">SNMP</SelectItem>
                                        <SelectItem value="rdp">RDP</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`username-${device.id}`} className="text-zinc-400">
                                    Username
                                  </Label>
                                  <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                    <Input
                                      id={`username-${device.id}`}
                                      placeholder="Enter username"
                                      className="border-zinc-800 bg-zinc-900 pl-9 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                                      value={formData[device.id]?.username || ""}
                                      onChange={(e) => handleInputChange(device.id, "username", e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`password-${device.id}`} className="text-zinc-400">
                                    Password
                                  </Label>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                    <Input
                                      id={`password-${device.id}`}
                                      type="password"
                                      placeholder="Enter password"
                                      className="border-zinc-800 bg-zinc-900 pl-9 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                                      value={formData[device.id]?.password || ""}
                                      onChange={(e) => handleInputChange(device.id, "password", e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 flex justify-end">
                                <Button
                                  onClick={() => handleSubmit(device.id)}
                                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                                >
                                  <Save className="mr-2 h-4 w-4" />
                                  Add Device
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))
                  )}
                </TabsContent>
                <TabsContent value="grid" className="mt-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredDevices.map((device) => (
                      <Card key={device.id} className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge
                              className={`${
                                device.status === "New"
                                  ? "bg-emerald-500/10 text-emerald-500"
                                  : device.status === "Suspicious"
                                    ? "bg-amber-500/10 text-amber-500"
                                    : "bg-blue-500/10 text-blue-500"
                              }`}
                            >
                              {device.status}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Block Device</DropdownMenuItem>
                                <DropdownMenuItem>Ignore Device</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <CardTitle className="text-white">{device.ip}</CardTitle>
                          <CardDescription className="text-zinc-400">{device.mac}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-500">Signal Strength</span>
                              <span className="text-xs text-zinc-300">{device.signalStrength}%</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                              <div
                                className={`h-full ${
                                  device.signalStrength > 80
                                    ? "bg-emerald-500"
                                    : device.signalStrength > 50
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${device.signalStrength}%` }}
                              />
                            </div>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Ports:</span>
                              <span className="text-zinc-300">{device.ports.join(", ")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">First Seen:</span>
                              <span className="text-zinc-300">{new Date(device.firstSeen).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Manufacturer:</span>
                              <span className="text-zinc-300">{device.manufacturer || "Unknown"}</span>
                            </div>
                          </div>
                          <Button
                            className="mt-4 w-full bg-emerald-600 text-white hover:bg-emerald-700"
                            onClick={() => toggleDeviceExpansion(device.id)}
                          >
                            Configure Device
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
