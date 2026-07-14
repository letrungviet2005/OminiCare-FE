export interface ActivityItem {
  id: string
  type: 'critical' | 'warning' | 'info' | 'normal'
  message: string
  time: string
  icon?: React.ReactNode
}
