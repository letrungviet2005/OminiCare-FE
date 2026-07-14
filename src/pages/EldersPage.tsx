import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Search,
  Plus,
  Heart,
  Activity,
  Moon,
  Droplets,
  AlertTriangle,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const elders = [
  {
    id: '1',
    name: 'Nguyễn Thị Lan',
    age: 78,
    room: '201',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    status: 'attention',
    familyContact: 'Nguyễn Gia Hưng',
    heartRate: 88,
    bloodPressure: '130/85',
    activity: 65,
    sleep: 72,
    fallRisk: 'Medium',
  },
  {
    id: '2',
    name: 'Trần Văn Minh',
    age: 82,
    room: '105',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    status: 'stable',
    familyContact: 'Trần Minh Châu',
    heartRate: 72,
    bloodPressure: '120/80',
    activity: 80,
    sleep: 85,
    fallRisk: 'Low',
  },
  {
    id: '3',
    name: 'Phạm Thị Hương',
    age: 75,
    room: '302',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    status: 'critical',
    familyContact: 'Phạm Quốc Việt',
    heartRate: 105,
    bloodPressure: '160/95',
    activity: 45,
    sleep: 58,
    fallRisk: 'High',
  },
  {
    id: '4',
    name: 'Lê Văn Tuấn',
    age: 80,
    room: '108',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    status: 'stable',
    familyContact: 'Lê Thị Hòa',
    heartRate: 75,
    bloodPressure: '125/82',
    activity: 70,
    sleep: 78,
    fallRisk: 'Low',
  },
  {
    id: '5',
    name: 'Hoàng Thị Mai',
    age: 76,
    room: '205',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    status: 'stable',
    familyContact: 'Hoàng Nam',
    heartRate: 70,
    bloodPressure: '118/78',
    activity: 85,
    sleep: 90,
    fallRisk: 'Low',
  },
  {
    id: '6',
    name: 'Đặng Văn Hùng',
    age: 84,
    room: '310',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    status: 'attention',
    familyContact: 'Đặng Minh Tuấn',
    heartRate: 92,
    bloodPressure: '140/88',
    activity: 55,
    sleep: 65,
    fallRisk: 'Medium',
  },
]

const statusConfig = {
  stable: { label: 'Ổn định', color: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  attention: { label: 'Cần chú ý', color: 'bg-yellow-500', text: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
  critical: { label: 'Nguy cấp', color: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50 dark:bg-red-500/10' },
}

const fallRiskConfig = {
  Low: { color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
  Medium: { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-500/20' },
  High: { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-500/20' },
}

export function EldersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredElders = elders.filter((elder) => {
    const matchesSearch =
      elder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      elder.room.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || elder.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Elders</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Quản lý thông tin và theo dõi sức khỏe người cao tuổi
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm Elder
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-500/20 p-3">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{elders.length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tổng Elder</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-500/20 p-3">
                <Heart className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{elders.filter((e) => e.status === 'stable').length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Ổn định</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-yellow-500/20 p-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{elders.filter((e) => e.status === 'attention').length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Cần chú ý</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-red-500/20 p-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{elders.filter((e) => e.status === 'critical').length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Nguy cấp</p>
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
            placeholder="Tìm kiếm theo tên hoặc phòng..."
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
            variant={statusFilter === 'stable' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('stable')}
          >
            Ổn định
          </Button>
          <Button
            variant={statusFilter === 'attention' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('attention')}
          >
            Cần chú ý
          </Button>
          <Button
            variant={statusFilter === 'critical' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('critical')}
          >
            Nguy cấp
          </Button>
        </div>
      </div>

      {/* Elders Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredElders.map((elder) => {
          const status = statusConfig[elder.status as keyof typeof statusConfig]
          const fallRisk = fallRiskConfig[elder.fallRisk as keyof typeof fallRiskConfig]
          
          return (
            <Card key={elder.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className={cn('h-1', status.color)} />
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-14 w-14 ring-2 ring-slate-100 dark:ring-slate-800">
                      <AvatarImage src={elder.avatar} alt={elder.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-lg font-bold">
                        {elder.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn('absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white dark:border-slate-900', status.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                        {elder.name}
                      </h3>
                      <Badge className={cn('text-xs', status.bg, status.text)}>
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Phòng {elder.room} • {elder.age} tuổi
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className={cn('text-xs', fallRisk.bg, fallRisk.color)}>
                        Nguy cơ té: {elder.fallRisk}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Health Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">Nhịp tim</span>
                    </div>
                    <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                      {elder.heartRate} <span className="text-xs font-normal text-slate-400">bpm</span>
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">Huyết áp</span>
                    </div>
                    <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                      {elder.bloodPressure}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">Hoạt động</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={elder.activity} className="h-2 flex-1" />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{elder.activity}%</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Moon className="h-3.5 w-3.5 text-purple-500" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">Giấc ngủ</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={elder.sleep} className="h-2 flex-1" indicatorClassName="bg-purple-500" />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{elder.sleep}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-400">
                    Người liên hệ: <span className="text-slate-600 dark:text-slate-300">{elder.familyContact}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
