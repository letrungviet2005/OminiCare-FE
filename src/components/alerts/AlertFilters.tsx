import { Search, X, Filter as FilterIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { riskLevelConfig } from './alertMeta'
import type { AlertRiskLevel, AlertStatus, AlertType } from '@/types'
import { cn } from '@/lib/utils'

export interface AlertFilterState {
  search: string
  type: AlertType | 'all'
  riskLevel: AlertRiskLevel | 'all'
  status: AlertStatus | 'all'
}

interface AlertFiltersProps {
  value: AlertFilterState
  onChange: (next: AlertFilterState) => void
  onReset?: () => void
}

const typeOptions: { value: AlertType | 'all'; label: string }[] = [
  { value: 'all', label: 'Tất cả loại' },
  { value: 'fall', label: 'Té ngã' },
  { value: 'sos', label: 'SOS' },
  { value: 'medical', label: 'Y tế' },
  { value: 'vital', label: 'Sinh tồn' },
  { value: 'abnormal', label: 'Bất thường' },
  { value: 'wander', label: 'Đi lang thang' },
  { value: 'medication', label: 'Uống thuốc' },
  { value: 'system', label: 'Hệ thống' },
]

const riskOptions: { value: AlertRiskLevel | 'all'; label: string }[] = [
  { value: 'all', label: 'Tất cả mức độ' },
  { value: 'HIGH', label: 'HIGH' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'LOW', label: 'LOW' },
]

const statusOptions: { value: AlertStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'new', label: 'Mới' },
  { value: 'in_progress', label: 'Đang xử lý' },
  { value: 'acknowledged', label: 'Đã tiếp nhận' },
  { value: 'resolved', label: 'Đã xử lý' },
  { value: 'dismissed', label: 'Đã bỏ qua' },
]

export function AlertFilters({ value, onChange, onReset }: AlertFiltersProps) {
  const update = <K extends keyof AlertFilterState>(key: K, v: AlertFilterState[K]) =>
    onChange({ ...value, [key]: v })

  const hasActive =
    value.search !== '' ||
    value.type !== 'all' ||
    value.riskLevel !== 'all' ||
    value.status !== 'all'

  return (
    <div className="rounded-xl border border-slate-200/10 bg-card/50 backdrop-blur p-4 shadow-sm dark:border-slate-800">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={value.search}
            onChange={(e) => update('search', e.target.value)}
            placeholder="Tìm theo mã, tên cư dân, gia đình, thiết bị..."
            className="pl-9 pr-9 h-10"
          />
          {value.search && (
            <button
              type="button"
              aria-label="Xóa tìm kiếm"
              onClick={() => update('search', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={value.type} onValueChange={(v) => update('type', v as AlertType | 'all')}>
            <SelectTrigger className="h-10 w-[150px]">
              <SelectValue placeholder="Loại cảnh báo" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={value.riskLevel} onValueChange={(v) => update('riskLevel', v as AlertRiskLevel | 'all')}>
            <SelectTrigger className="h-10 w-[150px]">
              <SelectValue placeholder="Mức độ rủi ro" />
            </SelectTrigger>
            <SelectContent>
              {riskOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.value === 'all' ? opt.label : `Mức độ: ${opt.label}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={value.status} onValueChange={(v) => update('status', v as AlertStatus | 'all')}>
            <SelectTrigger className="h-10 w-[160px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onReset?.()}
            disabled={!hasActive}
            className={cn(
              'h-10 gap-1.5',
              !hasActive && 'opacity-50 cursor-not-allowed'
            )}
          >
            <FilterIcon className="h-3.5 w-3.5" />
            Đặt lại
          </Button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 dark:text-slate-400">Mức độ:</span>
        {(['HIGH', 'MEDIUM', 'LOW'] as AlertRiskLevel[]).map((r) => {
          const conf = riskLevelConfig[r]
          const active = value.riskLevel === r
          return (
            <button
              key={r}
              type="button"
              onClick={() => update('riskLevel', active ? 'all' : r)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all',
                conf.soft,
                active && 'ring-2 ring-offset-1 ring-offset-background',
                active && r === 'HIGH' && 'ring-red-500/60',
                active && r === 'MEDIUM' && 'ring-amber-500/60',
                active && r === 'LOW' && 'ring-sky-500/60'
              )}
            >
              <span className={cn('h-1.5 w-1.5 rounded-full', conf.dot)} />
              {conf.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}