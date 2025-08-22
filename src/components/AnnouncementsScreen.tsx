import React, { useState, useMemo } from 'react'
import { Users, Search, Bell, MessageCircle, GraduationCap, Calendar, Megaphone, Clock, Eye, Heart, MessageSquare, MoreHorizontal } from 'lucide-react'

interface AnnouncementsScreenProps {
  user: { ppmkId: string; name: string; scholarship?: string; university?: string }
  onBack: () => void
}

interface Announcement {
  id: string
  title: string
  content: string
  type: 'general' | 'scholarship' | 'university'
  targetAudience?: string // 'MARA', 'Yonsei', etc.
  timestamp: string
  author: string
  isRead: boolean
  reactions: number
  comments: number
  priority: 'high' | 'medium' | 'low'
}

const AnnouncementsScreen: React.FC<AnnouncementsScreenProps> = ({ user, onBack }) => {
  const [activeFilter, setActiveFilter] = useState('Unread')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock announcements data
  const allAnnouncements: Announcement[] = [
    {
      id: '1',
      title: 'General Announcement',
      content: 'Dear PPMK members, we are excited to announce that the theme for Majlis Anugerah Dirhajayu 2025 is Forevermore: A Twilight Ball!',
      type: 'general',
      timestamp: '2 hours ago',
      author: 'PPMK Admin',
      isRead: false,
      reactions: 24,
      comments: 8,
      priority: 'high'
    },
    {
      id: '2',
      title: 'MARA Scholars',
      content: 'Greetings everyone! On August 26th, the Deputy Director General of MARA wants to meet 40 MARA students.',
      type: 'scholarship',
      targetAudience: 'MARA',
      timestamp: '4 hours ago',
      author: 'MARA Coordinator',
      isRead: false,
      reactions: 15,
      comments: 12,
      priority: 'high'
    },
    {
      id: '3',
      title: 'Yonsei University - Academic Calendar Update',
      content: 'Important update for Yonsei students: The final exam schedule has been revised. Please check your student portal for updated dates.',
      type: 'university',
      targetAudience: 'Yonsei',
      timestamp: '6 hours ago',
      author: 'Yonsei Student Rep',
      isRead: true,
      reactions: 8,
      comments: 3,
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Korean Language Exchange Program',
      content: 'Join our weekly Korean-Malay language exchange sessions every Saturday at 2 PM. Great opportunity to practice and make new friends!',
      type: 'general',
      timestamp: '1 day ago',
      author: 'Language Committee',
      isRead: true,
      reactions: 32,
      comments: 18,
      priority: 'medium'
    },
    {
      id: '5',
      title: 'MARA Scholarship Renewal Reminder',
      content: 'MARA scholars, please submit your scholarship renewal documents by September 15th. Late submissions will not be accepted.',
      type: 'scholarship',
      targetAudience: 'MARA',
      timestamp: '2 days ago',
      author: 'MARA Admin',
      isRead: false,
      reactions: 19,
      comments: 7,
      priority: 'high'
    },
    {
      id: '6',
      title: 'Seoul National University - Library Hours Extended',
      content: 'SNU students: The central library will now be open 24/7 during exam period (Nov 20 - Dec 15). Student ID required for after-hours access.',
      type: 'university',
      targetAudience: 'SNU',
      timestamp: '3 days ago',
      author: 'SNU Student Council',
      isRead: true,
      reactions: 12,
      comments: 4,
      priority: 'low'
    }
  ]

  // Filter announcements based on user's profile
  const filteredAnnouncements = useMemo(() => {
    return allAnnouncements.filter(announcement => {
      // General announcements are visible to everyone
      if (announcement.type === 'general') return true
      
      // Scholarship-specific announcements
      if (announcement.type === 'scholarship') {
        return user.scholarship === announcement.targetAudience
      }
      
      // University-specific announcements
      if (announcement.type === 'university') {
        return user.university === announcement.targetAudience
      }
      
      return false
    }).filter(announcement => {
      // Apply search filter
      if (searchQuery) {
        return announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
      }
      return true
    }).filter(announcement => {
      // Apply read/unread filter
      switch (activeFilter) {
        case 'Unread':
          return !announcement.isRead
        case 'Mentions':
          return announcement.content.toLowerCase().includes(user.name.toLowerCase())
        case 'Replies':
          return announcement.comments > 0
        case 'Reaction':
          return announcement.reactions > 10
        default:
          return true
      }
    })
  }, [user, searchQuery, activeFilter])

  const filters = ['Unread', 'Mentions', 'Replies', 'Reaction', 'More']

  const getAnnouncementIcon = (type: string, targetAudience?: string) => {
    if (type === 'general') return <Megaphone className="w-5 h-5 text-blue-600" />
    if (type === 'scholarship') return <GraduationCap className="w-5 h-5 text-purple-600" />
    if (type === 'university') return <Users className="w-5 h-5 text-green-600" />
    return <Bell className="w-5 h-5 text-gray-600" />
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50/50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50/50'
      case 'low': return 'border-l-green-500 bg-green-50/50'
      default: return 'border-l-gray-500 bg-gray-50/50'
    }
  }

  return (
    <div className="pt-20 pb-4 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-3xl px-8 py-6 border-b border-gray-100">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-200 rounded-xl text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Announcements List */}
        <div className="bg-white max-h-96 overflow-y-auto">
          {filteredAnnouncements.length === 0 ? (
            <div className="px-8 py-12 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`px-8 py-6 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(announcement.priority)}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getAnnouncementIcon(announcement.type, announcement.targetAudience)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {announcement.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {!announcement.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                        {announcement.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{announcement.timestamp}</span>
                          </div>
                          <span>by {announcement.author}</span>
                          {announcement.targetAudience && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                              {announcement.targetAudience}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{announcement.reactions}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{announcement.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{announcement.isRead ? 'Read' : 'Unread'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                Showing {filteredAnnouncements.length} announcement{filteredAnnouncements.length !== 1 ? 's' : ''}
                {user.scholarship && ` • ${user.scholarship} Scholar`}
                {user.university && ` • ${user.university} Student`}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              PPMK ID: <span className="font-mono text-purple-600">{user.ppmkId}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementsScreen
