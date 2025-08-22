import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Smile, Paperclip, MoreVertical } from 'lucide-react'
import { User as UserType } from '../App'

interface ChatRoomScreenProps {
  user: UserType
  roomId: string
  onBack: () => void
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
}

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ user, roomId, onBack }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock room data
  const roomData = {
    '1': { name: 'General Discussion', participants: 45 },
    '2': { name: 'Batch 2024', participants: 28 },
    '3': { name: 'Badminton Club', participants: 12 },
    '4': { name: 'Study Group - CS', participants: 8 },
    '5': { name: 'Hackathon Team Alpha', participants: 4 },
    '6': { name: 'Academic Committee', participants: 6 }
  }

  const currentRoom = roomData[roomId as keyof typeof roomData] || { name: 'Unknown Room', participants: 0 }

  // Mock messages
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        sender: 'Ahmad Rahman',
        content: 'Hey everyone! How was the workshop today?',
        timestamp: '10:30 AM',
        isOwn: false
      },
      {
        id: '2',
        sender: user.name,
        content: 'It was really informative! Learned a lot about React hooks.',
        timestamp: '10:32 AM',
        isOwn: true
      },
      {
        id: '3',
        sender: 'Sarah Lee',
        content: 'Same here! The instructor was really good at explaining complex concepts.',
        timestamp: '10:35 AM',
        isOwn: false
      },
      {
        id: '4',
        sender: 'Mike Johnson',
        content: 'Did anyone take notes? I missed the part about useEffect cleanup.',
        timestamp: '10:38 AM',
        isOwn: false
      },
      {
        id: '5',
        sender: user.name,
        content: 'I can share my notes! Let me upload them to the shared drive.',
        timestamp: '10:40 AM',
        isOwn: true
      },
      {
        id: '6',
        sender: 'Ahmad Rahman',
        content: 'That would be great! Thanks for sharing.',
        timestamp: '10:42 AM',
        isOwn: false
      }
    ]
    setMessages(mockMessages)
  }, [roomId, user.name])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage: Message = {
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
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{currentRoom.name}</h1>
                <p className="text-xs text-gray-500">{currentRoom.participants} members</p>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                {!msg.isOwn && (
                  <p className="text-xs text-gray-500 mb-1 px-3">{msg.sender}</p>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    msg.isOwn
                      ? 'bg-blue-500 text-white rounded-br-md'
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
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
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

export default ChatRoomScreen
