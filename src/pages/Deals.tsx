import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, TrendingUp } from 'lucide-react';
import { getStudentDeals, type Deal } from '@/services/dealsService';

const Deals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const dealsData = await getStudentDeals();
        setDeals(dealsData);
        setFilteredDeals(dealsData);
      } catch (error) {
        console.error('Failed to fetch deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    let filtered = deals;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(deal => deal.category === categoryFilter);
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(deal => {
        if (max) {
          return deal.price >= min && deal.price <= max;
        }
        return deal.price >= min;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(deal =>
        deal.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDeals(filtered);
  }, [deals, categoryFilter, priceRange, searchTerm]);

  const categories = ['all', 'Tech', 'Dorm', 'Stationery', 'Books', 'Clothing'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-25', label: 'Under $25' },
    { value: '25-50', label: '$25 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100', label: '$100+' }
  ];

  const topPicks = filteredDeals
    .filter(deal => deal.rating >= 4.5)
    .slice(0, 3);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Student Deals</h1>
          <p className="text-muted-foreground text-lg">
            Discover amazing discounts on essentials from top retailers
          </p>
        </div>

        {/* Top Picks Section */}
        {topPicks.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Top Picks</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topPicks.map((deal) => (
                <Card key={deal.id} className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Top Pick
                      </Badge>
                      <Badge variant="outline">{deal.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-2">{deal.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{deal.store}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">${deal.price}</span>
                      {deal.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${deal.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <a href={deal.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Buy Now
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:w-64"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="sm:w-48">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map(range => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDeals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{deal.category}</Badge>
                  {deal.discount && (
                    <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                      -{deal.discount}%
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform"
                />
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-2">{deal.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{deal.store}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm text-muted-foreground">{deal.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">${deal.price}</span>
                  {deal.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${deal.originalPrice}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  <a href={deal.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Deal
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No deals found matching your criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Deals;