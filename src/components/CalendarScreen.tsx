import React, { useState } from 'react'
import { ArrowLeft, Calendar, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { User as UserType } from '../App'

interface CalendarScreenProps {
  user: UserType
  onBack: () => void
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  category: 'academic' | 'club' | 'social' | 'workshop'
  isRegistered: boolean
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ user, onBack }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')

  const events: Event[] = [
    {
      id: '1',
      title: 'Hackathon: Hacktopus 2024',
      description: 'Annual hackathon competition with amazing prizes',
      date: '2024-03-15',
      time: '09:00 AM',
      location: 'Tech Hub, Building A',
      attendees: 89,
      category: 'workshop',
      isRegistered: user.events?.includes('Hackathon: Hacktopus') || false
    },
    {
      id: '2',
      title: 'Cultural Night 2024',
      description: 'Showcase of talents from PPMK community',
      date: '2024-03-20',
      time: '07:00 PM',
      location: 'Main Auditorium',
      attendees: 156,
      category: 'social',
      isRegistered: user.events?.includes('Cultural Night 2024') || false
    },
    {
      id: '3',
      title: 'Badminton Tournament',
      description: 'Weekly badminton tournament for all skill levels',
      date: '2024-03-16',
      time: '02:00 PM',
      location: 'Sports Complex',
      attendees: 24,
      category: 'club',
      isRegistered: user.clubs?.includes('Badminton Club') || false
    },
    {
      id: '4',
      title: 'Study Group - Data Structures',
      description: 'Weekly study session for computer science students',
      date: '2024-03-18',
      time: '04:00 PM',
      location: 'Library Room 201',
      attendees: 12,
      category: 'academic',
      isRegistered: user.clubs?.includes('Study Group') || false
    },
    {
      id: '5',
      title: 'Photography Workshop',
      description: 'Learn advanced photography techniques',
      date: '2024-03-22',
      time: '10:00 AM',
      location: 'Art Studio',
      attendees: 18,
      category: 'workshop',
      isRegistered: user.clubs?.includes('Photography Club') || false
    },
    {
      id: '6',
      title: 'Academic Conference',
      description: 'Research presentations and academic discussions',
      date: '2024-03-25',
      time: '09:00 AM',
      location: 'Conference Hall',
      attendees: 67,
      category: 'academic',
      isRegistered: user.events?.includes('Academic Conference') || false
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-green-100 text-green-800 border-green-200'
      case 'club': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'social': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'workshop': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const isToday = (dateString: string) => {
    const today = new Date()
    const eventDate = new Date(dateString)
    return today.toDateString() === eventDate.toDateString()
  }

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
                <h1 className="text-lg font-semibold text-gray-900">Calendar</h1>
                <p className="text-xs text-gray-500">{upcomingEvents.length} upcoming events</p>
              </div>
            </div>
            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
              <Plus className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Calendar Header */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* View Mode Selector */}
            <div className="flex space-x-2">
              {['month', 'week', 'day'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as 'month' | 'week' | 'day')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === mode
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Today's Events */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Today's Events
            </h3>
            {events.filter(event => isToday(event.date)).length > 0 ? (
              <div className="space-y-3">
                {events.filter(event => isToday(event.date)).map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No events scheduled for today.</p>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-200/50 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                        {event.isRegistered && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Registered
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    {event.isRegistered ? (
                      <button className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                        Registered
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                        Register
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarScreen
