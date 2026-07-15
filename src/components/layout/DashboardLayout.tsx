import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { ToastHost } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { Heart, Cpu, Wifi, Shield, Clock } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <ToastHost>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div
          className={cn(
            'flex flex-col min-h-screen transition-all duration-300',
            sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
          )}
        >
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <Topbar />
          
          {/* Page Content */}
          <main className="flex-1 p-6 bg-slate-50 dark:bg-slate-950">
            <div className="mx-auto max-w-[1600px]">
              {children}
            </div>
          </main>
          
          {/* Footer */}
          <footer className="border-t border-slate-200/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <div className="mx-auto max-w-[1600px] px-6 py-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left - Brand */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      OmniCare AI Platform v1.0.0
                    </span>
                  </div>
                  <div className="hidden md:block h-4 w-px bg-slate-200 dark:bg-slate-800" />
                  <span className="hidden md:block text-xs text-slate-400 dark:text-slate-500">
                    © 2026 Hackathon Project
                  </span>
                </div>

                {/* Center - Status */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        All Systems Operational
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right - Quick Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5 text-blue-500" />
                      <span>CPU: 23%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wifi className="h-3.5 w-3.5 text-emerald-500" />
                      <span>Network: Good</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-purple-500" />
                      <span>SSL Valid</span>
                    </div>
                  </div>
                  <div className="hidden md:block h-4 w-px bg-slate-200 dark:bg-slate-800" />
                  <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Last sync: 2 min ago</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      </div>
    </ToastHost>
  )
}
