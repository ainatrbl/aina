import React from 'react'
import { Home, Bell, MessageCircle, Users, Calendar, MoreHorizontal } from 'lucide-react'

interface BottomNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  onShowAnnouncements: () => void
  onShowChat: () => void
  onShowChannel: () => void
  onShowCalendar: () => void
  onShowMore: () => void
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeSection,
  setActiveSection,
  onShowAnnouncements,
  onShowChat,
  onShowChannel,
  onShowCalendar,
  onShowMore
}) => {
  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      onClick: () => setActiveSection('home'),
      hasNotification: false
    },
    { 
      id: 'announcements', 
      label: 'Announcements', 
      icon: Bell, 
      onClick: onShowAnnouncements,
      hasNotification: true
    },
    { 
      id: 'calendar', 
      label: 'Calendar', 
      icon: Calendar, 
      onClick: onShowCalendar,
      hasNotification: false
    },
    { 
      id: 'channel', 
      label: 'Channel', 
      icon: Users, 
      onClick: onShowChannel,
      hasNotification: false
    },
    { 
      id: 'chat', 
      label: 'Chat', 
      icon: MessageCircle, 
      onClick: onShowChat,
      hasNotification: true
    },
    { 
      id: 'more', 
      label: 'More', 
      icon: MoreHorizontal, 
      onClick: onShowMore,
      hasNotification: false
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-lg mx-auto">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-2 py-4 shadow-xl">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`relative flex flex-col items-center space-y-1 px-2 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20 text-blue-600 shadow-lg'
                      : 'text-gray-600 hover:bg-white/10 hover:text-gray-800'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
                    {item.hasNotification && (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : ''}`}>
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomNavigation
