import { Routes, Route } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { DashboardPage } from '@/pages/DashboardPage'
import { FamilyManagement } from '@/pages/FamilyManagement'
import { ElderManagement } from '@/pages/ElderManagement'
import { DevicesPage } from '@/pages/DevicesPage'
import { AIEventsPage } from '@/pages/AIEventsPage'
import { AlertsPage } from '@/pages/AlertsPage'
import { ReportsPage } from '@/pages/ReportsPage'
import { SettingsPage } from '@/pages/SettingsPage'

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/family-management" element={<FamilyManagement />} />
            <Route path="/elder-management" element={<ElderManagement />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/ai-events" element={<AIEventsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </DashboardLayout>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
