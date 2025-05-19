import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Device = {
    ip: string;
    hostname: string;
    type: string;
    score: number;
    lastSeen: string;
    misconfigs: string[];
  };
  
  const dummyDevices: Device[] = [
    {
      ip: "10.20.51.10",
      hostname: "core-router",
      type: "Router",
      score: 58,
      lastSeen: "2025-05-17",
      misconfigs: ["telnet_enabled", "missing_acl"],
    },
    {
      ip: "10.20.51.11",
      hostname: "access-switch",
      type: "Switch",
      score: 82,
      lastSeen: "2025-05-18",
      misconfigs: [],
    },
  ];

export default function Dashboard() {
    const [selected, setSelected] = useState<Device | null>(null);

    const getScoreVariant = (score: number): "default" | "secondary" | "destructive" | "warning" | "success" => {
    if (score < 60) return "destructive";
    if (score < 80) return "warning";
    return "success";
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="col-span-2 bg-gray-900 text-white rounded-2xl p-4 h-screen flex flex-col justify-between shadow-lg">
        <div>
          <div className="text-white text-2xl font-bold p-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg mb-6 text-center">
            NetOrb
          </div>
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start text-left px-4 py-2 text-white hover:bg-gray-800">Dashboard</Button>
            <Button variant="ghost" className="justify-start text-left px-4 py-2 text-white hover:bg-gray-800">Devices</Button>
            <Button variant="ghost" className="justify-start text-left px-4 py-2 text-white hover:bg-gray-800">Reports</Button>
            <Button variant="ghost" className="justify-start text-left px-4 py-2 text-white hover:bg-gray-800">Settings</Button>
          </nav>
        </div>
        <div className="text-center text-xs text-gray-400 mt-4">© 2025 NetOrb</div>
      </aside>

      {/* Main Content */}
      <main className="col-span-10 space-y-4">
        <Card className="rounded-2xl shadow-md border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Network Risk Overview</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dummyDevices}>
                <XAxis dataKey="hostname" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md border border-gray-200">
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">Discovered Devices</h3>
              <Input placeholder="Search by IP or hostname..." className="w-1/3" />
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
      </main>

      {/* Device Detail Sheet */}
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
    </div>
  );
}
