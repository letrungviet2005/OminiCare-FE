import { useQuery } from '@tanstack/react-query'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { QuickResidents } from '@/components/dashboard/QuickResidents'
import { ChartCard, HealthScoreChart } from '@/components/analytics/Charts'
import { RecentAlerts } from '@/components/alerts/RecentAlerts'
import { dashboardService } from '@/services'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Users,
  AlertTriangle,
  Video,
  Clock,
} from 'lucide-react'

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardService.getStats,
  })

  const { data: activityData, isLoading: activityLoading } = useQuery({
    queryKey: ['activity-data'],
    queryFn: dashboardService.getActivityData,
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Tổng quan hệ thống giám sát OmniCare AI
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? (
          <>
            <Skeleton className="h-[140px]" />
            <Skeleton className="h-[140px]" />
            <Skeleton className="h-[140px]" />
            <Skeleton className="h-[140px]" />
          </>
        ) : (
          <>
            <MetricCard
              title="Tổng cư dân"
              value={stats?.totalResidents || 0}
              icon={Users}
              trend={8.2}
              trendLabel="vs last week"
              variant="default"
            />
            <MetricCard
              title="Cảnh báo hôm nay"
              value={stats?.activeAlerts || 0}
              icon={AlertTriangle}
              trend={-15.3}
              trendLabel="vs yesterday"
              variant="warning"
            />
            <MetricCard
              title="Camera online"
              value={`${stats?.camerasOnline || 0}/12`}
              icon={Video}
              variant="success"
            />
            <MetricCard
              title="Phản hồi TB"
              value={`${stats?.avgResponseTime || 0}s`}
              icon={Clock}
              trend={-22.1}
              trendLabel="improved"
              variant="success"
            />
          </>
        )}
      </div>

      {/* Health Score */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {activityLoading ? (
            <Skeleton className="h-[300px]" />
          ) : (
            <ChartCard
              title="Hoạt động cư dân"
              subtitle="24 giờ qua"
              data={activityData || []}
              type="area"
              dataKey="residents"
              color="#0066FF"
            />
          )}
        </div>
        <div>
          <HealthScoreChart />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activity Feed */}
        <ActivityFeed />

        {/* Quick Residents */}
        <QuickResidents />
      </div>

      {/* Recent Alerts */}
      <RecentAlerts />
    </div>
  )
}
