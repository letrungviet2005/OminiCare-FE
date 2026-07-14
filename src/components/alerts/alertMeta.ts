import {
  AlertOctagon,
  AlertTriangle,
  Info,
  HeartPulse,
  Pill,
  PowerOff,
  Footprints,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react'
import type { AlertRiskLevel, AlertStatus, AlertType } from '@/types'

export const riskLevelConfig: Record<
  AlertRiskLevel,
  { label: string; classes: string; soft: string; solid: string; dot: string }
> = {
  HIGH: {
    label: 'HIGH',
    classes: 'border-red-500/30 bg-red-500/10 text-red-500',
    soft: 'bg-red-500/10 text-red-500 border-red-500/20',
    solid: 'bg-red-500 text-white',
    dot: 'bg-red-500',
  },
  MEDIUM: {
    label: 'MEDIUM',
    classes: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
    soft: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    solid: 'bg-amber-500 text-white',
    dot: 'bg-amber-500',
  },
  LOW: {
    label: 'LOW',
    classes: 'border-sky-500/30 bg-sky-500/10 text-sky-500',
    soft: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
    solid: 'bg-sky-500 text-white',
    dot: 'bg-sky-500',
  },
}

export const alertStatusConfig: Record<
  AlertStatus,
  { label: string; classes: string }
> = {
  new: { label: 'Mới', classes: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
  acknowledged: { label: 'Đã tiếp nhận', classes: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30' },
  in_progress: { label: 'Đang xử lý', classes: 'bg-violet-500/10 text-violet-500 border-violet-500/30' },
  resolved: { label: 'Đã xử lý', classes: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
  dismissed: { label: 'Đã bỏ qua', classes: 'bg-slate-500/10 text-slate-400 border-slate-500/30' },
}

export const alertTypeConfig: Record<
  AlertType,
  { label: string; icon: LucideIcon; tone: string }
> = {
  fall: { label: 'Té ngã', icon: AlertOctagon, tone: 'text-red-500 bg-red-500/10 border-red-500/20' },
  sos: { label: 'SOS', icon: PowerOff, tone: 'text-red-500 bg-red-500/10 border-red-500/20' },
  medical: { label: 'Y tế', icon: Stethoscope, tone: 'text-red-500 bg-red-500/10 border-red-500/20' },
  vital: { label: 'Sinh tồn', icon: HeartPulse, tone: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
  abnormal: { label: 'Bất thường', icon: AlertTriangle, tone: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
  wander: { label: 'Đi lang thang', icon: Footprints, tone: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
  medication: { label: 'Uống thuốc', icon: Pill, tone: 'text-sky-500 bg-sky-500/10 border-sky-500/20' },
  system: { label: 'Hệ thống', icon: Info, tone: 'text-sky-500 bg-sky-500/10 border-sky-500/20' },
}