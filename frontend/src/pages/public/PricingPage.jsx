import PricingCard from '@/components/cards/PricingCard'
import PageReveal from '@/components/animations/PageReveal'
import SectionHeader from '@/components/common/SectionHeader'
import { pricingPlans } from '@/data/mockData'

function PricingPage() {
  return (
    <PageReveal>
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          centered
          eyebrow="Pricing"
          title="Premium intelligence plans for every growth stage"
          description="Select a plan to create a workspace with matching module access."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {pricingPlans.map((plan) => <PricingCard key={plan.name} plan={plan} />)}
        </div>
      </main>
    </PageReveal>
  )
}

export default PricingPage
