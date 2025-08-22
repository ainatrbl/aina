import React, { useState } from 'react'
import { ArrowLeft, MessageCircle, Users, Search, Plus } from 'lucide-react'
import { User as UserType } from '../App'

interface ChatScreenProps {
  user: UserType
  onBack: () => void
  onSelectRoom: (roomId: string) => void
}

interface ChatRoom {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  participants: number
  type: 'group' | 'direct'
  isPrivate: boolean
}

const ChatScreen: React.FC<ChatScreenProps> = ({ user, onBack, onSelectRoom }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const chatRooms: ChatRoom[] = [
    {
      id: '1',
      name: 'General Discussion',
      lastMessage: 'Hey everyone! How was the workshop today?',
      timestamp: '2 min ago',
      unreadCount: 3,
      participants: 45,
      type: 'group',
      isPrivate: false
    },
    {
      id: '2',
      name: 'Batch 2024',
      lastMessage: 'Don\'t forget about tomorrow\'s meeting!',
      timestamp: '15 min ago',
      unreadCount: 0,
      participants: 28,
      type: 'group',
      isPrivate: false
    },
    {
      id: '3',
      name: 'Badminton Club',
      lastMessage: 'Tournament registration is now open',
      timestamp: '1 hour ago',
      unreadCount: 5,
      participants: 12,
      type: 'group',
      isPrivate: false
    },
    {
      id: '4',
      name: 'Study Group - CS',
      lastMessage: 'Can someone share the notes from today?',
      timestamp: '2 hours ago',
      unreadCount: 1,
      participants: 8,
      type: 'group',
      isPrivate: true
    },
    {
      id: '5',
      name: 'Hackathon Team Alpha',
      lastMessage: 'Great progress on the project today!',
      timestamp: '3 hours ago',
      unreadCount: 0,
      participants: 4,
      type: 'group',
      isPrivate: true
    },
    {
      id: '6',
      name: 'Academic Committee',
      lastMessage: 'Meeting minutes have been shared',
      timestamp: '1 day ago',
      unreadCount: 2,
      participants: 6,
      type: 'group',
      isPrivate: true
    }
  ]

  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Filter rooms based on user's memberships
  const accessibleRooms = filteredRooms.filter(room => {
    if (!room.isPrivate) return true
    
    // Check if user has access to private rooms based on their profile
    if (room.name.includes('Badminton') && user.clubs?.includes('Badminton Club')) return true
    if (room.name.includes('Study Group') && user.clubs?.includes('Study Group')) return true
    if (room.name.includes('Hackathon') && user.events?.includes('Hackathon: Hacktopus')) return true
    if (room.name.includes('Academic Committee') && user.isAdmin) return true
    
    return false
  })

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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Chat Rooms</h1>
                <p className="text-xs text-gray-500">{accessibleRooms.length} rooms available</p>
              </div>
            </div>
            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
              <Plus className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat rooms..."
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Chat Rooms List */}
          <div className="space-y-3">
            {accessibleRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className="w-full bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      {room.type === 'group' ? (
                        <Users className="w-6 h-6 text-white" />
                      ) : (
                        <MessageCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 truncate">{room.name}</h3>
                        {room.isPrivate && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            Private
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{room.lastMessage}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{room.timestamp}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{room.participants} members</span>
                      </div>
                    </div>
                  </div>
                  {room.unreadCount > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                      {room.unreadCount}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {accessibleRooms.length === 0 && (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No chat rooms found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search terms.' : 'Join some clubs or events to access more chat rooms.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatScreen
