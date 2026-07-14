import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  LayoutDashboard,
  Users,
  UserCircle,
  HardDrive,
  Brain,
  AlertTriangle,
  FileBarChart,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
  Cpu,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: 'Families',
    href: '/family-management',
    icon: Users,
    badge: '12',
  },
  {
    title: 'Elders',
    href: '/elder-management',
    icon: UserCircle,
    badge: '24',
  },
  {
    title: 'Devices',
    href: '/devices',
    icon: HardDrive,
    badge: '8',
  },
  {
    title: 'AI Events',
    href: '/ai-events',
    icon: Brain,
    badge: '3',
    highlight: true,
  },
  {
    title: 'Alerts',
    href: '/alerts',
    icon: AlertTriangle,
    badge: '7',
    critical: true,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileBarChart,
    badge: null,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    badge: null,
  },
]

const systemStats = [
  {
    label: 'Cameras',
    value: 12,
    active: 12,
    status: 'online',
    color: 'bg-emerald-500',
  },
  {
    label: 'AI Engine',
    value: 'Active',
    status: 'online',
    color: 'bg-blue-500',
  },
  {
    label: 'Network',
    value: 'Good',
    status: 'online',
    color: 'bg-emerald-500',
  },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 flex h-full flex-col border-r border-slate-200/10 bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl transition-all duration-300 dark:border-slate-800',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo Header */}
      <div className="relative flex h-16 items-center justify-between border-b border-slate-800 px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25">
            <Activity className="h-5 w-5 text-white" />
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-500 animate-pulse">
              <div className="h-full w-full rounded-full bg-emerald-500 animate-ping" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-[15px] font-bold tracking-tight text-white">
                OmniCare
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-blue-400">
                AI Platform
              </span>
            </div>
          )}
        </Link>
        {onToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white"
            onClick={onToggle}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            const Icon = item.icon

            if (collapsed) {
              return (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        'group relative flex h-11 w-full items-center justify-center rounded-xl transition-all duration-200',
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 shadow-lg shadow-blue-500/10'
                          : item.critical
                          ? 'text-slate-400 hover:bg-slate-800/50 hover:text-yellow-400'
                          : item.highlight
                          ? 'text-slate-400 hover:bg-slate-800/50 hover:text-purple-400'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.badge && (
                        <span className={cn(
                          'absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full text-[10px] font-bold',
                          item.critical
                            ? 'bg-red-500 text-white'
                            : 'bg-blue-500 text-white'
                        )}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-gradient-to-b from-blue-500 to-cyan-500" />
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-slate-800 text-white border-slate-700">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 shadow-lg shadow-blue-500/10'
                    : item.critical
                    ? 'text-slate-400 hover:bg-slate-800/50 hover:text-yellow-400'
                    : item.highlight
                    ? 'text-slate-400 hover:bg-slate-800/50 hover:text-purple-400'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <span className={cn(
                    'flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold',
                    item.critical
                      ? 'bg-red-500/20 text-red-400'
                      : isActive
                      ? 'bg-blue-500/30 text-blue-300'
                      : 'bg-slate-700/50 text-slate-400'
                  )}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-gradient-to-b from-blue-500 to-cyan-500" />
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* System Status */}
      {!collapsed && (
        <div className="border-t border-slate-800 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              System Status
            </span>
          </div>
          <div className="space-y-3">
            {systemStats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn('h-2 w-2 rounded-full', stat.color)} />
                  <span className="text-xs text-slate-400">{stat.label}</span>
                </div>
                <Badge
                  variant="secondary"
                  className="h-5 bg-emerald-500/10 text-[10px] font-semibold text-emerald-400 hover:bg-emerald-500/10"
                >
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {stat.value}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="border-t border-slate-800 p-3">
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl bg-slate-800/50 p-2 transition-colors hover:bg-slate-800 cursor-pointer',
            collapsed && 'justify-center'
          )}
        >
          <Avatar className="h-9 w-9 ring-2 ring-blue-500/20">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs font-bold">
              AH
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Anh Hùng</p>
              <p className="text-[10px] text-slate-400 truncate">Administrator</p>
            </div>
          )}
          {!collapsed && (
            <div className="flex h-2 w-2">
              <span className="absolute h-2 w-2 rounded-full bg-emerald-500" />
              <span className="absolute h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
