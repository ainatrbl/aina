import React from 'react'
import { ArrowLeft, Settings, HelpCircle, Shield, Bell, User, LogOut, Info, MessageSquare, Star } from 'lucide-react'
import { User as UserType } from '../App'

interface MoreScreenProps {
  user: UserType
  onBack: () => void
}

const MoreScreen: React.FC<MoreScreenProps> = ({ user, onBack }) => {
  const menuItems = [
    {
      id: 'profile',
      icon: User,
      title: 'Profile Settings',
      description: 'Manage your personal information',
      color: 'text-blue-600'
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Notifications',
      description: 'Configure notification preferences',
      color: 'text-green-600'
    },
    {
      id: 'privacy',
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Manage your privacy settings',
      color: 'text-purple-600'
    },
    {
      id: 'help',
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and contact support',
      color: 'text-orange-600'
    },
    {
      id: 'feedback',
      icon: MessageSquare,
      title: 'Send Feedback',
      description: 'Help us improve the app',
      color: 'text-pink-600'
    },
    {
      id: 'rate',
      icon: Star,
      title: 'Rate App',
      description: 'Rate and review our app',
      color: 'text-yellow-600'
    },
    {
      id: 'about',
      icon: Info,
      title: 'About Aina',
      description: 'App version and information',
      color: 'text-gray-600'
    }
  ]

  const handleMenuClick = (itemId: string) => {
    // Handle menu item clicks
    console.log(`Clicked: ${itemId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-4 py-3 sticky top-0 z-50">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">More</h1>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* User Info Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">PPMK ID: {user.ppmkId}</p>
                {user.isAdmin && (
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className="w-full bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-gray-100 ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* App Info */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">App Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="font-medium text-gray-900">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Build</span>
                <span className="font-medium text-gray-900">2024.03.01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform</span>
                <span className="font-medium text-gray-900">Web</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button className="w-full bg-red-50 hover:bg-red-100 border border-red-200 rounded-2xl p-4 transition-all">
            <div className="flex items-center justify-center space-x-3">
              <LogOut className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-600">Sign Out</span>
            </div>
          </button>

          {/* Footer */}
          <div className="text-center py-4">
            <p className="text-xs text-gray-500">
              © 2024 Aina - PPMK Community Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoreScreen
