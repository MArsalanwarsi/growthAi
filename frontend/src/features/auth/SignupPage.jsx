import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthFormShell from '@/components/forms/AuthFormShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { required, validateEmail } from '@/utils/validationHelpers'

const allowedTiers = ['Free', 'Starter', 'Pro', 'Business']

function SignupPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const selectedPlan = allowedTiers.includes(searchParams.get('plan')) ? searchParams.get('plan') : 'Free'
  const { signup, status } = useAuth()
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!required(form.name) || !required(form.company) || !validateEmail(form.email)) {
      setError('Complete your name, company, and a valid work email.')
      return
    }

    if (form.password.length < 8) {
      setError('Use at least 8 characters for your password.')
      return
    }

    try {
      await signup({ ...form, tier: selectedPlan }).unwrap()
      navigate('/onboarding')
    } catch (message) {
      setError(message || 'Unable to create this workspace.')
    }
  }

  return (
    <AuthFormShell
      eyebrow="Create workspace"
      title="Create a GrowthRadar workspace."
      subtitle="Your selected plan controls which intelligence modules are available after onboarding."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="mt-2 text-sm text-muted-foreground">{`Selected plan: ${selectedPlan}`}</p>
        </div>
        <Input placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <Input placeholder="Company" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
        <Input placeholder="Work email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <Input placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button className="w-full" size="lg" variant="premium" disabled={status === 'loading'}>
          {status === 'loading' ? 'Creating workspace...' : 'Create workspace'}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have access? <Link to="/login" className="text-foreground">Log in</Link>
        </p>
      </form>
    </AuthFormShell>
  )
}

export default SignupPage
