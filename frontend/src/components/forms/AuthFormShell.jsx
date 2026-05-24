import Logo from '@/components/common/Logo'

function AuthFormShell({ children, eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden lg:block">
        <Logo />
        <div className="mt-10 max-w-lg">
          <p className="text-sm font-semibold text-primary">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">{title}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="mt-10 grid gap-3">
          {['Demo session ready', 'No backend calls', 'Enterprise architecture'].map((item) => (
            <div key={item} className="glass-panel rounded-lg px-4 py-3 text-sm text-muted-foreground">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel mx-auto w-full max-w-md rounded-lg p-6">{children}</div>
    </div>
  )
}

export default AuthFormShell
