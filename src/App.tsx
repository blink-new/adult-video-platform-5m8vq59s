import { useState, useEffect } from 'react'
import { Search, Menu, User, Upload, Heart, Eye, Clock, Star, LogOut, Download, CheckSquare, Square } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './components/ui/dropdown-menu'
import { PornLogo } from './components/PornLogo'
import { LoginModal } from './components/LoginModal'
import { blink } from './blink/client'

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  rating: number
  category: string
  uploader: string
  uploadDate: string
  isHD: boolean
}

const mockVideos: Video[] = [
  // MILF Category (5 videos)
  {
    id: '1',
    title: 'Hot MILF Seduces Young Neighbor',
    thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=225&fit=crop',
    duration: '12:34',
    views: '2.1M',
    rating: 4.8,
    category: 'MILF',
    uploader: 'MatureStudio',
    uploadDate: '2 days ago',
    isHD: true
  },
  {
    id: '13',
    title: 'Busty MILF Teacher After Class',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '20:15',
    views: '1.9M',
    rating: 4.7,
    category: 'MILF',
    uploader: 'MatureStudio',
    uploadDate: '1 week ago',
    isHD: true
  },
  {
    id: '14',
    title: 'Stepmom Catches Son Masturbating',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '16:42',
    views: '3.5M',
    rating: 4.9,
    category: 'MILF',
    uploader: 'TabooFamily',
    uploadDate: '3 days ago',
    isHD: true
  },
  {
    id: '15',
    title: 'Lonely Housewife Needs Attention',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '24:18',
    views: '1.4M',
    rating: 4.6,
    category: 'MILF',
    uploader: 'HousewivesTales',
    uploadDate: '5 days ago',
    isHD: true
  },
  {
    id: '16',
    title: 'MILF Boss Dominates Employee',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '18:33',
    views: '2.3M',
    rating: 4.8,
    category: 'MILF',
    uploader: 'OfficeSecrets',
    uploadDate: '1 day ago',
    isHD: true
  },

  // Teen Category (5 videos)
  {
    id: '2',
    title: 'Blonde Teen First Time Experience',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '18:45',
    views: '1.8M',
    rating: 4.6,
    category: 'Teen',
    uploader: 'YouthfulPassion',
    uploadDate: '1 week ago',
    isHD: true
  },
  {
    id: '17',
    title: 'Petite Teen Babysitter Seduced',
    thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=225&fit=crop',
    duration: '22:11',
    views: '2.7M',
    rating: 4.7,
    category: 'Teen',
    uploader: 'TeenDreams',
    uploadDate: '2 days ago',
    isHD: true
  },
  {
    id: '18',
    title: 'College Teen Study Group Orgy',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '28:55',
    views: '3.1M',
    rating: 4.8,
    category: 'Teen',
    uploader: 'CampusLife',
    uploadDate: '4 days ago',
    isHD: true
  },
  {
    id: '19',
    title: 'Innocent Teen Loses Virginity',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '15:27',
    views: '4.2M',
    rating: 4.9,
    category: 'Teen',
    uploader: 'FirstTimers',
    uploadDate: '6 days ago',
    isHD: true
  },
  {
    id: '20',
    title: 'Teen Cheerleader After Practice',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '19:33',
    views: '1.6M',
    rating: 4.5,
    category: 'Teen',
    uploader: 'SchoolSpirit',
    uploadDate: '3 days ago',
    isHD: true
  },

  // Big Tits Category (5 videos)
  {
    id: '3',
    title: 'Big Tits Brunette Gets Pounded',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '25:12',
    views: '3.2M',
    rating: 4.9,
    category: 'Big Tits',
    uploader: 'BustyBabes',
    uploadDate: '3 days ago',
    isHD: true
  },
  {
    id: '21',
    title: 'Massive Natural Tits Bouncing',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '17:44',
    views: '2.8M',
    rating: 4.8,
    category: 'Big Tits',
    uploader: 'NaturalWonders',
    uploadDate: '1 day ago',
    isHD: true
  },
  {
    id: '22',
    title: 'Busty Secretary Office Fantasy',
    thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=225&fit=crop',
    duration: '21:18',
    views: '1.9M',
    rating: 4.6,
    category: 'Big Tits',
    uploader: 'OfficeFantasy',
    uploadDate: '5 days ago',
    isHD: true
  },
  {
    id: '23',
    title: 'Big Tits Blonde Titty Fuck',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '14:22',
    views: '2.4M',
    rating: 4.7,
    category: 'Big Tits',
    uploader: 'TittyLovers',
    uploadDate: '2 days ago',
    isHD: true
  },
  {
    id: '24',
    title: 'Huge Boobs Redhead Massage',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '26:55',
    views: '1.7M',
    rating: 4.5,
    category: 'Big Tits',
    uploader: 'MassageRooms',
    uploadDate: '1 week ago',
    isHD: true
  },

  // Asian Category (5 videos)
  {
    id: '4',
    title: 'Asian Beauty Anal Adventure',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '15:30',
    views: '956K',
    rating: 4.4,
    category: 'Asian',
    uploader: 'AsianFantasy',
    uploadDate: '5 days ago',
    isHD: false
  },
  {
    id: '25',
    title: 'Japanese Schoolgirl Uniform Play',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '23:17',
    views: '3.4M',
    rating: 4.8,
    category: 'Asian',
    uploader: 'TokyoNights',
    uploadDate: '2 days ago',
    isHD: true
  },
  {
    id: '26',
    title: 'Korean Cam Girl Private Show',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '31:42',
    views: '1.8M',
    rating: 4.6,
    category: 'Asian',
    uploader: 'SeoulSecrets',
    uploadDate: '4 days ago',
    isHD: true
  },
  {
    id: '27',
    title: 'Thai Massage Happy Ending',
    thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=225&fit=crop',
    duration: '18:29',
    views: '2.1M',
    rating: 4.7,
    category: 'Asian',
    uploader: 'BangkokMassage',
    uploadDate: '6 days ago',
    isHD: true
  },
  {
    id: '28',
    title: 'Chinese Student Exchange Program',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '20:14',
    views: '1.3M',
    rating: 4.5,
    category: 'Asian',
    uploader: 'ExchangeProgram',
    uploadDate: '3 days ago',
    isHD: true
  },

  // Latina Category (5 videos)
  {
    id: '5',
    title: 'Latina Goddess POV Blowjob',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '8:22',
    views: '1.3M',
    rating: 4.7,
    category: 'Latina',
    uploader: 'SpicyLatinas',
    uploadDate: '1 day ago',
    isHD: true
  },
  {
    id: '29',
    title: 'Mexican Maid Cleaning More Than House',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '24:33',
    views: '2.9M',
    rating: 4.8,
    category: 'Latina',
    uploader: 'MaidService',
    uploadDate: '3 days ago',
    isHD: true
  },
  {
    id: '30',
    title: 'Colombian Booty Twerking Session',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '16:47',
    views: '3.7M',
    rating: 4.9,
    category: 'Latina',
    uploader: 'BootyShakers',
    uploadDate: '2 days ago',
    isHD: true
  },
  {
    id: '31',
    title: 'Brazilian Beach Babe Bikini Strip',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '12:18',
    views: '1.8M',
    rating: 4.6,
    category: 'Latina',
    uploader: 'BeachBabes',
    uploadDate: '5 days ago',
    isHD: true
  },
  {
    id: '32',
    title: 'Argentinian Tango Turns Sexual',
    thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=225&fit=crop',
    duration: '27:55',
    views: '1.1M',
    rating: 4.4,
    category: 'Latina',
    uploader: 'TangoPassion',
    uploadDate: '1 week ago',
    isHD: true
  },

  // Ebony Category (5 videos)
  {
    id: '6',
    title: 'Ebony BBW Rides Big Cock',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=225&fit=crop',
    duration: '22:18',
    views: '2.7M',
    rating: 4.8,
    category: 'Ebony',
    uploader: 'EbonyQueens',
    uploadDate: '4 days ago',
    isHD: true
  },
  {
    id: '33',
    title: 'Black Beauty Squirting Fountain',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '19:44',
    views: '3.2M',
    rating: 4.9,
    category: 'Ebony',
    uploader: 'SquirtQueens',
    uploadDate: '1 day ago',
    isHD: true
  },
  {
    id: '34',
    title: 'Chocolate Goddess Anal Destruction',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '25:31',
    views: '2.1M',
    rating: 4.7,
    category: 'Ebony',
    uploader: 'AnalGoddess',
    uploadDate: '3 days ago',
    isHD: true
  },
  {
    id: '35',
    title: 'Ebony Nurse Night Shift Special',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '17:22',
    views: '1.6M',
    rating: 4.5,
    category: 'Ebony',
    uploader: 'HospitalSecrets',
    uploadDate: '6 days ago',
    isHD: true
  },
  {
    id: '36',
    title: 'African Princess Royal Treatment',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '21:15',
    views: '1.9M',
    rating: 4.6,
    category: 'Ebony',
    uploader: 'RoyalTreatment',
    uploadDate: '2 days ago',
    isHD: true
  },

  // Amateur Category (5 videos)
  {
    id: '7',
    title: 'Amateur Couple Hardcore Session',
    thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=225&fit=crop',
    duration: '19:45',
    views: '1.5M',
    rating: 4.5,
    category: 'Amateur',
    uploader: 'RealCouples',
    uploadDate: '6 days ago',
    isHD: true
  },
  {
    id: '37',
    title: 'Homemade Sex Tape Leaked',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '14:33',
    views: '4.1M',
    rating: 4.8,
    category: 'Amateur',
    uploader: 'LeakedTapes',
    uploadDate: '1 day ago',
    isHD: false
  },
  {
    id: '38',
    title: 'College Dorm Room Quickie',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '11:27',
    views: '2.3M',
    rating: 4.6,
    category: 'Amateur',
    uploader: 'DormLife',
    uploadDate: '4 days ago',
    isHD: true
  },
  {
    id: '39',
    title: 'Real Wife Cheating Confession',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '23:18',
    views: '3.5M',
    rating: 4.7,
    category: 'Amateur',
    uploader: 'CheatingWives',
    uploadDate: '2 days ago',
    isHD: true
  },
  {
    id: '40',
    title: 'First Time Swinging Experience',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '32:44',
    views: '1.8M',
    rating: 4.4,
    category: 'Amateur',
    uploader: 'SwingersClub',
    uploadDate: '5 days ago',
    isHD: true
  },

  // Lesbian Category (5 videos)
  {
    id: '8',
    title: 'Lesbian Threesome with Toys',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '31:22',
    views: '4.1M',
    rating: 4.9,
    category: 'Lesbian',
    uploader: 'GirlOnGirl',
    uploadDate: '1 day ago',
    isHD: true
  },
  {
    id: '41',
    title: 'Scissoring Competition Championship',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '26:15',
    views: '2.8M',
    rating: 4.7,
    category: 'Lesbian',
    uploader: 'ScissorSisters',
    uploadDate: '3 days ago',
    isHD: true
  },
  {
    id: '42',
    title: 'Strap-on Domination Session',
    thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=225&fit=crop',
    duration: '22:33',
    views: '1.9M',
    rating: 4.6,
    category: 'Lesbian',
    uploader: 'DominantDykes',
    uploadDate: '5 days ago',
    isHD: true
  },
  {
    id: '43',
    title: 'Sorority Initiation Ritual',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '28:47',
    views: '3.3M',
    rating: 4.8,
    category: 'Lesbian',
    uploader: 'SororitySecrets',
    uploadDate: '2 days ago',
    isHD: true
  },
  {
    id: '44',
    title: 'Yoga Class Turns Intimate',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '18:29',
    views: '1.4M',
    rating: 4.5,
    category: 'Lesbian',
    uploader: 'YogaPassion',
    uploadDate: '1 week ago',
    isHD: true
  },

  // BDSM Category (5 videos)
  {
    id: '9',
    title: 'Redhead BDSM Domination',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '27:33',
    views: '892K',
    rating: 4.3,
    category: 'BDSM',
    uploader: 'KinkyPlay',
    uploadDate: '4 days ago',
    isHD: true
  },
  {
    id: '45',
    title: 'Slave Training Academy Graduation',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '35:18',
    views: '1.7M',
    rating: 4.6,
    category: 'BDSM',
    uploader: 'SlaveAcademy',
    uploadDate: '2 days ago',
    isHD: true
  },
  {
    id: '46',
    title: 'Dungeon Master Punishment Session',
    thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=225&fit=crop',
    duration: '24:44',
    views: '1.2M',
    rating: 4.4,
    category: 'BDSM',
    uploader: 'DungeonMaster',
    uploadDate: '6 days ago',
    isHD: true
  },
  {
    id: '47',
    title: 'Rope Bondage Art Exhibition',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '19:22',
    views: '956K',
    rating: 4.2,
    category: 'BDSM',
    uploader: 'RopeArtist',
    uploadDate: '5 days ago',
    isHD: true
  },
  {
    id: '48',
    title: 'Latex Mistress Commands Obedience',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '21:55',
    views: '1.4M',
    rating: 4.5,
    category: 'BDSM',
    uploader: 'LatexMistress',
    uploadDate: '3 days ago',
    isHD: true
  },

  // Big Ass Category (5 videos)
  {
    id: '10',
    title: 'Big Ass Latina Anal Creampie',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '16:28',
    views: '2.8M',
    rating: 4.7,
    category: 'Big Ass',
    uploader: 'BootyLovers',
    uploadDate: '2 days ago',
    isHD: true
  },
  {
    id: '49',
    title: 'Pawg Twerking Competition Winner',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '13:33',
    views: '3.9M',
    rating: 4.8,
    category: 'Big Ass',
    uploader: 'TwerkChampions',
    uploadDate: '1 day ago',
    isHD: true
  },
  {
    id: '50',
    title: 'Bubble Butt Yoga Instructor',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '20:47',
    views: '2.1M',
    rating: 4.6,
    category: 'Big Ass',
    uploader: 'YogaBooty',
    uploadDate: '4 days ago',
    isHD: true
  },
  {
    id: '51',
    title: 'Thick Booty Bouncing Compilation',
    thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=225&fit=crop',
    duration: '25:12',
    views: '4.5M',
    rating: 4.9,
    category: 'Big Ass',
    uploader: 'BootyBounce',
    uploadDate: '3 days ago',
    isHD: true
  },
  {
    id: '52',
    title: 'Jeans Cant Contain This Ass',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '11:18',
    views: '1.7M',
    rating: 4.4,
    category: 'Big Ass',
    uploader: 'JeansStruggles',
    uploadDate: '6 days ago',
    isHD: true
  },

  // Mature Category (5 videos)
  {
    id: '11',
    title: 'Mature Woman Squirting Orgasm',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '14:55',
    views: '1.7M',
    rating: 4.6,
    category: 'Mature',
    uploader: 'MaturePassion',
    uploadDate: '3 days ago',
    isHD: true
  },
  {
    id: '53',
    title: 'Granny Still Got It Going On',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '18:22',
    views: '1.2M',
    rating: 4.3,
    category: 'Mature',
    uploader: 'GrannyLove',
    uploadDate: '5 days ago',
    isHD: true
  },
  {
    id: '54',
    title: 'Cougar Hunting Young Prey',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '23:44',
    views: '2.3M',
    rating: 4.7,
    category: 'Mature',
    uploader: 'CougarHunt',
    uploadDate: '1 day ago',
    isHD: true
  },
  {
    id: '55',
    title: 'Silver Fox Seduction Techniques',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '26:33',
    views: '1.5M',
    rating: 4.5,
    category: 'Mature',
    uploader: 'SilverFoxes',
    uploadDate: '2 days ago',
    isHD: true
  },
  {
    id: '56',
    title: 'Experienced Woman Teaches Tricks',
    thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=225&fit=crop',
    duration: '21:17',
    views: '1.9M',
    rating: 4.6,
    category: 'Mature',
    uploader: 'ExperienceMatters',
    uploadDate: '4 days ago',
    isHD: true
  },

  // Interracial Category (5 videos)
  {
    id: '12',
    title: 'Interracial Gangbang Party',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=225&fit=crop',
    duration: '35:12',
    views: '3.9M',
    rating: 4.8,
    category: 'Interracial',
    uploader: 'MixedRace',
    uploadDate: '5 days ago',
    isHD: true
  },
  {
    id: '57',
    title: 'BBC Destroys Tight White Pussy',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=225&fit=crop',
    duration: '22:45',
    views: '4.7M',
    rating: 4.9,
    category: 'Interracial',
    uploader: 'BBCLovers',
    uploadDate: '1 day ago',
    isHD: true
  },
  {
    id: '58',
    title: 'Asian Girl Tries Black Cock',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop',
    duration: '19:33',
    views: '2.8M',
    rating: 4.6,
    category: 'Interracial',
    uploader: 'AsianBBC',
    uploadDate: '3 days ago',
    isHD: true
  },
  {
    id: '59',
    title: 'Latina Loves White Boys',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '17:28',
    views: '1.9M',
    rating: 4.4,
    category: 'Interracial',
    uploader: 'MixedPassion',
    uploadDate: '6 days ago',
    isHD: true
  },
  {
    id: '60',
    title: 'Cuckold Husband Watches Wife',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop',
    duration: '28:55',
    views: '3.1M',
    rating: 4.7,
    category: 'Interracial',
    uploader: 'CuckoldLife',
    uploadDate: '2 days ago',
    isHD: true
  }
]

const categories = [
  'All', 'MILF', 'Teen', 'Anal', 'Big Tits', 'Blonde', 'Brunette', 'Asian', 
  'Latina', 'Ebony', 'BBW', 'Mature', 'Amateur', 'POV', 'Threesome', 
  'Lesbian', 'Big Ass', 'Hardcore', 'Blowjob', 'Creampie', 'Cumshot',
  'Fetish', 'BDSM', 'Interracial', 'Redhead', 'Gangbang', 'Orgy',
  'Squirting', 'Masturbation', 'Toys', 'Outdoor', 'Public', 'Casting'
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVideos, setSelectedVideos] = useState<Set<string>>(new Set())
  const [isSelectionMode, setIsSelectionMode] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setIsLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const filteredVideos = mockVideos.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleLogout = () => {
    blink.auth.logout()
  }

  const downloadThumbnail = async (video: Video) => {
    try {
      // Fetch the image
      const response = await fetch(video.thumbnail)
      const blob = await response.blob()
      
      // Create a download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      // Generate filename from video title
      const filename = `${video.title.replace(/[^a-zA-Z0-9]/g, '_')}_thumbnail.jpg`
      link.download = filename
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      
      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download thumbnail:', error)
    }
  }

  const downloadSelectedThumbnails = async () => {
    const selectedVideosList = filteredVideos.filter(video => selectedVideos.has(video.id))
    
    for (const video of selectedVideosList) {
      await downloadThumbnail(video)
      // Add a small delay between downloads to avoid overwhelming the browser
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    // Clear selection after download
    setSelectedVideos(new Set())
    setIsSelectionMode(false)
  }

  const toggleVideoSelection = (videoId: string) => {
    const newSelection = new Set(selectedVideos)
    if (newSelection.has(videoId)) {
      newSelection.delete(videoId)
    } else {
      newSelection.add(videoId)
    }
    setSelectedVideos(newSelection)
  }

  const selectAllVideos = () => {
    setSelectedVideos(new Set(filteredVideos.map(video => video.id)))
  }

  const clearSelection = () => {
    setSelectedVideos(new Set())
    setIsSelectionMode(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <PornLogo size="lg" className="mb-4 justify-center" />
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 border-b border-border backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <PornLogo />
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {user && (
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Upload className="h-5 w-5" />
                </Button>
              )}
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.displayName || user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Video
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Message for Logged In Users */}
        {user && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Welcome back, {user.displayName || user.email?.split('@')[0]}! 👋
            </h2>
            <p className="text-muted-foreground text-sm">
              Enjoy unlimited access to premium content
            </p>
          </div>
        )}

        {/* Popular Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-foreground">🔥 Popular Categories</h2>
          <div className="flex flex-wrap gap-2">
            {['MILF', 'Teen', 'Big Tits', 'Anal', 'Lesbian', 'Amateur', 'Asian', 'Latina'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "bg-gradient-to-r from-accent/20 to-primary/20 hover:from-accent/30 hover:to-primary/30 hover:scale-105"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-foreground">All Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                    : "hover:bg-accent hover:text-accent-foreground hover:scale-105"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Category Stats */}
          {selectedCategory !== 'All' && (
            <div className="mt-4 p-3 bg-secondary/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredVideos.length}</span> videos in{' '}
                <span className="font-semibold text-primary">{selectedCategory}</span> category
              </p>
            </div>
          )}
        </div>

        {/* Bulk Download Controls */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Button
              variant={isSelectionMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsSelectionMode(!isSelectionMode)}
              className="flex items-center space-x-2"
            >
              <CheckSquare className="h-4 w-4" />
              <span>{isSelectionMode ? 'Exit Selection' : 'Select Thumbnails'}</span>
            </Button>
            
            {isSelectionMode && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={selectAllVideos}
                  className="text-primary hover:text-primary/80"
                >
                  Select All ({filteredVideos.length})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSelection}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear Selection
                </Button>
              </>
            )}
          </div>

          {isSelectionMode && selectedVideos.size > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">
                {selectedVideos.size} thumbnail{selectedVideos.size !== 1 ? 's' : ''} selected
              </span>
              <Button
                onClick={downloadSelectedThumbnails}
                className="bg-primary hover:bg-primary/90 flex items-center space-x-2"
                size="sm"
              >
                <Download className="h-4 w-4" />
                <span>Download Selected</span>
              </Button>
            </div>
          )}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <Card 
              key={video.id} 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 bg-card border-border overflow-hidden ${
                isSelectionMode && selectedVideos.has(video.id) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => {
                if (isSelectionMode) {
                  toggleVideoSelection(video.id)
                }
                // In normal mode, this would navigate to video player
              }}
            >
              <div className="relative aspect-video overflow-hidden">
                {/* Selection Checkbox */}
                {isSelectionMode && (
                  <div className="absolute top-2 left-2 z-10">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleVideoSelection(video.id)
                      }}
                    >
                      {selectedVideos.has(video.id) ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                )}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                
                {/* Duration Badge */}
                <Badge className="absolute bottom-2 right-2 bg-black/80 text-white border-0">
                  {video.duration}
                </Badge>
                
                {/* HD Badge */}
                {video.isHD && (
                  <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground border-0">
                    HD
                  </Badge>
                )}

                {/* Hover Actions */}
                {!isSelectionMode && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadThumbnail(video)
                      }}
                      title="Download thumbnail"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Premium Lock Overlay for non-logged users */}
                {!user && Math.random() > 0.6 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white text-sm font-medium">Sign in to watch</p>
                    </div>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                {/* Video Title */}
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>

                {/* Video Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{video.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{video.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Uploader & Date */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium">{video.uploader}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{video.uploadDate}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mt-3">
                  <Badge variant="secondary" className="text-xs">
                    {video.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Videos
          </Button>
        </div>

        {/* Sign Up CTA for non-logged users */}
        {!user && (
          <div className="mt-12 p-6 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg border border-accent/30 text-center">
            <h3 className="text-xl font-bold mb-2">Join RedTube Premium</h3>
            <p className="text-muted-foreground mb-4">
              Get unlimited access to exclusive videos, HD quality, and ad-free experience
            </p>
            <Button 
              className="bg-accent hover:bg-accent/90"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Sign Up Now
            </Button>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  )
}

export default App