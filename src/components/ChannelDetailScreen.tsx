import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Hash, Shield, Volume2, Settings } from 'lucide-react'

interface ChannelDetailScreenProps {
  user: { ppmkId: string; name: string; isAdmin?: boolean }
  channelId: string
  onBack: () => void
}

interface ChannelMessage {
  id: string
  content: string
  author: string
  authorRole: 'admin' | 'moderator'
  timestamp: string
  isSystemMessage?: boolean
}

interface ChannelInfo {
  id: string
  name: string
  description: string
  type: 'hackathon' | 'sports' | 'cultural' | 'academic'
  memberCount: number
  createdDate: string
  location?: string
  eventDate?: string
}

const ChannelDetailScreen: React.FC<ChannelDetailScreenProps> = ({ user, channelId, onBack }) => {
  const [selectedSubchannel, setSelectedSubchannel] = useState('welcome')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedSubchannel])

  // Mock channel data based on channelId
  const getChannelInfo = (id: string): ChannelInfo => {
    switch (id) {
      case '1':
        return {
          id: '1',
          name: 'HackPPMK25',
          description: 'Innovation for Malaysian Students in Korea',
          type: 'hackathon',
          memberCount: 127,
          createdDate: 'Oct 15, 2024',
          location: 'Seoul National University',
          eventDate: 'Nov 15-17, 2024'
        }
      case '2':
        return {
          id: '2',
          name: 'KASUMA Fall 2025',
          description: 'Korean Association of Southeast Asian Malaysian University Athletes',
          type: 'sports',
          memberCount: 89,
          createdDate: 'Sep 20, 2024',
          location: 'Various Universities',
          eventDate: 'March 8-10, 2025'
        }
      default:
        return {
          id: channelId,
          name: 'PPMK Event',
          description: 'PPMK Community Event',
          type: 'cultural',
          memberCount: 50,
          createdDate: 'Oct 1, 2024'
        }
    }
  }

  const channelInfo = getChannelInfo(channelId)

  // Mock subchannel structure
  const subchannels = {
    welcome: [
      { id: 'announcements', name: 'announcements', type: 'text' },
      { id: 'welcome', name: 'welcome', type: 'text' },
      { id: 'rules', name: 'rules', type: 'text' },
      { id: 'faq-and-resources', name: 'faq-and-resources', type: 'text' }
    ],
    general: [
      { id: 'general', name: 'general', type: 'text' },
      { id: 'lounge', name: 'Lounge', type: 'voice' },
      { id: 'breakout-room', name: 'Breakout Room', type: 'voice' }
    ],
    activities: [
      { id: 'workshop', name: 'workshop', type: 'text' },
      { id: 'workshop-voice', name: 'Workshop Voice', type: 'voice' }
    ],
    mentoring: [
      { id: 'find-a-mentor', name: 'find-a-mentor', type: 'text' },
      { id: 'mentor-room', name: 'Mentor Room', type: 'voice' }
    ],
    sponsor: [
      { id: 'sponsor', name: 'sponsor', type: 'text' }
    ]
  }

  // Mock messages based on selected subchannel
  const getMessages = (subchannel: string): ChannelMessage[] => {
    switch (subchannel) {
      case 'welcome':
        return [
          {
            id: '1',
            content: `Welcome to #welcome!\n\nThis is the start of the #welcome channel. Public channel for anyone joining. Make your first steps into the server.`,
            author: 'PPMK Bot',
            authorRole: 'admin',
            timestamp: '2 days ago',
            isSystemMessage: true
          }
        ]
      case 'announcements':
        return [
          {
            id: '1',
            content: `🚀 **${channelInfo.name} Official Announcement**\n\nWelcome everyone to the official ${channelInfo.name} channel! We're excited to have you all here.`,
            author: 'PPMK Admin',
            authorRole: 'admin',
            timestamp: '1 day ago'
          },
          {
            id: '2',
            content: `📅 **Important Dates Reminder**\n\nEvent Date: ${channelInfo.eventDate}\nRegistration Deadline: November 1, 2024\nTeam Formation: November 5, 2024`,
            author: 'Event Coordinator',
            authorRole: 'moderator',
            timestamp: '18 hours ago'
          },
          {
            id: '3',
            content: `🎯 **Theme Announcement**\n\n"${channelInfo.description}"\n\nStart brainstorming your innovative solutions that can benefit Malaysian students studying in Korea!`,
            author: 'Tech Committee',
            authorRole: 'admin',
            timestamp: '12 hours ago'
          }
        ]
      case 'rules':
        return [
          {
            id: '1',
            content: `📋 **${channelInfo.name} Rules & Guidelines**\n\n1. Be respectful to all participants\n2. No spam or irrelevant content\n3. Use appropriate channels for discussions\n4. Follow PPMK community guidelines\n5. Have fun and learn together! 🎉`,
            author: 'PPMK Moderator',
            authorRole: 'moderator',
            timestamp: '2 days ago'
          }
        ]
      case 'general':
        return [
          {
            id: '1',
            content: `Hey everyone! 👋 Welcome to the general discussion channel. Feel free to introduce yourselves and start networking!`,
            author: 'Community Manager',
            authorRole: 'moderator',
            timestamp: '1 day ago'
          },
          {
            id: '2',
            content: `🔥 The energy in this channel is amazing! Can't wait to see what innovative projects you all come up with.`,
            author: 'PPMK Admin',
            authorRole: 'admin',
            timestamp: '8 hours ago'
          }
        ]
      case 'workshop':
        return [
          {
            id: '1',
            content: `🛠️ **Workshop Schedule Released!**\n\nDay 1: Ideation & Team Formation\nDay 2: Development Sprint\nDay 3: Presentation & Judging\n\nDetailed schedule will be shared soon!`,
            author: 'Workshop Lead',
            authorRole: 'moderator',
            timestamp: '6 hours ago'
          }
        ]
      default:
        return [
          {
            id: '1',
            content: `Welcome to #${subchannel}! This channel is managed by PPMK administrators and moderators.`,
            author: 'PPMK Admin',
            authorRole: 'admin',
            timestamp: '1 day ago'
          }
        ]
    }
  }

  const messages = getMessages(selectedSubchannel)

  return (
    <div className="min-h-screen bg-gray-100 font-inter flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-gray-800 text-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={onBack}
              className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-bold">
              <span>Channel</span>
              <span className="mx-2">→</span>
              <span>{channelInfo.name}</span>
            </h1>
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Channel Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Welcome Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Welcome</h3>
            <div className="space-y-1">
              {subchannels.welcome.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedSubchannel(channel.id)}
                  className={`w-full flex items-center space-x-2 px-2 py-1 rounded text-sm hover:bg-gray-700 transition-colors ${
                    selectedSubchannel === channel.id ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`}
                >
                  <Hash className="w-4 h-4" />
                  <span>{channel.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* General Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">General</h3>
            <div className="space-y-1">
              {subchannels.general.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedSubchannel(channel.id)}
                  className={`w-full flex items-center space-x-2 px-2 py-1 rounded text-sm hover:bg-gray-700 transition-colors ${
                    selectedSubchannel === channel.id ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`}
                >
                  {channel.type === 'voice' ? <Volume2 className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
                  <span>{channel.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sponsor Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Sponsor</h3>
            <div className="space-y-1">
              {subchannels.sponsor.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedSubchannel(channel.id)}
                  className={`w-full flex items-center space-x-2 px-2 py-1 rounded text-sm hover:bg-gray-700 transition-colors ${
                    selectedSubchannel === channel.id ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`}
                >
                  <Hash className="w-4 h-4" />
                  <span>{channel.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activities Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Activities</h3>
            <div className="space-y-1">
              {subchannels.activities.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedSubchannel(channel.id)}
                  className={`w-full flex items-center space-x-2 px-2 py-1 rounded text-sm hover:bg-gray-700 transition-colors ${
                    selectedSubchannel === channel.id ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`}
                >
                  {channel.type === 'voice' ? <Volume2 className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
                  <span>{channel.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mentoring Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Mentoring</h3>
            <div className="space-y-1">
              {subchannels.mentoring.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedSubchannel(channel.id)}
                  className={`w-full flex items-center space-x-2 px-2 py-1 rounded text-sm hover:bg-gray-700 transition-colors ${
                    selectedSubchannel === channel.id ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`}
                >
                  {channel.type === 'voice' ? <Volume2 className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
                  <span>{channel.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Channel Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <Hash className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Welcome to #{selectedSubchannel}!</h2>
              <p className="text-sm text-gray-600">
                {selectedSubchannel === 'welcome' 
                  ? 'This is the start of the #welcome channel. Public channel for anyone joining. Make your first steps into the server.'
                  : `This is the start of the #${selectedSubchannel} channel.`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900">{msg.author}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    msg.authorRole === 'admin' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {msg.authorRole.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                </div>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  )
}

export default ChannelDetailScreen
