import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Users,
  UserCircle,
  HardDrive,
  AlertTriangle,
  Heart,
  Calendar,
  MessageSquare,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Types
interface Relative {
  id: string
  name: string
  relation: string
  avatar: string
  phone: string
  email: string
}

interface Elder {
  id: string
  name: string
  age: number
  room: string
  avatar: string
  status: string
  healthScore: number
}

interface Device {
  id: string
  name: string
  type: string
  status: string
  location: string
}

interface Alert {
  id: string
  type: string
  message: string
  timestamp: string
  severity: string
}

interface Family {
  id: string
  name: string
  address: string
  phone: string
  email: string
  avatar: string
  members: number
  elders: Elder[]
  devices: Device[]
  alerts: Alert[]
  relatives: Relative[]
  createdAt: string
}

// Mock Data
const mockFamilies: Family[] = [
  {
    id: '1',
    name: 'Nguyễn Gia Hùng',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    phone: '+84 123 456 789',
    email: 'hung.nguyen@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    members: 4,
    elders: [
      {
        id: '1',
        name: 'Nguyễn Thị Lan',
        age: 78,
        room: '201',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
        status: 'attention',
        healthScore: 75,
      },
    ],
    devices: [
      {
        id: '1',
        name: 'Camera 201',
        type: 'camera',
        status: 'online',
        location: 'Phòng 201',
      },
    ],
    alerts: [
      {
        id: '1',
        type: 'fall',
        message: 'Phát hiện té ngã',
        timestamp: '2026-07-14 01:30',
        severity: 'critical',
      },
    ],
    relatives: [
      {
        id: '1',
        name: 'Nguyễn Gia Hùng',
        relation: 'Con trai',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        phone: '+84 123 456 789',
        email: 'hung.nguyen@email.com',
      },
      {
        id: '2',
        name: 'Trần Thị Hương',
        relation: 'Con gái',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        phone: '+84 234 567 890',
        email: 'huong.tran@email.com',
      },
    ],
    createdAt: '2025-03-15',
  },
  {
    id: '2',
    name: 'Trần Minh Tuấn',
    address: '456 Đường XYZ, Quận 2, TP.HCM',
    phone: '+84 234 567 890',
    email: 'tuan.tran@email.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    members: 3,
    elders: [
      {
        id: '2',
        name: 'Trần Văn Minh',
        age: 82,
        room: '105',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        status: 'stable',
        healthScore: 92,
      },
      {
        id: '3',
        name: 'Bà Trần Thị Bình',
        age: 76,
        room: '107',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        status: 'stable',
        healthScore: 88,
      },
    ],
    devices: [
      {
        id: '2',
        name: 'Camera 105',
        type: 'camera',
        status: 'online',
        location: 'Phòng 105',
      },
      {
        id: '3',
        name: 'Sensor 107-A',
        type: 'sensor',
        status: 'online',
        location: 'Phòng 107',
      },
    ],
    alerts: [
      {
        id: '2',
        type: 'heart',
        message: 'Nhịp tim bất thường',
        timestamp: '2026-07-14 00:45',
        severity: 'warning',
      },
    ],
    relatives: [
      {
        id: '3',
        name: 'Trần Minh Tuấn',
        relation: 'Con trai',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        phone: '+84 234 567 890',
        email: 'tuan.tran@email.com',
      },
    ],
    createdAt: '2025-01-20',
  },
  {
    id: '3',
    name: 'Lê Hoàng Nam',
    address: '789 Đường DEF, Quận 3, TP.HCM',
    phone: '+84 345 678 901',
    email: 'nam.le@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    members: 5,
    elders: [
      {
        id: '4',
        name: 'Lê Văn Tuấn',
        age: 80,
        room: '108',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        status: 'stable',
        healthScore: 95,
      },
    ],
    devices: [
      {
        id: '4',
        name: 'Camera 108',
        type: 'camera',
        status: 'online',
        location: 'Phòng 108',
      },
    ],
    alerts: [],
    relatives: [
      {
        id: '4',
        name: 'Lê Hoàng Nam',
        relation: 'Con trai',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        phone: '+84 345 678 901',
        email: 'nam.le@email.com',
      },
      {
        id: '5',
        name: 'Nguyễn Thị Lan',
        relation: 'Vợ',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
        phone: '+84 456 789 012',
        email: 'lan.nguyen@email.com',
      },
    ],
    createdAt: '2025-05-10',
  },
  {
    id: '4',
    name: 'Phạm Quốc Việt',
    address: '321 Đường GHI, Quận 4, TP.HCM',
    phone: '+84 456 789 012',
    email: 'viet.pham@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    members: 3,
    elders: [
      {
        id: '5',
        name: 'Phạm Thị Hương',
        age: 75,
        room: '302',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        status: 'critical',
        healthScore: 45,
      },
    ],
    devices: [
      {
        id: '5',
        name: 'Camera 302',
        type: 'camera',
        status: 'warning',
        location: 'Phòng 302',
      },
    ],
    alerts: [
      {
        id: '3',
        type: 'fall',
        message: 'Phát hiện té ngã',
        timestamp: '2026-07-13 22:15',
        severity: 'critical',
      },
      {
        id: '4',
        type: 'sos',
        message: 'Tín hiệu SOS',
        timestamp: '2026-07-13 20:30',
        severity: 'critical',
      },
    ],
    relatives: [
      {
        id: '6',
        name: 'Phạm Quốc Việt',
        relation: 'Cháu',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        phone: '+84 456 789 012',
        email: 'viet.pham@email.com',
      },
    ],
    createdAt: '2025-02-28',
  },
  {
    id: '5',
    name: 'Hoàng Đình Khánh',
    address: '654 Đường JKL, Quận 5, TP.HCM',
    phone: '+84 567 890 123',
    email: 'khanh.hoang@email.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    members: 4,
    elders: [
      {
        id: '6',
        name: 'Bà Hoàng Thị Mai',
        age: 77,
        room: '205',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        status: 'stable',
        healthScore: 88,
      },
    ],
    devices: [
      {
        id: '6',
        name: 'Camera 205',
        type: 'camera',
        status: 'online',
        location: 'Phòng 205',
      },
    ],
    alerts: [],
    relatives: [
      {
        id: '7',
        name: 'Hoàng Đình Khánh',
        relation: 'Con trai',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        phone: '+84 567 890 123',
        email: 'khanh.hoang@email.com',
      },
    ],
    createdAt: '2025-04-05',
  },
  {
    id: '6',
    name: 'Vũ Thanh Sơn',
    address: '987 Đường MNO, Quận 6, TP.HCM',
    phone: '+84 678 901 234',
    email: 'son.vu@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    members: 2,
    elders: [
      {
        id: '7',
        name: 'Ông Vũ Văn Hùng',
        age: 84,
        room: '310',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        status: 'attention',
        healthScore: 68,
      },
    ],
    devices: [
      {
        id: '7',
        name: 'Camera 310',
        type: 'camera',
        status: 'offline',
        location: 'Phòng 310',
      },
    ],
    alerts: [
      {
        id: '5',
        type: 'system',
        message: 'Camera offline',
        timestamp: '2026-07-13 18:00',
        severity: 'info',
      },
    ],
    relatives: [
      {
        id: '8',
        name: 'Vũ Thanh Sơn',
        relation: 'Con trai',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        phone: '+84 678 901 234',
        email: 'son.vu@email.com',
      },
    ],
    createdAt: '2025-06-12',
  },
]

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { color: string; bg: string; label: string }> = {
    online: { color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-500/20', label: 'Online' },
    offline: { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-500/20', label: 'Offline' },
    warning: { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-500/20', label: 'Warning' },
    stable: { color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-500/20', label: 'Ổn định' },
    attention: { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-500/20', label: 'Cần chú ý' },
    critical: { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-500/20', label: 'Nguy cấp' },
  }
  const { color, bg, label } = config[status] || config.offline
  return <Badge className={cn('text-xs font-medium', bg, color)}>{label}</Badge>
}

// Severity Badge
const SeverityBadge = ({ severity }: { severity: string }) => {
  const config: Record<string, { color: string; bg: string }> = {
    critical: { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-500/20' },
    warning: { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-500/20' },
    info: { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/20' },
  }
  const { color, bg } = config[severity] || config.info
  return <Badge className={cn('text-xs', bg, color)}>{severity}</Badge>
}

// Family Detail Modal
const FamilyDetailModal = ({
  family,
  open,
  onClose,
}: {
  family: Family | null
  open: boolean
  onClose: () => void
}) => {
  if (!family) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between pr-8">
            <DialogTitle className="text-xl font-bold">Chi tiết gia đình</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Family Header */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <Avatar className="h-16 w-16 ring-4 ring-blue-500/20">
              <AvatarImage src={family.avatar} alt={family.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xl font-bold">
                {family.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{family.name}</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {family.phone}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {family.email}
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5" />
                {family.address}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-500">{family.members}</div>
              <div className="text-xs text-slate-500">Thành viên</div>
            </div>
          </div>

          {/* Tabs for content */}
          <Tabs defaultValue="elders" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="elders" className="gap-1">
                <UserCircle className="h-4 w-4" />
                Elders ({family.elders.length})
              </TabsTrigger>
              <TabsTrigger value="relatives" className="gap-1">
                <Users className="h-4 w-4" />
                Relatives ({family.relatives.length})
              </TabsTrigger>
              <TabsTrigger value="devices" className="gap-1">
                <HardDrive className="h-4 w-4" />
                Devices ({family.devices.length})
              </TabsTrigger>
              <TabsTrigger value="alerts" className="gap-1">
                <AlertTriangle className="h-4 w-4" />
                Alerts ({family.alerts.length})
              </TabsTrigger>
            </TabsList>

            {/* Elders Tab */}
            <TabsContent value="elders" className="mt-4">
              <div className="grid gap-3">
                {family.elders.map((elder) => (
                  <div
                    key={elder.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={elder.avatar} alt={elder.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                        {elder.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{elder.name}</span>
                        <StatusBadge status={elder.status} />
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Phòng {elder.room} • {elder.age} tuổi
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-500">{elder.healthScore}%</div>
                      <div className="text-xs text-slate-500">Health Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Relatives Tab */}
            <TabsContent value="relatives" className="mt-4">
              <div className="grid gap-3">
                {family.relatives.map((relative) => (
                  <div
                    key={relative.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={relative.avatar} alt={relative.name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {relative.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{relative.name}</span>
                        <Badge variant="outline" className="text-xs">{relative.relation}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          {relative.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          {relative.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Devices Tab */}
            <TabsContent value="devices" className="mt-4">
              <div className="grid gap-3">
                {family.devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      device.type === 'camera' ? 'bg-blue-500/10' : 'bg-purple-500/10'
                    )}>
                      <HardDrive className={cn(
                        'h-5 w-5',
                        device.type === 'camera' ? 'text-blue-500' : 'text-purple-500'
                      )} />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-slate-900 dark:text-white">{device.name}</span>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{device.location}</div>
                    </div>
                    <StatusBadge status={device.status} />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="mt-4">
              {family.alerts.length === 0 ? (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Không có cảnh báo gần đây</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {family.alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={cn(
                        'flex items-center gap-4 p-3 rounded-lg border',
                        alert.severity === 'critical' ? 'bg-red-500/5 border-red-500/20' :
                        alert.severity === 'warning' ? 'bg-yellow-500/5 border-yellow-500/20' :
                        'bg-blue-500/5 border-blue-500/20'
                      )}
                    >
                      <div className={cn(
                        'h-10 w-10 rounded-lg flex items-center justify-center',
                        alert.severity === 'critical' ? 'bg-red-500/10' :
                        alert.severity === 'warning' ? 'bg-yellow-500/10' :
                        'bg-blue-500/10'
                      )}>
                        <AlertTriangle className={cn(
                          'h-5 w-5',
                          alert.severity === 'critical' ? 'text-red-500' :
                          alert.severity === 'warning' ? 'text-yellow-500' :
                          'text-blue-500'
                        )} />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-slate-900 dark:text-white">{alert.message}</span>
                        <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5" />
                          {alert.timestamp}
                        </div>
                      </div>
                      <SeverityBadge severity={alert.severity} />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Main Component
export function FamilyManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const itemsPerPage = 5

  const filteredFamilies = mockFamilies.filter(
    (family) =>
      family.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      family.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      family.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredFamilies.length / itemsPerPage)
  const paginatedFamilies = filteredFamilies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleView = (family: Family) => {
    setSelectedFamily(family)
    setShowDetailModal(true)
  }

  const handleEdit = (family: Family) => {
    console.log('Edit family:', family.id)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Family Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Quản lý thông tin gia đình và người thân
          </p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
          <Plus className="h-4 w-4" />
          Thêm gia đình
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-500/20 p-3">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockFamilies.length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tổng gia đình</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-500/20 p-3">
                <UserCircle className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockFamilies.reduce((acc, f) => acc + f.elders.length, 0)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Elders</p>
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
                <p className="text-2xl font-bold">{mockFamilies.reduce((acc, f) => acc + f.members, 0)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Thành viên</p>
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
                <p className="text-2xl font-bold">{mockFamilies.reduce((acc, f) => acc + f.alerts.length, 0)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Alerts</p>
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
            placeholder="Tìm kiếm theo tên, địa chỉ, email..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Bộ lọc
        </Button>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                <TableHead className="font-semibold">Gia đình</TableHead>
                <TableHead className="font-semibold">Địa chỉ</TableHead>
                <TableHead className="font-semibold">Liên hệ</TableHead>
                <TableHead className="font-semibold">Elders</TableHead>
                <TableHead className="font-semibold">Thành viên</TableHead>
                <TableHead className="font-semibold">Alerts</TableHead>
                <TableHead className="font-semibold text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedFamilies.map((family) => (
                <TableRow key={family.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-slate-100 dark:ring-slate-800">
                        <AvatarImage src={family.avatar} alt={family.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-sm font-bold">
                          {family.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{family.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {family.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300 max-w-[200px]">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{family.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {family.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {family.elders.slice(0, 3).map((elder) => (
                        <Avatar key={elder.id} className="h-8 w-8 ring-2 ring-white dark:ring-slate-900">
                          <AvatarImage src={elder.avatar} alt={elder.name} />
                          <AvatarFallback className="text-[10px]">
                            {elder.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {family.elders.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium">
                          +{family.elders.length - 3}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-semibold">
                      {family.members}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {family.alerts.length > 0 ? (
                      <Badge
                        className={cn(
                          'font-semibold',
                          family.alerts.some((a) => a.severity === 'critical')
                            ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
                        )}
                      >
                        {family.alerts.length}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-emerald-600 border-emerald-300 dark:border-emerald-700">
                        Không có
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                        onClick={() => handleView(family)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={() => handleEdit(family)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredFamilies.length)} của {filteredFamilies.length}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Trước
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'w-9',
                  currentPage === page && 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                )}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Sau
            </Button>
          </div>
        </div>
      </Card>

      {/* Family Detail Modal */}
      <FamilyDetailModal
        family={selectedFamily}
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  )
}

export default FamilyManagement
