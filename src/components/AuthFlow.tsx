import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import WelcomeScreen from './WelcomeScreen'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'

const AuthFlow: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'signup' | 'demo-login'>('welcome')
  const { user } = useAuth()

  // If user becomes authenticated, this component will be unmounted by App.tsx
  // But we can add a loading state here for better UX
  useEffect(() => {
    if (user) {
      // User is now authenticated, App.tsx will handle the transition
      console.log('User authenticated, transitioning to main app...')
    }
  }, [user])

  const handleShowLogin = () => setCurrentScreen('login')
  const handleShowSignup = () => setCurrentScreen('signup')
  const handleShowDemoLogin = () => setCurrentScreen('demo-login')
  const handleBackToWelcome = () => setCurrentScreen('welcome')

  // Show loading state if user just authenticated
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  switch (currentScreen) {
    case 'login':
      return <LoginScreen onBack={handleBackToWelcome} />
    case 'signup':
      return <SignupScreen onBack={handleBackToWelcome} />
    case 'demo-login':
      return <LoginScreen onBack={handleBackToWelcome} isDemoMode={true} />
    default:
      return (
        <WelcomeScreen 
          onShowLogin={handleShowLogin}
          onShowSignup={handleShowSignup}
          onShowDemoLogin={handleShowDemoLogin}
        />
      )
  }
}

export default AuthFlow
