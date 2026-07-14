import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FileBarChart,
  Download,
  Calendar,
  Search,
  FileText,
  TrendingUp,
  Users,
  AlertTriangle,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const reports = [
  {
    id: '1',
    name: 'Báo cáo tháng 6/2026',
    type: 'monthly',
    createdAt: '2026-06-30',
    size: '2.4 MB',
    status: 'completed',
    elderCount: 24,
    alertCount: 45,
  },
  {
    id: '2',
    name: 'Báo cáo sức khỏe - Nguyễn Thị Lan',
    type: 'health',
    createdAt: '2026-06-28',
    size: '1.2 MB',
    status: 'completed',
    elderCount: 1,
    alertCount: 12,
  },
  {
    id: '3',
    name: 'Báo cáo sự cố té ngã',
    type: 'incident',
    createdAt: '2026-06-25',
    size: '856 KB',
    status: 'completed',
    elderCount: 5,
    alertCount: 8,
  },
  {
    id: '4',
    name: 'Báo cáo tuần 25',
    type: 'weekly',
    createdAt: '2026-06-24',
    size: '1.8 MB',
    status: 'completed',
    elderCount: 24,
    alertCount: 23,
  },
  {
    id: '5',
    name: 'Báo cáo hoạt động AI',
    type: 'ai',
    createdAt: '2026-06-20',
    size: '3.1 MB',
    status: 'completed',
    elderCount: 24,
    alertCount: 67,
  },
]

const reportTypes = {
  monthly: { icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Báo cáo tháng' },
  weekly: { icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Báo cáo tuần' },
  health: { icon: FileText, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Sức khỏe' },
  incident: { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10', label: 'Sự cố' },
  ai: { icon: FileBarChart, color: 'text-purple-500', bg: 'bg-purple-500/10', label: 'AI Report' },
}

export function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || report.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reports</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Xem và tải báo cáo hệ thống
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Tạo báo cáo
          </Button>
          <Button className="gap-2">
            <FileBarChart className="h-4 w-4" />
            Báo cáo tự động
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-500/20 p-3">
                <FileBarChart className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reports.length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tổng báo cáo</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-500/20 p-3">
                <Users className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Elders giám sát</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-purple-500/20 p-3">
                <AlertTriangle className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Alerts tháng này</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-orange-500/20 p-3">
                <TrendingUp className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">-18%</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Giảm alerts</p>
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
            placeholder="Tìm kiếm báo cáo..."
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
            variant={typeFilter === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('monthly')}
          >
            Tháng
          </Button>
          <Button
            variant={typeFilter === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('weekly')}
          >
            Tuần
          </Button>
          <Button
            variant={typeFilter === 'health' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('health')}
          >
            Sức khỏe
          </Button>
          <Button
            variant={typeFilter === 'incident' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('incident')}
          >
            Sự cố
          </Button>
        </div>
      </div>

      {/* Reports List */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredReports.map((report) => {
          const reportType = reportTypes[report.type as keyof typeof reportTypes]
          const TypeIcon = reportType.icon

          return (
            <Card
              key={report.id}
              className="hover:shadow-lg transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={cn('rounded-xl p-3', reportType.bg)}>
                    <TypeIcon className={cn('h-6 w-6', reportType.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {report.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={cn('text-xs', reportType.bg, reportType.color)}>
                            {reportType.label}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {report.size}
                          </Badge>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                        Hoàn thành
                      </Badge>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {report.createdAt}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {report.elderCount} elders
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {report.alertCount} alerts
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        Xem
                      </Button>
                      <Button size="sm" className="flex-1 gap-1">
                        <Download className="h-3.5 w-3.5" />
                        Tải xuống
                      </Button>
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
