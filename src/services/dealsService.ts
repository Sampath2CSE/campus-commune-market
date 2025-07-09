import { supabase } from '@/integrations/supabase/client';

export interface Deal {
  id: string;
  title: string;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  image_url?: string;
  store_name: string;
  category: string;
  affiliate_url: string;
  external_id: string;
  rating?: number;
  reviews_count?: number;
  is_featured?: boolean;
  created_at?: string;
  expires_at?: string;
}

export interface DealsResponse {
  deals: Deal[];
  cached: boolean;
  error?: string;
}

class DealsService {
  private cache: { data: Deal[]; timestamp: number } | null = null;
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  async fetchDeals(forceRefresh = false): Promise<DealsResponse> {
    try {
      // Check cache first
      if (!forceRefresh && this.cache && Date.now() - this.cache.timestamp < this.CACHE_DURATION) {
        return { deals: this.cache.data, cached: true };
      }

      // Try to fetch from database first
      const { data: dbDeals, error: dbError } = await supabase
        .from('deals')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (!dbError && dbDeals && dbDeals.length > 0) {
        this.cache = { data: dbDeals, timestamp: Date.now() };
        return { deals: dbDeals, cached: true };
      }

      // If no recent deals in DB, fetch fresh data
      const { data, error } = await supabase.functions.invoke('fetch-deals', {
        body: { forceRefresh }
      });

      if (error) {
        console.error('Error fetching deals:', error);
        // Return mock data as fallback
        return this.getMockDeals();
      }

      const deals = data.deals || [];
      
      // Update cache
      this.cache = { data: deals, timestamp: Date.now() };

      return { deals, cached: data.cached || false };

    } catch (error) {
      console.error('Error in DealsService.fetchDeals:', error);
      return this.getMockDeals();
    }
  }

  async fetchDealsByCategory(category: string): Promise<Deal[]> {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('category', category)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching deals by category:', error);
        const allDeals = await this.fetchDeals();
        return allDeals.deals.filter(deal => deal.category === category);
      }

      return data || [];
    } catch (error) {
      console.error('Error in fetchDealsByCategory:', error);
      return [];
    }
  }

  async fetchTopPicks(): Promise<Deal[]> {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('is_featured', true)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('rating', { ascending: false })
        .order('discount_percentage', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching top picks:', error);
        const allDeals = await this.fetchDeals();
        return allDeals.deals
          .filter(deal => deal.is_featured || deal.discount_percentage && deal.discount_percentage >= 25)
          .slice(0, 6);
      }

      return data || [];
    } catch (error) {
      console.error('Error in fetchTopPicks:', error);
      return [];
    }
  }

  getCategories(): string[] {
    return ['All', 'Tech', 'Dorm', 'Books', 'Stationery', 'Health', 'Other'];
  }

  getStores(): string[] {
    return ['All', 'Amazon', 'Walmart', 'Best Buy', 'Target'];
  }

  filterDeals(deals: Deal[], filters: {
    category?: string;
    store?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price' | 'discount' | 'rating' | 'newest';
  }): Deal[] {
    let filtered = [...deals];

    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(deal => deal.category === filters.category);
    }

    if (filters.store && filters.store !== 'All') {
      filtered = filtered.filter(deal => deal.store_name === filters.store);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(deal => deal.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(deal => deal.price <= filters.maxPrice!);
    }

    // Sort deals
    switch (filters.sortBy) {
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        break;
      default:
        // Default: featured first, then by discount
        filtered.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return (b.discount_percentage || 0) - (a.discount_percentage || 0);
        });
    }

    return filtered;
  }

  private getMockDeals(): DealsResponse {
    const mockDeals: Deal[] = [
      {
        id: '1',
        title: "Student Laptop - HP Pavilion 15",
        price: 549.99,
        original_price: 699.99,
        discount_percentage: 21,
        image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        store_name: "Best Buy",
        category: "Tech",
        affiliate_url: "https://bestbuy.com/student-laptop",
        external_id: "bb_laptop_001",
        rating: 4.3,
        reviews_count: 1250,
        is_featured: true
      },
      {
        id: '2',
        title: "Wireless Earbuds - Sony WF-1000XM4",
        price: 199.99,
        original_price: 279.99,
        discount_percentage: 29,
        image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
        store_name: "Amazon",
        category: "Tech",
        affiliate_url: "https://amazon.com/sony-earbuds",
        external_id: "amz_earbuds_001",
        rating: 4.5,
        reviews_count: 890,
        is_featured: true
      }
    ];

    return { deals: mockDeals, cached: false, error: 'Using fallback mock data' };
  }

  // Method to refresh deals manually
  async refreshDeals(): Promise<DealsResponse> {
    this.cache = null;
    return this.fetchDeals(true);
  }
}

export const dealsService = new DealsService();