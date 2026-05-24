import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { authApi } from '@/api/authApi'
import AuthFormShell from '@/components/forms/AuthFormShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const token = searchParams.get('token') || ''

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!token) {
      setMessage('Request a reset link before choosing a new password.')
      return
    }

    if (password.length < 8) {
      setMessage('Use at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Passwords must match.')
      return
    }

    setLoading(true)

    try {
      await authApi.resetPassword({ token, password })
      setMessage('Password updated. You can log in with the new password.')
    } catch (error) {
      setMessage(error.message || 'Unable to update password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthFormShell
      eyebrow="New password"
      title="Choose a new password."
      subtitle="Use the reset token from your recovery flow to secure the account."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-semibold">Reset password</h1>
          <p className="mt-2 text-sm text-muted-foreground">{token ? 'Reset token detected.' : 'Request a reset link first.'}</p>
        </div>
        <Input placeholder="New password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <Input placeholder="Confirm password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        <Button className="w-full" size="lg" variant="premium" disabled={loading}>
          {loading ? 'Updating...' : 'Update password'}
        </Button>
        <Link to="/login" className="block text-center text-sm text-muted-foreground hover:text-foreground">Back to login</Link>
      </form>
    </AuthFormShell>
  )
}

export default ResetPasswordPage
