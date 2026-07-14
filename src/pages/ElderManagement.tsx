import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  User,
  Calendar,
  Phone,
  MapPin,
  Heart,
  Activity,
  Thermometer,
  AlertTriangle,
  Clock,
  UserCircle,
  HardDrive,
  Brain,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Types
interface Device {
  id: string
  name: string
  type: string
  status: string
}

interface FallEvent {
  id: string
  date: string
  time: string
  location: string
  severity: string
  response: string
}

interface AIEvent {
  id: string
  date: string
  time: string
  type: string
  confidence: number
  description: string
}

interface TemperatureRecord {
  id: string
  date: string
  time: string
  temperature: number
  status: string
}

interface Elder {
  id: string
  name: string
  age: number
  gender: string
  room: string
  avatar: string
  status: string
  riskLevel: string
  medicalHistory: string[]
  devices: Device[]
  fallEvents: FallEvent[]
  aiEvents: AIEvent[]
  temperatureRecords: TemperatureRecord[]
  phone: string
  address: string
  birthDate: string
  admissionDate: string
  emergencyContact: {
    name: string
    phone: string
    relation: string
  }
  healthScore: number
}

// Mock Data
const mockElders: Elder[] = [
  {
    id: '1',
    name: 'Nguyễn Thị Lan',
    age: 78,
    gender: 'Nữ',
    room: '201',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    status: 'attention',
    riskLevel: 'medium',
    medicalHistory: ['Tiểu đường type 2', 'Tăng huyết áp', 'Viêm khớp'],
    devices: [
      { id: '1', name: 'Camera 201', type: 'camera', status: 'online' },
      { id: '2', name: 'Sensor 201-A', type: 'sensor', status: 'online' },
    ],
    fallEvents: [
      { id: '1', date: '2026-07-14', time: '01:30', location: 'Phòng 201', severity: 'critical', response: 'Đã xử lý' },
      { id: '2', date: '2026-06-20', time: '14:15', location: 'Hành lang T2', severity: 'warning', response: 'Đã xử lý' },
    ],
    aiEvents: [
      { id: '1', date: '2026-07-14', time: '01:30', type: 'fall_detected', confidence: 98.5, description: 'Phát hiện té ngã trong phòng' },
      { id: '2', date: '2026-07-13', time: '08:00', type: 'activity_anomaly', confidence: 85.2, description: 'Hoạt động bất thường buổi sáng' },
      { id: '3', date: '2026-07-12', time: '22:30', type: 'face_recognition', confidence: 99.1, description: 'Nhận diện khuôn mặt thành công' },
    ],
    temperatureRecords: [
      { id: '1', date: '2026-07-14', time: '06:00', temperature: 36.5, status: 'normal' },
      { id: '2', date: '2026-07-13', time: '06:00', temperature: 36.8, status: 'normal' },
      { id: '3', date: '2026-07-12', time: '06:00', temperature: 37.2, status: 'elevated' },
      { id: '4', date: '2026-07-11', time: '06:00', temperature: 36.4, status: 'normal' },
      { id: '5', date: '2026-07-10', time: '06:00', temperature: 36.6, status: 'normal' },
    ],
    phone: '+84 123 456 789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    birthDate: '1948-03-15',
    admissionDate: '2025-01-10',
    emergencyContact: { name: 'Nguyễn Gia Hùng', phone: '+84 123 456 789', relation: 'Con trai' },
    healthScore: 75,
  },
  {
    id: '2',
    name: 'Trần Văn Minh',
    age: 82,
    gender: 'Nam',
    room: '105',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    status: 'stable',
    riskLevel: 'low',
    medicalHistory: ['Tim mạch', 'Cholesterol cao'],
    devices: [
      { id: '3', name: 'Camera 105', type: 'camera', status: 'online' },
    ],
    fallEvents: [],
    aiEvents: [
      { id: '4', date: '2026-07-13', time: '10:00', type: 'heart_rate', confidence: 92.0, description: 'Nhịp tim 72 bpm - Bình thường' },
      { id: '5', date: '2026-07-12', time: '14:00', type: 'activity', confidence: 88.5, description: 'Đi dạo trong vườn' },
    ],
    temperatureRecords: [
      { id: '6', date: '2026-07-14', time: '06:00', temperature: 36.3, status: 'normal' },
      { id: '7', date: '2026-07-13', time: '06:00', temperature: 36.5, status: 'normal' },
    ],
    phone: '+84 234 567 890',
    address: '456 Đường XYZ, Quận 2, TP.HCM',
    birthDate: '1944-08-22',
    admissionDate: '2025-02-15',
    emergencyContact: { name: 'Trần Minh Châu', phone: '+84 234 567 890', relation: 'Con gái' },
    healthScore: 92,
  },
  {
    id: '3',
    name: 'Phạm Thị Hương',
    age: 75,
    gender: 'Nữ',
    room: '302',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    status: 'critical',
    riskLevel: 'high',
    medicalHistory: ['Hen suyễn', 'Loãng xương', 'Tăng huyết áp'],
    devices: [
      { id: '4', name: 'Camera 302', type: 'camera', status: 'warning' },
      { id: '5', name: 'Sensor 302-A', type: 'sensor', status: 'online' },
    ],
    fallEvents: [
      { id: '3', date: '2026-07-13', time: '22:15', location: 'Phòng 302', severity: 'critical', response: 'Đã xử lý' },
    ],
    aiEvents: [
      { id: '6', date: '2026-07-14', time: '02:00', type: 'fall_detected', confidence: 97.8, description: 'Phát hiện té ngã' },
      { id: '7', date: '2026-07-14', time: '01:00', type: 'heart_rate', confidence: 95.5, description: 'Nhịp tim bất thường: 105 bpm' },
    ],
    temperatureRecords: [
      { id: '8', date: '2026-07-14', time: '06:00', temperature: 37.5, status: 'elevated' },
      { id: '9', date: '2026-07-13', time: '06:00', temperature: 37.8, status: 'fever' },
    ],
    phone: '+84 345 678 901',
    address: '789 Đường DEF, Quận 3, TP.HCM',
    birthDate: '1951-05-08',
    admissionDate: '2025-03-01',
    emergencyContact: { name: 'Phạm Quốc Việt', phone: '+84 345 678 901', relation: 'Cháu' },
    healthScore: 45,
  },
  {
    id: '4',
    name: 'Lê Văn Tuấn',
    age: 80,
    gender: 'Nam',
    room: '108',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    status: 'stable',
    riskLevel: 'low',
    medicalHistory: ['Viêm khớp nhẹ'],
    devices: [
      { id: '6', name: 'Camera 108', type: 'camera', status: 'online' },
    ],
    fallEvents: [],
    aiEvents: [
      { id: '8', date: '2026-07-13', time: '16:00', type: 'activity', confidence: 91.0, description: 'Đang xem TV' },
    ],
    temperatureRecords: [
      { id: '10', date: '2026-07-14', time: '06:00', temperature: 36.4, status: 'normal' },
    ],
    phone: '+84 456 789 012',
    address: '321 Đường GHI, Quận 4, TP.HCM',
    birthDate: '1946-12-20',
    admissionDate: '2025-01-25',
    emergencyContact: { name: 'Lê Hoàng Nam', phone: '+84 456 789 012', relation: 'Con trai' },
    healthScore: 95,
  },
  {
    id: '5',
    name: 'Hoàng Thị Mai',
    age: 76,
    gender: 'Nữ',
    room: '205',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    status: 'stable',
    riskLevel: 'low',
    medicalHistory: ['Sức khỏe tốt'],
    devices: [
      { id: '7', name: 'Camera 205', type: 'camera', status: 'online' },
    ],
    fallEvents: [],
    aiEvents: [
      { id: '9', date: '2026-07-14', time: '07:00', type: 'face_recognition', confidence: 99.5, description: 'Nhận diện khuôn mặt' },
    ],
    temperatureRecords: [
      { id: '11', date: '2026-07-14', time: '06:00', temperature: 36.2, status: 'normal' },
    ],
    phone: '+84 567 890 123',
    address: '654 Đường JKL, Quận 5, TP.HCM',
    birthDate: '1950-07-14',
    admissionDate: '2025-04-10',
    emergencyContact: { name: 'Hoàng Đình Khánh', phone: '+84 567 890 123', relation: 'Con trai' },
    healthScore: 88,
  },
  {
    id: '6',
    name: 'Đặng Văn Hùng',
    age: 84,
    gender: 'Nam',
    room: '310',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    status: 'attention',
    riskLevel: 'medium',
    medicalHistory: ['Bệnh Parkinson', 'Tăng huyết áp'],
    devices: [
      { id: '8', name: 'Camera 310', type: 'camera', status: 'offline' },
    ],
    fallEvents: [
      { id: '4', date: '2026-06-15', time: '09:30', location: 'Phòng 310', severity: 'warning', response: 'Đã xử lý' },
    ],
    aiEvents: [
      { id: '10', date: '2026-07-13', time: '20:30', type: 'sos', confidence: 100, description: 'Tín hiệu SOS khẩn cấp' },
    ],
    temperatureRecords: [
      { id: '12', date: '2026-07-14', time: '06:00', temperature: 36.7, status: 'normal' },
    ],
    phone: '+84 678 901 234',
    address: '987 Đường MNO, Quận 6, TP.HCM',
    birthDate: '1942-11-05',
    admissionDate: '2025-02-01',
    emergencyContact: { name: 'Vũ Thanh Sơn', phone: '+84 678 901 234', relation: 'Con trai' },
    healthScore: 68,
  },
]

// Status Badge
const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { color: string; bg: string; label: string }> = {
    stable: { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-500/20', label: 'Ổn định' },
    attention: { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-500/20', label: 'Cần chú ý' },
    critical: { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-500/20', label: 'Nguy cấp' },
  }
  const { color, bg, label } = config[status] || config.stable
  return <Badge className={cn('text-xs font-medium', bg, color)}>{label}</Badge>
}

// Risk Level Badge
const RiskBadge = ({ level }: { level: string }) => {
  const config: Record<string, { color: string; bg: string; label: string }> = {
    low: { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-500/20', label: 'Thấp' },
    medium: { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-500/20', label: 'Trung bình' },
    high: { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-500/20', label: 'Cao' },
  }
  const { color, bg, label } = config[level] || config.low
  return <Badge className={cn('text-xs font-medium', bg, color)}>{label}</Badge>
}

// Timeline Component
const Timeline = ({ events }: { events: Array<{ date: string; title: string; description: string; icon: React.ReactNode; color: string }> }) => (
  <div className="relative">
    <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
    <div className="space-y-6">
      {events.map((event, index) => (
        <div key={index} className="relative pl-10">
          <div className={cn('absolute left-2 top-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center', event.color)}>
            <div className={cn('w-2 h-2 rounded-full', event.color.replace('bg-', '').replace('-500', ''))} />
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              {event.icon}
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{event.date}</span>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{event.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Elder Detail Modal
const ElderDetailModal = ({
  elder,
  open,
  onClose,
}: {
  elder: Elder | null
  open: boolean
  onClose: () => void
}) => {
  if (!elder) return null

  // Build timeline events
  const timelineEvents = [
    ...elder.aiEvents.map((event) => ({
      date: `${event.date} ${event.time}`,
      title: event.type === 'fall_detected' ? 'Phát hiện té ngã' : 
             event.type === 'heart_rate' ? 'Cảnh báo nhịp tim' :
             event.type === 'activity' ? 'Hoạt động' :
             event.type === 'sos' ? 'Tín hiệu SOS' : 'Nhận diện AI',
      description: event.description,
      icon: <Brain className="h-4 w-4 text-purple-500" />,
      color: 'bg-purple-500',
    })),
    ...elder.fallEvents.map((event) => ({
      date: `${event.date} ${event.time}`,
      title: `Sự cố té ngã - ${event.severity}`,
      description: `${event.location} - Phản ứng: ${event.response}`,
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
      color: 'bg-red-500',
    })),
    ...elder.temperatureRecords.map((record) => ({
      date: `${record.date} ${record.time}`,
      title: `Nhiệt độ: ${record.temperature}°C`,
      description: record.status === 'normal' ? 'Bình thường' : record.status === 'elevated' ? 'Hơi cao' : 'Sốt',
      icon: <Thermometer className="h-4 w-4 text-orange-500" />,
      color: record.status === 'fever' ? 'bg-red-500' : record.status === 'elevated' ? 'bg-yellow-500' : 'bg-emerald-500',
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="flex-shrink-0 p-6 pb-0">
          <div className="flex items-center justify-between pr-8">
            <DialogTitle className="text-xl font-bold">Chi tiết Elder</DialogTitle>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {/* Elder Header */}
          <div className="px-6 pb-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <div className="relative">
                <Avatar className="h-20 w-20 ring-4 ring-blue-500/20">
                  <AvatarImage src={elder.avatar} alt={elder.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-2xl font-bold">
                    {elder.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className={cn(
                  'absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white dark:border-slate-900',
                  elder.status === 'stable' ? 'bg-emerald-500' :
                  elder.status === 'attention' ? 'bg-yellow-500' : 'bg-red-500'
                )} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{elder.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>Phòng {elder.room}</span>
                  <span>•</span>
                  <span>{elder.age} tuổi</span>
                  <span>•</span>
                  <span>{elder.gender}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status={elder.status} />
                  <RiskBadge level={elder.riskLevel} />
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-500">{elder.healthScore}</div>
                <div className="text-xs text-slate-500">Health Score</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="info" className="gap-1">
                  <User className="h-4 w-4" />
                  Thông tin
                </TabsTrigger>
                <TabsTrigger value="timeline" className="gap-1">
                  <Clock className="h-4 w-4" />
                  Timeline
                </TabsTrigger>
                <TabsTrigger value="devices" className="gap-1">
                  <HardDrive className="h-4 w-4" />
                  Devices ({elder.devices.length})
                </TabsTrigger>
                <TabsTrigger value="medical" className="gap-1">
                  <Heart className="h-4 w-4" />
                  Y tế
                </TabsTrigger>
              </TabsList>

              {/* Info Tab */}
              <TabsContent value="info" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Thông tin cá nhân</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Ngày sinh</p>
                          <p className="text-sm font-medium">{elder.birthDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Địa chỉ</p>
                          <p className="text-sm font-medium">{elder.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Số điện thoại</p>
                          <p className="text-sm font-medium">{elder.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Ngày nhập viện</p>
                          <p className="text-sm font-medium">{elder.admissionDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Liên hệ khẩn cấp</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <UserCircle className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Tên</p>
                          <p className="text-sm font-medium">{elder.emergencyContact.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Điện thoại</p>
                          <p className="text-sm font-medium">{elder.emergencyContact.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Quan hệ</p>
                          <p className="text-sm font-medium">{elder.emergencyContact.relation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Medical History */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Bệnh nền</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {elder.medicalHistory.map((disease, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {disease}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline" className="max-h-[400px] overflow-y-auto pr-4">
                <Timeline events={timelineEvents} />
              </TabsContent>

              {/* Devices Tab */}
              <TabsContent value="devices" className="space-y-4">
                <div className="grid gap-3">
                  {elder.devices.map((device) => (
                    <div
                      key={device.id}
                      className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800"
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
                        <p className="font-medium text-slate-900 dark:text-white">{device.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{device.type}</p>
                      </div>
                      <Badge className={cn(
                        'text-xs',
                        device.status === 'online' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                        device.status === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                      )}>
                        {device.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Medical Tab */}
              <TabsContent value="medical" className="space-y-4">
                {/* Fall History */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Lịch sử té ngã
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {elder.fallEvents.length === 0 ? (
                      <p className="text-sm text-slate-500 text-center py-4">Không có sự cố té ngã</p>
                    ) : (
                      <div className="space-y-3">
                        {elder.fallEvents.map((event) => (
                          <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                            <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{event.date}</span>
                                <Badge className={cn(
                                  'text-xs',
                                  event.severity === 'critical' ? 'bg-red-500/20 text-red-600' : 'bg-yellow-500/20 text-yellow-600'
                                )}>
                                  {event.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-500">{event.location} - {event.response}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Temperature History */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      Lịch sử nhiệt độ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {elder.temperatureRecords.map((record) => (
                        <div key={record.id} className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{record.date}</span>
                              <Badge className={cn(
                                'text-xs',
                                record.status === 'normal' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20' :
                                record.status === 'elevated' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20' :
                                'bg-red-100 text-red-700 dark:bg-red-500/20'
                              )}>
                                {record.status === 'normal' ? 'BT' : record.status === 'elevated' ? 'Cao' : 'Sốt'}
                              </Badge>
                            </div>
                            <Progress 
                              value={record.temperature * 2.5} 
                              className="h-2"
                              indicatorClassName={cn(
                                record.status === 'normal' ? 'bg-emerald-500' :
                                record.status === 'elevated' ? 'bg-yellow-500' : 'bg-red-500'
                              )}
                            />
                          </div>
                          <div className="text-right min-w-[80px]">
                            <span className={cn(
                              'text-lg font-bold',
                              record.status === 'normal' ? 'text-emerald-600' :
                              record.status === 'elevated' ? 'text-yellow-600' : 'text-red-600'
                            )}>
                              {record.temperature}°C
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Events */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-500" />
                      Lịch sử AI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {elder.aiEvents.map((event) => (
                        <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                            <Brain className="h-5 w-5 text-purple-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{event.description}</span>
                              <Badge variant="outline" className="text-xs">
                                {event.confidence}%
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500">{event.date} {event.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Main Component
export function ElderManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedElder, setSelectedElder] = useState<Elder | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const itemsPerPage = 5

  const filteredElders = mockElders.filter((elder) => {
    const matchesSearch =
      elder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      elder.room.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || elder.status === statusFilter
    const matchesRisk = riskFilter === 'all' || elder.riskLevel === riskFilter
    return matchesSearch && matchesStatus && matchesRisk
  })

  const totalPages = Math.ceil(filteredElders.length / itemsPerPage)
  const paginatedElders = filteredElders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleView = (elder: Elder) => {
    setSelectedElder(elder)
    setShowDetailModal(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Elder Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Quản lý thông tin và theo dõi sức khỏe người cao tuổi
          </p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
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
                <UserCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockElders.length}</p>
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
                <p className="text-2xl font-bold">{mockElders.filter((e) => e.status === 'stable').length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Ổn định</p>
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
                <p className="text-2xl font-bold">{mockElders.filter((e) => e.status === 'attention').length}</p>
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
                <p className="text-2xl font-bold">{mockElders.filter((e) => e.status === 'critical').length}</p>
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
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            className="h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="stable">Ổn định</option>
            <option value="attention">Cần chú ý</option>
            <option value="critical">Nguy cấp</option>
          </select>
          <select
            className="h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm"
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option value="all">Tất cả risk</option>
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                <TableHead className="font-semibold">Elder</TableHead>
                <TableHead className="font-semibold">Phòng</TableHead>
                <TableHead className="font-semibold">Tuổi/Giới tính</TableHead>
                <TableHead className="font-semibold">Bệnh nền</TableHead>
                <TableHead className="font-semibold">Devices</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="font-semibold">Risk</TableHead>
                <TableHead className="font-semibold text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedElders.map((elder) => (
                <TableRow key={elder.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-slate-100 dark:ring-slate-800">
                        <AvatarImage src={elder.avatar} alt={elder.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-sm font-bold">
                          {elder.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{elder.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Score: {elder.healthScore}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{elder.room}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{elder.age} tuổi</p>
                      <p className="text-xs text-slate-500">{elder.gender}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {elder.medicalHistory.slice(0, 2).map((disease, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {disease}
                        </Badge>
                      ))}
                      {elder.medicalHistory.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{elder.medicalHistory.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {elder.devices.map((device) => (
                        <div
                          key={device.id}
                          className={cn(
                            'h-2 w-2 rounded-full',
                            device.status === 'online' ? 'bg-emerald-500' :
                            device.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                        />
                      ))}
                      <span className="text-xs text-slate-500 ml-1">{elder.devices.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={elder.status} />
                  </TableCell>
                  <TableCell>
                    <RiskBadge level={elder.riskLevel} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                        onClick={() => handleView(elder)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
            Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredElders.length)} của {filteredElders.length}
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

      {/* Elder Detail Modal */}
      <ElderDetailModal
        elder={selectedElder}
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  )
}

export default ElderManagement
