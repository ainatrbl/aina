import React, { useState } from 'react'
import { Users, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, Search, Bell, MessageCircle, GraduationCap, Calendar } from 'lucide-react'

interface LoginScreenProps {
  onLogin: (ppmkId: string, name: string, scholarship?: string, university?: string) => void
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [ppmkId, setPpmkId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Mock user database with scholarship and university info
  const mockUsers = [
    { 
      ppmkId: 'PPMK001', 
      password: 'password123', 
      name: 'Ahmad Zaki',
      scholarship: 'MARA',
      university: 'SNU'
    },
    { 
      ppmkId: 'PPMK002', 
      password: 'mypassword', 
      name: 'Siti Nurhaliza',
      scholarship: 'JPA',
      university: 'Yonsei'
    },
    { 
      ppmkId: 'PPMK003', 
      password: 'demo123', 
      name: 'Aisha Rahman',
      scholarship: 'MARA',
      university: 'Yonsei'
    },
    { 
      ppmkId: 'demo', 
      password: 'demo', 
      name: 'Demo User',
      scholarship: 'MARA',
      university: 'Yonsei'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Validate PPMK ID format
    if (!ppmkId.trim()) {
      setError('Please enter your PPMK ID')
      setIsLoading(false)
      return
    }

    if (!password.trim()) {
      setError('Please enter your password')
      setIsLoading(false)
      return
    }

    // Check credentials
    const user = mockUsers.find(u => u.ppmkId === ppmkId && u.password === password)
    
    if (user) {
      onLogin(user.ppmkId, user.name, user.scholarship, user.university)
    } else {
      setError('Invalid PPMK ID or password. Please check your credentials.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 font-inter flex">
      {/* Left Sidebar */}
      <div className="hidden lg:flex flex-col w-20 bg-white border-r border-gray-200 items-center py-8 space-y-8">
        {/* Logo */}
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        
        {/* Navigation Icons */}
        <div className="flex flex-col space-y-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors">
            <User className="w-6 h-6 text-purple-600" />
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
            <MessageCircle className="w-6 h-6 text-gray-600" />
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
            <GraduationCap className="w-6 h-6 text-gray-600" />
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
            <Calendar className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="bg-white rounded-t-3xl px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
              <div className="lg:hidden w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Welcome to MalaysianKorea Community"
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl text-gray-600 text-sm cursor-default"
                readOnly
              />
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-white px-8 py-8">
            {/* Profile Avatar */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                <User className="w-12 h-12 text-purple-600" />
              </div>
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors">
                Ready to connect?
              </button>
              <h2 className="text-xl font-bold text-gray-900 mt-2 mb-1">MALAYSIAN STUDENT</h2>
              <p className="text-gray-500 text-sm">Enter your PPMK credentials</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Authentication</h3>
                  <button type="button" className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    Need help?
                  </button>
                </div>

                {/* PPMK ID Field */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">PPMK ID</label>
                    <span className="text-sm text-gray-500">Required</span>
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={ppmkId}
                      onChange={(e) => setPpmkId(e.target.value)}
                      placeholder="Enter your PPMK ID"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <button type="button" className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Settings Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Remember me</span>
                  </div>
                  <div className="relative">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-11 h-6 bg-purple-500 rounded-full shadow-inner cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-5 transition-transform"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Connect to Community</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Demo Credentials */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-b-3xl px-8 py-6 border-t border-gray-100">
            <div className="text-center mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">🚀 Demo Access Available</h3>
              <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/50">
                  <div className="font-medium text-gray-700">PPMK ID</div>
                  <code className="text-purple-600 font-mono">demo</code>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/50">
                  <div className="font-medium text-gray-700">Password</div>
                  <code className="text-purple-600 font-mono">demo</code>
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-2">
                <span className="font-medium">Demo Profile:</span> MARA Scholar at Yonsei University
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">
                Don't have a PPMK ID?{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  Contact PPMK Admin
                </a>
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Secure Malaysian Student Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
