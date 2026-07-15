import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal, ChevronRight, Inbox } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  alertStatusConfig,
  alertTypeConfig,
  riskLevelConfig,
} from './alertMeta'
import { cn, formatDateTime, getInitials, timeAgo } from '@/lib/utils'
import type { Alert, AlertRiskLevel } from '@/types'
import { useState } from 'react'

export type AlertSortKey = 'createdAt' | 'riskLevel' | 'status' | 'type'
export type AlertSortDir = 'asc' | 'desc'

interface AlertTableProps {
  alerts: Alert[]
  loading?: boolean
  selectedId?: string
  sortKey: AlertSortKey
  sortDir: AlertSortDir
  onSort: (key: AlertSortKey) => void
  onRowClick: (alert: Alert) => void
  onAcknowledge?: (alert: Alert) => void
  onResolve?: (alert: Alert) => void
}

const riskOrder: Record<AlertRiskLevel, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 }

export function AlertTable({
  alerts,
  loading,
  selectedId,
  sortKey,
  sortDir,
  onSort,
  onRowClick,
  onAcknowledge,
  onResolve,
}: AlertTableProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  const sorted = [...alerts].sort((a, b) => {
    let cmp = 0
    if (sortKey === 'createdAt') cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    else if (sortKey === 'riskLevel') cmp = riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
    else if (sortKey === 'status') cmp = a.status.localeCompare(b.status)
    else if (sortKey === 'type') cmp = a.type.localeCompare(b.type)
    return sortDir === 'asc' ? cmp : -cmp
  })

  const SortIcon = ({ k }: { k: AlertSortKey }) => {
    if (sortKey !== k) return <ArrowUpDown className="ml-1 h-3.5 w-3.5 opacity-40" />
    return sortDir === 'asc' ? (
      <ArrowUp className="ml-1 h-3.5 w-3.5" />
    ) : (
      <ArrowDown className="ml-1 h-3.5 w-3.5" />
    )
  }

  const SortableHead = ({
    k,
    children,
    className,
  }: {
    k: AlertSortKey
    children: React.ReactNode
    className?: string
  }) => (
    <TableHead className={cn('whitespace-nowrap', className)}>
      <button
        type="button"
        onClick={() => onSort(k)}
        className={cn(
          'inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors',
          sortKey === k && 'text-slate-900 dark:text-white'
        )}
      >
        {children}
        <SortIcon k={k} />
      </button>
    </TableHead>
  )

  return (
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-900/60">
            <TableHead className="w-[60px] text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              #
            </TableHead>
            <SortableHead k="type" className="min-w-[200px]">
              Alert Type
            </SortableHead>
            <TableHead className="min-w-[180px] text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Family
            </TableHead>
            <TableHead className="min-w-[180px] text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Elder
            </TableHead>
            <TableHead className="min-w-[180px] text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Device
            </TableHead>
            <SortableHead k="createdAt" className="min-w-[160px]">
              Created Time
            </SortableHead>
            <SortableHead k="riskLevel" className="text-center">
              Risk Level
            </SortableHead>
            <SortableHead k="status" className="text-center">
              Status
            </SortableHead>
            <TableHead className="w-[60px] text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          ) : sorted.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={9} className="py-16 text-center">
                <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                  <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                    <Inbox className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">Không có cảnh báo phù hợp</p>
                  <p className="text-xs">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((alert, idx) => {
              const typeConf = alertTypeConfig[alert.type]
              const riskConf = riskLevelConfig[alert.riskLevel]
              const statusConf = alertStatusConfig[alert.status]
              const TypeIcon = typeConf.icon
              const isSelected = selectedId === alert.id
              const isHovered = hovered === alert.id
              const isNew = alert.status === 'new'

              return (
                <TableRow
                  key={alert.id}
                  data-state={isSelected ? 'selected' : undefined}
                  onMouseEnter={() => setHovered(alert.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onRowClick(alert)}
                  className={cn(
                    'cursor-pointer border-b border-slate-100 dark:border-slate-800 transition-colors',
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-500/10'
                      : isHovered
                      ? 'bg-slate-50 dark:bg-slate-800/40'
                      : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/30'
                  )}
                >
                  <TableCell className="relative text-center font-mono text-xs text-slate-400 align-middle">
                    {isNew && (
                      <span className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-500" />
                    )}
                    {String(idx + 1).padStart(2, '0')}
                  </TableCell>

                  <TableCell className="align-middle">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
                          typeConf.tone
                        )}
                      >
                        <TypeIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {alert.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[280px]">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="align-middle">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {alert.familyName}
                      </p>
                      {alert.familyContact && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {alert.familyContact}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="align-middle">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8 ring-1 ring-slate-200 dark:ring-slate-700">
                        <AvatarImage src={alert.elderAvatar} alt={alert.elderName} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-xs font-semibold text-blue-500">
                          {getInitials(alert.elderName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {alert.elderName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {alert.elderRoom ? `Phòng ${alert.elderRoom}` : '—'}
                          {alert.elderAge ? ` · ${alert.elderAge} tuổi` : ''}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="align-middle">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {alert.deviceName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {[alert.deviceType, alert.deviceLocation].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="align-middle">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                        {formatDateTime(alert.createdAt)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{timeAgo(alert.createdAt)}</p>
                    </div>
                  </TableCell>

                  <TableCell className="text-center align-middle">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-wider',
                        riskConf.soft,
                        alert.riskLevel === 'HIGH' && 'shadow-sm shadow-red-500/20'
                      )}
                    >
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          riskConf.dot,
                          alert.riskLevel === 'HIGH' && 'animate-pulse'
                        )}
                      />
                      {riskConf.label}
                    </span>
                  </TableCell>

                  <TableCell className="text-center align-middle">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                        statusConf.classes
                      )}
                    >
                      {statusConf.label}
                    </span>
                  </TableCell>

                  <TableCell className="text-right align-middle">
                    <div
                      className={cn(
                        'flex items-center justify-end gap-1 transition-opacity',
                        isHovered || isSelected ? 'opacity-100' : 'opacity-0'
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Hành động</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem onClick={() => onRowClick(alert)}>
                            Xem chi tiết
                          </DropdownMenuItem>
                          {alert.status === 'new' && onAcknowledge && (
                            <DropdownMenuItem onClick={() => onAcknowledge(alert)}>
                              Xác nhận tiếp nhận
                            </DropdownMenuItem>
                          )}
                          {alert.status !== 'resolved' && onResolve && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => onResolve(alert)}>
                                Đóng cảnh báo
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onRowClick(alert)}
                        aria-label="Mở chi tiết"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function SkeletonRow() {
  return (
    <TableRow className="hover:bg-transparent border-b border-slate-100 dark:border-slate-800">
      <TableCell className="align-middle">
        <Skeleton className="h-3 w-6 mx-auto" />
      </TableCell>
      <TableCell className="align-middle">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="h-3 w-52" />
          </div>
        </div>
      </TableCell>
      <TableCell className="align-middle">
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </TableCell>
      <TableCell className="align-middle">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </TableCell>
      <TableCell className="align-middle">
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </TableCell>
      <TableCell className="align-middle">
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </TableCell>
      <TableCell className="text-center align-middle">
        <Skeleton className="h-6 w-16 mx-auto rounded-full" />
      </TableCell>
      <TableCell className="text-center align-middle">
        <Skeleton className="h-6 w-20 mx-auto rounded-full" />
      </TableCell>
      <TableCell className="align-middle" />
    </TableRow>
  )
}