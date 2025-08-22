import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface AuthUser {
  id: string
  ppmk_id: string
  full_name: string
  email: string
  phone?: string
  university?: string
  course?: string
  year_of_study?: number
  profile_picture?: string
  created_at?: string
  updated_at?: string
  last_login?: string
}

// Custom session management
const SESSION_KEY = 'aina_user_session'

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedSession = localStorage.getItem(SESSION_KEY)
    if (savedSession) {
      try {
        const userData = JSON.parse(savedSession)
        setUser(userData)
      } catch (error) {
        console.error('Error parsing saved session:', error)
        localStorage.removeItem(SESSION_KEY)
      }
    }
    setLoading(false)
  }, [])

  const saveSession = (userData: AuthUser) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData))
    setUser(userData)
  }

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  const verifyPpmkId = async (ppmkId: string, icNumber: string) => {
    try {
      console.log('Attempting verification with:', { ppmkId, icNumber })

      // Use RPC function to bypass RLS for verification
      const { data, error } = await supabase.rpc('verify_user_credentials', {
        p_ppmk_id: ppmkId,
        p_ic_number: icNumber
      })

      console.log('RPC verification result:', { data, error })

      if (error) {
        console.error('RPC error during verification:', error)
        throw new Error('Database error occurred. Please try again.')
      }

      if (!data || data.length === 0) {
        throw new Error('Invalid PPMK ID or IC number. Please check your details.')
      }

      const userData = data[0]

      // Check if user already has a password (account already exists)
      if (userData.password_hash) {
        throw new Error('This PPMK ID already has an account. Please sign in instead.')
      }

      return userData
    } catch (error: any) {
      console.error('Verification error:', error)
      throw error
    }
  }

  const signUp = async (ppmkId: string, password: string, userData: any) => {
    try {
      // Validate password on client side first
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      console.log('Creating account for PPMK ID:', ppmkId)

      // Use custom RPC function to create account
      const { data, error } = await supabase.rpc('create_user_account', {
        p_ppmk_id: ppmkId,
        p_password: password
      })

      if (error) {
        console.error('Account creation error:', error)
        throw new Error(error.message || 'Account creation failed. Please try again.')
      }

      console.log('Account created successfully:', data)

      // Save session and set user
      saveSession(data)

      return data
    } catch (error: any) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const signIn = async (ppmkId: string, password: string) => {
    try {
      console.log('Attempting login for PPMK ID:', ppmkId)

      // Use custom RPC function to authenticate
      const { data, error } = await supabase.rpc('authenticate_user', {
        p_ppmk_id: ppmkId,
        p_password: password
      })

      if (error) {
        console.error('Authentication error:', error)
        throw new Error(error.message || 'Login failed. Please check your credentials.')
      }

      console.log('Login successful:', data)

      // Save session and set user
      saveSession(data)

      return data
    } catch (error: any) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      clearSession()
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    verifyPpmkId,
  }
}
