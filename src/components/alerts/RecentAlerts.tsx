import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { alertService } from '@/services'
import { alertTypeConfig, riskLevelConfig } from './alertMeta'
import { cn, getInitials, timeAgo } from '@/lib/utils'
import { AlertCircle, ChevronRight, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentAlerts() {
  const { data: alerts = [] } = useQuery({
    queryKey: ['recent-alerts'],
    queryFn: () => alertService.list({ pageSize: 5 }),
    select: (res) => res.data,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertCircle className="h-5 w-5 text-primary" />
          Cảnh báo gần đây
        </CardTitle>
        <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
          <Link to="/alerts">
            Xem tất cả
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[360px] pr-3">
          <div className="space-y-2.5">
            {alerts.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                <AlertTriangle className="h-5 w-5 opacity-50" />
                Chưa có cảnh báo
              </div>
            )}
            {alerts.map((alert) => {
              const typeConf = alertTypeConfig[alert.type]
              const riskConf = riskLevelConfig[alert.riskLevel]
              const Icon = typeConf.icon
              return (
                <Link
                  to="/alerts"
                  key={alert.id}
                  className="flex items-start gap-3 rounded-lg border border-slate-200/10 bg-slate-50/40 p-3 transition-all hover:border-blue-500/30 hover:bg-slate-100/60 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:bg-slate-900"
                >
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border', typeConf.tone)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {alert.title}
                      </p>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-bold tracking-wider',
                          riskConf.soft
                        )}
                      >
                        <span className={cn('h-1 w-1 rounded-full', riskConf.dot)} />
                        {riskConf.label}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 truncate">
                      {alert.message}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={alert.elderAvatar} />
                        <AvatarFallback className="bg-blue-500/10 text-[9px] font-bold text-blue-500">
                          {getInitials(alert.elderName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{alert.elderName}</span>
                      <span>·</span>
                      <span>{timeAgo(alert.createdAt)}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-[10px]">
                    {alert.id}
                  </Badge>
                </Link>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}