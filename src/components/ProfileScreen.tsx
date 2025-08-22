import React, { useState } from 'react'
import { Users, User, Search, Bell, MessageCircle, GraduationCap, Calendar, Camera, Edit3, Lock, Sun, Moon, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react'
import { User as UserType } from '../App'

interface ProfileScreenProps {
  user: UserType
  onBack: () => void
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onBack }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Mock profile data based on the user
  const profileData = {
    name: user.name === 'Demo User' ? 'NUR BINTI MUHAMMAD' : user.name,
    username: user.name === 'Demo User' ? '24nurmhd' : user.ppmkId.toLowerCase(),
    email: user.name === 'Demo User' ? 'nurmhd@gmail.com' : `${user.ppmkId.toLowerCase()}@student.my`,
    phoneKorea: '010-XXXX-XXXX',
    phoneMalaysia: '01X-XXX-XXXX',
    university: user.university || 'Seoul National University',
    major: 'Computer Science',
    year: '3rd Year',
    scholarship: user.scholarship || 'MARA',
    batch: user.batch || '2024',
    clubs: user.clubs || [],
    events: user.events || []
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
              <div className="flex items-center space-x-4">
                <button 
                  onClick={onBack}
                  className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              </div>
              <div className="lg:hidden w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="search"
                className="w-full pl-12 pr-4 py-3 bg-gray-200 rounded-xl text-gray-600 text-sm"
                readOnly
              />
            </div>
          </div>

          {/* Profile Content */}
          <div className="bg-white px-8 py-8">
            {/* Profile Avatar and Name */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="w-16 h-16 text-purple-600" />
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors mb-3 flex items-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Change profile photo</span>
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
              <div className="flex items-center space-x-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Seoul, South Korea</span>
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Personal info</h3>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1 transition-colors">
                  <Edit3 className="w-4 h-4" />
                  <span>Edit personal info</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Username</span>
                  <span className="text-gray-900">{profileData.username}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Email address</span>
                  <span className="text-gray-900">{profileData.email}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Phone number (Korea)</span>
                  <span className="text-gray-900">{profileData.phoneKorea}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Phone number (Malaysia)</span>
                  <span className="text-gray-900">{profileData.phoneMalaysia}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">University</span>
                  <span className="text-gray-900">{profileData.university}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Scholarship</span>
                  <span className="text-gray-900">{profileData.scholarship}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Batch</span>
                  <span className="text-gray-900">{profileData.batch}</span>
                </div>
              </div>
            </div>

            {/* Memberships Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Memberships</h3>
              
              {/* Clubs */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Clubs</h4>
                <div className="flex flex-wrap gap-2">
                  {profileData.clubs.length > 0 ? (
                    profileData.clubs.map((club, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {club}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No clubs joined</span>
                  )}
                </div>
              </div>

              {/* Events */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Events</h4>
                <div className="flex flex-wrap gap-2">
                  {profileData.events.length > 0 ? (
                    profileData.events.map((event, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        {event}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No events joined</span>
                  )}
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Password</h3>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1 transition-colors">
                  <span>Change password</span>
                </button>
              </div>
            </div>

            {/* Settings Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Theme Preference</span>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
                        isDarkMode ? 'translate-x-7' : 'translate-x-0.5'
                      }`}
                    >
                      {isDarkMode ? <Moon className="w-3 h-3 text-gray-600" /> : <Sun className="w-3 h-3 text-yellow-500" />}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-b-3xl px-8 py-6 border-t border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Connected to Malaysian Korea Community</span>
              </div>
              <p className="text-xs text-gray-600">
                PPMK ID: <span className="font-mono text-purple-600">{user.ppmkId}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
