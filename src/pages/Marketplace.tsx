
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { mockListings } from '@/data/mockData';
import { Listing } from '@/types';

const Marketplace = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Filter listings by user's college
    const userCollegeListings = mockListings.filter(
      listing => listing.college === user?.college
    );
    setListings(userCollegeListings);
  }, [isAuthenticated, user, navigate]);

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesType = selectedType === 'all' || listing.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = ['Books', 'Electronics', 'Furniture', 'Appliances', 'Clothing'];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Marketplace</h1>
            <p className="text-gray-600 mt-1">Items from students at {user?.college}</p>
          </div>
          <Link to="/create-listing">
            <Button className="bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] hover:opacity-90 text-white">
              + Create Listing
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-gray-200 focus:border-[#6C63FF]"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sell">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="buy">Wanted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'} found
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map(listing => (
            <Link key={listing.id} to={`/listing/${listing.id}`}>
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge 
                        className={`${
                          listing.type === 'sell' ? 'bg-green-100 text-green-800' :
                          listing.type === 'rent' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        } border-0`}
                      >
                        {listing.type === 'sell' ? 'For Sale' : 
                         listing.type === 'rent' ? 'For Rent' : 'Wanted'}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-black/50 text-white border-0">
                        ${listing.price}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1A1A1A] mb-2 line-clamp-1">
                      {listing.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {listing.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {listing.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500">
                        <img
                          src={listing.seller.avatar}
                          alt={listing.seller.name}
                          className="w-5 h-5 rounded-full mr-1"
                        />
                        {listing.seller.name}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <Link to="/create-listing">
              <Button className="bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] hover:opacity-90 text-white">
                Create First Listing
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Marketplace;
