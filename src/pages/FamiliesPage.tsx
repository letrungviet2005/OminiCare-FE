import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Users,
  Phone,
  MessageSquare,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Heart,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const families = [
  {
    id: '1',
    name: 'Nguyễn Gia Hưng',
    relation: 'Con trai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    phone: '+84 123 456 789',
    email: 'hung.nguyen@email.com',
    elderName: 'Nguyễn Thị Lan',
    elderRoom: '201',
    notifications: true,
    lastVisit: '2 giờ trước',
  },
  {
    id: '2',
    name: 'Trần Minh Châu',
    relation: 'Con gái',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    phone: '+84 234 567 890',
    email: 'chau.tran@email.com',
    elderName: 'Trần Văn Minh',
    elderRoom: '105',
    notifications: true,
    lastVisit: '1 ngày trước',
  },
  {
    id: '3',
    name: 'Phạm Quốc Việt',
    relation: 'Cháu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    phone: '+84 345 678 901',
    email: 'viet.pham@email.com',
    elderName: 'Phạm Thị Hương',
    elderRoom: '302',
    notifications: false,
    lastVisit: '3 ngày trước',
  },
  {
    id: '4',
    name: 'Lê Thị Hòa',
    relation: 'Vợ',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    phone: '+84 456 789 012',
    email: 'hoa.le@email.com',
    elderName: 'Lê Văn Tuấn',
    elderRoom: '108',
    notifications: true,
    lastVisit: '5 giờ trước',
  },
]

export function FamiliesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFamily, setSelectedFamily] = useState<typeof families[0] | null>(null)

  const filteredFamilies = families.filter(
    (family) =>
      family.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      family.elderName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Families
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Quản lý thông tin gia đình và liên lạc
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm gia đình
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-500/20 p-3">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{families.length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tổng gia đình</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-500/20 p-3">
                <MessageSquare className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{families.filter((f) => f.notifications).length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Đã bật thông báo</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-purple-500/20 p-3">
                <Heart className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Elders được giám sát</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-orange-500/20 p-3">
                <Phone className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tin nhắn hôm nay</p>
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
            placeholder="Tìm kiếm theo tên..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Bộ lọc
        </Button>
      </div>

      {/* Families Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredFamilies.map((family) => (
          <Card
            key={family.id}
            className={cn(
              'cursor-pointer transition-all hover:shadow-lg hover:border-blue-500/30',
              selectedFamily?.id === family.id && 'ring-2 ring-blue-500'
            )}
            onClick={() => setSelectedFamily(family)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 ring-2 ring-slate-100 dark:ring-slate-800">
                  <AvatarImage src={family.avatar} alt={family.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    {family.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                      {family.name}
                    </h3>
                    <Badge
                      variant={family.notifications ? 'default' : 'secondary'}
                      className={cn(
                        'text-xs',
                        family.notifications && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      )}
                    >
                      {family.notifications ? 'Đã bật' : 'Tắt'}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {family.relation}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {family.phone}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={family.avatar} />
                      <AvatarFallback className="text-[10px]">EL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {family.elderName}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Phòng {family.elderRoom}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Lần cuối thăm: {family.lastVisit}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Phone className="h-3 w-3" />
                  Gọi
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <MessageSquare className="h-3 w-3" />
                  Nhắn
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
