import { useQuery } from '@tanstack/react-query'
import { ResidentCard } from '@/components/residents/ResidentCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Filter, Plus, Users } from 'lucide-react'
import { useState } from 'react'
import { residentService } from '@/services'

export function ResidentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const { data: residents, isLoading } = useQuery({
    queryKey: ['residents'],
    queryFn: residentService.getAll,
  })

  const filteredResidents = residents?.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.room.includes(searchTerm)
    const matchesStatus =
      statusFilter === 'all' || resident.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cư dân</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin cư dân trong hệ thống
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Thêm cư dân
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{residents?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Tổng cư dân</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-lg bg-success/10 p-3">
              <span className="text-success font-bold text-lg">🟢</span>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {residents?.filter((r) => r.status === 'stable').length || 0}
              </p>
              <p className="text-sm text-muted-foreground">Ổn định</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-lg bg-warning/10 p-3">
              <span className="text-warning font-bold text-lg">🟡</span>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {residents?.filter((r) => r.status === 'attention').length || 0}
              </p>
              <p className="text-sm text-muted-foreground">Cần chú ý</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-lg bg-destructive/10 p-3">
              <span className="text-destructive font-bold text-lg">🔴</span>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {residents?.filter((r) => r.status === 'critical').length || 0}
              </p>
              <p className="text-sm text-muted-foreground">Nguy cấp</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên hoặc phòng..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="stable">Ổn định</SelectItem>
            <SelectItem value="attention">Cần chú ý</SelectItem>
            <SelectItem value="critical">Nguy cấp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Residents Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[200px]" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredResidents?.map((resident) => (
            <ResidentCard key={resident.id} resident={resident} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredResidents?.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Không tìm thấy cư dân</h3>
          <p className="text-muted-foreground">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </p>
        </div>
      )}
    </div>
  )
}
