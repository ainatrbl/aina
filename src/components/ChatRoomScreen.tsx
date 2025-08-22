import React, { useState, useRef, useEffect } from 'react'
import { Users, User, ArrowLeft, Send, Smile, Paperclip, MoreVertical, Phone, Video, Search, Crown, Trophy, GraduationCap, Zap, BookOpen, Coffee } from 'lucide-react'
import { User as UserType } from '../App'

interface ChatRoomScreenProps {
  user: UserType
  roomId: string
  onBack: () => void
}

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: 'text' | 'image' | 'file'
  isOwn: boolean
}

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ user, roomId, onBack }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get room details based on roomId
  const getRoomDetails = (roomId: string) => {
    if (roomId === 'ppmk-official') {
      return {
        name: 'PPMK Official Group',
        memberCount: 245,
        description: 'Official announcements and community updates',
        icon: Crown,
        color: 'text-purple-600'
      }
    }
    
    if (roomId.includes('club-badminton')) {
      return {
        name: 'Badminton Club',
        memberCount: 42,
        description: 'Connect with fellow Badminton Club members',
        icon: Trophy,
        color: 'text-blue-600'
      }
    }
    
    if (roomId.includes('club-recreational')) {
      return {
        name: 'Recreational Club',
        memberCount: 38,
        description: 'Connect with fellow Recreational Club members',
        icon: Trophy,
        color: 'text-blue-600'
      }
    }
    
    if (roomId.includes('university-yonsei')) {
      return {
        name: 'Yonsei Students',
        memberCount: 67,
        description: 'Connect with Malaysian students at Yonsei',
        icon: GraduationCap,
        color: 'text-green-600'
      }
    }
    
    if (roomId.includes('batch-2024')) {
      return {
        name: 'Batch 2024',
        memberCount: 34,
        description: 'Connect with your batch mates from 2024',
        icon: Users,
        color: 'text-orange-600'
      }
    }
    
    if (roomId.includes('hackathon')) {
      return {
        name: 'Hackathon: Hacktopus',
        memberCount: 28,
        description: 'Coordinate and discuss Hackathon: Hacktopus',
        icon: Zap,
        color: 'text-red-600'
      }
    }
    
    if (roomId === 'korean-language') {
      return {
        name: 'Korean Language Exchange',
        memberCount: 78,
        description: 'Practice Korean with fellow students',
        icon: BookOpen,
        color: 'text-gray-600'
      }
    }
    
    if (roomId === 'casual-chat') {
      return {
        name: 'Casual Hangout',
        memberCount: 156,
        description: 'Casual conversations and daily life',
        icon: Coffee,
        color: 'text-gray-600'
      }
    }
    
    return {
      name: 'Chat Room',
      memberCount: 0,
      description: 'Group chat',
      icon: Users,
      color: 'text-gray-600'
    }
  }

  const roomDetails = getRoomDetails(roomId)
  const IconComponent = roomDetails.icon

  // Mock messages based on room type
  useEffect(() => {
    const generateMockMessages = (): Message[] => {
      const baseMessages: Message[] = []
      
      if (roomId === 'ppmk-official') {
        baseMessages.push(
          {
            id: '1',
            senderId: 'admin',
            senderName: 'PPMK Admin',
            content: 'Welcome to the official PPMK community chat! Please keep discussions respectful and relevant.',
            timestamp: '2 hours ago',
            type: 'text',
            isOwn: false
          },
          {
            id: '2',
            senderId: 'user1',
            senderName: 'Ahmad Zaki',
            content: 'Thanks for setting this up! Great to connect with everyone.',
            timestamp: '1 hour ago',
            type: 'text',
            isOwn: false
          }
        )
      } else if (roomId.includes('badminton')) {
        baseMessages.push(
          {
            id: '1',
            senderId: 'user2',
            senderName: 'Siti Nurhaliza',
            content: 'Anyone up for a game this weekend? The weather looks perfect!',
            timestamp: '1 hour ago',
            type: 'text',
            isOwn: false
          },
          {
            id: '2',
            senderId: 'user3',
            senderName: 'Rahman Ali',
            content: 'Count me in! What time are we thinking?',
            timestamp: '45 minutes ago',
            type: 'text',
            isOwn: false
          }
        )
      } else if (roomId.includes('hackathon')) {
        baseMessages.push(
          {
            id: '1',
            senderId: 'user4',
            senderName: 'Tech Lead',
            content: 'Team formation starts tomorrow! Make sure to register on the portal.',
            timestamp: '30 minutes ago',
            type: 'text',
            isOwn: false
          },
          {
            id: '2',
            senderId: 'user5',
            senderName: 'Sarah Kim',
            content: 'Looking for frontend developers to join our team! DM me if interested.',
            timestamp: '15 minutes ago',
            type: 'text',
            isOwn: false
          }
        )
      }
      
      return baseMessages
    }

    setMessages(generateMockMessages())
  }, [roomId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: user.ppmkId,
        senderName: user.name,
        content: message,
        timestamp: 'now',
        type: 'text',
        isOwn: true
      }
      
      setMessages(prev => [...prev, newMessage])
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 font-inter flex">
      {/* Left Sidebar */}
      <div className="hidden lg:flex flex-col w-20 bg-white border-r border-gray-200 items-center py-8 space-y-8">
        {/* Logo */}
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        
        {/* Navigation Icons */}
        <div className="flex flex-col space-y-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
            <Search className="w-6 h-6 text-gray-600" />
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors">
            <IconComponent className={`w-6 h-6 ${roomDetails.color}`} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors lg:hidden"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <IconComponent className={`w-6 h-6 ${roomDetails.color}`} />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">{roomDetails.name}</h1>
                  <p className="text-sm text-gray-500">{roomDetails.memberCount} members</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <IconComponent className={`w-16 h-16 ${roomDetails.color} mx-auto mb-4 opacity-50`} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to {roomDetails.name}</h3>
              <p className="text-gray-500 max-w-md mx-auto">{roomDetails.description}</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                  {!msg.isOwn && (
                    <p className="text-xs text-gray-500 mb-1 px-3">{msg.senderName}</p>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      msg.isOwn
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 px-3 ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            
            <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatRoomScreen
