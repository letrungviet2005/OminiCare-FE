import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function timeAgo(date: string | Date): string {
  const now = new Date()
  const d = new Date(date)
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (seconds < 60) return 'Vừa xong'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} ngày trước`
  return formatDate(date)
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'stable':
    case 'online':
    case 'recording':
      return 'text-success'
    case 'attention':
    case 'warning':
      return 'text-warning'
    case 'critical':
    case 'offline':
    case 'abnormal':
      return 'text-destructive'
    default:
      return 'text-muted-foreground'
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case 'stable':
    case 'online':
    case 'recording':
      return 'bg-success/10 text-success border-success/20'
    case 'attention':
    case 'warning':
      return 'bg-warning/10 text-warning border-warning/20'
    case 'critical':
    case 'offline':
    case 'abnormal':
      return 'bg-destructive/10 text-destructive border-destructive/20'
    default:
      return 'bg-muted text-muted-foreground border-muted'
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'info':
      return 'text-primary'
    case 'warning':
      return 'text-warning'
    case 'critical':
      return 'text-destructive'
    default:
      return 'text-muted-foreground'
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
