import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Search,
  Brain,
  Activity,
  AlertTriangle,
  Heart,
  MessageSquare,
  Clock,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const aiEvents = [
  {
    id: '1',
    type: 'fall',
    severity: 'critical',
    elderName: 'Nguyễn Thị Lan',
    elderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    room: '201',
    confidence: 98.5,
    timestamp: '2 phút trước',
    description: 'Phát hiện té ngã trong phòng',
    status: 'pending',
  },
  {
    id: '2',
    type: 'abnormal_heart',
    severity: 'warning',
    elderName: 'Phạm Thị Hương',
    elderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    room: '302',
    confidence: 95.2,
    timestamp: '15 phút trước',
    description: 'Nhịp tim bất thường: 105 bpm',
    status: 'reviewed',
  },
  {
    id: '3',
    type: 'activity',
    severity: 'info',
    elderName: 'Trần Văn Minh',
    elderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    room: '105',
    confidence: 92.8,
    timestamp: '1 giờ trước',
    description: 'Hoạt động bất thường: không di chuyển 4 giờ',
    status: 'reviewed',
  },
  {
    id: '4',
    type: 'face_recognition',
    severity: 'info',
    elderName: 'Lê Văn Tuấn',
    elderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    room: '108',
    confidence: 99.1,
    timestamp: '2 giờ trước',
    description: 'Nhận diện khuôn mặt thành công',
    status: 'reviewed',
  },
  {
    id: '5',
    type: 'sos',
    severity: 'critical',
    elderName: 'Đặng Văn Hùng',
    elderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    room: '310',
    confidence: 100,
    timestamp: '3 giờ trước',
    description: 'Tín hiệu SOS khẩn cấp',
    status: 'pending',
  },
]

const eventTypeConfig = {
  fall: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Té ngã' },
  abnormal_heart: { icon: Heart, color: 'text-orange-500', bg: 'bg-orange-500/10', label: 'Nhịp tim' },
  activity: { icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Hoạt động' },
  face_recognition: { icon: Brain, color: 'text-purple-500', bg: 'bg-purple-500/10', label: 'Nhận diện' },
  sos: { icon: MessageSquare, color: 'text-red-500', bg: 'bg-red-500/10', label: 'SOS' },
}

const severityConfig = {
  critical: { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-500/20' },
  warning: { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-500/20' },
  info: { color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-500/20' },
}

const statusConfig = {
  pending: { label: 'Chờ xử lý', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-500/20' },
  reviewed: { label: 'Đã xem', color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
}

export function AIEventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredEvents = aiEvents.filter((event) => {
    const matchesSearch =
      event.elderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || event.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Events</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Sự kiện và cảnh báo được phát hiện bởi AI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Brain className="h-3 w-3" />
            AI Active
          </Badge>
          <Badge className="gap-1 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            24 events/h
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-red-500/20 p-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-yellow-500/20 p-3">
                <Activity className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-500/20 p-3">
                <Brain className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">96.4%</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Avg Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-500/20 p-3">
                <Clock className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">2.5s</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Avg Response</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Tìm kiếm sự kiện..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={typeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('all')}
          >
            Tất cả
          </Button>
          <Button
            variant={typeFilter === 'fall' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('fall')}
          >
            Té ngã
          </Button>
          <Button
            variant={typeFilter === 'abnormal_heart' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('abnormal_heart')}
          >
            Nhịp tim
          </Button>
          <Button
            variant={typeFilter === 'sos' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('sos')}
          >
            SOS
          </Button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => {
          const eventType = eventTypeConfig[event.type as keyof typeof eventTypeConfig]
          const severity = severityConfig[event.severity as keyof typeof severityConfig]
          const status = statusConfig[event.status as keyof typeof statusConfig]
          const EventIcon = eventType.icon

          return (
            <Card
              key={event.id}
              className={cn(
                'overflow-hidden hover:shadow-lg transition-all cursor-pointer',
                event.severity === 'critical' && 'border-red-500/30',
                event.severity === 'warning' && 'border-yellow-500/30'
              )}
            >
              <div className={cn('h-1', eventType.bg.replace('/10', ''))} />
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={cn('rounded-xl p-3', eventType.bg)}>
                    <EventIcon className={cn('h-6 w-6', eventType.color)} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {event.description}
                          </h3>
                          <Badge className={cn('text-xs', severity.bg, severity.color)}>
                            {event.severity}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={event.elderAvatar} />
                              <AvatarFallback className="text-[10px]">
                                {event.elderName.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-slate-600 dark:text-slate-300">
                              {event.elderName}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Phòng {event.room}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={cn('text-xs mb-2', status.bg, status.color)}>
                          {status.label}
                        </Badge>
                        <p className="text-xs text-slate-400">{event.timestamp}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Confidence:</span>
                          <Progress value={event.confidence} className="h-2 w-[120px]" />
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            {event.confidence}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Chi tiết
                        </Button>
                        {event.status === 'pending' && (
                          <Button size="sm">
                            Xử lý
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
