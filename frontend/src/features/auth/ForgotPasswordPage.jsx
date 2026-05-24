import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '@/api/authApi'
import AuthFormShell from '@/components/forms/AuthFormShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { validateEmail } from '@/utils/validationHelpers'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateEmail(email)) {
      setMessage('Enter a valid email first.')
      return
    }

    setLoading(true)
    setMessage('')
    setResetToken('')

    try {
      const response = await authApi.forgotPassword({ email })
      setResetToken(response.data?.resetToken || '')
      setMessage('If this email exists, a secure reset link is ready.')
    } catch (error) {
      setMessage(error.message || 'Unable to prepare a reset link right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthFormShell
      eyebrow="Recovery"
      title="Recover access to your workspace."
      subtitle="Enter the email attached to your GrowthRadar account and continue with the secure reset flow."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-semibold">Forgot password</h1>
          <p className="mt-2 text-sm text-muted-foreground">We will prepare a secure recovery link for this account.</p>
        </div>
        <Input placeholder="Work email" value={email} onChange={(event) => setEmail(event.target.value)} />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        {resetToken && (
          <Button asChild className="w-full" size="lg" variant="outline">
            <Link to={`/reset-password?token=${encodeURIComponent(resetToken)}`}>Continue to reset</Link>
          </Button>
        )}
        <Button className="w-full" size="lg" variant="premium" disabled={loading}>
          {loading ? 'Preparing link...' : 'Send reset link'}
        </Button>
        <Link to="/login" className="block text-center text-sm text-muted-foreground hover:text-foreground">Back to login</Link>
      </form>
    </AuthFormShell>
  )
}

export default ForgotPasswordPage
