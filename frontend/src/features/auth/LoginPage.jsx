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
  const { login, startDemo, status } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateEmail(form.email)) {
      setError('Enter a valid work email.')
      return
    }

    if (!form.password) {
      setError('Enter your password.')
      return
    }

    try {
      await login(form).unwrap()
      navigate(location.state?.from?.pathname || '/dashboard')
    } catch (message) {
      setError(message || 'Invalid email or password.')
    }
  }

  const handleDemo = () => {
    startDemo()
    navigate('/dashboard')
  }

  return (
    <AuthFormShell
      eyebrow="Welcome back"
      title="Sign in to your GrowthRadar workspace."
      subtitle="Use a real account for saved work, or open the read-only Business-tier demo to review the complete interface."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-semibold">Log in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Demo preview is available without changing production data.</p>
        </div>
        <Input placeholder="Work email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <Input placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button className="w-full" size="lg" variant="premium" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in...' : 'Open dashboard'}
        </Button>
        <Button className="w-full" size="lg" type="button" variant="outline" onClick={handleDemo}>
          View Business demo
        </Button>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Link to="/forgot-password" className="hover:text-foreground">Forgot password?</Link>
          <Link to="/signup" className="hover:text-foreground">Create account</Link>
        </div>
      </form>
    </AuthFormShell>
  )
}

export default LoginPage
