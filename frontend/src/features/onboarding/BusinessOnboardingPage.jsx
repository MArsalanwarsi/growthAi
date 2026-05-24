import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input, Textarea } from '@/components/ui/input';
import { completeOnboarding, setOnboardingStep, updateOnboardingData } from '@/redux/slices/userSlice';
import { isValidUrl, required } from '@/utils/validationHelpers';
import gsap from 'gsap';
import { Shield, Server, Search, BarChart3, BrainCircuit, CheckCircle2 } from 'lucide-react';

import { businessApi } from '@/api/businessApi';
import { competitorsApi } from '@/api/competitorsApi';

const scanPipelines = [
  { text: 'Connecting to Instagram Graph API and fetching engagement benchmarks...', icon: Search },
  { text: 'Analyzing Meta Ad Library spend signals and creatives...', icon: BarChart3 },
  { text: 'Scanning site SEO organic keyword overlap clusters...', icon: Server },
  { text: 'Parsing TikTok sentiment indices and feedback...', icon: Shield },
  { text: 'Executing competitor discovery gap modeling engine...', icon: BrainCircuit },
];

const steps = [
  {
    title: 'Business profile',
    fields: [
      { key: 'businessName', label: 'Business name *', placeholder: 'Northstar Commerce' },
      { key: 'category', label: 'Category *', placeholder: 'Ecommerce SaaS' },
      { key: 'website', label: 'Website *', placeholder: 'https://northstar.example' },
    ],
  },
  {
    title: 'Channels',
    fields: [
      { key: 'instagram', label: 'Instagram', placeholder: '@northstar' },
      { key: 'facebook', label: 'Facebook', placeholder: 'facebook.com/northstar' },
      { key: 'tiktok', label: 'TikTok', placeholder: '@northstar' },
      { key: 'shopLinks', label: 'Shop links', placeholder: 'Shopify, Amazon, Etsy' },
      { key: 'appLink', label: 'App link', placeholder: 'App Store or Play Store URL' },
    ],
  },
  {
    title: 'Market focus',
    fields: [
      { key: 'targetCountry', label: 'Target country *', placeholder: 'United States' },
      { key: 'targetAudience', label: 'Target audience', placeholder: 'DTC founders and marketing teams' },
      { key: 'competitorKeywords', label: 'Competitor keywords', placeholder: 'analytics, social listening, competitor ads', textarea: true },
    ],
  },
  {
    title: 'Growth plan',
    fields: [
      { key: 'budget', label: 'Monthly budget', placeholder: '$10,000' },
      { key: 'growthGoal', label: 'Growth goal *', placeholder: 'Increase qualified pipeline by 30%', textarea: true },
    ],
  },
];

function BusinessOnboardingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onboarding = useSelector((state) => state.user.onboarding);
  const authUser = useSelector((state) => state.auth.user);
  
  const [form, setForm] = useState({
    businessName: 'Northstar Commerce',
    category: 'Ecommerce SaaS',
    website: 'https://northstar.example',
    instagram: '@northstar',
    facebook: 'facebook.com/northstar',
    tiktok: '@northstar',
    shopLinks: 'Shopify, Amazon',
    appLink: 'https://apps.apple.com/app/northstar',
    targetCountry: 'United States',
    targetAudience: 'DTC founders and marketing operators',
    competitorKeywords: 'competitor intelligence, social analytics, growth advisor',
    budget: '$10,000',
    growthGoal: 'Increase qualified pipeline by 30%',
    ...onboarding.data,
  });

  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const currentStep = onboarding.currentStep;
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    dispatch(updateOnboardingData({ [key]: value }));
  };

  const validateStep = () => {
    const stepFields = steps[currentStep].fields;
    const requiredKeys = ['businessName', 'category', 'website', 'targetCountry', 'growthGoal'];
    const requiredFields = stepFields.filter(f => requiredKeys.includes(f.key));
    
    const missing = requiredFields.some((field) => !required(form[field.key]));
    const invalidWebsite = stepFields.some((field) => field.key === 'website') && !isValidUrl(form.website);

    if (missing) return 'Please populate all mandatory fields marked with * before continuing.';
    if (invalidWebsite) return 'Please provide a valid website URL.';
    return '';
  };

  const handleNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    if (currentStep === steps.length - 1) {
      setIsScanning(true);
      return;
    }

    dispatch(setOnboardingStep(currentStep + 1));
  };

  // GSAP animation triggers for scanning steps
  useEffect(() => {
    if (!isScanning) return;

    let apiCompleted = false;
    let animCompleted = false;
    let apiError = null;

    const triggerBackendCalls = async () => {
      try {
        if (authUser?.isDemo) {
          apiCompleted = true;
          checkCompletion();
          return;
        }

        const payload = {
          name: form.businessName,
          industry: form.category,
          websiteUrl: form.website,
          instagramHandle: form.instagram || '',
          facebookPage: form.facebook || '',
          tiktokAccount: form.tiktok || '',
          youtubeChannel: '',
          shopLinks: form.shopLinks ? form.shopLinks.split(',').map(s => s.trim()).filter(Boolean) : [],
          appLinks: form.appLink ? [form.appLink] : [],
          targetCountry: form.targetCountry,
          targetAudience: form.targetAudience || '',
          competitorKeywords: form.competitorKeywords ? form.competitorKeywords.split(',').map(s => s.trim()).filter(Boolean) : [],
          budget: form.budget || '',
          mainGrowthGoal: form.growthGoal
        };

        // 1. Save profile
        await businessApi.create(payload);

        // 2. Run discover (creates list in MongoDB)
        await competitorsApi.discover(payload);

        apiCompleted = true;
        checkCompletion();
      } catch (err) {
        console.error('Failed to complete onboarding API sync:', err);
        apiError = err.message || 'Onboarding database sync failed';
        apiCompleted = true;
        checkCompletion();
      }
    };

    const checkCompletion = () => {
      if (apiCompleted && animCompleted) {
        if (apiError) {
          setError(apiError);
          setIsScanning(false);
        } else {
          dispatch(completeOnboarding(form));
          navigate('/dashboard');
        }
      }
    };

    let timer = null;
    const runScanAnimations = (stepIdx) => {
      if (stepIdx >= scanPipelines.length) {
        animCompleted = true;
        checkCompletion();
        return;
      }

      setScanStep(stepIdx);

      // Stagger animate incoming logs
      gsap.fromTo(
        '.scan-pipeline-log',
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );

      timer = setTimeout(() => {
        runScanAnimations(stepIdx + 1);
      }, 1400); // 1.4s per intelligence pipeline segment
    };

    triggerBackendCalls();
    runScanAnimations(0);

    return () => clearTimeout(timer);
  }, [authUser?.isDemo, dispatch, form, isScanning, navigate]);

  if (isScanning) {
    const CurrentIcon = scanPipelines[scanStep].icon;
    return (
      <div className="mx-auto max-w-3xl space-y-6 py-12">
        <Card className="glass-panel overflow-hidden border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="relative mx-auto flex size-20 items-center justify-between rounded-full bg-primary/10 text-primary">
              <CurrentIcon className="mx-auto size-10 animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" />
            </div>

            <h2 className="mt-8 text-2xl font-semibold text-gradient">AI Competitor Scanning In Progress...</h2>
            <p className="mt-2 text-sm text-muted-foreground">Please wait while the active growth intelligence pipeline benchmarks your category.</p>

            <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${((scanStep + 1) / scanPipelines.length) * 100}%` }}
              />
            </div>

            {/* Pipeline logs */}
            <div className="mt-8 space-y-3 rounded-lg border border-border/50 bg-background/50 p-5 text-left font-mono text-xs text-muted-foreground">
              {scanPipelines.map((pipeline, idx) => {
                const Icon = pipeline.icon;
                const active = idx === scanStep;
                const completed = idx < scanStep;

                return (
                  <div 
                    key={idx} 
                    className={`scan-pipeline-log flex items-center gap-3 transition-colors duration-300 ${
                      active ? 'text-primary' : completed ? 'text-muted-foreground/60' : 'text-muted-foreground/30'
                    }`}
                  >
                    {completed ? (
                      <CheckCircle2 className="size-4 text-primary shrink-0" />
                    ) : (
                      <Icon className={`size-4 shrink-0 ${active ? 'animate-spin' : ''}`} />
                    )}
                    <span className={active ? 'font-semibold text-foreground' : ''}>{pipeline.text}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        eyebrow="Business onboarding"
        title="Calibrate GrowthRadar around your market"
        description={authUser?.isDemo ? 'Read-only demo mode lets you review the full onboarding experience without saving data.' : 'This multi-step flow saves your market, channels, competitor keywords, budget, and growth goals.'}
      />

      <Card className="glass-panel">
        <CardContent className="p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold">{step.title}</span>
              <span className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {step.fields.map((field) => {
              const Field = field.textarea ? Textarea : Input;
              return (
                <label key={field.key} className={field.textarea ? 'md:col-span-2' : ''}>
                  <span className="mb-2 block text-sm font-semibold">{field.label}</span>
                  <Field
                    placeholder={field.placeholder}
                    value={form[field.key] || ''}
                    onChange={(event) => updateField(field.key, event.target.value)}
                    className="border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background transition-all"
                  />
                </label>
              );
            })}
          </div>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-border/40 pt-6">
            <Button
              disabled={currentStep === 0}
              type="button"
              variant="outline"
              onClick={() => dispatch(setOnboardingStep(Math.max(0, currentStep - 1)))}
              className="border-border/60 hover:bg-muted/40"
            >
              Back
            </Button>
            <Button type="button" variant="premium" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Finish Onboarding & Discover Competitors' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BusinessOnboardingPage;
