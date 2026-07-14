import { VideoPlayer, CameraGrid, LiveMetrics } from '@/components/monitor/VideoPlayer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search, Grid3X3, Monitor, List } from 'lucide-react'
import { useState } from 'react'

export function MonitorPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Giám sát</h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi real-time qua hệ thống camera AI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="animate-pulse">
            <span className="w-2 h-2 rounded-full bg-success mr-2" />
            12 cameras online
          </Badge>
          <Button variant="outline">
            <Monitor className="h-4 w-4 mr-2" />
            Full Screen
          </Button>
        </div>
      </div>

      <Tabs defaultValue="single" className="space-y-4">
        <TabsList>
          <TabsTrigger value="single">1 Camera</TabsTrigger>
          <TabsTrigger value="grid">4 Cameras</TabsTrigger>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <VideoPlayer />
            </div>
            <div className="space-y-4">
              <LiveMetrics />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="grid">
          <CameraGrid />
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm camera hoặc cư dân..."
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CameraGrid />
        </TabsContent>
      </Tabs>
    </div>
  )
}
