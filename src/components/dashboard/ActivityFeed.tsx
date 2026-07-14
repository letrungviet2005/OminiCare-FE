import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn, timeAgo } from '@/lib/utils'
import { AlertCircle, AlertTriangle, Info, AlertOctagon, Activity } from 'lucide-react'

const recentActivity = [
  {
    id: '1',
    type: 'critical',
    message: 'Phát hiện té ngã - Bà Nguyễn Thị Lan',
    time: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    icon: AlertOctagon,
  },
  {
    id: '2',
    type: 'warning',
    message: 'Nhịp tim bất thường - Ông Trần Văn Minh',
    time: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    icon: AlertTriangle,
  },
  {
    id: '3',
    type: 'info',
    message: 'Nhắc nhở uống thuốc - Bà Hoàng Thị Mai',
    time: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    icon: Info,
  },
  {
    id: '4',
    type: 'normal',
    message: 'Cư dân vào phòng - Ông Lê Văn Tuấn',
    time: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    icon: Activity,
  },
  {
    id: '5',
    type: 'warning',
    message: 'Camera 3 mất kết nối',
    time: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    icon: AlertCircle,
  },
]

const typeStyles = {
  critical: {
    bg: 'bg-destructive/10',
    border: 'border-destructive/20',
    icon: 'text-destructive',
    badge: 'bg-destructive/10 text-destructive',
  },
  warning: {
    bg: 'bg-warning/10',
    border: 'border-warning/20',
    icon: 'text-warning',
    badge: 'bg-warning/10 text-warning',
  },
  info: {
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    icon: 'text-primary',
    badge: 'bg-primary/10 text-primary',
  },
  normal: {
    bg: 'bg-success/10',
    border: 'border-success/20',
    icon: 'text-success',
    badge: 'bg-success/10 text-success',
  },
}

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Hoạt động gần đây
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const styles = typeStyles[activity.type as keyof typeof typeStyles]
              const Icon = activity.icon

              return (
                <div
                  key={activity.id}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50',
                    styles.bg,
                    styles.border
                  )}
                >
                  <div className={cn('mt-0.5 rounded-lg p-2', styles.bg)}>
                    <Icon className={cn('h-4 w-4', styles.icon)} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(activity.time)}
                    </p>
                  </div>
                  <Badge className={cn('text-xs', styles.badge)}>
                    {activity.type === 'critical'
                      ? 'Khẩn cấp'
                      : activity.type === 'warning'
                      ? 'Cảnh báo'
                      : activity.type === 'info'
                      ? 'Thông tin'
                      : 'Bình thường'}
                  </Badge>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
