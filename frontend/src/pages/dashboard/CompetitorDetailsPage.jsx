import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompetitorDetails } from '@/redux/slices/competitorsSlice';
import PremiumBarChart from '@/components/charts/PremiumBarChart';
import PremiumLineChart from '@/components/charts/PremiumLineChart';
import PremiumPieChart from '@/components/charts/PremiumPieChart';
import PremiumRadarChart from '@/components/charts/PremiumRadarChart';
import PageHeader from '@/components/common/PageHeader';
import MetricCard from '@/components/dashboard/MetricCard';
import { Badge } from '@/components/ui/badge';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  adsSnapshot,
  contentMix,
  engagementTrend,
  seoSnapshot,
  trafficTrends,
} from '@/data/mockData';
import { Sparkles, Megaphone, Globe2, HeartHandshake, Award } from 'lucide-react';

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'why-they-win', label: 'Why They Win' },
  { value: 'social', label: 'Social Analytics' },
  { value: 'seo', label: 'SEO & Keywords' },
  { value: 'ads', label: 'Ads Intelligence' },
  { value: 'sentiment', label: 'Customer Sentiment' }
];

function CompetitorDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('overview');
  
  const { selectedCompetitorDetails, loading } = useSelector((state) => state.competitors);

  useEffect(() => {
    dispatch(fetchCompetitorDetails(id));
  }, [dispatch, id]);

  if (loading || !selectedCompetitorDetails) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28 w-full rounded-lg bg-card/60" />
        <Skeleton className="h-10 w-full rounded-md bg-card/60" />
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-lg bg-card/60" />
          <Skeleton className="h-64 rounded-lg bg-card/60" />
          <Skeleton className="h-64 rounded-lg bg-card/60" />
        </div>
      </div>
    );
  }

  const competitor = selectedCompetitorDetails;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Competitor Details Audit"
        title={competitor.name}
        description={`Active tracking for benchmark brand in the ${competitor.strength || 'Moderate'} category.`}
        actions={<Badge tone="premium">Strength Score: {competitor.score}</Badge>}
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Followers Density', competitor.followers || '120K'],
              ['Posting Cadence', competitor.postingFrequency || 'Daily'],
              ['SEO Domain Rating', competitor.seo?.authorityScore || 68],
              ['Customer Sentiment', competitor.sentiment?.overallSentiment || 'Positive'],
            ].map(([label, value]) => (
              <div key={label} className="premium-card p-5">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-primary">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard title="Brand Authority Summary" description="Overview of platform presence and audience size signals.">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {competitor.platformPresence?.map((platform) => (
                    <Badge key={platform} tone="outline" className="px-3 py-1 font-mono text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  This brand has established multi-channel distribution covering primary acquisition loops. Engagement trends suggest heavy retargeting strategies on Meta properties.
                </p>
                <div className="flex items-center gap-3 rounded-lg bg-muted/20 p-4 border border-border/40">
                  <Award className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Strategic Positioning</p>
                    <p className="text-sm font-semibold mt-0.5">{competitor.pricingInsight || 'Mid-range Pricing'}</p>
                  </div>
                </div>
              </div>
            </MetricCard>

            <MetricCard title="Why They Win Preview" description="Immediate tactical takeaway compiled from our crawlers.">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed italic text-muted-foreground border-l-2 border-primary/50 pl-4 py-1">
                  "{competitor.whyStrong || 'High video frequency and solid local community backing.'}"
                </p>
                <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                  <p className="text-xs font-semibold text-primary">Your High-Leverage Move</p>
                  <p className="text-sm font-semibold mt-1">Deploy comparison landing pages targeting competitor keyword deficits.</p>
                </div>
              </div>
            </MetricCard>
          </div>
        </div>
      )}

      {activeTab === 'why-they-win' && (
        <div className="space-y-6">
          <MetricCard 
            title="Strategic Reasons Behind Vortex Dominance" 
            description="Deep AI logic explaining competitor win factors."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: 'Video Cadence', val: '4.8x Higher', desc: 'Maintains consistent video hooks across short-form platforms like TikTok and Reels.' },
                { title: 'Mobile Checkout', val: 'Slide-out Carts', desc: 'Direct express payments integration drops mobile cart bounce rates by 24%.' },
                { title: 'Social Proof Ads', val: 'Trust Testimonials', desc: 'Superimposes customer reviews and ratings directly on video recordings for conversion safety.' }
              ].map((item, idx) => (
                <div key={idx} className="rounded-lg border border-border/40 bg-muted/20 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-primary font-semibold">{item.title}</span>
                    <Sparkles className="size-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{item.val}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </MetricCard>

          <div className="rounded-lg bg-card/60 p-6 border border-border/40 space-y-3">
            <h4 className="font-semibold text-gradient">AI Battle Recommendation</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Vortex gets 48% more engagement because their short-form video cadence is 2.4x higher, their hooks create strong retention, and their checkout funnel has zero friction. Immediately deploy UGC customer reviews on standard retargeting hooks.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'social' && (
        <div className="grid gap-4 md:grid-cols-2">
          <MetricCard title="Social Engagement Trend" description="Audience growth and active engagement benchmarks.">
            <PremiumLineChart
              data={engagementTrend}
              lines={[
                { key: 'instagram', color: 'var(--chart-1)' },
                { key: 'tiktok', color: 'var(--chart-3)' },
                { key: 'facebook', color: 'var(--chart-2)' },
              ]}
              height={260}
            />
          </MetricCard>

          <MetricCard title="Publishing Mix" description="Distribution of content classes generating maximum organic reach.">
            <PremiumPieChart data={contentMix} height={260} />
          </MetricCard>
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard title="SEO Structure Radar" description="Benchmarked visibility parameters.">
              <PremiumRadarChart data={seoSnapshot} height={260} />
            </MetricCard>

            <MetricCard title="SEO Visibility Snapshot" description="Search engine keyword rankings.">
              <div className="space-y-3">
                {[
                  { keyword: 'dtc packaging trends', vol: '1.2K', rank: 1 },
                  { keyword: 'competitor intelligence tool', vol: '5.4K', rank: 4 },
                  { keyword: 'social signal analytics dashboard', vol: '850', rank: 3 }
                ].map((kw, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-muted/20 p-3 rounded-lg border border-border/30">
                    <span className="text-sm font-semibold">{kw.keyword}</span>
                    <div className="flex gap-4 text-xs font-mono text-muted-foreground">
                      <span>Volume: {kw.vol}</span>
                      <span className="text-primary">Rank: #{kw.rank}</span>
                    </div>
                  </div>
                ))}
              </div>
            </MetricCard>
          </div>

          <div className="rounded-lg bg-card/50 p-5 border border-border/40">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-primary">
              <Globe2 className="size-4" /> SEO Keyword Gap Opportunity
            </h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Vortex Brands has missing keyword structures around customer problem definitions. Deploying alternative review comparison lists represents a reliable organic traffic growth loop.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'ads' && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard title="Ad Spend Snapshot" description="Meta vs TikTok ads spend distribution pressure.">
              <PremiumBarChart
                data={adsSnapshot}
                xKey="channel"
                bars={[
                  { key: 'spend', color: 'var(--chart-4)' },
                  { key: 'conversions', color: 'var(--chart-1)' },
                ]}
                height={260}
              />
            </MetricCard>

            <MetricCard title="UGC Copywriting Angles" description="Sample hooks deployed in active Meta campaigns.">
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/20 p-4 border border-border/30">
                  <p className="text-xs text-muted-foreground font-mono">Primary Emotional Hook</p>
                  <p className="text-sm font-semibold mt-1">Fear of Missing Out & Authority Proofing</p>
                </div>
                <div className="rounded-lg bg-muted/20 p-4 border border-border/30">
                  <p className="text-xs text-muted-foreground font-mono">Top Performing Copy</p>
                  <p className="text-xs italic leading-relaxed text-muted-foreground mt-1">
                    "Stop guessing why competitors get all the virality. Get GrowthRadar and get the exact steps to outperform."
                  </p>
                </div>
              </div>
            </MetricCard>
          </div>

          <div className="rounded-lg bg-card/50 p-5 border border-border/40">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-primary">
              <Megaphone className="size-4" /> Active meta ad count is 45 active campaigns
            </h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              They are scaling paid comparison ads that outline pricing structures. Counter by highlighting your direct, transparent pricing bundles.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'sentiment' && (
        <div className="grid gap-4 md:grid-cols-2">
          <MetricCard title="Customer Complaints Classification" description="Identified pain points from negative review clusters.">
            <div className="space-y-3">
              {[
                { cat: 'Customer Support', count: 42, details: 'Slow responses on billing disputes and refunds.' },
                { cat: 'Pricing Transparency', count: 28, details: 'Unclear bundling prices and expensive add-on modules.' },
                { cat: 'Dashboard App Bugs', count: 18, details: 'Slow chart loading speeds and crashes on Android.' }
              ].map((complaint, idx) => (
                <div key={idx} className="bg-muted/20 p-3 rounded-lg border border-border/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">{complaint.cat}</span>
                    <Badge tone="danger" className="text-[10px] px-2 py-0.5">{complaint.count} complaints</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{complaint.details}</p>
                </div>
              ))}
            </div>
          </MetricCard>

          <MetricCard title="Marketing Angles to Exploit" description="Suggested hooks to exploit competitor review deficits.">
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <HeartHandshake className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">"Sub-5-Minute Human Support Guarantee"</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Directly counters support complaints.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Globe2 className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">"0.8s Instant Load Dashboard"</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Exploits competitor chart loading bugs.</p>
                </div>
              </div>
            </div>
          </MetricCard>
        </div>
      )}
    </div>
  );
}

export default CompetitorDetailsPage;
