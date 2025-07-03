'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { supabase, isDevelopmentMode } from '@/lib/supabase'
import { useAppStore } from '@/stores/useAppStore'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: any }>
  signUp: (email: string, password: string, options?: any) => Promise<{ error?: any }>
  signInWithGoogle: () => Promise<{ error?: any }>
  signInWithApple: () => Promise<{ error?: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: any }>
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { user: appUser, setUser: setAppUser } = useAppStore()

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          avatar: session.user.user_metadata?.avatar_url
        })
        setAppUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || session.user.email!,
          avatar_url: session.user.user_metadata?.avatar_url,
          created_at: session.user.created_at,
          updated_at: session.user.updated_at || session.user.created_at,
        })
      }
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          avatar: session.user.user_metadata?.avatar_url
        })
        setAppUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || session.user.email!,
          avatar_url: session.user.user_metadata?.avatar_url,
          created_at: session.user.created_at,
          updated_at: session.user.updated_at || session.user.created_at,
        })
      } else {
        setUser(null)
        setAppUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [setAppUser])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (data.user && !error) {
        setUser({
          id: data.user.id,
          email: data.user.email || email,
          name: data.user.user_metadata?.name || email.split('@')[0],
          avatar: data.user.user_metadata?.avatar_url
        })
      }
      
      return { error }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, options?: any) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options
      })
      
      if (data.user && !error) {
        setUser({
          id: data.user.id,
          email: data.user.email || email,
          name: options?.data?.name || email.split('@')[0],
          avatar: data.user.user_metadata?.avatar_url
        })
      }
      
      return { error }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      if (isDevelopmentMode) {
        // Mock Google authentication for development
        const mockUser = {
          id: 'google-user-' + Date.now(),
          email: 'user@gmail.com',
          name: 'Google User',
          avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c'
        }
        setUser(mockUser)
        return { error: null }
      } else {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/dashboard`
          }
        })
        return { error }
      }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signInWithApple = async () => {
    setLoading(true)
    try {
      if (isDevelopmentMode) {
        // Mock Apple authentication for development
        const mockUser = {
          id: 'apple-user-' + Date.now(),
          email: 'user@icloud.com',
          name: 'Apple User',
          avatar: 'https://www.gravatar.com/avatar/default?d=mp&s=96'
        }
        setUser(mockUser)
        return { error: null }
      } else {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'apple',
          options: {
            redirectTo: `${window.location.origin}/dashboard`
          }
        })
        return { error }
      }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      setUser(null)
      setAppUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      return { error }
    } catch (error) {
      return { error }
    }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithApple,
    signOut,
    resetPassword
  }
} 