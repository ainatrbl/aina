import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Users, Pin, Hash, Settings, Bell, Search } from 'lucide-react'
import { User as UserType } from '../App'

interface ChannelDetailScreenProps {
  user: UserType
  channelId: string
  onBack: () => void
}

interface ChannelMessage {
  id: string
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
  isPinned?: boolean
}

const ChannelDetailScreen: React.FC<ChannelDetailScreenProps> = ({ user, channelId, onBack }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChannelMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock channel data
  const channelData = {
    '1': { name: 'Badminton Club', description: 'Weekly tournaments and training', memberCount: 45 },
    '2': { name: 'Recreational Club', description: 'Fun activities and social events', memberCount: 67 },
    '3': { name: 'Photography Club', description: 'Photo sharing and techniques', memberCount: 23 },
    '4': { name: 'Study Group - CS', description: 'Computer Science study group', memberCount: 15 },
    '5': { name: 'Hackathon: Hacktopus', description: 'Hacktopus 2024 participants', memberCount: 89 },
    '6': { name: 'Cultural Night 2024', description: 'Cultural Night coordination', memberCount: 34 },
    '7': { name: 'General Announcements', description: 'Official announcements', memberCount: 156 },
    '8': { name: 'Academic Resources', description: 'Study materials and resources', memberCount: 78 }
  }

  const currentChannel = channelData[channelId as keyof typeof channelData] || { 
    name: 'Unknown Channel', 
    description: 'Channel description', 
    memberCount: 0 
  }

  // Mock messages based on channel
  useEffect(() => {
    const mockMessages: ChannelMessage[] = [
      {
        id: '1',
        sender: 'Channel Admin',
        content: `Welcome to ${currentChannel.name}! Please read the pinned messages for important information.`,
        timestamp: '9:00 AM',
        isOwn: false,
        isPinned: true
      },
      {
        id: '2',
        sender: 'Ahmad Rahman',
        content: 'Hey everyone! Looking forward to this week\'s activities.',
        timestamp: '10:15 AM',
        isOwn: false
      },
      {
        id: '3',
        sender: 'Sarah Lee',
        content: 'Same here! When is the next meeting scheduled?',
        timestamp: '10:18 AM',
        isOwn: false
      },
      {
        id: '4',
        sender: user.name,
        content: 'I think it\'s this Friday at 3 PM. Let me double-check.',
        timestamp: '10:20 AM',
        isOwn: true
      },
      {
        id: '5',
        sender: 'Mike Johnson',
        content: 'Thanks for checking! I\'ll mark it on my calendar.',
        timestamp: '10:22 AM',
        isOwn: false
      }
    ]
    setMessages(mockMessages)
  }, [channelId, user.name, currentChannel.name])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage: ChannelMessage = {
        id: Date.now().toString(),
        sender: user.name,
        content: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      }
      setMessages(prev => [...prev, newMessage])
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
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
              <div className="flex items-center space-x-2">
                <Hash className="w-5 h-5 text-gray-600" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">{currentChannel.name}</h1>
                  <p className="text-xs text-gray-500">{currentChannel.memberCount} members</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Users className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Channel Info */}
        <div className="bg-white/60 backdrop-blur-md border-b border-gray-200/50 px-4 py-2">
          <p className="text-sm text-gray-600">{currentChannel.description}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              {msg.isPinned && (
                <div className="flex items-center space-x-2 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
                  <Pin className="w-3 h-3" />
                  <span>Pinned Message</span>
                </div>
              )}
              <div className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                  {!msg.isOwn && (
                    <p className="text-xs text-gray-500 mb-1 px-3 font-medium">{msg.sender}</p>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.isOwn
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : msg.isPinned
                        ? 'bg-amber-100 text-amber-900 rounded-bl-md border border-amber-200'
                        : 'bg-white/80 backdrop-blur-md text-gray-900 rounded-bl-md border border-white/20'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 px-3 ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message #${currentChannel.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChannelDetailScreen
