import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Download, RefreshCcw, TrendingUp } from 'lucide-react';
import { fetchDashboardData } from '@/redux/slices/dashboardSlice';
import PremiumBarChart from '@/components/charts/PremiumBarChart';
import PremiumLineChart from '@/components/charts/PremiumLineChart';
import PremiumRadarChart from '@/components/charts/PremiumRadarChart';
import PageHeader from '@/components/common/PageHeader';
import AlertCard from '@/components/dashboard/AlertCard';
import GrowthScoreGauge from '@/components/dashboard/GrowthScoreGauge';
import MetricCard from '@/components/dashboard/MetricCard';
import RecommendationCard from '@/components/dashboard/RecommendationCard';
import StatCard from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { competitorData } from '@/data/mockData';
import { connectSocket, disconnectSocket } from '@/services/socketService';

function DashboardHome() {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const alerts = useSelector((state) => state.alerts.items);
  const recommendations = useSelector((state) => state.recommendations.items);

  // Initialize socket client stream and dashboard statistics on mount
  useEffect(() => {
    dispatch(fetchDashboardData());
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchDashboardData());
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl -z-10" />
        <PageHeader
          eyebrow="Growth Command Center"
          title="Active Market Intelligence"
          description="A premium telemetry dashboard mapping live competitor movements, ad budgets, pricing changes, and AI growth signals."
          actions={(
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleRefresh} disabled={dashboard.loading} className="rounded-full bg-background border-border/60 hover:bg-muted/50 transition-all font-medium h-10 px-5 shadow-sm">
                <RefreshCcw className={`size-4 mr-2 ${dashboard.loading ? 'animate-spin' : ''}`} /> 
                {dashboard.loading ? 'Syncing...' : 'Sync Now'}
              </Button>
              <Button variant="default" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10 px-5 shadow-[0_4px_14px_rgba(99,102,241,0.4)] transition-all hover:-translate-y-0.5">
                <Download className="size-4 mr-2" /> Export Report
              </Button>
            </div>
          )}
        />
      </div>

      {dashboard.loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[140px] rounded-xl bg-card/60 shadow-sm" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {dashboard.metrics.map((metric) => (
            <StatCard key={metric.label} metric={metric} />
          ))}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.5fr]">
        <MetricCard title="Growth Score Index" description="Weighted competitiveness metric benchmarked across social, SEO, and ad pressure.">
          {dashboard.loading ? (
            <Skeleton className="mx-auto size-48 rounded-full bg-card/60" />
          ) : (
            <GrowthScoreGauge score={84} />
          )}
        </MetricCard>
        
        <MetricCard title="Engagement Momentum Graph" description="Your historical brand growth against market average and category benchmarks.">
          {dashboard.loading ? (
            <Skeleton className="h-[270px] w-full rounded-xl bg-card/60" />
          ) : (
            <PremiumLineChart
              data={dashboard.monthlyGrowth}
              lines={[
                { key: 'you', color: 'var(--chart-1)' },
                { key: 'market', color: 'var(--chart-2)' },
                { key: 'leader', color: 'var(--chart-3)' },
              ]}
              height={270}
            />
          )}
        </MetricCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <MetricCard title="SEO Visibility Breakdown" description="Authority score, content density, and organic keyword overlap.">
          {dashboard.loading ? (
            <Skeleton className="h-[270px] w-full rounded-xl bg-card/60" />
          ) : (
            <PremiumRadarChart data={dashboard.seoSnapshot} height={270} />
          )}
        </MetricCard>

        <MetricCard title="Ad Spend Snapshot" description="Active channels comparison showing estimated spend pressure index.">
          {dashboard.loading ? (
            <Skeleton className="h-[270px] w-full rounded-xl bg-card/60" />
          ) : (
            <PremiumBarChart
              data={dashboard.adsSnapshot}
              xKey="channel"
              bars={[
                { key: 'spend', color: 'var(--chart-4)' },
                { key: 'conversions', color: 'var(--chart-1)' },
              ]}
              height={270}
            />
          )}
        </MetricCard>

        <MetricCard
          title="Direct Competitor Monitor"
          description="Vortex Brands is the currently tracked category benchmark."
          action={<Button variant="ghost" size="icon" className="size-8 rounded-full"><TrendingUp className="size-4 text-muted-foreground" /></Button>}
        >
          {dashboard.loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl bg-card/60" />
              ))}
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              {competitorData.slice(0, 3).map((competitor) => (
                <div key={competitor.id} className="group flex items-center justify-between gap-3 rounded-xl border border-border/40 bg-card p-3.5 shadow-sm transition-all hover:bg-muted/30 hover:border-border/80 cursor-pointer">
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-10 place-items-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 text-xs font-bold text-primary shadow-inner border border-primary/10">
                      {competitor.logo}
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-tight text-foreground">{competitor.name}</p>
                      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">{competitor.followers} followers • {competitor.adActivity} Ads</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-black text-primary">{competitor.score}</span>
                    <span className="text-[9px] uppercase font-bold text-muted-foreground/60 tracking-widest mt-0.5">Score</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </MetricCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <MetricCard title="AI Strategic Insights Preview" description="Realtime suggestions compiled across scanning payloads.">
          {dashboard.loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 rounded-xl bg-card/60" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {recommendations.slice(0, 4).map((recommendation) => (
                <RecommendationCard key={recommendation.title} recommendation={recommendation} />
              ))}
            </div>
          )}
        </MetricCard>

        <MetricCard title="Active Live Signal Streams" description="Critical events captured from competitor and market crawlers.">
          {dashboard.loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl bg-card/60" />
              ))}
            </div>
          ) : (
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 scrollbar-premium">
              {alerts.slice(0, 5).map((alert) => (
                <AlertCard key={alert.id || alert.title} alert={alert} />
              ))}
            </div>
          )}
        </MetricCard>
      </div>
    </div>
  );
}

export default DashboardHome;
