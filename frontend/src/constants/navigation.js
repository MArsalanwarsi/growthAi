import {
  BarChart3,
  Bell,
  Bot,
  Building2,
  FileBarChart,
  Gauge,
  GitCompare,
  Lightbulb,
  Radar,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'

export const publicNavItems = [
  { label: 'Platform', href: '/#platform' },
  { label: 'Use cases', href: '/#use-cases' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/#faq' },
]

export const dashboardNavItems = [
  { label: 'Command Center', path: '/dashboard', icon: Gauge },
  { label: 'Competitors', path: '/dashboard/competitors', icon: Radar },
  { label: 'Why They Win', path: '/dashboard/why-they-win', icon: TrendingUp },
  { label: 'AI Suggestions', path: '/dashboard/suggestions', icon: Bot },
  { label: 'Battle Mode', path: '/dashboard/battle-mode', icon: GitCompare },
  { label: 'Opportunities', path: '/dashboard/opportunities', icon: Target },
  { label: 'Reports', path: '/dashboard/reports', icon: FileBarChart },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
]

export const dashboardQuickActions = [
  { label: 'New alert', icon: Bell },
  { label: 'Growth brief', icon: Sparkles },
  { label: 'Market scan', icon: BarChart3 },
  { label: 'Profile', icon: Building2 },
  { label: 'Quick wins', icon: Lightbulb },
]
