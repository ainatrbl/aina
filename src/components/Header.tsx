import React from 'react'
import { Menu, X, Users, LogOut, User } from 'lucide-react'
import { User as UserType } from '../App'

interface HeaderProps {
  user: UserType | null
  onLogout: () => void
  onShowProfile: () => void
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLogout, 
  onShowProfile
}) => {
  const [showUserMenu, setShowUserMenu] = React.useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <nav className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">MalaysianKorea</h1>
                <p className="text-xs text-gray-600">Connect • Share • Thrive</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.ppmkId}</p>
                </div>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl shadow-xl py-2">
                  <button
                    onClick={() => {
                      onShowProfile()
                      setShowUserMenu(false)
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/20 transition-colors text-gray-700 hover:text-blue-600"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium">View Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout()
                      setShowUserMenu(false)
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/20 transition-colors text-gray-700 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
