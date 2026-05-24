import Logo from '@/components/common/Logo'
import { brand } from '@/constants/brand'

function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{brand.tagline}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Platform</h3>
          <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <span>Competitor intelligence</span>
            <span>Social analytics</span>
            <span>Growth recommendations</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <span>Secure workspaces</span>
            <span>Plan-based access</span>
            <span>{brand.supportEmail}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
