import React from 'react'
import { useAuth } from './hooks/useAuth'
import AuthFlow from './components/AuthFlow'
import MainApp from './components/MainApp'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthFlow />
  }

  return <MainApp user={user} />
}

export default App
