'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AreaChart, Area, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis } from "recharts";

const deviceData = [
  { name: 'Router', value: 5 },
  { name: 'Switch', value: 3 },
  { name: 'Firewall', value: 2 },
];

const COLORS = ['#4F46E5', '#22C55E', '#EF4444'];

const securityTrend = [
  { name: 'May 01', score: 62 },
  { name: 'May 05', score: 68 },
  { name: 'May 10', score: 74 },
  { name: 'May 15', score: 81 },
  { name: 'May 19', score: 87 },
];

const dummyDevices = [
  {
    ip: "10.20.51.10",
    hostname: "core-router",
    type: "Router",
    score: 58,
    lastSeen: "2025-05-17",
    misconfigs: ["telnet_enabled", "missing_acl"]
  },
  {
    ip: "10.20.51.11",
    hostname: "access-switch",
    type: "Switch",
    score: 82,
    lastSeen: "2025-05-18",
    misconfigs: []
  }
];

type Device = {
  ip: string;
  hostname: string;
  type: string;
  score: number;
  lastSeen: string;
  misconfigs: string[];
};

export default function Dashboard() {
  const [selected, setSelected] = useState<Device | null>(null);

  const getScoreVariant = (score: number): "default" | "secondary" | "destructive" | "warning" | "success" => {
    if (score < 60) return "destructive";
    if (score < 80) return "warning";
    return "success";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-4">
        <div>
          <div className="mb-6 text-center">
            <div className="text-2xl font-bold">NetOrb</div>
            <div className="text-xs text-gray-400">Network Security</div>
          </div>
          <nav className="space-y-2">
            <Button variant="ghost" className="text-white justify-start w-full">Dashboard</Button>
            <Button variant="ghost" className="text-white justify-start w-full">Devices</Button>
            <Button variant="ghost" className="text-white justify-start w-full">Reports</Button>
            <Button variant="ghost" className="text-white justify-start w-full">Settings</Button>
          </nav>
        </div>
        <div className="text-xs text-gray-500 text-center">© 2025 NetOrb</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto space-y-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <Input placeholder="Search..." className="w-1/4" />
        </div>

        {/* Top Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow rounded-xl">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Device Types</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow rounded-xl col-span-2">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Security Score Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={securityTrend}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#6366F1" fill="#E0E7FF" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Device Table */}
        <Card className="shadow rounded-xl">
          <CardContent className="p-4">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg">Discovered Devices</h3>
              <Input placeholder="Search devices..." className="w-1/3" />
            </div>
            <ScrollArea className="h-[300px]">
              <Table className="min-w-full text-sm">
                <TableHeader className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                  <TableRow>
                    <TableHead>IP</TableHead>
                    <TableHead>Hostname</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyDevices.map((d, index) => (
                    <TableRow key={index} className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition-all">
                      <TableCell>{d.ip}</TableCell>
                      <TableCell>{d.hostname}</TableCell>
                      <TableCell>{d.type}</TableCell>
                      <TableCell>
                        <Badge variant={getScoreVariant(d.score)}>
                          {d.score}%
                        </Badge>
                      </TableCell>
                      <TableCell>{d.lastSeen}</TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => setSelected(d)}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Device Detail Drawer */}
        <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
          <SheetContent className="w-[500px]">
            <SheetHeader>
              <SheetTitle>Device: {selected?.hostname}</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              <p><strong>IP:</strong> {selected?.ip}</p>
              <p><strong>Type:</strong> {selected?.type}</p>
              <p><strong>Security Score:</strong> {selected?.score}%</p>
              <p><strong>Last Seen:</strong> {selected?.lastSeen}</p>
              <div>
                <strong>Misconfigurations:</strong>
                <ul className="list-disc list-inside">
                  {selected?.misconfigs?.length ? selected.misconfigs.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  )) : <li>None</li>}
                </ul>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </main>
    </div>
  );
}
