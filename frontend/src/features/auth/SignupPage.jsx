import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthFormShell from '@/components/forms/AuthFormShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { required, validateEmail } from '@/utils/validationHelpers'

function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({
    name: 'Growth Operator',
    company: 'Northstar Commerce',
    email: 'founder@northstar.example',
    password: 'growthradar',
  })
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!required(form.name) || !required(form.company) || !validateEmail(form.email)) {
      setError('Complete your name, company, and a valid work email.')
      return
    }

    signup(form)
    navigate('/onboarding')
  }

  return (
    <AuthFormShell
      eyebrow="Create workspace"
      title="Launch a polished SaaS demo with a local account session."
      subtitle="Signup stores a frontend-only token and prepares the onboarding flow for future API submission."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="mt-2 text-sm text-muted-foreground">No backend call is made.</p>
        </div>
        <Input placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <Input placeholder="Company" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
        <Input placeholder="Work email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <Input placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button className="w-full" size="lg" variant="premium">Create demo workspace</Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have access? <Link to="/login" className="text-foreground">Log in</Link>
        </p>
      </form>
    </AuthFormShell>
  )
}

export default SignupPage
