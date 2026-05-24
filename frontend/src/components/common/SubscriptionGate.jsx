import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserTier } from '@/redux/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Lock, ArrowRight } from 'lucide-react';
import { tierPower } from '@/utils/constants';

export function SubscriptionGate({ children, requiredTier = 'Starter' }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loadingTier, setLoadingTier] = useState(null);

  const activeTier = user?.tier || 'Free';

  const hasAccess = (tierPower[activeTier] ?? 0) >= (tierPower[requiredTier] ?? 1);

  if (hasAccess) {
    return <>{children}</>;
  }

  const handleUpgrade = async (targetTier) => {
    setLoadingTier(targetTier);
    try {
      await dispatch(updateUserTier(targetTier)).unwrap();
    } catch (err) {
      console.error('Failed to simulate subscription upgrade:', err);
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center p-4">
      <div className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm md:flex-row">
        
        <div className="flex flex-1 flex-col justify-between border-b border-border/70 bg-background p-8 md:border-b-0 md:border-r md:p-10">
          <div>
            <Badge tone="outline" className="mb-6 uppercase">
              <Lock className="size-3" />
              Plan required
            </Badge>

            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Unlock Professional Competitor Intelligence
            </h1>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              You are currently on the <span className="font-bold text-foreground">{activeTier}</span> tier.
              This module requires <span className="font-bold text-foreground">{requiredTier}</span> or higher.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-md border border-border bg-muted p-1">
                <Check className="size-3 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-foreground">Personalized AI Suggestions</h4>
                <p className="text-xs text-muted-foreground">Deep prompts configured around your website links, budgets, and target countries.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-md border border-border bg-muted p-1">
                <Check className="size-3 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-foreground">Head-to-Head Comparison</h4>
                <p className="text-xs text-muted-foreground">Battle Mode analytics plotting organic traffic keywords, speed profiles, and active Meta ads.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center space-y-6 bg-muted/30 p-8 md:w-[380px] md:p-10">
          <h2 className="text-xs font-bold uppercase text-muted-foreground">
            Select a plan
          </h2>

          <div className={`rounded-lg border bg-background p-4 transition-all ${
            requiredTier === 'Starter' ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-border'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-foreground">Starter</h3>
              <span className="rounded bg-muted px-2 py-0.5 text-xs font-bold text-foreground">
                $49/mo
              </span>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">Track up to 10 competitors; unlock suggestions, battle tools, and opportunities.</p>
            <Button
              className="w-full text-xs font-bold rounded"
              variant={requiredTier === 'Starter' ? 'default' : 'outline'}
              disabled={loadingTier !== null}
              onClick={() => handleUpgrade('Starter')}
            >
              {loadingTier === 'Starter' ? 'Upgrading...' : 'Activate Starter'}
              <ArrowRight className="size-3 ml-2" />
            </Button>
          </div>

          <div className="relative rounded-lg border border-primary bg-background p-4 shadow-sm ring-1 ring-primary">
            <div className="absolute -top-2.5 right-4 rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
              Recommended
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Crown className="size-3.5 text-amber-500 fill-amber-500" />
                <h3 className="text-sm font-bold text-foreground">Pro</h3>
              </div>
              <span className="rounded bg-muted px-2 py-0.5 text-xs font-bold text-foreground">
                $99/mo
              </span>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">Unlimited competitors, full intelligence charts, and executive report creation.</p>
            <Button
              className="w-full text-xs font-bold rounded"
              disabled={loadingTier !== null}
              onClick={() => handleUpgrade('Pro')}
            >
              {loadingTier === 'Pro' ? 'Upgrading...' : 'Activate Pro Plan'}
              <ArrowRight className="size-3 ml-2 text-white" />
            </Button>
          </div>

          <div className="text-center text-[10px] text-muted-foreground">
            Access is stored on your account profile. Demo workspaces already include Business access.
          </div>
        </div>

      </div>
    </div>
  );
}

export default SubscriptionGate;
