import React, { useState } from 'react'
import { ArrowLeft, Search, Users, Globe, Building2, BookOpen, Wrench, Phone, Mail, MapPin, Star, Clock, ExternalLink, Download, MessageCircle, ChevronRight, Navigation, Filter, Heart, ThumbsUp, Send, FileText, ChevronDown, User } from 'lucide-react'

interface MoreScreenProps {
  user: { ppmkId: string; name: string; isAdmin?: boolean }
  onBack: () => void
}

interface Contact {
  id: string
  name: string
  role: string
  university: string
  phone: string
  email: string
  department?: string
  avatar: string
}

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
  avatar: string
}

interface HalalRestaurant {
  id: string
  name: string
  type: string
  location: string
  district: string
  rating: number
  distance: string
  priceRange: string
  verified: boolean
  image: string
  coordinates: { lat: number; lng: number }
  reviews: Review[]
  totalReviews: number
  phone?: string
  hours?: string
  specialties?: string[]
}

interface Organization {
  id: string
  name: string
  type: string
  description: string
  contact: string
  website?: string
  logo: string
  members?: number
  established?: string
  location?: string
}

interface OrganizationCategory {
  id: string
  title: string
  organizations: Organization[]
}

interface StudyMaterial {
  id: string
  title: string
  subject: string
  type: 'pdf' | 'video' | 'notes' | 'slides'
  university: string
  downloads: number
  uploadedBy: string
  date: string
}

interface HelpTicket {
  id: string
  title: string
  category: string
  status: 'open' | 'in-progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  date: string
}

interface University {
  id: string
  name: string
  departments: Department[]
}

interface Department {
  id: string
  name: string
  categories: MaterialCategory[]
}

interface MaterialCategory {
  id: string
  name: string
  count: number
}

interface PPMKLeader {
  id: string
  name: string
  position: string
  phone?: string
  email?: string
}

const MoreScreen: React.FC<MoreScreenProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState('main')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState<HalalRestaurant | null>(null)
  const [selectedOrgCategory, setSelectedOrgCategory] = useState<string | null>(null)
  const [mapView, setMapView] = useState(true)
  const [filterDistrict, setFilterDistrict] = useState('all')
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)

  // Mock data for universities and departments
  const universities: University[] = [
    {
      id: 'hanyang',
      name: 'Hanyang University',
      departments: [
        {
          id: 'cs',
          name: 'Computer Science',
          categories: [
            { id: 'past-papers', name: 'Past Papers', count: 45 },
            { id: 'quiz', name: 'Quiz', count: 23 },
            { id: 'revision', name: 'Revision', count: 31 }
          ]
        },
        {
          id: 'engineering',
          name: 'Engineering',
          categories: [
            { id: 'past-papers', name: 'Past Papers', count: 38 },
            { id: 'quiz', name: 'Quiz', count: 19 },
            { id: 'revision', name: 'Revision', count: 27 }
          ]
        },
        {
          id: 'business',
          name: 'Business Administration',
          categories: [
            { id: 'past-papers', name: 'Past Papers', count: 29 },
            { id: 'quiz', name: 'Quiz', count: 15 },
            { id: 'revision', name: 'Revision', count: 22 }
          ]
        }
      ]
    },
    {
      id: 'snu',
      name: 'Seoul National University',
      departments: [
        {
          id: 'cs',
          name: 'Computer Science',
          categories: [
            { id: 'past-papers', name: 'Past Papers', count: 52 },
            { id: 'quiz', name: 'Quiz', count: 28 },
            { id: 'revision', name: 'Revision', count: 35 }
          ]
        },
        {
          id: 'medicine',
          name: 'Medicine',
          categories: [
            { id: 'past-papers', name: 'Past Papers', count: 41 },
            { id: 'quiz', name: 'Quiz', count: 33 },
            { id: 'revision', name: 'Revision', count: 29 }
          ]
        }
      ]
    },
    {
      id: 'yonsei',
      name: 'Yonsei University',
      departments: [
        {
          id: 'economics',
          name: 'Economics',
          categories: [
            { id: 'past-papers', name: 'Past Papers', count: 36 },
            { id: 'quiz', name: 'Quiz', count: 21 },
            { id: 'revision', name: 'Revision', count: 25 }
          ]
        },
        {
          id: 'international',
          name: 'International Studies',
          categories: [
            { id: 'past-papers', name: 'Past Papers', count: 24 },
            { id: 'quiz', name: 'Quiz', count: 18 },
            { id: 'revision', name: 'Revision', count: 20 }
          ]
        }
      ]
    },
    {
      id: 'kaist',
      name: 'KAIST',
      departments: [
        {
          id: 'engineering',
          name: 'Engineering',
          categories: [
            { id: 'past-papers', name: 'Past Papers', count: 47 },
            { id: 'quiz', name: 'Quiz', count: 26 },
            { id: 'revision', name: 'Revision', count: 33 }
          ]
        },
        {
          id: 'science',
          name: 'Natural Sciences',
          categories: [
            { id: 'past-papers', name: 'Past Papers', count: 39 },
            { id: 'quiz', name: 'Quiz', count: 22 },
            { id: 'revision', name: 'Revision', count: 28 }
          ]
        }
      ]
    }
  ]

  // PPMK Leadership data
  const ppmkLeadership: PPMKLeader[] = [
    {
      id: '1',
      name: 'ALI BIN ABU',
      position: 'PRESIDENT',
      phone: '+82-10-1234-5678',
      email: 'president@ppmk.org'
    },
    {
      id: '2',
      name: 'ALIA BINTI ABU',
      position: 'VICE PRESIDENT I',
      phone: '+82-10-2345-6789',
      email: 'vp1@ppmk.org'
    },
    {
      id: '3',
      name: 'ABU BIN ALI',
      position: 'VICE PRESIDENT II',
      phone: '+82-10-3456-7890',
      email: 'vp2@ppmk.org'
    },
    {
      id: '4',
      name: 'ALEA BINTI ABU',
      position: 'GENERAL SECRETARY',
      phone: '+82-10-4567-8901',
      email: 'secretary@ppmk.org'
    },
    {
      id: '5',
      name: 'ALYA BINTI ABU',
      position: 'HONORARY TREASURER',
      phone: '+82-10-5678-9012',
      email: 'treasurer@ppmk.org'
    }
  ]

  // Mock data
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Dr. Ahmad Rahman',
      role: 'Academic Advisor',
      university: 'Seoul National University',
      phone: '+82-10-1234-5678',
      email: 'ahmad.rahman@snu.ac.kr',
      department: 'International Affairs',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      role: 'PPMK President',
      university: 'Yonsei University',
      phone: '+82-10-2345-6789',
      email: 'siti.nurhaliza@yonsei.ac.kr',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      name: 'Muhammad Faiz',
      role: 'Student Representative',
      university: 'KAIST',
      phone: '+82-10-3456-7890',
      email: 'faiz.muhammad@kaist.ac.kr',
      department: 'Engineering',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ]

  const halalRestaurants: HalalRestaurant[] = [
    {
      id: '1',
      name: 'Istanbul Kebab',
      type: 'Turkish',
      location: 'Itaewon-ro 27ga-gil, Yongsan-gu',
      district: 'Itaewon',
      rating: 4.5,
      distance: '2.3 km',
      priceRange: '₩₩',
      verified: true,
      image: 'https://images.pexels.com/photos/4253320/pexels-photo-4253320.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      coordinates: { lat: 37.5347, lng: 126.9947 },
      totalReviews: 127,
      phone: '+82-2-797-8292',
      hours: '11:00 AM - 10:00 PM',
      specialties: ['Döner Kebab', 'Lahmacun', 'Baklava'],
      reviews: [
        {
          id: '1',
          userId: 'user1',
          userName: 'Ahmad Zaki',
          rating: 5,
          comment: 'Authentic Turkish food! The döner kebab is amazing and the owner is very friendly. Definitely halal certified.',
          date: '2024-01-15',
          helpful: 12,
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Siti Aminah',
          rating: 4,
          comment: 'Great food and reasonable prices. The atmosphere is cozy and perfect for students.',
          date: '2024-01-10',
          helpful: 8,
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
        }
      ]
    },
    {
      id: '2',
      name: 'Masjid Restaurant',
      type: 'Pakistani',
      location: 'Dongdaemun-gu, Seoul',
      district: 'Dongdaemun',
      rating: 4.2,
      distance: '1.8 km',
      priceRange: '₩',
      verified: true,
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      coordinates: { lat: 37.5744, lng: 127.0098 },
      totalReviews: 89,
      phone: '+82-2-2232-5678',
      hours: '12:00 PM - 11:00 PM',
      specialties: ['Biryani', 'Karahi', 'Naan'],
      reviews: [
        {
          id: '3',
          userId: 'user3',
          userName: 'Farid Hassan',
          rating: 4,
          comment: 'Authentic Pakistani cuisine. The biryani is excellent and portions are generous.',
          date: '2024-01-20',
          helpful: 15,
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
        }
      ]
    },
    {
      id: '3',
      name: 'Halal Kitchen',
      type: 'Korean-Halal',
      location: 'Hongdae, Mapo-gu',
      district: 'Hongdae',
      rating: 4.7,
      distance: '3.1 km',
      priceRange: '₩₩₩',
      verified: true,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      coordinates: { lat: 37.5563, lng: 126.9236 },
      totalReviews: 203,
      phone: '+82-2-334-7890',
      hours: '5:00 PM - 12:00 AM',
      specialties: ['Halal Korean BBQ', 'Bulgogi', 'Kimchi Jjigae'],
      reviews: [
        {
          id: '4',
          userId: 'user4',
          userName: 'Nurul Aina',
          rating: 5,
          comment: 'Finally, halal Korean BBQ! The meat quality is excellent and the banchan are delicious.',
          date: '2024-01-25',
          helpful: 22,
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
        }
      ]
    },
    {
      id: '4',
      name: 'Al-Noor Restaurant',
      type: 'Middle Eastern',
      location: 'Sindang-dong, Jung-gu',
      district: 'Sindang',
      rating: 4.3,
      distance: '4.2 km',
      priceRange: '₩₩',
      verified: true,
      image: 'https://images.pexels.com/photos/4253320/pexels-photo-4253320.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      coordinates: { lat: 37.5665, lng: 127.0175 },
      totalReviews: 156,
      phone: '+82-2-2233-4567',
      hours: '11:30 AM - 10:30 PM',
      specialties: ['Shawarma', 'Hummus', 'Falafel'],
      reviews: [
        {
          id: '5',
          userId: 'user5',
          userName: 'Omar Abdullah',
          rating: 4,
          comment: 'Good Middle Eastern food with reasonable prices. The shawarma is tasty.',
          date: '2024-01-18',
          helpful: 9,
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
        }
      ]
    },
    {
      id: '5',
      name: 'Hangang Halal',
      type: 'International',
      location: 'Hangang-jin, Yongsan-gu',
      district: 'Hangang',
      rating: 4.1,
      distance: '5.1 km',
      priceRange: '₩₩',
      verified: true,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      coordinates: { lat: 37.5219, lng: 126.9707 },
      totalReviews: 78,
      phone: '+82-2-749-1234',
      hours: '10:00 AM - 9:00 PM',
      specialties: ['Mixed Grill', 'Pasta', 'Fried Rice'],
      reviews: [
        {
          id: '6',
          userId: 'user6',
          userName: 'Aisyah Rahman',
          rating: 4,
          comment: 'Nice variety of international halal food. Great location near the river.',
          date: '2024-01-12',
          helpful: 6,
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
        }
      ]
    }
  ]

  const organizationCategories: OrganizationCategory[] = [
    {
      id: 'embassy',
      title: 'Embassy of Malaysia',
      organizations: [
        {
          id: '1',
          name: 'Embassy of Malaysia in Seoul',
          type: 'Government',
          description: 'Official Malaysian diplomatic mission providing consular services, visa assistance, and support for Malaysian citizens in South Korea.',
          contact: '+82-2-2077-8600',
          website: 'https://www.kln.gov.my/web/kor_seoul',
          logo: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          established: '1960',
          location: 'Jung-gu, Seoul'
        }
      ]
    },
    {
      id: 'ppmk',
      title: 'Persatuan Pelajar Malaysia di Korea (PPMK)',
      organizations: [
        {
          id: '2',
          name: 'PPMK Central Committee',
          type: 'Student Association',
          description: 'Main governing body of Malaysian students in Korea, coordinating activities, welfare, and academic support across all universities.',
          contact: 'info@ppmk.org',
          website: 'https://ppmk.org',
          logo: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          members: 2500,
          established: '1985'
        }
      ]
    },
    {
      id: 'university',
      title: 'University Representatives',
      organizations: [
        {
          id: '3',
          name: 'Seoul National University Malaysian Students',
          type: 'University Chapter',
          description: 'Representative body for Malaysian students at SNU, organizing academic support and cultural activities.',
          contact: 'snu.malaysia@gmail.com',
          logo: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          members: 450,
          established: '1990'
        },
        {
          id: '4',
          name: 'Yonsei University Malaysian Association',
          type: 'University Chapter',
          description: 'Supporting Malaysian students at Yonsei with academic guidance, social events, and networking opportunities.',
          contact: 'yonsei.malaysia@gmail.com',
          logo: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          members: 380,
          established: '1992'
        },
        {
          id: '5',
          name: 'KAIST Malaysian Students Society',
          type: 'University Chapter',
          description: 'Dedicated to supporting Malaysian students in science and technology programs at KAIST.',
          contact: 'kaist.malaysia@gmail.com',
          logo: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          members: 220,
          established: '1995'
        }
      ]
    },
    {
      id: 'scholarship',
      title: 'Scholarship Representatives',
      organizations: [
        {
          id: '6',
          name: 'KGSP Alumni Association',
          type: 'Scholarship Group',
          description: 'Network of Korean Government Scholarship Program alumni providing mentorship and career guidance.',
          contact: 'kgsp.alumni@gmail.com',
          logo: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          members: 850,
          established: '2000'
        },
        {
          id: '7',
          name: 'Corporate Scholarship Recipients',
          type: 'Scholarship Group',
          description: 'Association for students sponsored by Malaysian and Korean corporations for higher education.',
          contact: 'corporate.scholars@gmail.com',
          logo: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          members: 320,
          established: '2005'
        }
      ]
    },
    {
      id: 'batch',
      title: 'Batch Representatives',
      organizations: [
        {
          id: '8',
          name: 'Batch 2020-2024 Committee',
          type: 'Batch Group',
          description: 'Representative committee for students who arrived in Korea between 2020-2024, focusing on graduation and career preparation.',
          contact: 'batch2024@ppmk.org',
          logo: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          members: 680,
          established: '2020'
        },
        {
          id: '9',
          name: 'Batch 2015-2019 Alumni',
          type: 'Batch Group',
          description: 'Alumni network providing career guidance and professional networking for recent graduates.',
          contact: 'batch2019@ppmk.org',
          logo: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          members: 920,
          established: '2015'
        }
      ]
    },
    {
      id: 'clubs',
      title: 'Club Leaders',
      organizations: [
        {
          id: '10',
          name: 'KASUMA (Korean-ASEAN Sports)',
          type: 'Sports Club',
          description: 'Sports association organizing tournaments, fitness activities, and athletic competitions for Malaysian students.',
          contact: 'kasuma@gmail.com',
          logo: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          members: 450,
          established: '2010'
        },
        {
          id: '11',
          name: 'Malaysian Cultural Society',
          type: 'Cultural Club',
          description: 'Preserving and promoting Malaysian culture through festivals, performances, and cultural exchange programs.',
          contact: 'culture.malaysia@gmail.com',
          logo: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          members: 380,
          established: '2008'
        },
        {
          id: '12',
          name: 'Malaysian Business Network',
          type: 'Professional Club',
          description: 'Connecting Malaysian students and professionals for business opportunities and career development.',
          contact: 'business.network@gmail.com',
          logo: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          members: 280,
          established: '2012'
        }
      ]
    }
  ]

  const studyMaterials: StudyMaterial[] = [
    {
      id: '1',
      title: 'Korean Language Grammar Guide',
      subject: 'Korean Language',
      type: 'pdf',
      university: 'Seoul National University',
      downloads: 245,
      uploadedBy: 'Ahmad Rahman',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Engineering Mathematics Lectures',
      subject: 'Mathematics',
      type: 'video',
      university: 'KAIST',
      downloads: 189,
      uploadedBy: 'Faiz Muhammad',
      date: '2024-02-20'
    },
    {
      id: '3',
      title: 'Business Strategy Notes',
      subject: 'Business',
      type: 'notes',
      university: 'Yonsei University',
      downloads: 156,
      uploadedBy: 'Siti Nurhaliza',
      date: '2024-03-10'
    }
  ]

  const helpTickets: HelpTicket[] = [
    {
      id: '1',
      title: 'Visa Extension Process',
      category: 'Immigration',
      status: 'resolved',
      priority: 'high',
      date: '2024-01-20'
    },
    {
      id: '2',
      title: 'University Registration Issue',
      category: 'Academic',
      status: 'in-progress',
      priority: 'medium',
      date: '2024-02-15'
    }
  ]

  const serviceCategories = [
    {
      id: 'contacts',
      title: 'Contact Directory',
      icon: Users,
      description: 'Find important contacts and representatives',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'halal',
      title: 'Halal Food Map',
      icon: Globe,
      description: 'Discover halal restaurants near you',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'organizations',
      title: 'Organizations',
      icon: Building2,
      description: 'Malaysian organizations and associations',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'materials',
      title: 'Study Materials',
      icon: BookOpen,
      description: 'Shared notes, slides, and resources',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'helpdesk',
      title: 'Helpdesk',
      icon: Wrench,
      description: 'Get help and submit support tickets',
      color: 'from-pink-500 to-rose-500'
    }
  ]

  const districts = ['all', 'Itaewon', 'Dongdaemun', 'Hongdae', 'Sindang', 'Hangang']

  const filteredRestaurants = halalRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.district.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDistrict = filterDistrict === 'all' || restaurant.district === filterDistrict
    return matchesSearch && matchesDistrict
  })

  const renderMainScreen = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {serviceCategories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )

  const renderSeoulMap = () => (
    <div className="relative w-full h-96 bg-gray-100 rounded-2xl overflow-hidden mb-6">
      {/* Seoul Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
        {/* Map styling to simulate Seoul geography */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Han River */}
            <path d="M50 180 Q150 160 250 170 Q300 175 350 180" stroke="#4A90E2" strokeWidth="8" fill="none" opacity="0.6"/>
            
            {/* Districts boundaries */}
            <circle cx="200" cy="150" r="80" fill="none" stroke="#666" strokeWidth="1" opacity="0.3"/>
            <circle cx="200" cy="150" r="120" fill="none" stroke="#666" strokeWidth="1" opacity="0.2"/>
            
            {/* Subway lines simulation */}
            <path d="M100 100 L300 200" stroke="#00A84D" strokeWidth="3" opacity="0.4"/>
            <path d="M80 200 L320 120" stroke="#0052A4" strokeWidth="3" opacity="0.4"/>
            <path d="M150 80 L250 220" stroke="#EF7C1C" strokeWidth="3" opacity="0.4"/>
          </svg>
        </div>
        
        {/* District Labels */}
        <div className="absolute top-16 left-20 text-xs font-medium text-gray-600">Hongdae</div>
        <div className="absolute top-12 right-16 text-xs font-medium text-gray-600">Dongdaemun</div>
        <div className="absolute bottom-20 left-1/3 text-xs font-medium text-gray-600">Itaewon</div>
        <div className="absolute top-1/3 right-12 text-xs font-medium text-gray-600">Sindang</div>
        <div className="absolute bottom-16 right-1/4 text-xs font-medium text-gray-600">Hangang</div>
        
        {/* Restaurant Markers */}
        {filteredRestaurants.map((restaurant, index) => {
          const positions = [
            { top: '20%', left: '25%' }, // Hongdae
            { top: '15%', right: '20%' }, // Dongdaemun  
            { bottom: '35%', left: '35%' }, // Itaewon
            { top: '30%', right: '15%' }, // Sindang
            { bottom: '25%', right: '30%' } // Hangang
          ]
          const position = positions[index] || positions[0]
          
          return (
            <button
              key={restaurant.id}
              onClick={() => setSelectedRestaurant(restaurant)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={position}
            >
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {restaurant.name}
              </div>
            </button>
          )
        })}
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
          <Navigation className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  )

  const renderRestaurantCard = (restaurant: HalalRestaurant) => (
    <div key={restaurant.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300">
      <div className="flex">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-32 h-32 object-cover"
        />
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
            {restaurant.verified && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Verified Halal
              </span>
            )}
          </div>
          <p className="text-blue-600 font-medium mb-2">{restaurant.type}</p>
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm text-gray-600">{restaurant.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({restaurant.totalReviews})</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {restaurant.distance}
            </div>
            <span className="text-sm text-gray-600">{restaurant.priceRange}</span>
          </div>
          <p className="text-gray-600 text-sm mb-2">{restaurant.location}</p>
          <button 
            onClick={() => setSelectedRestaurant(restaurant)}
            className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
          >
            View Details & Reviews <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  )

  const renderRestaurantDetail = () => {
    if (!selectedRestaurant) return null

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden mb-6">
          <img
            src={selectedRestaurant.image}
            alt={selectedRestaurant.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedRestaurant.name}</h2>
                <p className="text-blue-600 font-medium text-lg">{selectedRestaurant.type}</p>
              </div>
              {selectedRestaurant.verified && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Verified Halal
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-lg font-medium text-gray-800">{selectedRestaurant.rating}</span>
                <span className="text-gray-600 ml-2">({selectedRestaurant.totalReviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{selectedRestaurant.distance}</span>
              </div>
              {selectedRestaurant.phone && (
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{selectedRestaurant.phone}</span>
                </div>
              )}
              {selectedRestaurant.hours && (
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{selectedRestaurant.hours}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">{selectedRestaurant.location}</p>
              <p className="text-gray-600">Price Range: {selectedRestaurant.priceRange}</p>
            </div>

            {selectedRestaurant.specialties && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRestaurant.specialties.map((specialty, index) => (
                    <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Reviews ({selectedRestaurant.totalReviews})</h3>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
              Write Review
            </button>
          </div>

          <div className="space-y-4">
            {selectedRestaurant.reviews.map((review) => (
              <div key={review.id} className="border-b border-white/20 pb-4 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">{review.userName}</h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600">
                        <Heart className="w-4 h-4" />
                        <span>Like</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderHalalFoodMap = () => {
    if (selectedRestaurant) {
      return renderRestaurantDetail()
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMapView(true)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                mapView ? 'bg-blue-500 text-white' : 'bg-white/20 text-gray-600 hover:bg-white/30'
              }`}
            >
              Map View
            </button>
            <button
              onClick={() => setMapView(false)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                !mapView ? 'bg-blue-500 text-white' : 'bg-white/20 text-gray-600 hover:bg-white/30'
              }`}
            >
              List View
            </button>
          </div>
          
          {/* District Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="bg-white/20 border border-white/30 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {districts.map(district => (
                <option key={district} value={district}>
                  {district === 'all' ? 'All Districts' : district}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Map or List View */}
        {mapView && renderSeoulMap()}
        
        <div className="space-y-4">
          {filteredRestaurants.map(renderRestaurantCard)}
        </div>
      </div>
    )
  }

  const renderContactDirectory = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{contact.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{contact.role}</p>
                <p className="text-gray-600 mb-3">{contact.university}</p>
                {contact.department && (
                  <p className="text-sm text-gray-500 mb-3">{contact.department}</p>
                )}
                <div className="flex flex-wrap gap-4">
                  <a href={`tel:${contact.phone}`} className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {contact.phone}
                  </a>
                  <a href={`mailto:${contact.email}`} className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPPMKLeadership = () => (
    <div className="min-h-screen bg-white">
      <div className="absolute top-6 left-6 z-20">
        <button 
          onClick={() => setSelectedOrgCategory(null)}
          className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-black mb-2">
            Organizations &raquo; Persatuan Pelajar Malaysia di Korea (PPMK)
          </h1>
          <div className="w-full h-px bg-black mt-8"></div>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* President - Full width at top */}
          <div className="col-span-2 flex justify-center mb-6">
            <div className="bg-gray-300 rounded-lg p-8 w-96">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-black mb-4">PRESIDENT</h2>
                <h3 className="text-xl font-medium text-black mb-6">{ppmkLeadership[0].name}</h3>
                <div className="flex justify-center space-x-6">
                  <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <User className="w-6 h-6 text-white" />
                  </button>
                  <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Phone className="w-6 h-6 text-white" />
                  </button>
                  <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Vice Presidents */}
          <div className="bg-gray-300 rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-lg font-bold text-black mb-3">VICE PRESIDENT I</h2>
              <h3 className="text-base font-medium text-black mb-4">{ppmkLeadership[1].name}</h3>
              <div className="flex justify-center space-x-4">
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <User className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-300 rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-lg font-bold text-black mb-3">VICE PRESIDENT II</h2>
              <h3 className="text-base font-medium text-black mb-4">{ppmkLeadership[2].name}</h3>
              <div className="flex justify-center space-x-4">
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <User className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Secretary and Treasurer */}
          <div className="bg-gray-300 rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-lg font-bold text-black mb-3">GENERAL SECRETARY</h2>
              <h3 className="text-base font-medium text-black mb-4">{ppmkLeadership[3].name}</h3>
              <div className="flex justify-center space-x-4">
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <User className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-300 rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-lg font-bold text-black mb-3">HONORARY TREASURER</h2>
              <h3 className="text-base font-medium text-black mb-4">{ppmkLeadership[4].name}</h3>
              <div className="flex justify-center space-x-4">
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <User className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Empty placeholder cards */}
          <div className="bg-gray-300 rounded-lg p-6 h-32"></div>
          <div className="bg-gray-300 rounded-lg p-6 h-32"></div>
          <div className="bg-gray-300 rounded-lg p-6 h-32"></div>
          <div className="bg-gray-300 rounded-lg p-6 h-32"></div>
          <div className="bg-gray-300 rounded-lg p-6 h-32"></div>
          <div className="bg-gray-300 rounded-lg p-6 h-32"></div>
        </div>
      </div>
    </div>
  )

  const renderOrganizationDetail = (category: OrganizationCategory) => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {category.organizations.map((org) => (
          <div key={org.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-start space-x-6">
              <img
                src={org.logo}
                alt={org.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{org.name}</h3>
                <p className="text-blue-600 font-medium text-lg mb-3">{org.type}</p>
                <p className="text-gray-700 mb-4 leading-relaxed text-base">{org.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {org.members && (
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-2" />
                      <span className="font-medium">{org.members.toLocaleString()} members</span>
                    </div>
                  )}
                  {org.established && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>Established {org.established}</span>
                    </div>
                  )}
                  {org.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{org.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{org.contact}</span>
                  </div>
                  {org.website && (
                    <a href={org.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderOrganizations = () => {
    if (selectedOrgCategory === 'ppmk') {
      return renderPPMKLeadership()
    }

    if (selectedOrgCategory) {
      const category = organizationCategories.find(cat => cat.id === selectedOrgCategory)
      if (category) {
        return renderOrganizationDetail(category)
      }
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-2">
          {organizationCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedOrgCategory(category.id)}
              className="w-full text-left backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {category.title}
                </h3>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
              </div>
              <div className="mt-2 border-t border-gray-300/30 pt-2">
                <p className="text-sm text-gray-600">
                  {category.organizations.length} organization{category.organizations.length !== 1 ? 's' : ''}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderStudyMaterialsMain = () => (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {universities.map((university) => (
            <button
              key={university.id}
              onClick={() => setSelectedUniversity(university)}
              className="w-full text-left p-6 hover:bg-gray-50 rounded-2xl transition-colors duration-200 group border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-medium text-black group-hover:text-gray-700">
                  {university.name}
                </h2>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
              </div>
              <p className="text-gray-600 mt-2">
                {university.departments.length} departments available
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderUniversityDepartments = () => {
    if (!selectedUniversity) return null

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-6">
            {selectedUniversity.departments.map((department) => (
              <button
                key={department.id}
                onClick={() => setSelectedDepartment(department)}
                className="w-full text-left p-6 hover:bg-gray-50 rounded-2xl transition-colors duration-200 group border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-medium text-black group-hover:text-gray-700">
                    {department.name}
                  </h2>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
                </div>
                <p className="text-gray-600 mt-2">
                  {department.categories.reduce((total, cat) => total + cat.count, 0)} materials available
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderDepartmentCategories = () => {
    if (!selectedDepartment || !selectedUniversity) return null

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header with breadcrumb */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-black mb-2">
              {selectedUniversity.name.toUpperCase()} &raquo; {selectedDepartment.name.toUpperCase()}
            </h1>
            <div className="w-full h-px bg-black mt-8"></div>
          </div>

          {/* Categories */}
          <div className="space-y-8">
            {selectedDepartment.categories.map((category) => (
              <button
                key={category.id}
                className="w-full bg-gray-300 hover:bg-gray-400 transition-colors duration-200 rounded-lg"
              >
                <div className="py-16 px-8">
                  <h2 className="text-4xl font-bold text-black text-center">
                    {category.name.toUpperCase()}
                  </h2>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderStudyMaterials = () => {
    if (selectedDepartment) {
      return renderDepartmentCategories()
    }
    if (selectedUniversity) {
      return renderUniversityDepartments()
    }
    return renderStudyMaterialsMain()
  }

  const renderHelpdesk = () => (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-black mb-2">Helpdesk</h1>
        </div>

        {/* Help Options */}
        <div className="space-y-8">
          {/* FAQs (Chatbot) */}
          <button className="w-full flex items-center space-x-6 p-6 hover:bg-gray-50 rounded-2xl transition-colors duration-200 group">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-medium text-black group-hover:text-gray-700">FAQs (Chatbot)</h2>
            </div>
          </button>

          {/* Live Chat */}
          <button className="w-full flex items-center space-x-6 p-6 hover:bg-gray-50 rounded-2xl transition-colors duration-200 group">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <Send className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-medium text-black group-hover:text-gray-700">Live chat with PPMK team (07:00 - 16:30)</h2>
            </div>
          </button>

          {/* Complaints */}
          <button className="w-full flex items-center space-x-6 p-6 hover:bg-gray-50 rounded-2xl transition-colors duration-200 group">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-medium text-black group-hover:text-gray-700">Complaints</h2>
            </div>
          </button>
        </div>
      </div>
    </div>
  )

  const getTabTitle = () => {
    if (selectedDepartment && selectedUniversity) {
      return `${selectedUniversity.name} - ${selectedDepartment.name}`
    }
    if (selectedUniversity) {
      return selectedUniversity.name
    }
    if (selectedOrgCategory) {
      const category = organizationCategories.find(cat => cat.id === selectedOrgCategory)
      return category ? category.title : 'Organizations'
    }
    
    switch (activeTab) {
      case 'contacts': return 'Contact Directory'
      case 'halal': return selectedRestaurant ? selectedRestaurant.name : 'Halal Food Map'
      case 'organizations': return 'Organizations'
      case 'materials': return 'Study Materials'
      case 'helpdesk': return 'Helpdesk'
      default: return 'More Services'
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'contacts': return renderContactDirectory()
      case 'halal': return renderHalalFoodMap()
      case 'organizations': return renderOrganizations()
      case 'materials': return renderStudyMaterials()
      case 'helpdesk': return renderHelpdesk()
      default: return renderMainScreen()
    }
  }

  const handleBack = () => {
    if (selectedDepartment) {
      setSelectedDepartment(null)
    } else if (selectedUniversity) {
      setSelectedUniversity(null)
    } else if (selectedRestaurant) {
      setSelectedRestaurant(null)
    } else if (selectedOrgCategory) {
      setSelectedOrgCategory(null)
    } else if (activeTab !== 'main') {
      setActiveTab('main')
    } else {
      onBack()
    }
  }

  // Special case for helpdesk, study materials, and PPMK leadership - render without the standard header/background
  if (activeTab === 'helpdesk' || activeTab === 'materials' || selectedOrgCategory === 'ppmk') {
    return (
      <div className="min-h-screen bg-white">
        {/* Simple back button - only show if not already handled by PPMK component */}
        {selectedOrgCategory !== 'ppmk' && (
          <div className="absolute top-6 left-6 z-20">
            <button 
              onClick={handleBack}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        )}
        {activeTab === 'helpdesk' ? renderHelpdesk() : activeTab === 'materials' ? renderStudyMaterials() : renderContent()}
      </div>
    )
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleBack}
                  className="w-10 h-10 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{getTabTitle()}</h1>
                  <p className="text-gray-600">
                    {activeTab === 'main' ? 'Essential services for Malaysian students' : 
                     selectedRestaurant ? 'Restaurant details and reviews' : 
                     selectedOrgCategory ? 'Organization details and information' : 'Find what you need'}
                  </p>
                </div>
              </div>
            </div>

            {/* Search Bar - only show on detail screens */}
            {activeTab !== 'main' && !selectedRestaurant && !selectedOrgCategory && !selectedUniversity && !selectedDepartment && (
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder={`Search ${getTabTitle().toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/30 transition-all duration-300"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  )
}

export default MoreScreen
