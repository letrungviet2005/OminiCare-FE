import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Play,
  Pause,
  Volume2,
  Maximize2,
  Camera,
  AlertCircle,
  Clock,
  Heart,
  Activity,
  Moon,
} from 'lucide-react'
import { cn, getStatusBgColor } from '@/lib/utils'
import { mockResidents } from '@/services/mockData'

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-gradient-to-br from-card to-muted">
        {/* Video placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Camera className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">Demo Video Feed</p>
            <p className="text-sm text-muted-foreground/70">Phòng 201 - Bà Nguyễn Thị Lan</p>
          </div>
        </div>

        {/* AI Detection Overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="success" className="animate-pulse">
            <span className="w-2 h-2 rounded-full bg-success mr-1 animate-pulse" />
            AI Active
          </Badge>
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>

        {/* Detection info */}
        <div className="absolute bottom-20 left-4 bg-card/90 backdrop-blur rounded-lg p-3 border border-border">
          <p className="text-sm font-medium">Phát hiện: Ngồi nghỉ</p>
          <p className="text-xs text-muted-foreground">Độ tin cậy: 98.5%</p>
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Phòng 201 - Bà Nguyễn Thị Lan</h3>
            <p className="text-sm text-muted-foreground">Camera 1 • Khu A</p>
          </div>
          <Badge className={cn('bg-warning/10 text-warning border-warning/30')}>
            <AlertCircle className="w-3 h-3 mr-1" />
            Cần theo dõi
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export function CameraGrid() {
  const cameras = mockResidents.slice(0, 6)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {cameras.map((resident, index) => (
        <Card
          key={resident.id}
          className={cn(
            'cursor-pointer transition-all hover:shadow-lg hover:border-primary/30 overflow-hidden',
            index === 0 && 'col-span-2 row-span-2'
          )}
        >
          <div className={cn('relative bg-gradient-to-br from-card to-muted', index === 0 ? 'aspect-square' : 'aspect-video')}>
            <div className="absolute inset-0 flex items-center justify-center">
              <Avatar className={cn('border-2 border-border', index === 0 ? 'h-20 w-20' : 'h-12 w-12')}>
                <AvatarImage src={resident.avatar} alt={resident.name} />
                <AvatarFallback>{resident.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute top-2 right-2">
              <Badge
                variant="secondary"
                className={cn('text-xs', getStatusBgColor(resident.status))}
              >
                {resident.status === 'stable' ? 'Ổn định' : resident.status === 'attention' ? 'Cần chú ý' : 'Nguy cấp'}
              </Badge>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center justify-between">
                <div className="bg-card/90 backdrop-blur rounded px-2 py-1">
                  <p className={cn('font-medium text-white', index === 0 ? 'text-sm' : 'text-xs')}>
                    {resident.name}
                  </p>
                  <p className="text-xs text-muted-foreground">Phòng {resident.room}</p>
                </div>
                <Badge variant="success" className="animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-success mr-1" />
                  Live
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export function LiveMetrics() {
  const resident = mockResidents[0]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Chỉ số sức khỏe real-time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-destructive" />
              <span className="text-sm">Nhịp tim</span>
            </div>
            <span className="font-mono font-semibold">{resident.healthMetrics.heartRate} bpm</span>
          </div>
          <Progress value={resident.healthMetrics.heartRate} className="h-2" indicatorClassName="bg-destructive" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm">Hoạt động</span>
            </div>
            <span className="font-mono font-semibold">{resident.healthMetrics.activity}%</span>
          </div>
          <Progress value={resident.healthMetrics.activity} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-accent" />
              <span className="text-sm">Giấc ngủ</span>
            </div>
            <span className="font-mono font-semibold">{resident.healthMetrics.sleep}%</span>
          </div>
          <Progress value={resident.healthMetrics.sleep} className="h-2" indicatorClassName="bg-accent" />
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold font-mono text-success">{resident.healthMetrics.bloodPressure.split('/')[0]}</p>
            <p className="text-xs text-muted-foreground">Huyết áp tâm thu</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-success">{resident.healthMetrics.bloodPressure.split('/')[1]}</p>
            <p className="text-xs text-muted-foreground">Huyết áp tâm trương</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
