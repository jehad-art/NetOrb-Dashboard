"use client"

import { useEffect, useState } from "react"

export interface ThreatIssue {
  type: string
  severity: string
  description: string
  category: string
}

export interface ThreatDevice {
  device_ip: string
  issues: ThreatIssue[]
}

export function useThreats(apiBase: string) {
  const [devices, setDevices] = useState<ThreatDevice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${apiBase}/configs`)
      .then((res) => res.json())
      .then((data: any[]) => {
        const mapped = data.map((item) => ({
          device_ip: item.device_ip,
          issues: [...item.analysis?.misconfigurations || [], ...item.analysis?.missing_recommendations || []],
        }))
        setDevices(mapped)
        setLoading(false)
      })
  }, [apiBase])

  return { devices, loading }
}
