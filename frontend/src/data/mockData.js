import {
  Activity,
  BadgeDollarSign,
  BarChart3,
  Bell,
  Bot,
  Flame,
  Globe2,
  Lightbulb,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'

export const growthMetrics = [
  { label: 'Growth Score', value: 84, suffix: '/100', change: '+12%', trend: 'up', icon: TrendingUp },
  { label: 'Competitors Tracked', value: 18, suffix: '', change: '+4 this week', trend: 'up', icon: Target },
  { label: 'AI Suggestions', value: 42, suffix: '', change: '9 urgent', trend: 'up', icon: Bot },
  { label: 'Trend Alerts', value: 12, suffix: '', change: '3 critical', trend: 'warn', icon: Bell },
]

export const monthlyGrowth = [
  { month: 'Jan', you: 42, market: 36, leader: 58 },
  { month: 'Feb', you: 48, market: 39, leader: 61 },
  { month: 'Mar', you: 54, market: 43, leader: 66 },
  { month: 'Apr', you: 61, market: 48, leader: 72 },
  { month: 'May', you: 68, market: 52, leader: 78 },
  { month: 'Jun', you: 76, market: 57, leader: 84 },
]

export const engagementTrend = [
  { month: 'Jan', instagram: 2.4, tiktok: 3.1, facebook: 1.2 },
  { month: 'Feb', instagram: 2.8, tiktok: 3.8, facebook: 1.5 },
  { month: 'Mar', instagram: 3.2, tiktok: 4.2, facebook: 1.7 },
  { month: 'Apr', instagram: 3.7, tiktok: 5.1, facebook: 1.9 },
  { month: 'May', instagram: 4.2, tiktok: 5.7, facebook: 2.1 },
  { month: 'Jun', instagram: 4.8, tiktok: 6.4, facebook: 2.4 },
]

export const seoSnapshot = [
  { name: 'Authority', you: 72, leader: 86 },
  { name: 'Keywords', you: 61, leader: 79 },
  { name: 'Content', you: 75, leader: 82 },
  { name: 'Speed', you: 88, leader: 81 },
  { name: 'Backlinks', you: 57, leader: 76 },
]

export const adsSnapshot = [
  { channel: 'Meta', spend: 42, conversions: 64 },
  { channel: 'Google', spend: 55, conversions: 71 },
  { channel: 'TikTok', spend: 38, conversions: 59 },
  { channel: 'LinkedIn', spend: 24, conversions: 36 },
]

export const contentMix = [
  { name: 'Reels', value: 34 },
  { name: 'Carousels', value: 28 },
  { name: 'Shorts', value: 22 },
  { name: 'Guides', value: 16 },
]

export const trafficTrends = [
  { month: 'Jan', organic: 34, paid: 18, social: 26 },
  { month: 'Feb', organic: 38, paid: 20, social: 31 },
  { month: 'Mar', organic: 41, paid: 28, social: 36 },
  { month: 'Apr', organic: 47, paid: 32, social: 39 },
  { month: 'May', organic: 53, paid: 37, social: 45 },
  { month: 'Jun', organic: 59, paid: 42, social: 51 },
]

export const competitorData = [
  {
    id: 'nova-commerce',
    name: 'Nova Commerce',
    logo: 'NC',
    category: 'Retail analytics',
    growth: 32,
    engagement: 6.8,
    followers: 482000,
    pricing: '$149/mo',
    adActivity: 'Aggressive',
    seoScore: 88,
    sentiment: 82,
    score: 91,
    winReason: 'Owns high-intent comparison keywords and ships founder-led short video daily.',
    socialStats: { instagram: 148000, tiktok: 224000, facebook: 110000 },
  },
  {
    id: 'marketpilot',
    name: 'MarketPilot',
    logo: 'MP',
    category: 'Growth automation',
    growth: 24,
    engagement: 5.2,
    followers: 315000,
    pricing: '$99/mo',
    adActivity: 'Moderate',
    seoScore: 81,
    sentiment: 76,
    score: 84,
    winReason: 'Bundles templates, case studies, and paid social retargeting into one conversion path.',
    socialStats: { instagram: 82000, tiktok: 166000, facebook: 67000 },
  },
  {
    id: 'signalstack',
    name: 'SignalStack',
    logo: 'SS',
    category: 'Social intelligence',
    growth: 18,
    engagement: 4.7,
    followers: 208000,
    pricing: '$229/mo',
    adActivity: 'Testing',
    seoScore: 74,
    sentiment: 71,
    score: 78,
    winReason: 'Targets underserved enterprise workflows with data-led landing pages.',
    socialStats: { instagram: 56000, tiktok: 91000, facebook: 61000 },
  },
  {
    id: 'funnelbeam',
    name: 'FunnelBeam',
    logo: 'FB',
    category: 'Conversion research',
    growth: 29,
    engagement: 5.9,
    followers: 267000,
    pricing: '$179/mo',
    adActivity: 'Scaling',
    seoScore: 83,
    sentiment: 79,
    score: 86,
    winReason: 'Wins on pricing clarity, review snippets, and tactical playbooks.',
    socialStats: { instagram: 98000, tiktok: 126000, facebook: 43000 },
  },
]

export const recommendations = [
  { title: 'Launch comparison landing pages', category: 'high', impact: 92, effort: 'Medium', icon: Search, description: 'Competitors are winning bottom-funnel searches with brand-vs-brand pages.' },
  { title: 'Shift 30% content to founder clips', category: 'high', impact: 88, effort: 'Low', icon: Flame, description: 'Leader engagement is concentrated in opinionated short-form clips.' },
  { title: 'Add pricing proof blocks', category: 'medium', impact: 76, effort: 'Low', icon: BadgeDollarSign, description: 'Users are comparing ROI and plan flexibility before signing up.' },
  { title: 'Retarget market gap visitors', category: 'quick', impact: 71, effort: 'Low', icon: Sparkles, description: 'Traffic segments show interest in underserved agency workflows.' },
  { title: 'Create country-specific pages', category: 'opportunity', impact: 83, effort: 'Medium', icon: Globe2, description: 'High-growth search volume is emerging in UAE, UK, and Canada.' },
]

export const alerts = [
  { title: 'Nova Commerce increased Meta ad volume', severity: 'critical', time: '18m ago', icon: Bell },
  { title: 'MarketPilot ranking for 14 new BOFU keywords', severity: 'high', time: '2h ago', icon: Search },
  { title: 'FunnelBeam changed pricing page CTA', severity: 'medium', time: '5h ago', icon: Activity },
]

export const opportunities = [
  { title: 'Underserved ecommerce operators', score: 91, type: 'Audience gap', icon: Users },
  { title: 'Competitor pricing calculator missing', score: 86, type: 'Conversion gap', icon: BadgeDollarSign },
  { title: 'TikTok educational series trending', score: 82, type: 'Content gap', icon: BarChart3 },
  { title: 'Security-led messaging for teams', score: 78, type: 'Positioning gap', icon: ShieldCheck },
]

export const pricingPlans = [
  { name: 'Free', tier: 'Free', price: '$0', description: 'Validate the radar workflow.', features: ['3 competitors', 'Weekly growth brief', 'Basic social snapshots'], cta: 'Start free' },
  { name: 'Starter', tier: 'Starter', price: '$39', description: 'For early growth teams.', features: ['10 competitors', 'Daily alerts', 'SEO and social trends'], cta: 'Start Starter' },
  { name: 'Pro', tier: 'Pro', price: '$99', description: 'For serious operators.', features: ['50 competitors', 'AI suggestion board', 'Battle mode', 'PDF-style reports'], cta: 'Start Pro', featured: true },
  { name: 'Business', tier: 'Business', price: '$249', description: 'For multi-brand teams.', features: ['Unlimited scans', 'Market opportunities', 'Team settings', 'Priority support'], cta: 'Start Business' },
  { name: 'Enterprise', tier: 'Business', price: 'Custom', description: 'For global intelligence programs.', features: ['Custom sources', 'SSO-ready architecture', 'Dedicated workspace', 'Security review'], cta: 'Book demo' },
]

export const testimonials = [
  { quote: 'GrowthRadar gives our team the weekly clarity we used to spend days assembling manually.', name: 'Maya Chen', role: 'VP Growth, Orbit Lane' },
  { quote: 'The competitor battle view changed how our sales team handles objections.', name: 'Daniel Ross', role: 'Founder, ScaleKit' },
  { quote: 'It feels like a strategic analyst sitting inside our dashboard.', name: 'Amara Singh', role: 'CMO, Northstar Retail' },
]

export const faqs = [
  { question: 'Can I preview the full product?', answer: 'Yes. The Business demo opens a read-only workspace with every module visible for review.' },
  { question: 'How do plans control access?', answer: 'Free, Starter, Pro, and Business accounts unlock modules according to the selected subscription tier.' },
  { question: 'Can my team use saved workflows?', answer: 'Yes. Real accounts use authenticated API sessions for onboarding, reports, profile settings, and workspace data.' },
]

export const battleRows = [
  { metric: 'Followers', you: '186K', competitor: '482K', winner: 'competitor' },
  { metric: 'Pricing clarity', you: 'Strong', competitor: 'Excellent', winner: 'competitor' },
  { metric: 'SEO score', you: '76', competitor: '88', winner: 'competitor' },
  { metric: 'Reviews', you: '4.6', competitor: '4.4', winner: 'you' },
  { metric: 'Ad velocity', you: 'Moderate', competitor: 'Aggressive', winner: 'competitor' },
  { metric: 'Content quality', you: 'Strong', competitor: 'Strong', winner: 'tie' },
  { metric: 'Conversion score', you: '82', competitor: '86', winner: 'competitor' },
]

export const reportSections = [
  { title: 'Executive snapshot', description: 'Growth score improved 12% while competitor ad velocity increased across Meta and Google.' },
  { title: 'Competitor insight', description: 'Nova Commerce continues to lead with aggressive comparison content and retargeting.' },
  { title: 'Recommended move', description: 'Ship three high-intent comparison pages and launch a creator-led short-form sequence.' },
]

export const landingFeatures = [
  { title: 'Competitor radar', description: 'Track growth, SEO, social engagement, pricing, ads, and positioning from one command center.', icon: Target },
  { title: 'Why they win', description: 'Decode the behaviors behind competitor momentum before your pipeline feels it.', icon: TrendingUp },
  { title: 'Action board', description: 'Turn market signals into prioritized growth recommendations for your team.', icon: Lightbulb },
]
