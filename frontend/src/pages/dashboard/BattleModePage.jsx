import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Crown, ShieldCheck, Trophy } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import apiClient from '@/api/axiosInstance';
import { useAuth } from '@/hooks/useAuth';

function BattleModePage() {
  const { items } = useSelector((state) => state.competitors);
  const { user } = useAuth();
  const [selectedCompId, setSelectedCompId] = useState('comp-1');
  const [battleData, setBattleData] = useState(null);
  const [loading, setLoading] = useState(false);

  const activeCompetitor = items.find((c) => c.id === selectedCompId) || items[0];

  useEffect(() => {
    const fetchBattle = async () => {
      setLoading(true);
      try {
        if (user?.isDemo) {
          throw new Error('Demo preview');
        }

        const response = await apiClient.post('/ai/battle-mode', {
          competitorName: activeCompetitor.name,
          businessDetails: { name: 'Northstar Commerce', industry: 'Ecommerce SaaS' }
        });
        if (response.success && response.data) {
          setBattleData(response.data);
        } else {
          throw new Error('Fallback trigger');
        }
      } catch {
        // Fallback Premium structured battle metrics
        setBattleData({
          overallWinner: activeCompetitor.name,
          gapAnalysis: `Your brand currently trails in social engagement cadence and active ads footprint against ${activeCompetitor.name}, but holds stronger pricing attractiveness and brand review safety.`,
          counterStrategy: `Deploy automated social proof UGC ads to defend brand review trust, and optimize cart checkouts with slide-out wallets.`,
          comparison: {
            followers: { user: "85K", competitor: activeCompetitor.followers || "240K", winner: "competitor" },
            engagement: { user: "1.8%", competitor: activeCompetitor.engagementRate || "4.8%", winner: "competitor" },
            postingFrequency: { user: "3/week", competitor: activeCompetitor.postingFrequency || "2.4 posts/day", winner: "competitor" },
            pricing: { user: "$49 (Attractive)", competitor: activeCompetitor.pricingInsight || "$99", winner: "user" },
            reviews: { user: "4.8/5", competitor: "4.2/5", winner: "user" },
            seoTraffic: { user: "22K", competitor: activeCompetitor.seoTraffic || "85K", winner: "competitor" },
            ads: { user: "5 active", competitor: activeCompetitor.adActivity === 'Scaling' ? '45 active' : '15 active', winner: "competitor" },
            websiteSpeed: { user: "2.8s", competitor: "1.2s", winner: "competitor" }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBattle();
  }, [selectedCompId, activeCompetitor, user?.isDemo]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Battle Mode Command"
        title="Head-to-Head Performance Visualizer"
        description="Select a competitor brand to compare audience size, posting rates, ads, review sentiment, and get an automated AI defense brief."
        actions={
          <div className="flex gap-2">
            {items.slice(0, 3).map((comp) => (
              <Button
                key={comp.id}
                size="sm"
                variant={selectedCompId === comp.id ? 'default' : 'outline'}
                onClick={() => setSelectedCompId(comp.id)}
              >
                vs {comp.name}
              </Button>
            ))}
          </div>
        }
      />

      {loading || !battleData ? (
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <Skeleton className="h-28 rounded-lg bg-card/60" />
            <Skeleton className="h-28 rounded-lg bg-card/60" />
          </div>
          <Skeleton className="h-[340px] w-full rounded-lg bg-card/60" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Winner score board */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="premium-card p-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">Your Competitive Score</span>
                <p className="mt-2 text-4xl font-bold text-primary">82/100</p>
              </div>
              <ShieldCheck className="size-10 text-primary opacity-65 shrink-0" />
            </div>

            <div className="premium-card p-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">{activeCompetitor.name} Score</span>
                <p className="mt-2 text-4xl font-bold text-accent">{activeCompetitor.score}/100</p>
              </div>
              <Crown className="size-10 text-accent opacity-65 shrink-0" />
            </div>
          </div>

          {/* AI Battle Defense brief */}
          <Card className="glass-panel border-primary/20 overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gradient flex items-center gap-2">
                <Trophy className="size-4 text-primary shrink-0" />
                AI Strategy Counter-Brief
              </h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-semibold text-primary">Competitive Gap Analysis</span>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{battleData.gapAnalysis}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary">High-Leverage Counter Strategy</span>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{battleData.counterStrategy}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed comparative table */}
          <Card className="glass-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border/40 bg-muted/20 text-muted-foreground">
                    <th className="p-4 font-semibold text-foreground">Competitive Vector</th>
                    <th className="p-4 text-right">Your Brand</th>
                    <th className="p-4 text-right">{activeCompetitor.name}</th>
                    <th className="p-4 text-center">Winner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {Object.entries(battleData.comparison).map(([key, value]) => (
                    <tr key={key} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4 font-semibold text-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </td>
                      <td className={`p-4 text-right ${value.winner === 'user' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                        {value.user}
                      </td>
                      <td className={`p-4 text-right ${value.winner === 'competitor' ? 'text-accent font-semibold' : 'text-muted-foreground'}`}>
                        {value.competitor}
                      </td>
                      <td className="p-4 text-center">
                        <Badge tone={value.winner === 'user' ? 'success' : 'outline'}>
                          {value.winner === 'user' ? 'You' : activeCompetitor.name}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default BattleModePage;
