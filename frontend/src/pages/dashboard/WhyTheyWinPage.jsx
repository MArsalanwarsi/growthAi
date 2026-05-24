import PremiumBarChart from '@/components/charts/PremiumBarChart';
import PremiumLineChart from '@/components/charts/PremiumLineChart';
import PremiumPieChart from '@/components/charts/PremiumPieChart';
import PageHeader from '@/components/common/PageHeader';
import MetricCard from '@/components/dashboard/MetricCard';
import { adsSnapshot, contentMix, engagementTrend, trafficTrends } from '@/data/mockData';
import { Brain, CheckCircle2, Zap } from 'lucide-react';

const postingFrequency = [
  { name: 'Mon', you: 2, leader: 5 },
  { name: 'Tue', you: 3, leader: 6 },
  { name: 'Wed', you: 2, leader: 5 },
  { name: 'Thu', you: 4, leader: 7 },
  { name: 'Fri', you: 2, leader: 6 },
];

const audienceBehavior = [
  { name: 'Saves', you: 42, leader: 68 },
  { name: 'Shares', you: 35, leader: 61 },
  { name: 'Comments', you: 28, leader: 47 },
  { name: 'Clicks', you: 51, leader: 72 },
];

function WhyTheyWinPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Why they win"
        title="Decode competitor momentum patterns"
        description="A visual reasoning engine for posting frequency, engagement benchmarks, content mix, traffic trends, and consumer intent hooks."
      />

      {/* Prominent AI Reasoning Card */}
      <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card/45 p-6 backdrop-blur-md">
        <div className="absolute right-0 top-0 -mr-6 -mt-6 size-24 rounded-full bg-primary/10 blur-xl" />
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Brain className="size-6 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gradient flex items-center gap-2">
              GrowthRadar AI Synthesis
              <Zap className="size-3 text-primary shrink-0 fill-primary" />
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Competitor Vortex Brands</strong> gets <span className="font-semibold text-primary">43% more engagement</span> because they post more short-form video content, deploy high-retention hooks in the first 3 seconds, publish at stronger regional time windows, leverage emotional social proof ad copy, and utilize slides-out cart checkouts to eliminate customer friction.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 border-t border-border/40 pt-5 sm:grid-cols-3">
          {[
            'Short-form UGC video hooks',
            'Slide-out checkout carts',
            'Social proof Meta retargeting ads'
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <CheckCircle2 className="size-4 text-primary shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <MetricCard title="Posting Frequency" description="Daily publishing cadence compared with the category benchmark.">
          <PremiumBarChart
            data={postingFrequency}
            bars={[
              { key: 'you', color: 'var(--chart-1)' },
              { key: 'leader', color: 'var(--chart-3)' },
            ]}
          />
        </MetricCard>
        <MetricCard title="Engagement Patterns" description="Short-form video assets are driving the widest competitive delta.">
          <PremiumLineChart
            data={engagementTrend}
            lines={[
              { key: 'instagram', color: 'var(--chart-1)' },
              { key: 'tiktok', color: 'var(--chart-3)' },
              { key: 'facebook', color: 'var(--chart-2)' },
            ]}
          />
        </MetricCard>
        <MetricCard title="Content Type Analysis" description="Benchmarks indicate category leaders are heavily over-indexing on video.">
          <PremiumPieChart data={contentMix} />
        </MetricCard>
        <MetricCard title="Traffic Channel Attributions" description="Search engine organic and social traffic pathways are compounding rapidly.">
          <PremiumLineChart
            data={trafficTrends}
            lines={[
              { key: 'organic', color: 'var(--chart-1)' },
              { key: 'paid', color: 'var(--chart-4)' },
              { key: 'social', color: 'var(--chart-3)' },
            ]}
          />
        </MetricCard>
        <MetricCard title="Ad Spend Channel Distributions" description="Paid channels spend pressure benchmarked against active creatives count.">
          <PremiumBarChart
            data={adsSnapshot}
            xKey="channel"
            bars={[
              { key: 'spend', color: 'var(--chart-4)' },
              { key: 'conversions', color: 'var(--chart-1)' },
            ]}
          />
        </MetricCard>
        <MetricCard title="Audience Action Vectors" description="Comparative conversion intent signals mapped by engagement profile actions.">
          <PremiumBarChart
            data={audienceBehavior}
            bars={[
              { key: 'you', color: 'var(--chart-2)' },
              { key: 'leader', color: 'var(--chart-3)' },
            ]}
          />
        </MetricCard>
      </div>
    </div>
  );
}

export default WhyTheyWinPage;
