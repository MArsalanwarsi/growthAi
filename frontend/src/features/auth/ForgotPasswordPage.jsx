import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthFormShell from '@/components/forms/AuthFormShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { validateEmail } from '@/utils/validationHelpers'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage(validateEmail(email) ? 'Password reset flow is UI-only and ready for backend wiring.' : 'Enter a valid email first.')
  }

  return (
    <AuthFormShell
      eyebrow="Recovery"
      title="A polished reset experience prepared for future auth APIs."
      subtitle="This screen validates input locally and keeps all backend behavior out of the frontend demo."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-semibold">Forgot password</h1>
          <p className="mt-2 text-sm text-muted-foreground">We will connect this to auth later.</p>
        </div>
        <Input placeholder="Work email" value={email} onChange={(event) => setEmail(event.target.value)} />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        <Button className="w-full" size="lg" variant="premium">Send reset link</Button>
        <Link to="/login" className="block text-center text-sm text-muted-foreground hover:text-foreground">Back to login</Link>
      </form>
    </AuthFormShell>
  )
}

export default ForgotPasswordPage
