import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn, getStatusBgColor } from '@/lib/utils'
import { Heart, Activity, Moon, Droplets } from 'lucide-react'
import type { Resident } from '@/types'

interface ResidentCardProps {
  resident: Resident
  onClick?: () => void
}

export function ResidentCard({ resident, onClick }: ResidentCardProps) {
  const statusText = {
    stable: 'Ổn định',
    attention: 'Cần chú ý',
    critical: 'Nguy cấp',
  }

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/30"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14 border-2 border-border">
            <AvatarImage src={resident.avatar} alt={resident.name} />
            <AvatarFallback className="bg-muted text-lg">
              {resident.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold truncate">{resident.name}</h3>
              <Badge className={cn('text-xs', getStatusBgColor(resident.status))}>
                {statusText[resident.status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Phòng {resident.room} • {resident.age} tuổi
            </p>
            <div className="grid grid-cols-2 gap-2">
              <MetricItem
                icon={Heart}
                label="Nhịp tim"
                value={`${resident.healthMetrics.heartRate}`}
                unit="bpm"
                status={resident.healthMetrics.heartRate > 90 ? 'warning' : 'normal'}
              />
              <MetricItem
                icon={Activity}
                label="Hoạt động"
                value={`${resident.healthMetrics.activity}`}
                unit="%"
                status="normal"
              />
              <MetricItem
                icon={Moon}
                label="Giấc ngủ"
                value={`${resident.healthMetrics.sleep}`}
                unit="%"
                status={resident.healthMetrics.sleep < 60 ? 'warning' : 'normal'}
              />
              <MetricItem
                icon={Droplets}
                label="Huyết áp"
                value={resident.healthMetrics.bloodPressure}
                unit=""
                status="normal"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface MetricItemProps {
  icon: React.ElementType
  label: string
  value: string
  unit: string
  status?: 'normal' | 'warning' | 'critical'
}

function MetricItem({ icon: Icon, label, value, unit, status = 'normal' }: MetricItemProps) {
  const statusColors = {
    normal: 'text-foreground',
    warning: 'text-warning',
    critical: 'text-destructive',
  }

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={cn('text-sm font-semibold font-mono', statusColors[status])}>
          {value}
          <span className="text-xs font-normal text-muted-foreground ml-0.5">{unit}</span>
        </p>
      </div>
    </div>
  )
}
