import React from 'react'
import { ArrowLeft, User, GraduationCap, Building, Calendar, Users, Trophy, Mail } from 'lucide-react'
import { AuthUser } from '../hooks/useAuth'

interface ProfileScreenProps {
  user: AuthUser
  onBack: () => void
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onBack }) => {
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
            <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
          </div>
        </header>

        {/* Profile Content */}
        <div className="p-4 space-y-6">
          {/* Profile Header */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">PPMK ID: {user.ppmk_id}</p>
                {user.email && (
                  <p className="text-gray-500 text-sm">{user.email}</p>
                )}
                {user.is_admin && (
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-3">
              {user.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
              )}
              {user.scholarship && (
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Scholarship</p>
                    <p className="font-medium text-gray-900">{user.scholarship}</p>
                  </div>
                </div>
              )}
              {user.university && (
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">University</p>
                    <p className="font-medium text-gray-900">{user.university}</p>
                  </div>
                </div>
              )}
              {user.batch && (
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Batch</p>
                    <p className="font-medium text-gray-900">{user.batch}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>Member since: {new Date(user.created_at).toLocaleDateString()}</p>
              <p>Last updated: {new Date(user.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
