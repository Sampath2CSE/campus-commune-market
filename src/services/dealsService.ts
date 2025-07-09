export interface Deal {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  store: string;
  category: string;
  url: string;
  rating: number;
  description?: string;
}

// Mock data for demonstration - replace with real API calls
const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Apple MacBook Air M2 Chip 13-inch Laptop',
    price: 999,
    originalPrice: 1199,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    store: 'Amazon',
    category: 'Tech',
    url: 'https://amazon.com',
    rating: 4.8,
    description: 'Perfect for students with M2 chip performance'
  },
  {
    id: '2',
    title: 'Desk Organizer with Charging Station',
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    store: 'Walmart',
    category: 'Dorm',
    url: 'https://walmart.com',
    rating: 4.5,
    description: 'Keep your dorm organized and devices charged'
  },
  {
    id: '3',
    title: 'Wireless Gaming Headset',
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
    store: 'Best Buy',
    category: 'Tech',
    url: 'https://bestbuy.com',
    rating: 4.6,
    description: 'Crystal clear audio for gaming and calls'
  },
  {
    id: '4',
    title: 'College Ruled Notebooks Set (5-Pack)',
    price: 12.99,
    originalPrice: 19.99,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    store: 'Amazon',
    category: 'Stationery',
    url: 'https://amazon.com',
    rating: 4.3,
    description: 'Essential notebooks for all your classes'
  },
  {
    id: '5',
    title: 'Portable Mini Fridge for Dorm',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop',
    store: 'Walmart',
    category: 'Dorm',
    url: 'https://walmart.com',
    rating: 4.4,
    description: 'Keep snacks and drinks cold in your dorm'
  },
  {
    id: '6',
    title: 'Programming Textbook Bundle',
    price: 45.00,
    originalPrice: 89.99,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    store: 'Amazon',
    category: 'Books',
    url: 'https://amazon.com',
    rating: 4.7,
    description: 'Complete guide to modern programming languages'
  },
  {
    id: '7',
    title: 'Comfortable Hoodie - University Style',
    price: 24.99,
    originalPrice: 39.99,
    discount: 37,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop',
    store: 'Target',
    category: 'Clothing',
    url: 'https://target.com',
    rating: 4.5,
    description: 'Cozy hoodie perfect for campus life'
  },
  {
    id: '8',
    title: 'Bluetooth Speaker - Waterproof',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    store: 'Best Buy',
    category: 'Tech',
    url: 'https://bestbuy.com',
    rating: 4.6,
    description: 'Portable speaker for dorm parties and study sessions'
  },
  {
    id: '9',
    title: 'Under-Bed Storage Boxes (4-Pack)',
    price: 34.99,
    originalPrice: 54.99,
    discount: 36,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    store: 'Walmart',
    category: 'Dorm',
    url: 'https://walmart.com',
    rating: 4.2,
    description: 'Maximize your dorm storage space'
  },
  {
    id: '10',
    title: 'Scientific Calculator',
    price: 19.99,
    originalPrice: 29.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    store: 'Amazon',
    category: 'Stationery',
    url: 'https://amazon.com',
    rating: 4.8,
    description: 'Essential calculator for math and science courses'
  },
  {
    id: '11',
    title: 'Ergonomic Desk Chair',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
    store: 'Best Buy',
    category: 'Dorm',
    url: 'https://bestbuy.com',
    rating: 4.5,
    description: 'Comfortable seating for long study sessions'
  },
  {
    id: '12',
    title: 'Laptop Backpack with USB Port',
    price: 34.99,
    originalPrice: 49.99,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    store: 'Target',
    category: 'Tech',
    url: 'https://target.com',
    rating: 4.4,
    description: 'Secure and convenient laptop transport'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getStudentDeals = async (): Promise<Deal[]> => {
  await delay(1000); // Simulate network delay
  
  // In a real implementation, this would make API calls to:
  // - Amazon Product Advertising API
  // - Walmart Open API  
  // - Best Buy API
  // - Other retailer APIs
  
  // For now, return mock data with some randomization
  return mockDeals.sort(() => Math.random() - 0.5);
};

export const getDealsByCategory = async (category: string): Promise<Deal[]> => {
  await delay(500);
  const deals = await getStudentDeals();
  return deals.filter(deal => deal.category.toLowerCase() === category.toLowerCase());
};

export const getTopDeals = async (limit: number = 6): Promise<Deal[]> => {
  await delay(500);
  const deals = await getStudentDeals();
  return deals
    .filter(deal => deal.discount && deal.discount >= 30)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, limit);
};

// Function to integrate with real APIs (placeholder)
export const fetchRealTimeDeals = async (): Promise<Deal[]> => {
  // This would integrate with real retailer APIs
  // You would need API keys and proper authentication
  
  /*
  Example integration patterns:
  
  // Amazon Product Advertising API
  const amazonDeals = await fetch('/api/amazon-deals', {
    headers: { 'Authorization': `Bearer ${amazonApiKey}` }
  });
  
  // Walmart Open API
  const walmartDeals = await fetch('/api/walmart-deals', {
    headers: { 'WM_SEC.ACCESS_TOKEN': walmartApiKey }
  });
  
  // Best Buy API
  const bestBuyDeals = await fetch('/api/bestbuy-deals', {
    headers: { 'X-API-Key': bestBuyApiKey }
  });
  */
  
  return getStudentDeals(); // Fallback to mock data
};