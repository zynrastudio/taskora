'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await resetPassword(email)
      if (error) {
        setError(error.message)
      } else {
        setSent(true)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-background py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-border text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Check your email</h2>
            <p className="text-muted-foreground mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <Link href="/auth/login">
              <Button className="w-full">Back to Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <CheckCircleIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">Taskora</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-foreground animate-slide-in-up">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link 
            href="/auth/login" 
            className="font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
          >
            Sign in instead
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-slide-in-up">
        <div className="bg-background py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-border hover:shadow-2xl transition-all duration-300">
          <div className="mb-6">
            <Link 
              href="/auth/login" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="text-sm">Back to Sign In</span>
            </Link>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 animate-fade-in">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="transition-all duration-200 focus:scale-[1.01] hover:border-primary/50"
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                We'll send you a link to reset your password.
              </p>
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send reset link'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 