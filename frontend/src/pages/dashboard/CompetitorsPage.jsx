import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, Search } from 'lucide-react';
import { fetchCompetitors, setCompetitorActivity, setCompetitorQuery } from '@/redux/slices/competitorsSlice';
import CompetitorCard from '@/components/cards/CompetitorCard';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

function CompetitorsPage() {
  const dispatch = useDispatch();
  const { items, filters, loading } = useSelector((state) => state.competitors);

  // Fetch competitive profiles on mount
  useEffect(() => {
    dispatch(fetchCompetitors());
  }, [dispatch]);

  const filteredCompetitors = items.filter((competitor) => {
    const matchesQuery = competitor.name.toLowerCase().includes(filters.query.toLowerCase());
    const matchesActivity = filters.activity === 'All' || competitor.strength === filters.activity;
    return matchesQuery && matchesActivity;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Competitor dashboard"
        title="Track competitors with premium signal cards"
        description="Search and filter brands by growth, engagement, pricing, ad activity, SEO score, and why-they-win previews."
        actions={<Button variant="premium"><Filter className="size-4" /> Add competitor</Button>}
      />

      <div className="grid gap-3 rounded-lg border border-border/40 bg-card/70 p-4 md:grid-cols-[1fr_auto]">
        <SearchBar 
          placeholder="Search competitors..." 
          value={filters.query} 
          onChange={(value) => dispatch(setCompetitorQuery(value))} 
        />
        
        <div className="flex flex-wrap gap-2">
          {['All', 'Aggressive', 'Moderate', 'Testing'].map((activity) => (
            <Button
              key={activity}
              size="sm"
              variant={filters.activity === activity ? 'default' : 'outline'}
              onClick={() => dispatch(setCompetitorActivity(activity))}
              className="px-3"
            >
              {activity}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-64 rounded-lg bg-card/60" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredCompetitors.length > 0 ? (
            filteredCompetitors.map((competitor) => (
              <CompetitorCard key={competitor.id} competitor={competitor} />
            ))
          ) : (
            <div className="lg:col-span-2 text-center py-12 rounded-lg border border-dashed border-border/50 bg-card/30">
              <Search className="mx-auto size-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No competitors found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your active query or search terms.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CompetitorsPage;
