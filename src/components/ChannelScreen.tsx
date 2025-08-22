import React, { useState } from 'react'
import { ArrowLeft, Users, Search, Plus, Lock, Globe } from 'lucide-react'
import { User as UserType } from '../App'

interface ChannelScreenProps {
  user: UserType
  onBack: () => void
  onSelectChannel: (channelId: string) => void
}

interface Channel {
  id: string
  name: string
  description: string
  memberCount: number
  isPrivate: boolean
  category: 'club' | 'academic' | 'event' | 'general'
  lastActivity: string
  isJoined: boolean
}

const ChannelScreen: React.FC<ChannelScreenProps> = ({ user, onBack, onSelectChannel }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const channels: Channel[] = [
    {
      id: '1',
      name: 'Badminton Club',
      description: 'Weekly tournaments, training sessions, and club activities',
      memberCount: 45,
      isPrivate: false,
      category: 'club',
      lastActivity: '2 hours ago',
      isJoined: user.clubs?.includes('Badminton Club') || false
    },
    {
      id: '2',
      name: 'Recreational Club',
      description: 'Fun activities, games, and social events for all members',
      memberCount: 67,
      isPrivate: false,
      category: 'club',
      lastActivity: '1 hour ago',
      isJoined: user.clubs?.includes('Recreational Club') || false
    },
    {
      id: '3',
      name: 'Photography Club',
      description: 'Share your photos, learn techniques, and join photo walks',
      memberCount: 23,
      isPrivate: false,
      category: 'club',
      lastActivity: '3 hours ago',
      isJoined: user.clubs?.includes('Photography Club') || false
    },
    {
      id: '4',
      name: 'Study Group - Computer Science',
      description: 'Collaborative learning for CS students',
      memberCount: 15,
      isPrivate: true,
      category: 'academic',
      lastActivity: '30 min ago',
      isJoined: user.clubs?.includes('Study Group') || false
    },
    {
      id: '5',
      name: 'Hackathon: Hacktopus',
      description: 'Official channel for Hacktopus 2024 participants',
      memberCount: 89,
      isPrivate: false,
      category: 'event',
      lastActivity: '15 min ago',
      isJoined: user.events?.includes('Hackathon: Hacktopus') || false
    },
    {
      id: '6',
      name: 'Cultural Night 2024',
      description: 'Coordination and updates for Cultural Night performers',
      memberCount: 34,
      isPrivate: false,
      category: 'event',
      lastActivity: '1 day ago',
      isJoined: user.events?.includes('Cultural Night 2024') || false
    },
    {
      id: '7',
      name: 'General Announcements',
      description: 'Official announcements and important updates',
      memberCount: 156,
      isPrivate: false,
      category: 'general',
      lastActivity: '5 min ago',
      isJoined: true
    },
    {
      id: '8',
      name: 'Academic Resources',
      description: 'Share study materials, notes, and academic resources',
      memberCount: 78,
      isPrivate: false,
      category: 'academic',
      lastActivity: '2 hours ago',
      isJoined: true
    }
  ]

  const categories = [
    { id: 'all', label: 'All', color: 'bg-gray-100 text-gray-800' },
    { id: 'club', label: 'Clubs', color: 'bg-blue-100 text-blue-800' },
    { id: 'academic', label: 'Academic', color: 'bg-green-100 text-green-800' },
    { id: 'event', label: 'Events', color: 'bg-purple-100 text-purple-800' },
    { id: 'general', label: 'General', color: 'bg-orange-100 text-orange-800' }
  ]

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         channel.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || channel.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'club': return 'bg-blue-100 text-blue-800'
      case 'academic': return 'bg-green-100 text-green-800'
      case 'event': return 'bg-purple-100 text-purple-800'
      case 'general': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
                <h1 className="text-lg font-semibold text-gray-900">Channels</h1>
                <p className="text-xs text-gray-500">{filteredChannels.length} channels available</p>
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
              placeholder="Search channels..."
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : category.color + ' hover:shadow-md'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Channels List */}
          <div className="space-y-3">
            {filteredChannels.map((channel) => (
              <div
                key={channel.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-2">
                        {channel.isPrivate ? (
                          <Lock className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Globe className="w-4 h-4 text-green-500" />
                        )}
                        <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(channel.category)}`}>
                        {channel.category.charAt(0).toUpperCase() + channel.category.slice(1)}
                      </span>
                      {channel.isJoined && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Joined
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{channel.memberCount} members</span>
                      </div>
                      <span>Last activity: {channel.lastActivity}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-200/50">
                  {channel.isJoined ? (
                    <button
                      onClick={() => onSelectChannel(channel.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      View Channel
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Join Channel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredChannels.length === 0 && (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No channels found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search terms.' : 'No channels available in this category.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChannelScreen
