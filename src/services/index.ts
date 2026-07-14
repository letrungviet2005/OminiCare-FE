import {
  mockStats,
  mockResidents,
  mockAlerts,
  mockFamilies,
  mockDevices,
  mockActivityData,
  mockHealthMetrics,
  mockMonitoringFeed,
} from './mockData'
import type {
  DashboardStats,
  Resident,
  Alert,
  ActivityData,
  HealthMetric,
  MonitoringFeed,
  AlertListParams,
  PaginatedResult,
} from '@/types'
import type { DeviceRef, FamilyRef } from './mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    await delay(300)
    return mockStats
  },

  async getActivityData(): Promise<ActivityData[]> {
    await delay(400)
    return mockActivityData
  },

  async getHealthMetrics(): Promise<HealthMetric[]> {
    await delay(400)
    return mockHealthMetrics
  },
}

export const residentService = {
  async getAll(): Promise<Resident[]> {
    await delay(300)
    return mockResidents
  },

  async getById(id: string): Promise<Resident | undefined> {
    await delay(200)
    return mockResidents.find((r) => r.id === id)
  },
}

export const familyService = {
  async getAll(): Promise<FamilyRef[]> {
    await delay(150)
    return mockFamilies
  },
  async getById(id: string): Promise<FamilyRef | undefined> {
    await delay(100)
    return mockFamilies.find((f) => f.id === id)
  },
}

export const deviceService = {
  async getAll(): Promise<DeviceRef[]> {
    await delay(150)
    return mockDevices
  },
  async getById(id: string): Promise<DeviceRef | undefined> {
    await delay(100)
    return mockDevices.find((d) => d.id === id)
  },
}

const matchesSearch = (alert: Alert, q: string) => {
  if (!q) return true
  const needle = q.toLowerCase()
  return (
    alert.title.toLowerCase().includes(needle) ||
    alert.message.toLowerCase().includes(needle) ||
    alert.elderName.toLowerCase().includes(needle) ||
    alert.familyName.toLowerCase().includes(needle) ||
    alert.deviceName.toLowerCase().includes(needle) ||
    alert.id.toLowerCase().includes(needle)
  )
}

export const alertService = {
  async getAll(): Promise<Alert[]> {
    await delay(300)
    return mockAlerts
  },

  async getById(id: string): Promise<Alert | undefined> {
    await delay(200)
    return mockAlerts.find((a) => a.id === id)
  },

  async list(params: AlertListParams = {}): Promise<PaginatedResult<Alert>> {
    await delay(250)
    const {
      page = 1,
      pageSize = 8,
      search = '',
      type = 'all',
      riskLevel = 'all',
      severity = 'all',
      status = 'all',
    } = params

    let filtered = [...mockAlerts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    if (search) filtered = filtered.filter((a) => matchesSearch(a, search))
    if (type !== 'all') filtered = filtered.filter((a) => a.type === type)
    if (riskLevel !== 'all') filtered = filtered.filter((a) => a.riskLevel === riskLevel)
    if (severity !== 'all') filtered = filtered.filter((a) => a.severity === severity)
    if (status !== 'all') filtered = filtered.filter((a) => a.status === status)

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const safePage = Math.min(Math.max(1, page), totalPages)
    const start = (safePage - 1) * pageSize
    const data = filtered.slice(start, start + pageSize)

    return { data, total, page: safePage, pageSize, totalPages }
  },

  async acknowledge(id: string, actor = 'Bạn'): Promise<Alert | undefined> {
    await delay(200)
    const alert = mockAlerts.find((a) => a.id === id)
    if (alert && !alert.acknowledgedAt) {
      const now = new Date().toISOString()
      alert.acknowledgedAt = now
      alert.acknowledgedBy = actor
      alert.status = 'in_progress'
      alert.actions = [
        ...(alert.actions || []),
        { id: `a-${Date.now()}`, label: 'Xác nhận tiếp nhận', timestamp: now, actor },
      ]
    }
    return alert
  },

  async resolve(id: string, actor = 'Bạn'): Promise<Alert | undefined> {
    await delay(200)
    const alert = mockAlerts.find((a) => a.id === id)
    if (alert) {
      const now = new Date().toISOString()
      alert.resolvedAt = now
      alert.resolvedBy = actor
      alert.status = 'resolved'
      alert.actions = [
        ...(alert.actions || []),
        { id: `a-${Date.now()}`, label: 'Đóng cảnh báo', timestamp: now, actor },
      ]
    }
    return alert
  },

  async getStats() {
    await delay(200)
    return {
      total: mockAlerts.length,
      critical: mockAlerts.filter((a) => a.severity === 'critical').length,
      warning: mockAlerts.filter((a) => a.severity === 'warning').length,
      info: mockAlerts.filter((a) => a.severity === 'info').length,
      high: mockAlerts.filter((a) => a.riskLevel === 'HIGH').length,
      medium: mockAlerts.filter((a) => a.riskLevel === 'MEDIUM').length,
      low: mockAlerts.filter((a) => a.riskLevel === 'LOW').length,
      new: mockAlerts.filter((a) => a.status === 'new').length,
      acknowledged: mockAlerts.filter((a) => a.status === 'in_progress').length,
      resolved: mockAlerts.filter((a) => a.status === 'resolved').length,
    }
  },
}

export const monitoringService = {
  async getFeed(): Promise<MonitoringFeed[]> {
    await delay(400)
    return mockMonitoringFeed
  },
}