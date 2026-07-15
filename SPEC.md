# OmniCare AI - Frontend Specification

## 1. Project Overview

**OmniCare AI** là hệ thống AI giám sát người cao tuổi bằng Camera AI. Phiên bản Demo Hackathon — kết nối Backend API (chưa có camera thật, AI phân tích video demo).

## 2. Tech Stack

- React 18 + TypeScript
- Vite 5
- TailwindCSS 3
- shadcn/ui
- React Router DOM v6
- Axios
- React Hook Form
- Recharts
- Lucide React
- React Query (TanStack Query)

## 3. Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#0066FF` | Primary actions, active states |
| `primary-foreground` | `#FFFFFF` | Text on primary |
| `secondary` | `#1A2332` | Secondary backgrounds |
| `accent` | `#00C9A7` | Success, positive metrics |
| `warning` | `#FFB020` | Warnings, caution states |
| `destructive` | `#FF4757` | Errors, critical alerts |
| `background` | `#0A0F1A` | App background |
| `surface` | `#111827` | Cards, panels |
| `surface-elevated` | `#1A2332` | Modals, dropdowns |
| `border` | `#1E2A3A` | Borders, dividers |
| `text-primary` | `#F8FAFC` | Primary text |
| `text-secondary` | `#94A3B8` | Secondary text |
| `text-muted` | `#64748B` | Muted text |

### Typography

- Font Family: `Inter` (Google Fonts) — clean, modern, professional
- Headings: Bold 600-700
- Body: Regular 400
- Monospace: `JetBrains Mono` for data/metrics

### Spacing System

- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- Border radius: 8px (sm), 12px (md), 16px (lg)

### Visual Style

- Dark theme base — deep navy backgrounds
- Glass morphism effects on cards
- Subtle gradient accents
- Smooth animations (200-400ms ease)
- Soft shadows with colored glows for status indicators

## 4. Layout Structure

### App Shell

```
┌──────────────────────────────────────────────────────────┐
│ Sidebar (240px fixed) │ Main Content Area                │
│ ───────────────────── │ ─────────────────────────────────│
│ Logo                  │ Header Bar                       │
│ Navigation            │ ─────────────────────────────────│
│ Quick Stats           │ Page Content                     │
│ Status Indicator      │ (scrollable)                     │
└──────────────────────────────────────────────────────────┘
```

### Pages

1. **Dashboard** (`/`) — Overview với KPI cards, live activity feed, mini charts
2. **Monitor** (`/monitor`) — Video player + real-time AI analysis overlay
3. **Residents** (`/residents`) — Danh sách cư dân với health cards
4. **Alerts** (`/alerts`) — Alert center với filters và history
5. **Analytics** (`/analytics`) — Charts, trends, AI insights
6. **Settings** (`/settings`) — Cấu hình hệ thống

## 5. Component Inventory

### Navigation
- `Sidebar` — Logo, nav items, collapse toggle, status badge
- `Header` — Breadcrumbs, search, notifications bell, user avatar
- `MobileNav` — Bottom tab bar for mobile

### Data Display
- `MetricCard` — KPI card với icon, value, trend indicator, sparkline
- `ResidentCard` — Profile avatar, name, status badge, quick actions
- `AlertCard` — Severity icon, message, timestamp, action buttons
- `ActivityItem` — Timeline item cho activity feed
- `StatusBadge` — Pill badge cho trạng thái (online/offline/warning)

### Charts
- `LineChart` — Trend lines (heart rate, activity)
- `AreaChart` — Filled area charts
- `BarChart` — Comparison charts
- `DonutChart` — Status distribution
- `SparklineChart` — Inline mini charts

### Video & Media
- `VideoPlayer` — Demo video player với controls
- `AILayer` — Overlay canvas cho AI bounding boxes
- `CameraGrid` — Multi-camera grid view

### Forms & Inputs
- `SearchInput` — Search với icon và clear button
- `SelectFilter` — Dropdown filter
- `DateRangePicker` — Date range selector
- `ToggleSwitch` — On/off toggle
- `Button` — Primary, secondary, ghost variants

### Feedback
- `Toast` — Notification toasts
- `Skeleton` — Loading skeletons
- `EmptyState` — Empty state illustrations

## 6. API Design (Mock)

### Endpoints

```
GET  /api/dashboard/stats        → Dashboard KPI summary
GET  /api/residents              → List all residents
GET  /api/residents/:id          → Single resident detail
GET  /api/alerts                 → Alert list (paginated)
GET  /api/alerts/stats           → Alert statistics
GET  /api/analytics/activity     → Activity trend data
GET  /api/analytics/health       → Health metrics data
GET  /api/monitoring/feed        → Live monitoring data
POST /api/auth/login             → Login
POST /api/auth/logout            → Logout
```

### Response Shapes

```typescript
// Dashboard Stats
{
  totalResidents: number;
  activeAlerts: number;
  camerasOnline: number;
  avgResponseTime: number;
  healthScore: number;
  trends: { label: string; value: number; change: number }[];
}

// Resident
{
  id: string;
  name: string;
  age: number;
  room: string;
  avatar: string;
  status: 'stable' | 'attention' | 'critical';
  lastActivity: string;
  healthMetrics: { heartRate: number; activity: number; sleep: number };
}

// Alert
{
  id: string;
  type: 'fall' | 'abnormal' | 'sos' | 'medical' | 'system' | 'medication' | 'wander' | 'vital' | 'voice' | 'thermal';
  severity: 'info' | 'warning' | 'critical';
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'new' | 'acknowledged' | 'in_progress' | 'resolved' | 'dismissed';
  title: string;
  message: string;
  description?: string;
  elderId: string;
  elderName: string;
  elderAvatar?: string;
  elderAge?: number;
  elderRoom?: string;
  familyId: string;
  familyName: string;
  familyContact?: string;
  deviceId: string;
  deviceName: string;
  deviceType?: string;
  deviceLocation?: string;
  confidence?: number;
  createdAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  acknowledgedBy?: string;
  resolvedBy?: string;
  actions?: { id: string; label: string; timestamp: string; actor: string }[];
  snapshot?: string;
  snapshotCaption?: string;
}
```

## 7. File Structure

```
src/
├── assets/              # Static assets
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Sidebar, Header, etc.
│   ├── dashboard/       # Dashboard-specific components
│   ├── monitor/         # Monitor page components
│   ├── residents/       # Resident components
│   ├── alerts/          # Alert components
│   └── analytics/       # Chart components
├── contexts/            # React contexts
├── hooks/               # Custom hooks
├── layouts/             # Page layouts
├── lib/                 # Utilities, API client
├── pages/               # Route pages
├── services/            # API services
├── styles/              # Global styles
├── types/               # TypeScript types
├── App.tsx
└── main.tsx
```

## 8. Performance Targets

- First Contentful Paint: < 1.5s
- Bundle size: < 500KB gzipped
- Smooth 60fps animations
- Lazy loading for routes
- Skeleton loading states

## 9. Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- High contrast ratios (WCAG AA)
