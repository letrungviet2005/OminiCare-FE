import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn, timeAgo, getStatusBgColor } from '@/lib/utils'
import { Activity } from 'lucide-react'
import { mockResidents } from '@/services/mockData'

export function QuickResidents() {
  const topResidents = mockResidents.slice(0, 5)

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Cư dân cần chú ý
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {topResidents.map((resident) => (
              <div
                key={resident.id}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarImage src={resident.avatar} alt={resident.name} />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {resident.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{resident.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Phòng {resident.room}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge
                    className={cn(
                      'text-xs',
                      getStatusBgColor(resident.status)
                    )}
                  >
                    {resident.status === 'stable'
                      ? 'Ổn định'
                      : resident.status === 'attention'
                      ? 'Cần chú ý'
                      : 'Nguy cấp'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {timeAgo(resident.lastActivity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
