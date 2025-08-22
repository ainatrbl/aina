import React, { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import ProfileScreen from './components/ProfileScreen'
import AnnouncementsScreen from './components/AnnouncementsScreen'
import ChatScreen from './components/ChatScreen'
import ChatRoomScreen from './components/ChatRoomScreen'
import ChannelScreen from './components/ChannelScreen'
import ChannelDetailScreen from './components/ChannelDetailScreen'
import CalendarScreen from './components/CalendarScreen'
import MoreScreen from './components/MoreScreen'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Community from './components/Community'
import BottomNavigation from './components/BottomNavigation'

export interface User {
  ppmkId: string
  name: string
  scholarship?: string
  university?: string
  batch?: string
  clubs?: string[]
  events?: string[]
  isAdmin?: boolean
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showAnnouncements, setShowAnnouncements] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showChannel, setShowChannel] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('home')
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = (ppmkId: string, name: string, scholarship?: string, university?: string) => {
    // Enhanced user profile with automatic group memberships based on PPMK ID
    const enhancedUser: User = {
      ppmkId,
      name,
      scholarship,
      university,
      batch: getBatchFromPpmkId(ppmkId),
      clubs: getClubsFromPpmkId(ppmkId),
      events: getEventsFromPpmkId(ppmkId),
      isAdmin: getAdminStatusFromPpmkId(ppmkId)
    }
    
    setUser(enhancedUser)
    setIsAuthenticated(true)
    setShowProfile(false)
    setShowAnnouncements(false)
    setShowChat(false)
    setShowChannel(false)
    setShowCalendar(false)
    setShowMore(false)
    setSelectedChatRoom(null)
    setSelectedChannel(null)
  }

  // Mock functions to determine user memberships based on PPMK ID
  const getBatchFromPpmkId = (ppmkId: string): string => {
    if (ppmkId.includes('001') || ppmkId === 'demo') return '2024'
    if (ppmkId.includes('002')) return '2023'
    if (ppmkId.includes('003')) return '2025'
    return '2024'
  }

  const getClubsFromPpmkId = (ppmkId: string): string[] => {
    const clubs = []
    if (ppmkId.includes('001') || ppmkId === 'demo') {
      clubs.push('Badminton Club', 'Recreational Club')
    }
    if (ppmkId.includes('002')) {
      clubs.push('Badminton Club', 'Photography Club')
    }
    if (ppmkId.includes('003')) {
      clubs.push('Recreational Club', 'Study Group')
    }
    return clubs
  }

  const getEventsFromPpmkId = (ppmkId: string): string[] => {
    const events = []
    if (ppmkId.includes('001') || ppmkId === 'demo') {
      events.push('Hackathon: Hacktopus', 'Cultural Night 2024')
    }
    if (ppmkId.includes('002')) {
      events.push('Sports Day 2024')
    }
    if (ppmkId.includes('003')) {
      events.push('Hackathon: Hacktopus', 'Academic Conference')
    }
    return events
  }

  const getAdminStatusFromPpmkId = (ppmkId: string): boolean => {
    // Demo user and specific IDs are admins for testing
    return ppmkId === 'demo' || ppmkId.includes('admin') || ppmkId.includes('001')
  }

  const handleShowProfile = () => {
    setShowProfile(true)
    setShowAnnouncements(false)
    setShowChat(false)
    setShowChannel(false)
    setShowCalendar(false)
    setShowMore(false)
    setSelectedChatRoom(null)
    setSelectedChannel(null)
  }

  const handleShowAnnouncements = () => {
    setShowAnnouncements(true)
    setShowProfile(false)
    setShowChat(false)
    setShowChannel(false)
    setShowCalendar(false)
    setShowMore(false)
    setSelectedChatRoom(null)
    setSelectedChannel(null)
    setActiveSection('announcements')
  }

  const handleShowChat = () => {
    setShowChat(true)
    setShowProfile(false)
    setShowAnnouncements(false)
    setShowChannel(false)
    setShowCalendar(false)
    setShowMore(false)
    setSelectedChatRoom(null)
    setSelectedChannel(null)
    setActiveSection('chat')
  }

  const handleShowChannel = () => {
    setShowChannel(true)
    setShowProfile(false)
    setShowAnnouncements(false)
    setShowChat(false)
    setShowCalendar(false)
    setShowMore(false)
    setSelectedChatRoom(null)
    setSelectedChannel(null)
    setActiveSection('channel')
  }

  const handleShowCalendar = () => {
    setShowCalendar(true)
    setShowProfile(false)
    setShowAnnouncements(false)
    setShowChat(false)
    setShowChannel(false)
    setShowMore(false)
    setSelectedChatRoom(null)
    setSelectedChannel(null)
    setActiveSection('calendar')
  }

  const handleShowMore = () => {
    setShowMore(true)
    setShowProfile(false)
    setShowAnnouncements(false)
    setShowChat(false)
    setShowChannel(false)
    setShowCalendar(false)
    setSelectedChatRoom(null)
    setSelectedChannel(null)
    setActiveSection('more')
  }

  const handleSelectChatRoom = (roomId: string) => {
    setSelectedChatRoom(roomId)
    setShowChat(false)
  }

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannel(channelId)
    setShowChannel(false)
  }

  const handleBackFromProfile = () => {
    setShowProfile(false)
  }

  const handleBackFromAnnouncements = () => {
    setShowAnnouncements(false)
    setActiveSection('home')
  }

  const handleBackFromChat = () => {
    setShowChat(false)
    setActiveSection('home')
  }

  const handleBackFromChannel = () => {
    setShowChannel(false)
    setActiveSection('home')
  }

  const handleBackFromCalendar = () => {
    setShowCalendar(false)
    setActiveSection('home')
  }

  const handleBackFromMore = () => {
    setShowMore(false)
    setActiveSection('home')
  }

  const handleBackFromChatRoom = () => {
    setSelectedChatRoom(null)
    setShowChat(true)
    setActiveSection('chat')
  }

  const handleBackFromChannelDetail = () => {
    setSelectedChannel(null)
    setShowChannel(true)
    setActiveSection('channel')
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setShowProfile(false)
    setShowAnnouncements(false)
    setShowChat(false)
    setShowChannel(false)
    setShowCalendar(false)
    setShowMore(false)
    setSelectedChatRoom(null)
    setSelectedChannel(null)
    setActiveSection('home')
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  // Show profile screen if user clicked on profile
  if (showProfile && user) {
    return <ProfileScreen user={user} onBack={handleBackFromProfile} />
  }

  // Show announcements screen if user clicked on announcements
  if (showAnnouncements && user) {
    return <AnnouncementsScreen user={user} onBack={handleBackFromAnnouncements} />
  }

  // Show calendar screen if user clicked on calendar
  if (showCalendar && user) {
    return <CalendarScreen user={user} onBack={handleBackFromCalendar} />
  }

  // Show more screen if user clicked on more
  if (showMore && user) {
    return <MoreScreen user={user} onBack={handleBackFromMore} />
  }

  // Show channel detail screen if user selected a channel
  if (selectedChannel && user) {
    return <ChannelDetailScreen user={user} channelId={selectedChannel} onBack={handleBackFromChannelDetail} />
  }

  // Show channel screen if user clicked on channel
  if (showChannel && user) {
    return <ChannelScreen user={user} onBack={handleBackFromChannel} onSelectChannel={handleSelectChannel} />
  }

  // Show chat room screen if user selected a chat room
  if (selectedChatRoom && user) {
    return <ChatRoomScreen user={user} roomId={selectedChatRoom} onBack={handleBackFromChatRoom} />
  }

  // Show chat screen if user clicked on chat
  if (showChat && user) {
    return <ChatScreen user={user} onBack={handleBackFromChat} onSelectRoom={handleSelectChatRoom} />
  }

  // Show main app after login
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 font-inter pb-20">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header 
          user={user}
          onLogout={handleLogout}
          onShowProfile={handleShowProfile}
        />
        
        <Hero />
        <Features />
        <Community />
        
        <BottomNavigation 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onShowAnnouncements={handleShowAnnouncements}
          onShowChat={handleShowChat}
          onShowChannel={handleShowChannel}
          onShowCalendar={handleShowCalendar}
          onShowMore={handleShowMore}
        />
      </div>
    </div>
  )
}

export default App
