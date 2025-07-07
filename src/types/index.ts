
export interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  avatar?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'buy' | 'sell' | 'rent';
  category: string;
  images: string[];
  video?: string;
  seller: User;
  createdAt: string;
  college: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  listingId?: string;
}

export interface College {
  id: string;
  name: string;
  domain: string;
}
