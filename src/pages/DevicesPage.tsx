import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Plus,
  HardDrive,
  Camera,
  Wifi,
  Battery,
  Signal,
  MoreVertical,
  RefreshCw,
  Eye,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const devices = [
  {
    id: '1',
    name: 'Camera 201',
    type: 'camera',
    location: 'Phòng 201',
    status: 'online',
    battery: 100,
    signal: 95,
    lastActivity: '2 phút trước',
    elderName: 'Nguyễn Thị Lan',
  },
  {
    id: '2',
    name: 'Camera 105',
    type: 'camera',
    location: 'Phòng 105',
    status: 'online',
    battery: 85,
    signal: 88,
    lastActivity: '15 phút trước',
    elderName: 'Trần Văn Minh',
  },
  {
    id: '3',
    name: 'Camera 302',
    type: 'camera',
    location: 'Phòng 302',
    status: 'warning',
    battery: 45,
    signal: 72,
    lastActivity: '5 phút trước',
    elderName: 'Phạm Thị Hương',
  },
  {
    id: '4',
    name: 'Sensor 108-A',
    type: 'sensor',
    location: 'Phòng 108',
    status: 'online',
    battery: 92,
    signal: 98,
    lastActivity: '1 phút trước',
    elderName: 'Lê Văn Tuấn',
  },
  {
    id: '5',
    name: 'Camera Hallway',
    type: 'camera',
    location: 'Hành lang T2',
    status: 'offline',
    battery: null,
    signal: 0,
    lastActivity: '2 giờ trước',
    elderName: null,
  },
  {
    id: '6',
    name: 'Sensor 205-B',
    type: 'sensor',
    location: 'Phòng 205',
    status: 'online',
    battery: 78,
    signal: 91,
    lastActivity: '3 phút trước',
    elderName: 'Hoàng Thị Mai',
  },
]

const statusConfig = {
  online: { label: 'Online', color: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  warning: { label: 'Cảnh báo', color: 'bg-yellow-500', text: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
  offline: { label: 'Offline', color: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50 dark:bg-red-500/10' },
}

const typeConfig = {
  camera: { icon: Camera, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  sensor: { icon: HardDrive, color: 'text-purple-500', bg: 'bg-purple-500/10' },
}

export function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Devices</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Quản lý camera và thiết bị IoT
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Kiểm tra kết nối
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Thêm thiết bị
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-500/20 p-3">
                <Camera className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{devices.length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tổng thiết bị</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-500/20 p-3">
                <Wifi className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{devices.filter((d) => d.status === 'online').length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Đang online</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-yellow-500/20 p-3">
                <Signal className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{devices.filter((d) => d.status === 'warning').length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Cảnh báo</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-red-500/20 p-3">
                <Wifi className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{devices.filter((d) => d.status === 'offline').length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Offline</p>
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
            placeholder="Tìm kiếm thiết bị..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            Tất cả
          </Button>
          <Button
            variant={statusFilter === 'online' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('online')}
          >
            Online
          </Button>
          <Button
            variant={statusFilter === 'warning' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('warning')}
          >
            Cảnh báo
          </Button>
          <Button
            variant={statusFilter === 'offline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('offline')}
          >
            Offline
          </Button>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDevices.map((device) => {
          const status = statusConfig[device.status as keyof typeof statusConfig]
          const type = typeConfig[device.type as keyof typeof typeConfig]
          const TypeIcon = type.icon

          return (
            <Card key={device.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className={cn('h-1', status.color)} />
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('rounded-xl p-3', type.bg)}>
                      <TypeIcon className={cn('h-5 w-5', type.color)} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {device.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {device.location}
                      </p>
                    </div>
                  </div>
                  <Badge className={cn('text-xs', status.bg, status.text)}>
                    {device.status === 'online' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                    )}
                    {status.label}
                  </Badge>
                </div>

                {device.elderName && (
                  <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-xs text-slate-400">Elder được giám sát</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {device.elderName}
                    </p>
                  </div>
                )}

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {device.battery !== null && (
                    <div className="flex items-center gap-2">
                      <Battery className={cn(
                        'h-4 w-4',
                        device.battery > 50 ? 'text-emerald-500' :
                        device.battery > 20 ? 'text-yellow-500' : 'text-red-500'
                      )} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500 dark:text-slate-400">Pin</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300">{device.battery}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all',
                              device.battery > 50 ? 'bg-emerald-500' :
                              device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                            )}
                            style={{ width: `${device.battery}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {device.signal > 0 && (
                    <div className="flex items-center gap-2">
                      <Signal className={cn(
                        'h-4 w-4',
                        device.signal > 70 ? 'text-emerald-500' :
                        device.signal > 40 ? 'text-yellow-500' : 'text-red-500'
                      )} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500 dark:text-slate-400">Tín hiệu</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300">{device.signal}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all',
                              device.signal > 70 ? 'bg-emerald-500' :
                              device.signal > 40 ? 'bg-yellow-500' : 'bg-red-500'
                            )}
                            style={{ width: `${device.signal}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    Hoạt động: {device.lastActivity}
                  </p>
                  <div className="flex gap-1">
                    {device.status !== 'offline' && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
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
