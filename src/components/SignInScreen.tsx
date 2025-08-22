import React, { useState } from 'react'
import { Eye, EyeOff, User, Lock, ArrowRight, Sparkles, Users, Globe, Heart } from 'lucide-react'

interface SignInScreenProps {
  onSignIn: (ppmkId: string, password: string) => void
}

const SignInScreen: React.FC<SignInScreenProps> = ({ onSignIn }) => {
  const [ppmkId, setPpmkId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (ppmkId && password) {
      setIsLoading(true)
      // Simulate loading
      setTimeout(() => {
        onSignIn(ppmkId, password)
        setIsLoading(false)
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 font-inter relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pink-400/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-green-400/20 rounded-full blur-xl animate-bounce"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/3 animate-float">
          <Users className="w-8 h-8 text-white/30" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed">
          <Globe className="w-6 h-6 text-white/25" />
        </div>
        <div className="absolute bottom-1/3 left-1/5 animate-float">
          <Heart className="w-7 h-7 text-white/20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl mb-6 border border-white/30">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Welcome to <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">PPMK</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Connect with Malaysian students across Korea
            </p>
          </div>

          {/* Sign In Form */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* PPMK ID Input */}
              <div className="space-y-2">
                <label className="text-white/90 text-sm font-medium">PPMK ID</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    value={ppmkId}
                    onChange={(e) => setPpmkId(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your PPMK ID"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-white/90 text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading || !ppmkId || !password}
                className="w-full bg-gradient-to-r from-yellow-400 to-pink-400 text-gray-900 font-bold py-4 px-6 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-4">
              <button className="text-white/80 hover:text-white text-sm transition-colors">
                Forgot your password?
              </button>
              <div className="text-white/60 text-sm">
                Don't have an account?{' '}
                <button className="text-white hover:text-yellow-300 font-medium transition-colors">
                  Contact PPMK Admin
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-8">
            <p className="text-white/60 text-sm">
              Connecting Malaysian hearts across Korea 🇲🇾 ❤️ 🇰🇷
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default SignInScreen
