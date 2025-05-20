"use client"

import type React from "react"

import { useRef, useState } from "react"
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  Database,
  NetworkIcon as Ethernet,
  Eye,
  Filter,
  Home,
  Laptop,
  Layers,
  Menu,
  Printer,
  RefreshCw,
  Search,
  Server,
  Settings,
  Shield,
  Smartphone,
  Wifi,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  { name: "Architecture", icon: Layers, href: "/architecture" },
  { name: "Threats", icon: AlertTriangle, href: "/threats", alert: 5 },
  { name: "Discovered", icon: Wifi, href: "/discovered", alert: 8 },
  { name: "Firewall", icon: Shield, href: "#" },
]

type DeviceType =
  | "router"
  | "switch"
  | "firewall"
  | "server"
  | "workstation"
  | "printer"
  | "mobile"
  | "iot"
  | "wireless"
  | "storage"

type ConnectionType = "ethernet" | "fiber" | "wireless" | "vpn"

type NetworkDevice = {
  id: string
  name: string
  type: DeviceType
  ip?: string
  status: "online" | "offline" | "warning"
  location?: string
  description?: string
  model?: string
  manufacturer?: string
  connections: Connection[]
  metrics?: {
    cpu?: number
    memory?: number
    traffic?: number
    temperature?: number
  }
}

type Connection = {
  target: string
  type: ConnectionType
  bandwidth?: string
  status: "active" | "inactive" | "degraded"
  metrics?: {
    latency?: number
    packetLoss?: number
    utilization?: number
  }
}

// Network topology data
const networkDevices: NetworkDevice[] = [
  {
    id: "router-1",
    name: "Main Router",
    type: "router",
    ip: "192.168.1.1",
    status: "online",
    location: "Server Room",
    description: "Primary network router",
    model: "Cisco ASR 1001-X",
    manufacturer: "Cisco",
    connections: [
      {
        target: "switch-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.5,
          packetLoss: 0.01,
          utilization: 45,
        },
      },
      {
        target: "firewall-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.3,
          packetLoss: 0,
          utilization: 38,
        },
      },
      {
        target: "switch-2",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.6,
          packetLoss: 0.02,
          utilization: 52,
        },
      },
    ],
    metrics: {
      cpu: 45,
      memory: 38,
      traffic: 750,
      temperature: 42,
    },
  },
  {
    id: "firewall-1",
    name: "Main Firewall",
    type: "firewall",
    ip: "192.168.1.2",
    status: "online",
    location: "Server Room",
    description: "Primary network firewall",
    model: "Palo Alto PA-3260",
    manufacturer: "Palo Alto Networks",
    connections: [
      {
        target: "router-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.3,
          packetLoss: 0,
          utilization: 38,
        },
      },
      {
        target: "switch-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.4,
          packetLoss: 0.01,
          utilization: 42,
        },
      },
    ],
    metrics: {
      cpu: 52,
      memory: 45,
      traffic: 680,
      temperature: 46,
    },
  },
  {
    id: "switch-1",
    name: "Core Switch",
    type: "switch",
    ip: "192.168.1.3",
    status: "online",
    location: "Server Room",
    description: "Core network switch",
    model: "Cisco Catalyst 9500",
    manufacturer: "Cisco",
    connections: [
      {
        target: "router-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.5,
          packetLoss: 0.01,
          utilization: 45,
        },
      },
      {
        target: "firewall-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.4,
          packetLoss: 0.01,
          utilization: 42,
        },
      },
      {
        target: "server-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.2,
          packetLoss: 0,
          utilization: 65,
        },
      },
      {
        target: "server-2",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.2,
          packetLoss: 0,
          utilization: 58,
        },
      },
      {
        target: "storage-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.3,
          packetLoss: 0,
          utilization: 72,
        },
      },
    ],
    metrics: {
      cpu: 38,
      memory: 42,
      traffic: 1250,
      temperature: 38,
    },
  },
  {
    id: "switch-2",
    name: "Office Switch",
    type: "switch",
    ip: "192.168.1.4",
    status: "online",
    location: "Office Area",
    description: "Office area network switch",
    model: "Cisco Catalyst 9300",
    manufacturer: "Cisco",
    connections: [
      {
        target: "router-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.6,
          packetLoss: 0.02,
          utilization: 52,
        },
      },
      {
        target: "workstation-1",
        type: "ethernet",
        bandwidth: "1 Gbps",
        status: "active",
        metrics: {
          latency: 0.8,
          packetLoss: 0.05,
          utilization: 25,
        },
      },
      {
        target: "workstation-2",
        type: "ethernet",
        bandwidth: "1 Gbps",
        status: "active",
        metrics: {
          latency: 0.7,
          packetLoss: 0.03,
          utilization: 32,
        },
      },
      {
        target: "printer-1",
        type: "ethernet",
        bandwidth: "1 Gbps",
        status: "active",
        metrics: {
          latency: 1.2,
          packetLoss: 0.1,
          utilization: 8,
        },
      },
      {
        target: "wireless-1",
        type: "ethernet",
        bandwidth: "1 Gbps",
        status: "active",
        metrics: {
          latency: 0.9,
          packetLoss: 0.08,
          utilization: 45,
        },
      },
    ],
    metrics: {
      cpu: 32,
      memory: 28,
      traffic: 580,
      temperature: 36,
    },
  },
  {
    id: "server-1",
    name: "Web Server",
    type: "server",
    ip: "192.168.1.10",
    status: "online",
    location: "Server Room",
    description: "Primary web server",
    model: "Dell PowerEdge R740",
    manufacturer: "Dell",
    connections: [
      {
        target: "switch-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.2,
          packetLoss: 0,
          utilization: 65,
        },
      },
    ],
    metrics: {
      cpu: 68,
      memory: 72,
      traffic: 450,
      temperature: 52,
    },
  },
  {
    id: "server-2",
    name: "Database Server",
    type: "server",
    ip: "192.168.1.11",
    status: "online",
    location: "Server Room",
    description: "Primary database server",
    model: "Dell PowerEdge R740",
    manufacturer: "Dell",
    connections: [
      {
        target: "switch-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.2,
          packetLoss: 0,
          utilization: 58,
        },
      },
    ],
    metrics: {
      cpu: 75,
      memory: 82,
      traffic: 320,
      temperature: 54,
    },
  },
  {
    id: "storage-1",
    name: "Storage Array",
    type: "storage",
    ip: "192.168.1.12",
    status: "online",
    location: "Server Room",
    description: "Primary storage array",
    model: "Dell EMC Unity 480F",
    manufacturer: "Dell EMC",
    connections: [
      {
        target: "switch-1",
        type: "ethernet",
        bandwidth: "10 Gbps",
        status: "active",
        metrics: {
          latency: 0.3,
          packetLoss: 0,
          utilization: 72,
        },
      },
    ],
    metrics: {
      cpu: 42,
      memory: 65,
      traffic: 850,
      temperature: 48,
    },
  },
  {
    id: "workstation-1",
    name: "Admin Workstation",
    type: "workstation",
    ip: "192.168.1.101",
    status: "online",
    location: "Office Area",
    description: "Administrator workstation",
    model: "Dell OptiPlex 7080",
    manufacturer: "Dell",
    connections: [
      {
        target: "switch-2",
        type: "ethernet",
        bandwidth: "1 Gbps",
        status: "active",
        metrics: {
          latency: 0.8,
          packetLoss: 0.05,
          utilization: 25,
        },
      },
    ],
    metrics: {
      cpu: 35,
      memory: 48,
      traffic: 120,
      temperature: 42,
    },
  },
  {
    id: "workstation-2",
    name: "Developer Workstation",
    type: "workstation",
    ip: "192.168.1.102",
    status: "online",
    location: "Office Area",
    description: "Developer workstation",
    model: "Dell XPS Desktop",
    manufacturer: "Dell",
    connections: [
      {
        target: "switch-2",
        type: "ethernet",
        bandwidth: "1 Gbps",
        status: "active",
        metrics: {
          latency: 0.7,
          packetLoss: 0.03,
          utilization: 32,
        },
      },
    ],
    metrics: {
      cpu: 58,
      memory: 72,
      traffic: 180,
      temperature: 48,
    },
  },
  {
    id: "printer-1",
    name: "Office Printer",
    type: "printer",
    ip: "192.168.1.201",
    status: "online",
    location: "Office Area",
    description: "Shared office printer",
    model: "HP LaserJet Enterprise M507",
    manufacturer: "HP",
    connections: [
      {
        target: "switch-2",
        type: "ethernet",
        bandwidth: "1 Gbps",
        status: "active",
        metrics: {
          latency: 1.2,
          packetLoss: 0.1,
          utilization: 8,
        },
      },
    ],
    metrics: {
      cpu: 12,
      memory: 25,
      traffic: 5,
      temperature: 38,
    },
  },
  {
    id: "wireless-1",
    name: "Office WAP",
    type: "wireless",
    ip: "192.168.1.5",
    status: "online",
    location: "Office Area",
    description: "Office wireless access point",
    model: "Cisco Meraki MR46",
    manufacturer: "Cisco",
    connections: [
      {
        target: "switch-2",
        type: "ethernet",
        bandwidth: "1 Gbps",
        status: "active",
        metrics: {
          latency: 0.9,
          packetLoss: 0.08,
          utilization: 45,
        },
      },
      {
        target: "mobile-1",
        type: "wireless",
        bandwidth: "867 Mbps",
        status: "active",
        metrics: {
          latency: 2.5,
          packetLoss: 0.2,
          utilization: 28,
        },
      },
      {
        target: "iot-1",
        type: "wireless",
        bandwidth: "300 Mbps",
        status: "degraded",
        metrics: {
          latency: 5.8,
          packetLoss: 1.2,
          utilization: 15,
        },
      },
    ],
    metrics: {
      cpu: 45,
      memory: 38,
      traffic: 320,
      temperature: 42,
    },
  },
  {
    id: "mobile-1",
    name: "Executive Tablet",
    type: "mobile",
    ip: "192.168.1.150",
    status: "online",
    location: "Office Area",
    description: "Executive iPad",
    model: "iPad Pro 12.9",
    manufacturer: "Apple",
    connections: [
      {
        target: "wireless-1",
        type: "wireless",
        bandwidth: "867 Mbps",
        status: "active",
        metrics: {
          latency: 2.5,
          packetLoss: 0.2,
          utilization: 28,
        },
      },
    ],
    metrics: {
      cpu: 22,
      memory: 45,
      traffic: 85,
      temperature: 36,
    },
  },
  {
    id: "iot-1",
    name: "Smart Thermostat",
    type: "iot",
    ip: "192.168.1.220",
    status: "warning",
    location: "Office Area",
    description: "Office smart thermostat",
    model: "Nest Learning Thermostat",
    manufacturer: "Google",
    connections: [
      {
        target: "wireless-1",
        type: "wireless",
        bandwidth: "300 Mbps",
        status: "degraded",
        metrics: {
          latency: 5.8,
          packetLoss: 1.2,
          utilization: 15,
        },
      },
    ],
    metrics: {
      cpu: 18,
      memory: 32,
      traffic: 2,
      temperature: 28,
    },
  },
]

// Device type icons mapping
const deviceTypeIcons = {
  router: <Ethernet className="h-full w-full" />,
  switch: <Layers className="h-full w-full" />,
  firewall: <Shield className="h-full w-full" />,
  server: <Server className="h-full w-full" />,
  workstation: <Laptop className="h-full w-full" />,
  printer: <Printer className="h-full w-full" />,
  mobile: <Smartphone className="h-full w-full" />,
  iot: <Database className="h-full w-full" />,
  wireless: <Wifi className="h-full w-full" />,
  storage: <Database className="h-full w-full" />,
}

// Device type colors mapping
const deviceTypeColors = {
  router: "#3b82f6", // blue
  switch: "#10b981", // emerald
  firewall: "#ef4444", // red
  server: "#8b5cf6", // purple
  workstation: "#f59e0b", // amber
  printer: "#6366f1", // indigo
  mobile: "#ec4899", // pink
  iot: "#14b8a6", // teal
  wireless: "#06b6d4", // cyan
  storage: "#a855f7", // violet
}

// Connection type styles mapping
const connectionTypeStyles = {
  ethernet: {
    strokeWidth: 2,
    stroke: "#6b7280", // gray
    strokeDasharray: "",
  },
  fiber: {
    strokeWidth: 3,
    stroke: "#8b5cf6", // purple
    strokeDasharray: "",
  },
  wireless: {
    strokeWidth: 1.5,
    stroke: "#06b6d4", // cyan
    strokeDasharray: "5,5",
  },
  vpn: {
    strokeWidth: 1.5,
    stroke: "#10b981", // emerald
    strokeDasharray: "10,5",
  },
}

export default function ArchitecturePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [deviceTypeFilter, setDeviceTypeFilter] = useState<DeviceType[]>([
    "router",
    "switch",
    "firewall",
    "server",
    "workstation",
    "printer",
    "mobile",
    "iot",
    "wireless",
    "storage",
  ])
  const [connectionTypeFilter, setConnectionTypeFilter] = useState<ConnectionType[]>([
    "ethernet",
    "fiber",
    "wireless",
    "vpn",
  ])

  const svgRef = useRef<SVGSVGElement>(null)

  // Filter devices based on search query and device type filter
  const filteredDevices = networkDevices.filter(
    (device) =>
      deviceTypeFilter.includes(device.type) &&
      (device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.ip?.includes(searchQuery) ||
        device.description?.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Calculate node positions in a radial layout
  const calculateNodePositions = () => {
    const centerX = 500
    const centerY = 400
    const radius = 250

    // Place router at the center
    const routerNode = networkDevices.find((d) => d.type === "router")
    const positions: Record<string, { x: number; y: number }> = {}

    if (routerNode) {
      positions[routerNode.id] = { x: centerX, y: centerY }
    }

    // Place firewall nodes
    const firewallNodes = networkDevices.filter((d) => d.type === "firewall")
    firewallNodes.forEach((node, i) => {
      const angle = (Math.PI * 2 * i) / firewallNodes.length
      positions[node.id] = {
        x: centerX + Math.cos(angle) * (radius * 0.3),
        y: centerY + Math.sin(angle) * (radius * 0.3),
      }
    })

    // Place switch nodes
    const switchNodes = networkDevices.filter((d) => d.type === "switch")
    switchNodes.forEach((node, i) => {
      const angle = (Math.PI * 2 * i) / switchNodes.length
      positions[node.id] = {
        x: centerX + Math.cos(angle) * (radius * 0.6),
        y: centerY + Math.sin(angle) * (radius * 0.6),
      }
    })

    // Group other nodes by their connections to switches
    const remainingNodes = networkDevices.filter(
      (d) => d.type !== "router" && d.type !== "firewall" && d.type !== "switch",
    )

    // Create groups based on which switch they connect to
    const groups: Record<string, NetworkDevice[]> = {}
    switchNodes.forEach((switchNode) => {
      groups[switchNode.id] = []
    })

    remainingNodes.forEach((node) => {
      // Find which switch this node connects to
      const connection = node.connections.find((conn) =>
        switchNodes.some((switchNode) => switchNode.id === conn.target),
      )
      if (connection) {
        groups[connection.target].push(node)
      } else {
        // If no direct connection to a switch, find any connection
        const anyConnection = node.connections[0]
        if (anyConnection && groups[anyConnection.target]) {
          groups[anyConnection.target].push(node)
        }
      }
    })

    // Position nodes in each group around their switch
    Object.entries(groups).forEach(([switchId, nodes]) => {
      const switchPos = positions[switchId]
      if (switchPos && nodes.length > 0) {
        const groupRadius = radius * 0.3
        nodes.forEach((node, i) => {
          const angle = (Math.PI * 2 * i) / nodes.length
          positions[node.id] = {
            x: switchPos.x + Math.cos(angle) * groupRadius,
            y: switchPos.y + Math.sin(angle) * groupRadius,
          }
        })
      }
    })

    return positions
  }

  const nodePositions = calculateNodePositions()

  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button === 0) {
      // Left mouse button
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  // Handle mouse up to stop panning
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle mouse leave to stop panning
  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // Handle zoom in
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2))
  }

  // Handle zoom out
  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5))
  }

  // Handle zoom reset
  const handleZoomReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Toggle device type filter
  const toggleDeviceTypeFilter = (type: DeviceType) => {
    if (deviceTypeFilter.includes(type)) {
      setDeviceTypeFilter(deviceTypeFilter.filter((t) => t !== type))
    } else {
      setDeviceTypeFilter([...deviceTypeFilter, type])
    }
  }

  // Toggle connection type filter
  const toggleConnectionTypeFilter = (type: ConnectionType) => {
    if (connectionTypeFilter.includes(type)) {
      setConnectionTypeFilter(connectionTypeFilter.filter((t) => t !== type))
    } else {
      setConnectionTypeFilter([...connectionTypeFilter, type])
    }
  }

  // Handle device click
  const handleDeviceClick = (device: NetworkDevice) => {
    setSelectedDevice(device)
  }

  // Handle click outside to deselect device
  const handleBackgroundClick = (e: React.MouseEvent<SVGElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedDevice(null)
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
                item.name === "Architecture"
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

        {/* Network Architecture Content */}
        <main className="flex flex-1 overflow-hidden bg-zinc-950">
          {/* Network Map */}
          <div className="relative flex-1 overflow-hidden">
            {/* Controls */}
            <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      onClick={handleZoomIn}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Zoom In</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      onClick={handleZoomOut}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Zoom Out</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      onClick={handleZoomReset}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Reset View</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Separator className="my-1 bg-zinc-800" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Device Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={deviceTypeFilter.includes("router")}
                    onCheckedChange={() => toggleDeviceTypeFilter("router")}
                  >
                    Routers
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={deviceTypeFilter.includes("switch")}
                    onCheckedChange={() => toggleDeviceTypeFilter("switch")}
                  >
                    Switches
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={deviceTypeFilter.includes("firewall")}
                    onCheckedChange={() => toggleDeviceTypeFilter("firewall")}
                  >
                    Firewalls
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={deviceTypeFilter.includes("server")}
                    onCheckedChange={() => toggleDeviceTypeFilter("server")}
                  >
                    Servers
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={deviceTypeFilter.includes("workstation")}
                    onCheckedChange={() => toggleDeviceTypeFilter("workstation")}
                  >
                    Workstations
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={deviceTypeFilter.includes("printer")}
                    onCheckedChange={() => toggleDeviceTypeFilter("printer")}
                  >
                    Printers
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={deviceTypeFilter.includes("mobile")}
                    onCheckedChange={() => toggleDeviceTypeFilter("mobile")}
                  >
                    Mobile Devices
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={deviceTypeFilter.includes("iot")}
                    onCheckedChange={() => toggleDeviceTypeFilter("iot")}
                  >
                    IoT Devices
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={deviceTypeFilter.includes("wireless")}
                    onCheckedChange={() => toggleDeviceTypeFilter("wireless")}
                  >
                    Wireless APs
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={deviceTypeFilter.includes("storage")}
                    onCheckedChange={() => toggleDeviceTypeFilter("storage")}
                  >
                    Storage
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Connection Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={connectionTypeFilter.includes("ethernet")}
                    onCheckedChange={() => toggleConnectionTypeFilter("ethernet")}
                  >
                    Ethernet
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={connectionTypeFilter.includes("fiber")}
                    onCheckedChange={() => toggleConnectionTypeFilter("fiber")}
                  >
                    Fiber
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={connectionTypeFilter.includes("wireless")}
                    onCheckedChange={() => toggleConnectionTypeFilter("wireless")}
                  >
                    Wireless
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={connectionTypeFilter.includes("vpn")}
                    onCheckedChange={() => toggleConnectionTypeFilter("vpn")}
                  >
                    VPN
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Network Map SVG */}
            <svg
              ref={svgRef}
              className="h-full w-full cursor-grab touch-none bg-zinc-950"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onClick={handleBackgroundClick}
            >
              {/* Add SVG filters for glow effects */}

              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                {/* Connections */}
                {filteredDevices.map((device) =>
                  device.connections
                    .filter(
                      (conn) =>
                        connectionTypeFilter.includes(conn.type) && filteredDevices.some((d) => d.id === conn.target),
                    )
                    .map((conn) => {
                      const sourcePos = nodePositions[device.id]
                      const targetPos = nodePositions[conn.target]
                      const style = connectionTypeStyles[conn.type]

                      if (!sourcePos || !targetPos) return null

                      return (
                        <line
                          key={`${device.id}-${conn.target}`}
                          x1={sourcePos.x}
                          y1={sourcePos.y}
                          x2={targetPos.x}
                          y2={targetPos.y}
                          strokeWidth={style.strokeWidth}
                          stroke={style.stroke}
                          strokeDasharray={style.strokeDasharray}
                          opacity={conn.status === "degraded" ? 0.5 : 1}
                          className={conn.status === "inactive" ? "animate-pulse" : ""}
                        />
                      )
                    }),
                )}

                {/* Devices */}
                {filteredDevices.map((device) => {
                  const pos = nodePositions[device.id]
                  if (!pos) return null

                  return (
                    <g
                      key={device.id}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeviceClick(device)
                      }}
                      className="cursor-pointer"
                    >
                      {/* Device background circle with glow on hover */}
                      <circle
                        r={25}
                        fill={deviceTypeColors[device.type]}
                        opacity={0.2}
                        className={`${device.status === "warning" ? "animate-pulse" : ""}`}
                      />

                      {/* Device icon background */}
                      <circle
                        r={20}
                        fill={deviceTypeColors[device.type]}
                        className={`${
                          selectedDevice?.id === device.id ? "stroke-white stroke-2" : ""
                        } transition-all duration-200`}
                        opacity={device.status === "offline" ? 0.5 : 1}
                      />

                      {/* Device icon */}
                      <g
                        transform="scale(0.6) translate(-16, -16)"
                        className="text-zinc-950"
                        opacity={device.status === "offline" ? 0.5 : 1}
                      >
                        {deviceTypeIcons[device.type]}
                      </g>

                      {/* Device label */}
                      <text
                        y={35}
                        textAnchor="middle"
                        className="fill-zinc-300 text-xs font-medium"
                        pointerEvents="none"
                      >
                        {device.name}
                      </text>
                    </g>
                  )
                })}
              </g>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 rounded-md border border-zinc-800 bg-zinc-900/80 p-3 backdrop-blur-sm">
              <h4 className="mb-2 text-sm font-medium text-white">Legend</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: deviceTypeColors.router }}></div>
                  <span className="text-xs text-zinc-400">Router</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: deviceTypeColors.switch }}></div>
                  <span className="text-xs text-zinc-400">Switch</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: deviceTypeColors.firewall }}></div>
                  <span className="text-xs text-zinc-400">Firewall</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: deviceTypeColors.server }}></div>
                  <span className="text-xs text-zinc-400">Server</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: deviceTypeColors.workstation }}></div>
                  <span className="text-xs text-zinc-400">Workstation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: deviceTypeColors.wireless }}></div>
                  <span className="text-xs text-zinc-400">Wireless</span>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6" style={{ backgroundColor: connectionTypeStyles.ethernet.stroke }}></div>
                  <span className="text-xs text-zinc-400">Ethernet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-0.5 w-6"
                    style={{
                      backgroundColor: connectionTypeStyles.wireless.stroke,
                      borderTop: `1px dashed ${connectionTypeStyles.wireless.stroke}`,
                    }}
                  ></div>
                  <span className="text-xs text-zinc-400">Wireless</span>
                </div>
              </div>
            </div>

            {/* Zoom indicator */}
            <div className="absolute bottom-4 right-4 rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1 backdrop-blur-sm">
              <span className="text-xs text-zinc-400">Zoom: {Math.round(zoom * 100)}%</span>
            </div>
          </div>

          {/* Device Details Panel */}
          {selectedDevice && (
            <div className="w-96 overflow-y-auto border-l border-zinc-800 bg-zinc-900 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">{selectedDevice.name}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white"
                  onClick={() => setSelectedDevice(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: deviceTypeColors[selectedDevice.type] }}
                >
                  {deviceTypeIcons[selectedDevice.type]}
                </div>
                <div>
                  <Badge
                    className={`${
                      selectedDevice.status === "online"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : selectedDevice.status === "warning"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-zinc-500/10 text-zinc-500"
                    }`}
                  >
                    {selectedDevice.status.charAt(0).toUpperCase() + selectedDevice.status.slice(1)}
                  </Badge>
                  <p className="text-sm text-zinc-400">
                    {selectedDevice.type.charAt(0).toUpperCase() + selectedDevice.type.slice(1)}
                  </p>
                </div>
              </div>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="connections">Connections</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4 space-y-4">
                  <div className="rounded-md border border-zinc-800 bg-zinc-900 p-3">
                    <h3 className="mb-2 text-sm font-medium text-white">Device Information</h3>
                    <div className="space-y-2 text-sm">
                      {selectedDevice.ip && (
                        <div className="flex justify-between">
                          <span className="text-zinc-500">IP Address:</span>
                          <span className="text-zinc-300">{selectedDevice.ip}</span>
                        </div>
                      )}
                      {selectedDevice.location && (
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Location:</span>
                          <span className="text-zinc-300">{selectedDevice.location}</span>
                        </div>
                      )}
                      {selectedDevice.model && (
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Model:</span>
                          <span className="text-zinc-300">{selectedDevice.model}</span>
                        </div>
                      )}
                      {selectedDevice.manufacturer && (
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Manufacturer:</span>
                          <span className="text-zinc-300">{selectedDevice.manufacturer}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedDevice.description && (
                    <div className="rounded-md border border-zinc-800 bg-zinc-900 p-3">
                      <h3 className="mb-2 text-sm font-medium text-white">Description</h3>
                      <p className="text-sm text-zinc-400">{selectedDevice.description}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="connections" className="mt-4 space-y-4">
                  {selectedDevice.connections.length > 0 ? (
                    selectedDevice.connections.map((conn) => {
                      const targetDevice = networkDevices.find((d) => d.id === conn.target)
                      if (!targetDevice) return null

                      return (
                        <div key={conn.target} className="rounded-md border border-zinc-800 bg-zinc-900 p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="flex h-6 w-6 items-center justify-center rounded-full"
                                style={{ backgroundColor: deviceTypeColors[targetDevice.type] }}
                              >
                                {deviceTypeIcons[targetDevice.type]}
                              </div>
                              <h3 className="text-sm font-medium text-white">{targetDevice.name}</h3>
                            </div>
                            <Badge
                              className={`${
                                conn.status === "active"
                                  ? "bg-emerald-500/10 text-emerald-500"
                                  : conn.status === "degraded"
                                    ? "bg-amber-500/10 text-amber-500"
                                    : "bg-zinc-500/10 text-zinc-500"
                              }`}
                            >
                              {conn.status.charAt(0).toUpperCase() + conn.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Connection Type:</span>
                              <span className="text-zinc-300">
                                {conn.type.charAt(0).toUpperCase() + conn.type.slice(1)}
                              </span>
                            </div>
                            {conn.bandwidth && (
                              <div className="flex justify-between">
                                <span className="text-zinc-500">Bandwidth:</span>
                                <span className="text-zinc-300">{conn.bandwidth}</span>
                              </div>
                            )}
                            {conn.metrics?.latency !== undefined && (
                              <div className="flex justify-between">
                                <span className="text-zinc-500">Latency:</span>
                                <span className="text-zinc-300">{conn.metrics.latency} ms</span>
                              </div>
                            )}
                            {conn.metrics?.packetLoss !== undefined && (
                              <div className="flex justify-between">
                                <span className="text-zinc-500">Packet Loss:</span>
                                <span className="text-zinc-300">{conn.metrics.packetLoss}%</span>
                              </div>
                            )}
                            {conn.metrics?.utilization !== undefined && (
                              <div className="flex justify-between">
                                <span className="text-zinc-500">Utilization:</span>
                                <span className="text-zinc-300">{conn.metrics.utilization}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed border-zinc-800 p-4 text-center">
                      <p className="text-sm text-zinc-400">No connections found for this device</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="metrics" className="mt-4 space-y-4">
                  {selectedDevice.metrics ? (
                    <>
                      {selectedDevice.metrics.cpu !== undefined && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-zinc-400">CPU Usage</Label>
                            <span className="text-sm text-zinc-300">{selectedDevice.metrics.cpu}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                            <div
                              className={`h-full ${
                                selectedDevice.metrics.cpu > 80
                                  ? "bg-red-500"
                                  : selectedDevice.metrics.cpu > 60
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                              }`}
                              style={{ width: `${selectedDevice.metrics.cpu}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {selectedDevice.metrics.memory !== undefined && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-zinc-400">Memory Usage</Label>
                            <span className="text-sm text-zinc-300">{selectedDevice.metrics.memory}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                            <div
                              className={`h-full ${
                                selectedDevice.metrics.memory > 80
                                  ? "bg-red-500"
                                  : selectedDevice.metrics.memory > 60
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                              }`}
                              style={{ width: `${selectedDevice.metrics.memory}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {selectedDevice.metrics.traffic !== undefined && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-zinc-400">Network Traffic</Label>
                            <span className="text-sm text-zinc-300">{selectedDevice.metrics.traffic} Mbps</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${Math.min((selectedDevice.metrics.traffic / 1000) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {selectedDevice.metrics.temperature !== undefined && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-zinc-400">Temperature</Label>
                            <span className="text-sm text-zinc-300">{selectedDevice.metrics.temperature}°C</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                            <div
                              className={`h-full ${
                                selectedDevice.metrics.temperature > 60
                                  ? "bg-red-500"
                                  : selectedDevice.metrics.temperature > 50
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                              }`}
                              style={{ width: `${Math.min((selectedDevice.metrics.temperature / 80) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed border-zinc-800 p-4 text-center">
                      <p className="text-sm text-zinc-400">No metrics available for this device</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
