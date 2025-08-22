import React, { useState, useMemo } from 'react'
import { Users, Search, Bell, MessageCircle, GraduationCap, Calendar, ArrowLeft, Hash, Crown, Zap, Trophy, BookOpen, Coffee } from 'lucide-react'
import { User as UserType } from '../App'

interface ChatScreenProps {
  user: UserType
  onBack: () => void
  onSelectRoom: (roomId: string) => void
}

interface ChatRoom {
  id: string
  name: string
  type: 'official' | 'club' | 'university' | 'batch' | 'event' | 'study'
  description: string
  memberCount: number
  lastMessage?: string
  lastMessageTime?: string
  unreadCount?: number
  isActive: boolean
  icon: React.ComponentType<{ className?: string }>
}

const ChatScreen: React.FC<ChatScreenProps> = ({ user, onBack, onSelectRoom }) => {
  const [searchQuery, setSearchQuery] = useState('')

  // Generate chat rooms based on user profile
  const allChatRooms = useMemo((): ChatRoom[] => {
    const rooms: ChatRoom[] = [
      // Official PPMK Group (everyone joins)
      {
        id: 'ppmk-official',
        name: 'PPMK Official Group',
        type: 'official',
        description: 'Official announcements and community updates',
        memberCount: 245,
        lastMessage: 'Welcome to the official PPMK community!',
        lastMessageTime: '2 hours ago',
        unreadCount: 3,
        isActive: true,
        icon: Crown
      }
    ]

    // Add club-based chat rooms
    if (user.clubs) {
      user.clubs.forEach(club => {
        rooms.push({
          id: `club-${club.toLowerCase().replace(/\s+/g, '-')}`,
          name: club,
          type: 'club',
          description: `Connect with fellow ${club} members`,
          memberCount: club === 'Badminton Club' ? 42 : club === 'Recreational Club' ? 38 : 25,
          lastMessage: club === 'Badminton Club' ? 'Anyone up for a game this weekend?' : 
                      club === 'Recreational Club' ? 'Movie night this Friday!' : 
                      'Great session today everyone!',
          lastMessageTime: club === 'Badminton Club' ? '1 hour ago' : '3 hours ago',
          unreadCount: club === 'Badminton Club' ? 2 : 0,
          isActive: true,
          icon: Trophy
        })
      })
    }

    // Add university-based chat room
    if (user.university) {
      rooms.push({
        id: `university-${user.university.toLowerCase()}`,
        name: `${user.university} Students`,
        type: 'university',
        description: `Connect with Malaysian students at ${user.university}`,
        memberCount: user.university === 'Yonsei' ? 67 : user.university === 'SNU' ? 89 : 45,
        lastMessage: user.university === 'Yonsei' ? 'Library study group forming for finals' : 
                    'Anyone know about the scholarship deadline?',
        lastMessageTime: '4 hours ago',
        unreadCount: 1,
        isActive: true,
        icon: GraduationCap
      })
    }

    // Add batch-based chat room
    if (user.batch) {
      rooms.push({
        id: `batch-${user.batch}`,
        name: `Batch ${user.batch}`,
        type: 'batch',
        description: `Connect with your batch mates from ${user.batch}`,
        memberCount: 34,
        lastMessage: 'Reunion planning meeting next week!',
        lastMessageTime: '6 hours ago',
        unreadCount: 0,
        isActive: true,
        icon: Users
      })
    }

    // Add event-based chat rooms
    if (user.events) {
      user.events.forEach(event => {
        rooms.push({
          id: `event-${event.toLowerCase().replace(/[:\s]+/g, '-')}`,
          name: event,
          type: 'event',
          description: `Coordinate and discuss ${event}`,
          memberCount: event.includes('Hackathon') ? 28 : event.includes('Cultural') ? 56 : 23,
          lastMessage: event.includes('Hackathon') ? 'Team formation starts tomorrow!' : 
                      event.includes('Cultural') ? 'Rehearsal schedule is out' : 
                      'Looking forward to seeing everyone!',
          lastMessageTime: event.includes('Hackathon') ? '30 minutes ago' : '2 hours ago',
          unreadCount: event.includes('Hackathon') ? 5 : 1,
          isActive: true,
          icon: Zap
        })
      })
    }

    // Add some additional study/interest groups
    rooms.push(
      {
        id: 'korean-language',
        name: 'Korean Language Exchange',
        type: 'study',
        description: 'Practice Korean with fellow students',
        memberCount: 78,
        lastMessage: '오늘 스터디 어땠어요? How was today\'s study?',
        lastMessageTime: '1 day ago',
        unreadCount: 0,
        isActive: true,
        icon: BookOpen
      },
      {
        id: 'casual-chat',
        name: 'Casual Hangout',
        type: 'study',
        description: 'Casual conversations and daily life',
        memberCount: 156,
        lastMessage: 'Anyone tried the new cafe near Hongdae?',
        lastMessageTime: '5 hours ago',
        unreadCount: 2,
        isActive: true,
        icon: Coffee
      }
    )

    return rooms
  }, [user])

  // Filter chat rooms based on search query
  const filteredChatRooms = useMemo(() => {
    if (!searchQuery) return allChatRooms
    
    return allChatRooms.filter(room =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [allChatRooms, searchQuery])

  const getChatRoomIcon = (room: ChatRoom) => {
    const IconComponent = room.icon
    const colorClass = room.type === 'official' ? 'text-purple-600' :
                      room.type === 'club' ? 'text-blue-600' :
                      room.type === 'university' ? 'text-green-600' :
                      room.type === 'batch' ? 'text-orange-600' :
                      room.type === 'event' ? 'text-red-600' :
                      'text-gray-600'
    
    return <IconComponent className={`w-5 h-5 ${colorClass}`} />
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'official': return 'bg-purple-100 text-purple-700'
      case 'club': return 'bg-blue-100 text-blue-700'
      case 'university': return 'bg-green-100 text-green-700'
      case 'batch': return 'bg-orange-100 text-orange-700'
      case 'event': return 'bg-red-100 text-red-700'
      case 'study': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 font-inter flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
              <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-200 rounded-xl text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Chat Rooms List */}
        <div className="bg-white max-h-96 overflow-y-auto">
          {filteredChatRooms.length === 0 ? (
            <div className="px-8 py-12 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No chat rooms found</h3>
              <p className="text-gray-500">Try adjusting your search terms.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredChatRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => onSelectRoom(room.id)}
                  className="w-full px-8 py-6 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        {getChatRoomIcon(room)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {room.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {room.unreadCount && room.unreadCount > 0 && (
                            <div className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {room.unreadCount}
                            </div>
                          )}
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2 truncate">
                        {room.lastMessage}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(room.type)}`}>
                            {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {room.memberCount} members
                          </span>
                        </div>
                        
                        <span className="text-xs text-gray-500">
                          {room.lastMessageTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-b-3xl px-8 py-6 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>
                {filteredChatRooms.length} chat room{filteredChatRooms.length !== 1 ? 's' : ''} available
              </span>
            </div>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
              <span>Clubs: {user.clubs?.length || 0}</span>
              <span>•</span>
              <span>Events: {user.events?.length || 0}</span>
              <span>•</span>
              <span>Batch: {user.batch}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatScreen
