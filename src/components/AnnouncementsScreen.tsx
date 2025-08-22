import React, { useState } from 'react'
import { ArrowLeft, Megaphone, Clock, User, Pin, Heart, MessageCircle, Share } from 'lucide-react'
import { User as UserType } from '../App'

interface AnnouncementsScreenProps {
  user: UserType
  onBack: () => void
}

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  timestamp: string
  isPinned: boolean
  likes: number
  comments: number
  category: 'general' | 'academic' | 'event' | 'urgent'
}

const AnnouncementsScreen: React.FC<AnnouncementsScreenProps> = ({ user, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Hackathon: Hacktopus Registration Open!',
      content: 'Join us for the biggest hackathon of the year! Hacktopus 2024 is now accepting registrations. Build innovative solutions and compete for amazing prizes. Registration deadline: March 15th.',
      author: 'PPMK Admin',
      timestamp: '2 hours ago',
      isPinned: true,
      likes: 45,
      comments: 12,
      category: 'event'
    },
    {
      id: '2',
      title: 'New Study Groups Formation',
      content: 'We are forming new study groups for various subjects. If you are interested in joining or leading a study group, please contact the academic committee.',
      author: 'Academic Committee',
      timestamp: '5 hours ago',
      isPinned: false,
      likes: 23,
      comments: 8,
      category: 'academic'
    },
    {
      id: '3',
      title: 'Cultural Night 2024 - Call for Performers',
      content: 'Showcase your talents at Cultural Night 2024! We are looking for singers, dancers, musicians, and other performers. Auditions will be held next week.',
      author: 'Cultural Committee',
      timestamp: '1 day ago',
      isPinned: false,
      likes: 67,
      comments: 25,
      category: 'event'
    },
    {
      id: '4',
      title: 'Scholarship Application Deadline Reminder',
      content: 'This is a reminder that scholarship applications for the next semester are due by March 20th. Please ensure all required documents are submitted on time.',
      author: 'PPMK Admin',
      timestamp: '2 days ago',
      isPinned: true,
      likes: 89,
      comments: 15,
      category: 'urgent'
    },
    {
      id: '5',
      title: 'Badminton Club Weekly Tournament',
      content: 'Join us every Saturday for our weekly badminton tournament! All skill levels welcome. Equipment will be provided. Location: Sports Complex.',
      author: 'Badminton Club',
      timestamp: '3 days ago',
      isPinned: false,
      likes: 34,
      comments: 7,
      category: 'general'
    }
  ]

  const categories = [
    { id: 'all', label: 'All', color: 'bg-gray-100 text-gray-800' },
    { id: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' },
    { id: 'event', label: 'Events', color: 'bg-blue-100 text-blue-800' },
    { id: 'academic', label: 'Academic', color: 'bg-green-100 text-green-800' },
    { id: 'general', label: 'General', color: 'bg-purple-100 text-purple-800' }
  ]

  const filteredAnnouncements = selectedCategory === 'all' 
    ? announcements 
    : announcements.filter(ann => ann.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'event': return 'bg-blue-100 text-blue-800'
      case 'academic': return 'bg-green-100 text-green-800'
      case 'general': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pb-20">
      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Welcome Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Megaphone className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900">Announcements</h2>
          </div>
          <p className="text-gray-600">Stay updated with the latest news and events from PPMK community.</p>
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

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {announcement.isPinned && (
                      <Pin className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(announcement.category)}`}>
                      {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {announcement.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{announcement.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{announcement.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {announcement.content}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{announcement.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{announcement.comments}</span>
                  </button>
                </div>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                  <Share className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnnouncements.length === 0 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg text-center">
            <Megaphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600">There are no announcements in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnnouncementsScreen
