import { createClient } from '@supabase/supabase-js'

// Fallback values for development when env vars are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

// Create a mock client if real credentials are not available
const isDevelopmentMode = supabaseUrl === 'https://demo.supabase.co'

let supabase: any

if (isDevelopmentMode) {
  // Mock Supabase client for development
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: (callback: any) => {
        callback('SIGNED_OUT', null)
        return { data: { subscription: { unsubscribe: () => {} } }, error: null }
      },
      signInWithPassword: ({ email, password }: any) => {
        // Mock successful login for demo purposes
        if (email && password) {
          const mockUser = {
            id: 'demo-user-id',
            email,
            user_metadata: { name: email.split('@')[0] },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          return Promise.resolve({ data: { user: mockUser, session: mockUser }, error: null })
        }
        return Promise.resolve({ data: null, error: { message: 'Invalid credentials' } })
      },
      signUp: ({ email, password, options }: any) => {
        // Mock successful signup
        if (email && password) {
          const mockUser = {
            id: 'demo-user-id',
            email,
            user_metadata: options?.data || { name: email.split('@')[0] },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          return Promise.resolve({ data: { user: mockUser, session: mockUser }, error: null })
        }
        return Promise.resolve({ data: null, error: { message: 'Invalid data provided' } })
      },
      signOut: () => Promise.resolve({ error: null }),
      resetPasswordForEmail: (email: string) => 
        Promise.resolve({ data: {}, error: null })
    }
  }
} else {
  // Real Supabase client for production
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase, isDevelopmentMode } 