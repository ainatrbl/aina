import React from 'react'
import { MessageCircle, Users, Calendar, MoreHorizontal, Megaphone } from 'lucide-react'

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
  onShowAnnouncements,
  onShowChat,
  onShowChannel,
  onShowCalendar,
  onShowMore
}) => {
  const navItems = [
    {
      id: 'announcements',
      icon: Megaphone,
      label: 'Announcements',
      onClick: onShowAnnouncements
    },
    {
      id: 'chat',
      icon: MessageCircle,
      label: 'Chat',
      onClick: onShowChat
    },
    {
      id: 'channel',
      icon: Users,
      label: 'Channels',
      onClick: onShowChannel
    },
    {
      id: 'calendar',
      icon: Calendar,
      label: 'Calendar',
      onClick: onShowCalendar
    },
    {
      id: 'more',
      icon: MoreHorizontal,
      label: 'More',
      onClick: onShowMore
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200/50 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation
