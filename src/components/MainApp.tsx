import React, { useState } from 'react'
import { AuthUser } from '../hooks/useAuth'
import ProfileScreen from './ProfileScreen'
import AnnouncementsScreen from './AnnouncementsScreen'
import ChatScreen from './ChatScreen'
import ChatRoomScreen from './ChatRoomScreen'
import ChannelScreen from './ChannelScreen'
import ChannelDetailScreen from './ChannelDetailScreen'
import CalendarScreen from './CalendarScreen'
import MoreScreen from './MoreScreen'
import Header from './Header'
import BottomNavigation from './BottomNavigation'
import { useAuth } from '../hooks/useAuth'

interface MainAppProps {
  user: AuthUser
}

const MainApp: React.FC<MainAppProps> = ({ user }) => {
  const [showProfile, setShowProfile] = useState(false)
  const [showAnnouncements, setShowAnnouncements] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [showChannel, setShowChannel] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('announcements')

  const { signOut } = useAuth()

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
    setShowAnnouncements(true)
    setActiveSection('announcements')
  }

  const handleBackFromAnnouncements = () => {
    setShowAnnouncements(true)
    setActiveSection('announcements')
  }

  const handleBackFromChat = () => {
    setShowChat(false)
    setShowAnnouncements(true)
    setActiveSection('announcements')
  }

  const handleBackFromChannel = () => {
    setShowChannel(false)
    setShowAnnouncements(true)
    setActiveSection('announcements')
  }

  const handleBackFromCalendar = () => {
    setShowCalendar(false)
    setShowAnnouncements(true)
    setActiveSection('announcements')
  }

  const handleBackFromMore = () => {
    setShowMore(false)
    setShowAnnouncements(true)
    setActiveSection('announcements')
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

  const handleLogout = async () => {
    await signOut()
  }

  // Show profile screen if user clicked on profile
  if (showProfile) {
    return <ProfileScreen user={user} onBack={handleBackFromProfile} />
  }

  // Show calendar screen if user clicked on calendar
  if (showCalendar) {
    return <CalendarScreen user={user} onBack={handleBackFromCalendar} />
  }

  // Show more screen if user clicked on more
  if (showMore) {
    return <MoreScreen user={user} onBack={handleBackFromMore} />
  }

  // Show channel detail screen if user selected a channel
  if (selectedChannel) {
    return <ChannelDetailScreen user={user} channelId={selectedChannel} onBack={handleBackFromChannelDetail} />
  }

  // Show channel screen if user clicked on channel
  if (showChannel) {
    return <ChannelScreen user={user} onBack={handleBackFromChannel} onSelectChannel={handleSelectChannel} />
  }

  // Show chat room screen if user selected a chat room
  if (selectedChatRoom) {
    return <ChatRoomScreen user={user} roomId={selectedChatRoom} onBack={handleBackFromChatRoom} />
  }

  // Show chat screen if user clicked on chat
  if (showChat) {
    return <ChatScreen user={user} onBack={handleBackFromChat} onSelectRoom={handleSelectChatRoom} />
  }

  // Default to announcements screen
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
        
        <AnnouncementsScreen user={user} onBack={handleBackFromAnnouncements} />
        
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

export default MainApp
