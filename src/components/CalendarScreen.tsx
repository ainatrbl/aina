import React, { useState } from 'react'
import { ArrowLeft, Search, Calendar, MapPin, Users, Clock, Filter, ChevronDown, Plus } from 'lucide-react'

interface CalendarScreenProps {
  user: { ppmkId: string; name: string; isAdmin?: boolean }
  onBack: () => void
}

interface PPMKEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  university?: string
  type: 'cultural' | 'sports' | 'academic' | 'social' | 'official'
  attendees: number
  description: string
  organizer: string
  isRegistered?: boolean
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ user, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Mock PPMK events data
  const ppmkEvents: PPMKEvent[] = [
    {
      id: '1',
      title: 'Hari Sukan PPMK',
      date: '2024-09-09',
      time: '09:00',
      location: 'Suwon, Sungkyunkwan University',
      university: 'Sungkyunkwan University',
      type: 'sports',
      attendees: 85,
      description: 'Annual PPMK Sports Day featuring various traditional and modern sports competitions.',
      organizer: 'PPMK Sports Committee'
    },
    {
      id: '2',
      title: 'Sambutan Hari Malaysia',
      date: '2024-09-16',
      time: '18:00',
      location: 'Seoul, Embassy of Malaysia',
      type: 'cultural',
      attendees: 120,
      description: 'Celebration of Malaysia Day with cultural performances and traditional food.',
      organizer: 'Embassy of Malaysia'
    },
    {
      id: '3',
      title: 'Larian Madani 5KM',
      date: '2024-10-04',
      time: '07:00',
      location: 'Anyang-cheon, Dongyang Mirae University',
      university: 'Dongyang Mirae University',
      type: 'sports',
      attendees: 65,
      description: 'Charity run to promote healthy lifestyle among Malaysian students.',
      organizer: 'PPMK Health & Wellness'
    },
    {
      id: '4',
      title: 'HackPPMK 2024',
      date: '2024-11-15',
      time: '09:00',
      location: 'Seoul National University',
      university: 'Seoul National University',
      type: 'academic',
      attendees: 127,
      description: 'Innovation hackathon for Malaysian students in Korea.',
      organizer: 'PPMK Tech Committee'
    },
    {
      id: '5',
      title: 'KASUMA Fall Tournament',
      date: '2024-11-22',
      time: '10:00',
      location: 'Various Universities',
      type: 'sports',
      attendees: 89,
      description: 'Korean Association of Southeast Asian Malaysian University Athletes tournament.',
      organizer: 'KASUMA'
    },
    {
      id: '6',
      title: 'Malam Kebudayaan Malaysia',
      date: '2024-12-07',
      time: '19:00',
      location: 'Busan Convention Center',
      type: 'cultural',
      attendees: 200,
      description: 'Grand cultural night showcasing Malaysian heritage and traditions.',
      organizer: 'PPMK Cultural Committee'
    },
    {
      id: '7',
      title: 'Academic Excellence Awards',
      date: '2024-12-15',
      time: '14:00',
      location: 'Seoul, Malaysian Embassy',
      type: 'academic',
      attendees: 75,
      description: 'Recognition ceremony for outstanding academic achievements.',
      organizer: 'PPMK Academic Board'
    },
    {
      id: '8',
      title: 'New Year Gathering',
      date: '2025-01-05',
      time: '16:00',
      location: 'Seoul Community Center',
      type: 'social',
      attendees: 150,
      description: 'Welcome the new year with fellow Malaysian students.',
      organizer: 'PPMK Social Committee'
    }
  ]

  const eventTypes = [
    { id: 'all', label: 'All Events', color: 'gray' },
    { id: 'cultural', label: 'Cultural', color: 'red' },
    { id: 'sports', label: 'Sports', color: 'green' },
    { id: 'academic', label: 'Academic', color: 'blue' },
    { id: 'social', label: 'Social', color: 'purple' },
    { id: 'official', label: 'Official', color: 'yellow' }
  ]

  const getTypeColor = (type: string) => {
    const colors = {
      cultural: 'from-red-500 to-pink-500',
      sports: 'from-green-500 to-teal-500',
      academic: 'from-blue-500 to-cyan-500',
      social: 'from-purple-500 to-indigo-500',
      official: 'from-yellow-500 to-orange-500'
    }
    return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const filteredEvents = ppmkEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || event.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  // Group events by month
  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = new Date(event.date)
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    if (!groups[monthYear]) {
      groups[monthYear] = []
    }
    groups[monthYear].push(event)
    return groups
  }, {} as Record<string, PPMKEvent[]>)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 font-inter">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 border-b border-white/20 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <button 
                onClick={onBack}
                className="w-10 h-10 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">PPMK Calendar</h1>
                <p className="text-gray-600">Track all PPMK events and activities</p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search events, locations, or organizers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/30 transition-all duration-300"
                />
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-6 py-3 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl text-gray-700 hover:bg-white/30 transition-all duration-300"
                >
                  <Filter className="w-4 h-4" />
                  <span>{eventTypes.find(t => t.id === selectedFilter)?.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showFilters && (
                  <div className="absolute top-full mt-2 right-0 w-48 backdrop-blur-xl bg-white/90 border border-white/30 rounded-xl shadow-xl z-20">
                    {eventTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => {
                          setSelectedFilter(type.id)
                          setShowFilters(false)
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-white/50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                          selectedFilter === type.id ? 'bg-white/50 text-blue-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {Object.entries(groupedEvents).map(([monthYear, events]) => (
            <div key={monthYear} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{monthYear}</h2>
              
              <div className="space-y-4">
                {events.map((event) => {
                  const dateInfo = formatDate(event.date)
                  return (
                    <div
                      key={event.id}
                      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                      <div className="flex items-start space-x-6">
                        {/* Date Display */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-gray-800">{dateInfo.day}</span>
                            <span className="text-xs text-gray-600 uppercase">{dateInfo.month}</span>
                          </div>
                        </div>
                        
                        {/* Event Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{event.title}</h3>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getTypeColor(event.type)}`}>
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600 mb-1">Organized by</div>
                              <div className="text-sm font-medium text-gray-800">{event.organizer}</div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center text-gray-600 text-sm">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{event.time}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 text-sm">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{event.location}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 text-sm">
                              <Users className="w-4 h-4 mr-2" />
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              {event.university && (
                                <span className="bg-white/20 px-3 py-1 rounded-full">
                                  {event.university}
                                </span>
                              )}
                            </div>
                            
                            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                              {event.isRegistered ? 'Registered' : 'Register'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarScreen
