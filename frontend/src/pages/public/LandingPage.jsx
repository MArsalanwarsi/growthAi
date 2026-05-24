import { ArrowRight, CheckCircle2, Play, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import PremiumLineChart from '@/components/charts/PremiumLineChart'
import SectionHeader from '@/components/common/SectionHeader'
import PricingCard from '@/components/cards/PricingCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { brand } from '@/constants/brand'
import {
  faqs,
  landingFeatures,
  monthlyGrowth,
  pricingPlans,
  recommendations,
  testimonials,
} from '@/data/mockData'
import { useHeroMotion, useStaggerReveal } from '@/hooks/useGSAPAnimations'

function LandingPage() {
  const heroRef = useHeroMotion('landing')
  const sectionsRef = useStaggerReveal('landing-sections')
  const previewPlans = pricingPlans.slice(0, 3)

  return (
    <main>
      <section ref={heroRef} className="soft-grid relative overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div data-hero="panel" className="max-w-3xl">
            <Badge tone="success">
              <Sparkles className="size-3" />
              Investor-ready competitor intelligence
            </Badge>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.04] md:text-7xl">
              {brand.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Premium AI-ready growth intelligence for teams that want competitor moves,
              social signals, market gaps, and tactical recommendations in one calm command center.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="premium">
                <Link to="/signup">
                  Start free demo
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="surface">
                <Link to="/login">
                  <Play />
                  Preview dashboard
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              {['Read-only Business demo', 'Tier-based access', 'Dark and light themes'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div data-hero="panel" className="glass-panel rounded-lg p-4 md:p-5">
            <div className="rounded-lg border border-border/70 bg-background/70 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Growth radar</p>
                  <h2 className="mt-1 text-xl font-semibold">Market momentum</h2>
                </div>
                <Badge tone="premium" data-hero="pulse">+24% signal lift</Badge>
              </div>
              <div className="mt-5">
                <PremiumLineChart
                  data={monthlyGrowth}
                  height={240}
                  lines={[
                    { key: 'you', color: 'var(--chart-1)' },
                    { key: 'market', color: 'var(--chart-2)' },
                    { key: 'leader', color: 'var(--chart-3)' },
                  ]}
                />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {recommendations.slice(0, 3).map((item) => (
                  <div key={item.title} className="rounded-lg border border-border/60 bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">Impact {item.impact}</p>
                    <p className="mt-2 text-sm font-semibold">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div ref={sectionsRef}>
        <section id="platform" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            centered
            eyebrow="Platform"
            title="A premium intelligence layer for growth teams"
            description="Track what competitors do, understand why it works, and turn those signals into decisions your team can execute."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {landingFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} data-animate="stagger">
                  <CardContent className="p-6">
                    <div className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section id="use-cases" className="border-y border-border/70 bg-muted/20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
            <SectionHeader
              eyebrow="Use cases"
              title="Built for operators who need fast strategic clarity"
              description="The interface separates scanning, diagnosis, recommendations, and reporting so every growth workflow has a clear home."
            />
            <div className="grid gap-3">
              {[
                ['Competitor intelligence', 'Monitor product, pricing, social, SEO, and ads changes.'],
                ['Social analytics', 'See engagement trends, content mix, audience behavior, and posting cadence.'],
                ['Business growth advisor', 'Prioritize high-impact moves with AI-assisted recommendations.'],
              ].map(([title, description]) => (
                <div key={title} data-animate="stagger" className="glass-panel rounded-lg p-5">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'Signals tracked', value: '1.8M', icon: Zap },
              { label: 'Decision briefs', value: '42K', icon: Sparkles },
              { label: 'Secure workspace', value: '100%', icon: ShieldCheck },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} data-animate="stagger" className="glass-panel rounded-lg p-6">
                  <Icon className="size-5 text-primary" />
                  <p className="mt-5 text-4xl font-semibold">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="border-y border-border/70 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeader
              centered
              eyebrow="Pricing"
              title="Start lean, scale into a full intelligence program"
              description="Choose the access level that matches your competitor intelligence workflow."
            />
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {previewPlans.map((plan) => <PricingCard key={plan.name} plan={plan} />)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} data-animate="stagger">
                <CardContent className="p-6">
                  <p className="text-base leading-7">"{testimonial.quote}"</p>
                  <p className="mt-5 font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <SectionHeader centered eyebrow="FAQ" title="Built for growth teams" />
          <div className="mt-10 grid gap-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-border/70 bg-card/70 p-5">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default LandingPage
