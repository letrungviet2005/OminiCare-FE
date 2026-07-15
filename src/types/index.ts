export interface Resident {
  id: string
  name: string
  age: number
  room: string
  avatar: string
  status: 'stable' | 'attention' | 'critical'
  lastActivity: string
  healthMetrics: {
    heartRate: number
    bloodPressure: string
    activity: number
    sleep: number
  }
}

export type AlertType = 'fall' | 'abnormal' | 'sos' | 'medical' | 'system' | 'medication' | 'wander' | 'vital' | 'voice' | 'thermal'
export type AlertSeverity = 'info' | 'warning' | 'critical'
export type AlertRiskLevel = 'HIGH' | 'MEDIUM' | 'LOW'
export type AlertStatus = 'new' | 'acknowledged' | 'in_progress' | 'resolved' | 'dismissed'

export interface Alert {
  id: string
  type: AlertType
  severity: AlertSeverity
  riskLevel: AlertRiskLevel
  status: AlertStatus
  title: string
  message: string
  description?: string
  elderId: string
  elderName: string
  elderAvatar?: string
  elderAge?: number
  elderRoom?: string
  familyId: string
  familyName: string
  familyContact?: string
  deviceId: string
  deviceName: string
  deviceType?: string
  deviceLocation?: string
  confidence?: number
  createdAt: string
  acknowledgedAt?: string
  resolvedAt?: string
  acknowledgedBy?: string
  resolvedBy?: string
  actions?: { id: string; label: string; timestamp: string; actor: string }[]
  snapshot?: string
  snapshotCaption?: string
}

export interface AlertListParams {
  page?: number
  pageSize?: number
  search?: string
  type?: AlertType | 'all'
  riskLevel?: AlertRiskLevel | 'all'
  severity?: AlertSeverity | 'all'
  status?: AlertStatus | 'all'
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface DashboardStats {
  totalResidents: number
  activeAlerts: number
  camerasOnline: number
  avgResponseTime: number
  healthScore: number
  trends: {
    label: string
    value: number
    change: number
  }[]
}

export interface ActivityData {
  time: string
  residents: number
  alerts: number
}

export interface HealthMetric {
  time: string
  heartRate: number
  activity: number
  sleep: number
}

export interface MonitoringFeed {
  id: string
  cameraId: string
  cameraName: string
  status: 'online' | 'offline' | 'recording'
  lastFrame: string
  currentActivity: string
  alerts: number
}

export interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

export interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}
