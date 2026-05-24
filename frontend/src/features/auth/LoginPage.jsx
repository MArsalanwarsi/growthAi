import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthFormShell from '@/components/forms/AuthFormShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { validateEmail } from '@/utils/validationHelpers'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: 'demo@growthradar.ai', password: 'growthradar' })
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateEmail(form.email)) {
      setError('Enter a valid work email.')
      return
    }

    login(form)
    navigate(location.state?.from?.pathname || '/dashboard')
  }

  return (
    <AuthFormShell
      eyebrow="Welcome back"
      title="Enter the command center without waiting for backend auth."
      subtitle="Demo login creates a local mock session and unlocks every protected dashboard route."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-semibold">Log in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Use the demo credentials already filled in.</p>
        </div>
        <Input placeholder="Work email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <Input placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button className="w-full" size="lg" variant="premium">Open dashboard</Button>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Link to="/forgot-password" className="hover:text-foreground">Forgot password?</Link>
          <Link to="/signup" className="hover:text-foreground">Create account</Link>
        </div>
      </form>
    </AuthFormShell>
  )
}

export default LoginPage
