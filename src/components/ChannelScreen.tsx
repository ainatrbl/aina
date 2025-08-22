import React, { useState } from 'react'
import { ArrowLeft, Search, Users, Calendar, Trophy, Gamepad2, Shield, Plus, MessageSquare, Heart, Share2, MoreHorizontal, Clock, Pin } from 'lucide-react'

interface ChannelScreenProps {
  user: { ppmkId: string; name: string; isAdmin?: boolean }
  onBack: () => void
  onSelectChannel: (channelId: string) => void
}

interface ChannelEvent {
  id: string
  title: string
  description: string
  type: 'hackathon' | 'sports' | 'cultural' | 'academic'
  date: string
  status: 'upcoming' | 'ongoing' | 'completed'
  participants: number
  maxParticipants?: number
  isPinned: boolean
  author: string
  timestamp: string
  reactions: number
  comments: number
  image?: string
}

const ChannelScreen: React.FC<ChannelScreenProps> = ({ user, onBack, onSelectChannel }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreatePost, setShowCreatePost] = useState(false)

  // Mock channel events data
  const channelEvents: ChannelEvent[] = [
    {
      id: '1',
      title: 'HackPPMK25',
      description: '🚀 Get ready for the biggest hackathon of the year! HackPPMK25 is coming this November. Theme: "Innovation for Malaysian Students in Korea". Register now and showcase your coding skills!',
      type: 'hackathon',
      date: 'Nov 15-17, 2024',
      status: 'upcoming',
      participants: 127,
      maxParticipants: 200,
      isPinned: true,
      author: 'PPMK Tech Committee',
      timestamp: '2 hours ago',
      reactions: 45,
      comments: 23,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'KASUMA Fall 2025',
      description: '🏆 Korean Association of Southeast Asian Malaysian University Athletes presents KASUMA Fall 2025! Join us for badminton, football, basketball, and more. Registration opens next week.',
      type: 'sports',
      date: 'March 8-10, 2025',
      status: 'upcoming',
      participants: 89,
      maxParticipants: 150,
      isPinned: true,
      author: 'KASUMA Committee',
      timestamp: '5 hours ago',
      reactions: 67,
      comments: 34,
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Hari Kebudayaan',
      description: '🎭 Celebrate Malaysian culture in Korea! Traditional performances, food festival, and cultural exhibitions. Calling all performers and volunteers to join us in showcasing our rich heritage.',
      type: 'cultural',
      date: 'Dec 20, 2024',
      status: 'upcoming',
      participants: 156,
      isPinned: false,
      author: 'Cultural Committee',
      timestamp: '1 day ago',
      reactions: 78,
      comments: 19,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      title: 'Academic Excellence Workshop',
      description: '📚 Join our workshop series on "Succeeding in Korean Universities". Topics include research methodology, thesis writing, and academic networking. Open to all PPMK members.',
      type: 'academic',
      date: 'Oct 25, 2024',
      status: 'completed',
      participants: 94,
      isPinned: false,
      author: 'Academic Committee',
      timestamp: '3 days ago',
      reactions: 32,
      comments: 12
    }
  ]

  const filteredEvents = channelEvents.filter(event => {
    if (searchQuery) {
      return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             event.description.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return true
  }).sort((a, b) => {
    // Pinned events first
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return 0
  })

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'hackathon': return <Gamepad2 className="w-5 h-5 text-purple-600" />
      case 'sports': return <Trophy className="w-5 h-5 text-orange-600" />
      case 'cultural': return <Users className="w-5 h-5 text-pink-600" />
      case 'academic': return <Calendar className="w-5 h-5 text-blue-600" />
      default: return <Calendar className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-700 border-green-200'
      case 'ongoing': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 font-inter">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Channel</h1>
                <p className="text-sm text-gray-600">PPMK Official Events</p>
              </div>
            </div>
            
            {user.isAdmin && (
              <button
                onClick={() => setShowCreatePost(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Create Event</span>
              </button>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Admin Notice */}
      {!user.isAdmin && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center space-x-3">
            <Shield className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-amber-800">
                <span className="font-medium">Admin-only posting:</span> Only PPMK administrators and moderators can create posts in this channel.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => onSelectChannel(event.id)}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Event Image */}
              {event.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {event.isPinned && (
                    <div className="absolute top-4 left-4 flex items-center space-x-1 bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      <Pin className="w-3 h-3" />
                      <span>Pinned</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getEventIcon(event.type)}
                        <span className="text-white font-medium">{event.title}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Event Content */}
              <div className="p-6">
                {!event.image && (
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getEventIcon(event.type)}
                      <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                      {event.isPinned && (
                        <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs font-medium">
                          <Pin className="w-3 h-3" />
                          <span>Pinned</span>
                        </div>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                )}

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>
                        {event.participants} participant{event.participants !== 1 ? 's' : ''}
                        {event.maxParticipants && ` / ${event.maxParticipants}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.timestamp}</span>
                    </div>
                    <span>by {event.author}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{event.reactions}</span>
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{event.comments}</span>
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search terms.</p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && user.isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Create Event Post</h3>
              <button
                onClick={() => setShowCreatePost(false)}
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event title"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Event description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all font-medium"
                >
                  Post Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChannelScreen
