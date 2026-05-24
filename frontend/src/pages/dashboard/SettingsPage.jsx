import { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { Badge } from '@/components/ui/badge';
import { Key, ShieldAlert, Users, Layers, Sparkles, CreditCard } from 'lucide-react';

const tabs = [
  { value: 'profile', label: 'Profile' },
  { value: 'organization', label: 'Organization' },
  { value: 'team', label: 'Team Workspace' },
  { value: 'apikeys', label: 'API Keys' },
  { value: 'ai_providers', label: 'AI Settings' },
  { value: 'billing', label: 'Billing' }
];

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [apiKey, setApiKey] = useState('gr_live_6f43e...321a');
  const [activeAiProvider, setActiveAiProvider] = useState('gemini');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Workspace Control Center"
        description="Configure account preferences, organization targets, API credentials, team seats, and active intelligence layers."
      />
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <Card className="glass-panel">
        <CardContent className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="mb-2 block text-xs font-semibold text-muted-foreground">Operator Name</span>
                  <Input defaultValue={user?.name || 'Growth Operator'} className="border-border/50 bg-background/50" />
                </label>
                <label>
                  <span className="mb-2 block text-xs font-semibold text-muted-foreground">Email Address</span>
                  <Input defaultValue={user?.email || 'demo@growthradar.ai'} className="border-border/50 bg-background/50" />
                </label>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 p-4 pt-5 mt-6">
                <div>
                  <h4 className="font-semibold text-sm">Workspace Styling</h4>
                  <p className="mt-1 text-xs text-muted-foreground">Current active system theme: <span className="capitalize font-semibold text-primary">{theme}</span></p>
                </div>
                <Button variant="premium" onClick={toggleTheme}>Toggle Theme</Button>
              </div>
            </div>
          )}

          {activeTab === 'organization' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gradient">Brand Calibration</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="mb-2 block text-xs font-semibold text-muted-foreground">Business Name</span>
                  <Input defaultValue={user?.company || 'Northstar Commerce'} className="border-border/50 bg-background/50" />
                </label>
                <label>
                  <span className="mb-2 block text-xs font-semibold text-muted-foreground">Target Country Focus</span>
                  <Input defaultValue="United States" className="border-border/50 bg-background/50" />
                </label>
              </div>
              <Button variant="premium" className="mt-2">Update Organization</Button>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-4 border-b border-border/40 pb-3">
                <div>
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Users className="size-4 text-primary shrink-0" />
                    Role-Based Workspace Dashboard
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Manage team member access privileges and audit logs.</p>
                </div>
                <Button size="sm" variant="premium">Invite Member</Button>
              </div>

              <div className="space-y-3 pt-3">
                {[
                  { name: 'Growth Operator', email: 'demo@growthradar.ai', role: 'Owner' },
                  { name: 'Marketing Manager', email: 'marketing@growthradar.ai', role: 'Editor' }
                ].map((member, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-muted/20 p-3 rounded-lg border border-border/30 text-xs">
                    <div>
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-muted-foreground mt-0.5">{member.email}</p>
                    </div>
                    <Badge tone="outline">{member.role}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'apikeys' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Key className="size-4 text-primary shrink-0" />
                Developer API Credentials
              </h3>
              <p className="text-xs text-muted-foreground">Query social crawlers and recommendations endpoints directly into your own data pipes.</p>

              <div className="flex gap-2 max-w-xl pt-2">
                <Input value={apiKey} readOnly className="font-mono text-xs border-border/50 bg-background/50" />
                <Button variant="outline" size="sm" onClick={() => setApiKey(`gr_live_${Math.random().toString(36).substr(2, 12)}`)}>
                  Roll Key
                </Button>
              </div>

              <div className="flex gap-2 items-center text-xs text-muted-foreground border-t border-border/40 pt-4">
                <ShieldAlert className="size-4 text-warning" />
                <span>Keep your API access keys secure. Never expose them in frontend environments.</span>
              </div>
            </div>
          )}

          {activeTab === 'ai_providers' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Sparkles className="size-4 text-primary shrink-0" />
                AI Provider Settings
              </h3>
              <p className="text-xs text-muted-foreground">Toggle active AI processing layer models for report generation and competitive reasoning.</p>

              <div className="grid gap-3 max-w-lg pt-3">
                {[
                  { id: 'gemini', label: 'Google Gemini 1.5 Pro/Flash Integration', description: 'Active default layer with fallback pitch matrices if offline.' },
                  { id: 'custom', label: 'Enterprise Custom LLM Router', description: 'Integrate private fine-tuned model via custom API endpoint without rebuilding frontend logic.' }
                ].map((provider) => (
                  <label 
                    key={provider.id} 
                    className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                      activeAiProvider === provider.id ? 'border-primary bg-primary/5' : 'border-border/40 bg-muted/20 hover:bg-muted/30'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="ai_provider" 
                      checked={activeAiProvider === provider.id}
                      onChange={() => setActiveAiProvider(provider.id)}
                      className="mt-1 accent-primary" 
                    />
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-foreground">{provider.label}</span>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{provider.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-border/40 pb-3 flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <CreditCard className="size-4 text-primary shrink-0" />
                    Subscription Management
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Upgrade your category benchmark limits and unlock SEO/Ads models.</p>
                </div>
                <Badge tone="premium">Pro Tier Active</Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: 'Starter Plan', price: '$29/mo', limits: 'Track 5 competitors' },
                  { name: 'Professional Plan', price: '$99/mo', limits: 'Full SEO & Ads Intelligence' },
                  { name: 'Business Enterprise', price: '$299/mo', limits: 'Full White Label APIs' }
                ].map((plan, idx) => (
                  <div key={idx} className="rounded-lg border border-border/30 bg-muted/15 p-4 space-y-2">
                    <span className="text-xs font-semibold text-foreground">{plan.name}</span>
                    <p className="text-2xl font-bold">{plan.price}</p>
                    <p className="text-[10px] text-muted-foreground">{plan.limits}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsPage;
