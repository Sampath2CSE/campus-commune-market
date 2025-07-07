
import { Listing, User, Message } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@nyu.edu',
    college: 'New York University',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@nyu.edu',
    college: 'New York University',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@nyu.edu',
    college: 'New York University',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'MacBook Pro 2021 - Excellent Condition',
    description: 'Selling my MacBook Pro 14" with M1 Pro chip. Barely used, perfect for students. Comes with original charger and box.',
    price: 1899,
    type: 'sell',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop'
    ],
    seller: mockUsers[0],
    createdAt: '2024-01-15T10:30:00Z',
    college: 'New York University'
  },
  {
    id: '2',
    title: 'Calculus Textbook - 12th Edition',
    description: 'Stewart Calculus textbook in great condition. No highlighting or writing. Perfect for Math 101.',
    price: 89,
    type: 'sell',
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop'
    ],
    seller: mockUsers[1],
    createdAt: '2024-01-14T15:45:00Z',
    college: 'New York University'
  },
  {
    id: '3',
    title: 'IKEA Desk - Perfect for Dorm',
    description: 'White IKEA desk in excellent condition. Great for studying and fits perfectly in dorm rooms.',
    price: 45,
    type: 'sell',
    category: 'Furniture',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    seller: mockUsers[2],
    createdAt: '2024-01-13T09:20:00Z',
    college: 'New York University'
  },
  {
    id: '4',
    title: 'Mini Fridge for Rent - Semester',
    description: 'Compact mini fridge perfect for dorm room. Available for rent for the semester. Clean and works great!',
    price: 75,
    type: 'rent',
    category: 'Appliances',
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=600&fit=crop'
    ],
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    seller: mockUsers[1],
    createdAt: '2024-01-12T14:30:00Z',
    college: 'New York University'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '1',
    text: 'Hi! Is the MacBook still available?',
    timestamp: '2024-01-15T16:30:00Z',
    listingId: '1'
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '2',
    text: 'Yes, it is! Would you like to meet up to see it?',
    timestamp: '2024-01-15T16:35:00Z',
    listingId: '1'
  },
  {
    id: '3',
    senderId: '2',
    receiverId: '1',
    text: 'That sounds great! When would be a good time?',
    timestamp: '2024-01-15T16:40:00Z',
    listingId: '1'
  }
];
