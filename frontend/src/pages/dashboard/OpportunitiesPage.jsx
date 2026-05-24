import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, DollarSign, Users, FileText, Activity } from 'lucide-react';

const opportunityGaps = [
  {
    type: 'Pricing Whitespace',
    title: 'Pro-tier White Label Reports',
    description: 'Competitors do not offer developer APIs or agency billing dashboards below $200. Setting up a Starter white-label plan will convert mid-market agencies.',
    score: '92% Demand',
    icon: DollarSign,
    impact: 'High Impact'
  },
  {
    type: 'Niche Gaps',
    title: 'DTC Packaging Tutorials',
    description: 'Heavy search volume uptick detected around sustainable packaging tutorials. Vortex Brands has 0 keyword overlap here.',
    score: '88% Search Share',
    icon: Users,
    impact: 'Medium Effort'
  },
  {
    type: 'Content Gap',
    title: 'Alternative comparison reviews',
    description: 'Consumer searches for "Alternative to Vortex Brands review" have scaled 120% this quarter. Deploying comparison sheets is a massive conversion win.',
    score: '95% Volatility',
    icon: FileText,
    impact: 'High Impact'
  },
  {
    type: 'Feature deficit',
    title: 'Live Slack/Discord Alert Hooks',
    description: 'Negative reviews on competitor dashboards focus heavily on missing instant slack push notifications. Launching this first establishes strong feature advantage.',
    score: '84% Engagement',
    icon: Activity,
    impact: 'Low Effort'
  }
];

function OpportunitiesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Market opportunities"
        title="Find market gaps before competitors occupy them"
        description="A dedicated dashboard tracking underserved audiences, pricing gaps, content defects, and features competitors are missing."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {opportunityGaps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} className="glass-panel hover:border-primary/40 transition duration-300">
              <CardContent className="p-6 flex gap-5">
                <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <Badge tone="outline" className="font-mono text-xs">{item.type}</Badge>
                    <span className="text-xs font-mono text-primary font-semibold">{item.score}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <div className="pt-2">
                    <Badge tone="premium">{item.impact}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default OpportunitiesPage;
