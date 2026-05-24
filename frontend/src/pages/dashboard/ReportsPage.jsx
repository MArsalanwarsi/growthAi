import { useState, useEffect } from 'react';
import { Download, FileBarChart, Sparkles, RefreshCw, Layers } from 'lucide-react';
import PremiumLineChart from '@/components/charts/PremiumLineChart';
import PageHeader from '@/components/common/PageHeader';
import MetricCard from '@/components/dashboard/MetricCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { competitorData, monthlyGrowth, reportSections } from '@/data/mockData';
import apiClient from '@/api/axiosInstance';

function ReportsPage() {
  const [reportsList, setReportsList] = useState([]);
  const [title, setTitle] = useState('Q2 Competitor Intelligence Review');
  const [template, setTemplate] = useState('Full Intelligence');
  const [isCompiling, setIsCompiling] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);

  // Fetch compiled briefs list
  const fetchReports = async () => {
    try {
      const response = await apiClient.get('/reports');
      if (response.success && response.data) {
        setReportsList(response.data);
      }
    } catch (e) {
      setReportsList([
        { id: 'rep-1', name: 'Q1 Competitor Benchmark', type: 'Full Intelligence', status: 'Completed', createdAt: new Date().toLocaleDateString() },
        { id: 'rep-2', name: 'Vortex Ad Creative Audit', type: 'Ads Performance', status: 'Completed', createdAt: new Date().toLocaleDateString() }
      ]);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleCompileReport = async (e) => {
    e.preventDefault();
    setIsCompiling(true);
    setCurrentReport(null);

    try {
      const response = await apiClient.post('/reports', { name: title, type: template });
      if (response.success && response.data) {
        setCurrentReport(response.data);
        fetchReports();
      } else {
        throw new Error('Fallback trigger');
      }
    } catch (error) {
      setTimeout(() => {
        // Fallback Premium brief compilation
        const compiled = {
          name: title,
          type: template,
          status: 'Completed',
          summary: `Complete ${template} intelligence analysis compiled successfully for Q2. Benchmarks reveal Category leader Vortex Brands is scaling UGC video ads aggressively. Recommended action: introduce express payments and 1.5x social video publishing rates to eliminate competitor advantage.`,
          data: {
            timestamp: new Date().toLocaleDateString(),
            opportunitiesFound: 4,
            categoryLeader: 'Vortex Brands'
          }
        };
        setCurrentReport(compiled);
        setReportsList(prev => [
          { id: `rep-${Date.now()}`, name: title, type: template, status: 'Completed', createdAt: new Date().toLocaleDateString() },
          ...prev
        ]);
      }, 1500);
    } finally {
      setTimeout(() => {
        setIsCompiling(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Hide all non-printable elements */
          body > *:not(#root),
          #root > *:not(main),
          main > *:not(.printable-container),
          .no-print,
          nav,
          header,
          aside,
          button,
          form,
          .glass-panel,
          .page-header-container {
            display: none !important;
          }
          
          /* Full page layout for printing */
          body, html {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }

          .printable-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            border: 2px solid #000000 !important;
            border-radius: 0px !important;
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
            padding: 3rem !important;
            margin: 0 !important;
            display: block !important;
            visibility: visible !important;
          }

          /* Force high contrast text on prints */
          h2, h3, p, span, div, b {
            color: #000000 !important;
            text-shadow: none !important;
          }

          .text-gradient {
            background: none !important;
            -webkit-text-fill-color: initial !important;
            color: #000000 !important;
            font-weight: 800 !important;
          }

          .bg-muted\\/20, .bg-muted\\/30 {
            background-color: #f1f5f9 !important;
            border: 1px solid #cbd5e1 !important;
          }
        }
      `}} />

      <div className="page-header-container">
        <PageHeader
          eyebrow="Intelligence Reports"
          title="Compile Executive-Ready Market Briefs"
          description="A builder to configure and request complete competitor audit summaries, SEO opportunity gaps, ad performance reviews, and content gap briefs."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Report Builder Form */}
        <Card className="glass-panel h-fit no-print">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-gradient flex items-center gap-2">
              <Sparkles className="size-4 text-primary shrink-0" />
              Configure Brief
            </h3>
            
            <form onSubmit={handleCompileReport} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-muted-foreground">Report Title</span>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full text-sm rounded-md border border-border/50 bg-background/50 p-2.5 text-foreground focus:border-primary/50"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-muted-foreground">Intelligence Template</span>
                <select 
                  value={template} 
                  onChange={(e) => setTemplate(e.target.value)} 
                  className="w-full text-sm rounded-md border border-border/50 bg-background/50 p-2.5 text-foreground focus:border-primary/50"
                >
                  <option value="Full Intelligence">Full Intelligence Brief (Recommended)</option>
                  <option value="SEO Opportunity">SEO Keywords deficit review</option>
                  <option value="Ads Performance">Ads copy & Creative audit</option>
                  <option value="Content Gap">Social Content gap analysis</option>
                </select>
              </label>

              <Button type="submit" variant="premium" className="w-full" disabled={isCompiling}>
                {isCompiling ? (
                  <>
                    <RefreshCw className="size-4 mr-2 animate-spin" /> Compiling AI Signals...
                  </>
                ) : (
                  <>
                    <Layers className="size-4 mr-2" /> Compile Strategic Brief
                  </>
                )}
              </Button>
            </form>

            <div className="border-t border-border/40 pt-4 space-y-3">
              <span className="text-xs font-semibold text-muted-foreground">Recent Briefs</span>
              <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1 scrollbar-premium">
                {reportsList.map((rep) => (
                  <div key={rep.id} className="flex items-center justify-between text-xs p-2.5 rounded-lg border border-border/30 bg-muted/20">
                    <div>
                      <p className="font-semibold text-foreground">{rep.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{rep.type} • {rep.createdAt}</p>
                    </div>
                    <Badge tone="success">{rep.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Output Panel */}
        <div className="space-y-6">
          {isCompiling ? (
            <Card className="glass-panel">
              <CardContent className="p-8 text-center space-y-4">
                <RefreshCw className="mx-auto size-10 text-primary animate-spin" />
                <h4 className="font-semibold">Benchmarking category benchmarks...</h4>
                <p className="text-xs text-muted-foreground">Generating structured marketing briefs. Please wait.</p>
              </CardContent>
            </Card>
          ) : currentReport ? (
            <div className="printable-container rounded-xl border border-primary/20 bg-card/65 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.3)] space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                  <Badge tone="premium">{currentReport.type}</Badge>
                  <h2 className="mt-2 text-2xl font-semibold text-gradient">{currentReport.name}</h2>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1">Compiled on: {currentReport.data?.timestamp}</p>
                </div>
                <Button size="sm" variant="surface" onClick={() => window.print()} className="no-print">
                  <Download className="size-3.5 mr-1" /> Export PDF
                </Button>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-semibold text-primary">Executive Summary</span>
                <p className="text-sm leading-relaxed text-muted-foreground italic border-l-2 border-primary/50 pl-4">
                  "{currentReport.summary}"
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 pt-4 border-t border-border/40">
                <div className="bg-muted/20 p-4 rounded-lg border border-border/30">
                  <span className="text-xs text-muted-foreground">Primary Category Leader</span>
                  <p className="text-lg font-bold mt-1 text-primary">{currentReport.data?.categoryLeader || 'Vortex Brands'}</p>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg border border-border/30">
                  <span className="text-xs text-muted-foreground">Market Gaps Discovered</span>
                  <p className="text-lg font-bold mt-1 text-primary">{currentReport.data?.opportunitiesFound || 4} gaps</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="printable-container rounded-xl border border-border/40 bg-card/90 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.1)] space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                  <p className="text-sm text-muted-foreground">Executive report template</p>
                  <h2 className="mt-2 text-2xl font-semibold">Q1 Category Benchmark Brief</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="surface" onClick={() => window.print()} className="no-print">
                    <Download className="size-3.5 mr-1" /> Export PDF
                  </Button>
                  <FileBarChart className="size-8 text-primary no-print" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {reportSections.map((section) => (
                  <div key={section.title} className="rounded-lg bg-muted/30 p-4">
                    <h3 className="text-sm font-semibold">{section.title}</h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{section.description}</p>
                  </div>
                ))}
              </div>

              <MetricCard title="Growth benchmark trend" description="Category baseline trend.">
                <div className="chart-container">
                  <PremiumLineChart
                    data={monthlyGrowth}
                    lines={[
                      { key: 'you', color: 'var(--chart-1)' },
                      { key: 'market', color: 'var(--chart-2)' },
                      { key: 'leader', color: 'var(--chart-3)' },
                    ]}
                    height={200}
                  />
                </div>
              </MetricCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
