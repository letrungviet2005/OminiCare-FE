import { useLocation, Link } from 'react-router-dom'
import {
  Bell,
  Search,
  ChevronRight,
  Moon,
  Sun,
  Settings,
  LogOut,
  User,
  Activity,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/contexts/ThemeContext'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const routeNames: Record<string, string> = {
  '/': 'Dashboard',
  '/family-management': 'Family Management',
  '/elder-management': 'Elder Management',
  '/devices': 'Devices',
  '/ai-events': 'AI Events',
  '/alerts': 'Alerts',
  '/reports': 'Reports',
  '/settings': 'Settings',
}

const notifications = [
  {
    id: '1',
    type: 'critical',
    title: 'Fall Detected',
    message: 'Nguyễn Thị Lan - Phòng 201',
    time: '2 phút trước',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Heart Rate Alert',
    message: 'Trần Văn Minh - 105 bpm',
    time: '15 phút trước',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Camera Connected',
    message: 'Camera 5 đã kết nối lại',
    time: '1 giờ trước',
    read: true,
  },
  {
    id: '4',
    type: 'warning',
    title: 'Medication Reminder',
    message: 'Hoàng Thị Mai - uống thuốc',
    time: '2 giờ trước',
    read: true,
  },
]

const notificationStyles = {
  critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: 'text-red-500',
    dot: 'bg-red-500',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    icon: 'text-yellow-500',
    dot: 'bg-yellow-500',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'text-blue-500',
    dot: 'bg-blue-500',
  },
}

export function Topbar() {
  const location = useLocation()
  const currentPage = routeNames[location.pathname] || 'Dashboard'
  const { isDark, toggleTheme } = useTheme()
  const [showSearch, setShowSearch] = useState(false)
  const [unreadCount] = useState(2)

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/10 bg-white/95 backdrop-blur-xl dark:bg-slate-900/95 dark:border-slate-800">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-4 px-6">
        <div className="flex items-center gap-2 text-sm">
          <Activity className="h-4 w-4 text-blue-500" />
          <span className="text-slate-500 dark:text-slate-400">OmniCare</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">
            {currentPage}
          </span>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2 px-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <div className={cn(
            'relative transition-all duration-300',
            showSearch && 'absolute right-0 top-1/2 -translate-y-1/2'
          )}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Tìm kiếm..."
              className="h-9 w-[200px] border-slate-200 bg-slate-50 pl-9 pr-8 focus:w-[300px] dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-900 lg:w-[240px] lg:focus:w-[320px]"
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-400 lg:block">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 md:hidden"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={toggleTheme}
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-yellow-500" />
          ) : (
            <Moon className="h-4 w-4 text-slate-600" />
          )}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-bounce">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Thông báo</h3>
                <Badge variant="destructive" className="h-5 px-1.5">
                  {unreadCount} mới
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-7">
                Đánh dấu đã đọc
              </Button>
            </div>
            <ScrollArea className="h-[300px]">
              <div className="flex flex-col">
                {notifications.map((notification) => {
                  const styles = notificationStyles[notification.type as keyof typeof notificationStyles]
                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        'flex items-start gap-3 border-b border-slate-100 p-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50 cursor-pointer',
                        !notification.read && styles.bg
                      )}
                    >
                      <div className={cn('mt-1 rounded-lg p-2', styles.bg)}>
                        <div className={cn('h-2 w-2 rounded-full', styles.dot)} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">{notification.title}</p>
                          {!notification.read && (
                            <div className={cn('h-2 w-2 rounded-full', styles.dot)} />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {notification.message}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
            <div className="border-t border-slate-200 dark:border-slate-800 p-3">
              <Button variant="ghost" className="w-full text-xs" asChild>
                <Link to="/alerts">Xem tất cả thông báo</Link>
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full ring-2 ring-blue-500/20 hover:ring-blue-500/40"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs font-bold">
                  AH
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Anh Hùng</p>
                <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                  admin@omnicare.ai
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <User className="h-4 w-4" />
              Tài khoản
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2" asChild>
              <Link to="/settings">
                <Settings className="h-4 w-4" />
                Cài đặt
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
