import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthFormShell from '@/components/forms/AuthFormShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage(password.length >= 8 ? 'Password reset UI confirmed. Backend integration pending.' : 'Use at least 8 characters.')
  }

  return (
    <AuthFormShell
      eyebrow="New password"
      title="Reset password UI with enterprise SaaS polish."
      subtitle="Prepared for token validation and secure password update endpoints."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-semibold">Reset password</h1>
          <p className="mt-2 text-sm text-muted-foreground">Frontend-only validation for now.</p>
        </div>
        <Input placeholder="New password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <Input placeholder="Confirm password" type="password" />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        <Button className="w-full" size="lg" variant="premium">Update password</Button>
        <Link to="/login" className="block text-center text-sm text-muted-foreground hover:text-foreground">Back to login</Link>
      </form>
    </AuthFormShell>
  )
}

export default ResetPasswordPage
