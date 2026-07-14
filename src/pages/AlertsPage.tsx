import { useEffect, useMemo, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Bell, Download, RefreshCw, ShieldAlert, Activity, CheckCircle2, AlertTriangle, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { alertService } from '@/services'
import { AlertFilters, type AlertFilterState } from '@/components/alerts/AlertFilters'
import { AlertTable, type AlertSortDir, type AlertSortKey } from '@/components/alerts/AlertTable'
import { AlertPagination } from '@/components/alerts/AlertPagination'
import { AlertDetailDrawer } from '@/components/alerts/AlertDetailDrawer'
import { riskLevelConfig } from '@/components/alerts/alertMeta'
import type { Alert, AlertRiskLevel, AlertStatus } from '@/types'

const initialFilters: AlertFilterState = {
  search: '',
  type: 'all',
  riskLevel: 'all',
  status: 'all',
}

export function AlertsPage() {
  const [filters, setFilters] = useState<AlertFilterState>(initialFilters)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [sortKey, setSortKey] = useState<AlertSortKey>('createdAt')
  const [sortDir, setSortDir] = useState<AlertSortDir>('desc')
  const [drawerId, setDrawerId] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const queryClient = useQueryClient()

  const queryKey = useMemo(
    () => ['alerts-list', { ...filters, page, pageSize, sortKey, sortDir }],
    [filters, page, pageSize, sortKey, sortDir]
  )

  const { data: list, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn: () =>
      alertService.list({
        page,
        pageSize,
        search: filters.search,
        type: filters.type,
        riskLevel: filters.riskLevel,
        status: filters.status,
      }),
    placeholderData: (previous) => previous,
  })

  const { data: alertStats } = useQuery({
    queryKey: ['alert-stats'],
    queryFn: alertService.getStats,
  })

  const acknowledgeMutation = useMutation({
    mutationFn: (id: string) => alertService.acknowledge(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts-list'] })
      queryClient.invalidateQueries({ queryKey: ['alert-stats'] })
    },
  })

  const resolveMutation = useMutation({
    mutationFn: (id: string) => alertService.resolve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts-list'] })
      queryClient.invalidateQueries({ queryKey: ['alert-stats'] })
    },
  })

  useEffect(() => {
    setPage(1)
  }, [filters])

  const onSort = (key: AlertSortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const onRowClick = (a: Alert) => {
    setDrawerId(a.id)
    setDrawerOpen(true)
  }

  const handleSort = (k: AlertSortKey) => onSort(k)

  const alerts = list?.data || []
  const total = list?.total || 0
  const totalPages = list?.totalPages || 1

  const statCards: {
    key: 'new' | 'high' | 'medium' | 'resolved'
    label: string
    icon: React.ElementType
    classes: string
  }[] = [
    { key: 'new', label: 'Cảnh báo mới', icon: Bell, classes: 'border-blue-500/30 bg-blue-500/5 text-blue-500' },
    { key: 'high', label: 'Mức HIGH', icon: ShieldAlert, classes: 'border-red-500/30 bg-red-500/5 text-red-500' },
    { key: 'medium', label: 'Mức MEDIUM', icon: AlertTriangle, classes: 'border-amber-500/30 bg-amber-500/5 text-amber-500' },
    { key: 'resolved', label: 'Đã xử lý', icon: CheckCircle2, classes: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-500' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Activity className="h-3.5 w-3.5" />
            Alert Center · AI Monitoring
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Cảnh báo AI</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Theo dõi và xử lý các cảnh báo từ hệ thống Camera AI, cảm biến đeo tay và thiết bị IoT.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ['alerts-list'] })
              queryClient.invalidateQueries({ queryKey: ['alert-stats'] })
            }}
            disabled={isFetching}
          >
            <RefreshCw className={cn('h-3.5 w-3.5', isFetching && 'animate-spin')} />
            Làm mới
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Xuất CSV
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Cấu hình
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => {
          const Icon = s.icon
          const value =
            s.key === 'new'
              ? alertStats?.new ?? 0
              : s.key === 'high'
              ? alertStats?.high ?? 0
              : s.key === 'medium'
              ? alertStats?.medium ?? 0
              : alertStats?.resolved ?? 0
          return (
            <Card
              key={s.key}
              className={cn(
                'border bg-card/60 backdrop-blur transition-all hover:shadow-md',
                s.classes
              )}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className={cn('rounded-xl p-2.5 border bg-background/40', s.classes.split(' ')[0], s.classes.split(' ')[1])}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Risk distribution strip */}
      <div className="grid gap-3 lg:grid-cols-3">
        {(['HIGH', 'MEDIUM', 'LOW'] as AlertRiskLevel[]).map((r) => {
          const conf = riskLevelConfig[r]
          const total = alertStats?.total || 0
          const count = alertStats?.[r.toLowerCase() as 'high' | 'medium' | 'low'] || 0
          const pct = total > 0 ? Math.round((count / total) * 100) : 0
          return (
            <Card key={r} className="bg-card/60 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn('h-2.5 w-2.5 rounded-full', conf.dot, r === 'HIGH' && 'animate-pulse')} />
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Risk {conf.label}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{count}</p>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={cn('h-full rounded-full transition-all', conf.solid)}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">{pct}% tổng cảnh báo</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <AlertFilters
        value={filters}
        onChange={setFilters}
        onReset={() => setFilters(initialFilters)}
      />

      {/* Table */}
      <div className="rounded-xl border border-slate-200/10 bg-card/40 backdrop-blur dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/10 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-500">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Danh sách cảnh báo</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tổng <span className="font-semibold text-slate-700 dark:text-slate-200">{total}</span> cảnh báo · click một dòng để xem chi tiết
              </p>
            </div>
          </div>
          <StatusQuickFilter
            value={filters.status}
            onChange={(status) => setFilters((p) => ({ ...p, status }))}
          />
        </div>

        <AlertTable
          alerts={alerts}
          loading={isLoading}
          selectedId={drawerId || undefined}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
          onRowClick={onRowClick}
          onAcknowledge={(a) => acknowledgeMutation.mutate(a.id)}
          onResolve={(a) => resolveMutation.mutate(a.id)}
        />

        <AlertPagination
          page={list?.page || page}
          pageSize={pageSize}
          total={total}
          totalPages={totalPages}
          onPageChange={setPage}
          onPageSizeChange={(s) => {
            setPageSize(s)
            setPage(1)
          }}
        />
      </div>

      {/* Drawer */}
      <AlertDetailDrawer
        alertId={drawerId}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onChanged={() => {
          queryClient.invalidateQueries({ queryKey: ['alerts-list'] })
          queryClient.invalidateQueries({ queryKey: ['alert-stats'] })
        }}
      />
    </div>
  )
}

function StatusQuickFilter({
  value,
  onChange,
}: {
  value: AlertStatus | 'all'
  onChange: (v: AlertStatus | 'all') => void
}) {
  const options: { key: AlertStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'new', label: 'Mới' },
    { key: 'in_progress', label: 'Đang xử lý' },
    { key: 'resolved', label: 'Đã xử lý' },
  ]

  return (
    <div className="hidden gap-1 rounded-lg border border-slate-200/10 bg-slate-50/60 p-1 dark:border-slate-800 dark:bg-slate-900/60 md:flex">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onChange(opt.key)}
          className={cn(
            'rounded-md px-2.5 py-1 text-xs font-medium transition-all',
            value === opt.key
              ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}