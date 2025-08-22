import React from 'react'
import { LogOut, User } from 'lucide-react'
import { AuthUser } from '../hooks/useAuth'

interface HeaderProps {
  user: AuthUser
  onLogout: () => void
  onShowProfile: () => void
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onShowProfile }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Aina</h1>
            <p className="text-xs text-gray-500">PPMK Community</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onShowProfile}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
          >
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              {user.name}
            </span>
          </button>
          
          <button
            onClick={onLogout}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
