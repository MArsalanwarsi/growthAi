import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserTier } from '@/redux/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Shield, Check, Crown, Lock, ArrowRight } from 'lucide-react';

export function SubscriptionGate({ children, requiredTier = 'Starter' }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loadingTier, setLoadingTier] = useState(null);

  const activeTier = user?.tier || 'Free';

  // Map tiers to power levels to easily check authorization
  const tierPower = {
    'Free': 0,
    'Starter': 1,
    'Pro': 2,
    'Business': 3
  };

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
    <div className="relative min-h-[70vh] flex items-center justify-center p-4">
      {/* Editorial Swiss Modernism Backdrop */}
      <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-sm pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl bg-white border border-[#E2E8F0] shadow-sm rounded-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Left column: Swiss editorial typography and messaging */}
        <div className="p-8 md:p-10 flex-1 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E2E8F0] bg-white">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-slate-600 mb-6 uppercase tracking-wider">
              <Lock className="size-3 text-[#1E293B]" />
              Premium Feature Lock
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight leading-none mb-4">
              Unlock Professional Competitor Intelligence
            </h1>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
              You are currently on the <span className="font-bold text-slate-900">{activeTier}</span> tier. 
              This advanced B2B diagnostic module requires a <span className="font-bold text-slate-900">{requiredTier}</span> subscription or higher to compile real-time telemetry, run strategic AI battle gates, and compile PDF briefings.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded bg-slate-100 p-1 mt-0.5 border border-slate-200">
                <Check className="size-3 text-slate-800" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Personalized AI Suggestions</h4>
                <p className="text-xs text-slate-600">Deep prompts configured around your website links, budgets, and target countries.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded bg-slate-100 p-1 mt-0.5 border border-slate-200">
                <Check className="size-3 text-slate-800" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Head-to-Head Comparison</h4>
                <p className="text-xs text-slate-600">Battle Mode analytics plotting organic traffic keywords, speed profiles, and active Meta ads.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: High-fidelity functional pricing matrices */}
        <div className="p-8 md:p-10 w-full md:w-[380px] bg-slate-50 flex flex-col justify-center space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Plan to Simulate Instant Upgrade
          </h2>

          {/* Starter Tier */}
          <div className={`p-4 border rounded bg-white transition-all ${
            requiredTier === 'Starter' ? 'border-slate-900 ring-1 ring-slate-900 shadow-sm' : 'border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-950">Starter</h3>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                $49/mo
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-4">Track up to 10 competitors; unlock suggestion pages and battle tools.</p>
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

          {/* Pro Tier (Recommended) */}
          <div className="p-4 border border-slate-900 rounded bg-white relative shadow-sm ring-1 ring-slate-900">
            <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-slate-950 text-white rounded text-[10px] uppercase font-bold tracking-wider">
              Recommended
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Crown className="size-3.5 text-amber-500 fill-amber-500" />
                <h3 className="text-sm font-bold text-slate-950">Pro</h3>
              </div>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                $99/mo
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-4">Unlimited competitors, fully customized intelligence charts, and executive PDF briefing creation.</p>
            <Button
              className="w-full text-xs font-bold rounded bg-slate-950 hover:bg-slate-900 text-white"
              disabled={loadingTier !== null}
              onClick={() => handleUpgrade('Pro')}
            >
              {loadingTier === 'Pro' ? 'Upgrading...' : 'Activate Pro Plan'}
              <ArrowRight className="size-3 ml-2 text-white" />
            </Button>
          </div>

          <div className="text-[10px] text-center text-slate-400">
            Clicking a plan instantly provisions and syncs your customer metadata profile in MongoDB.
          </div>
        </div>

      </div>
    </div>
  );
}

export default SubscriptionGate;
