import React, { useState } from 'react'
import WelcomeScreen from './WelcomeScreen'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'

const AuthFlow: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'signup'>('welcome')

  const handleShowLogin = () => setCurrentScreen('login')
  const handleShowSignup = () => setCurrentScreen('signup')
  const handleBackToWelcome = () => setCurrentScreen('welcome')

  switch (currentScreen) {
    case 'login':
      return <LoginScreen onBack={handleBackToWelcome} />
    case 'signup':
      return <SignupScreen onBack={handleBackToWelcome} />
    default:
      return (
        <WelcomeScreen 
          onShowLogin={handleShowLogin}
          onShowSignup={handleShowSignup}
        />
      )
  }
}

export default AuthFlow
