
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
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Marketplace</h1>
            <p className="text-muted-foreground mt-1">Items from students at {user?.college}</p>
          </div>
          <Link to="/create-listing" className="hidden sm:block">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground">
              + Create Listing
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 mb-6">
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-36 flex-shrink-0">
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
              <SelectTrigger className="w-32 flex-shrink-0">
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
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground text-sm">
            {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'} found
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {filteredListings.map(listing => (
            <Link key={listing.id} to={`/listing/${listing.id}`}>
               <Card className="border-0 shadow-sm bg-card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                 <CardContent className="p-0">
                   <div className="aspect-square relative overflow-hidden rounded-t-lg">
                     <img
                       src={listing.images[0]}
                       alt={listing.title}
                       className="w-full h-full object-cover"
                     />
                     <div className="absolute top-2 left-2">
                       <Badge 
                         variant="secondary"
                         className="text-xs px-2 py-1 bg-background/90 text-foreground"
                       >
                         {listing.type === 'sell' ? 'Sale' : 
                          listing.type === 'rent' ? 'Rent' : 'Wanted'}
                       </Badge>
                     </div>
                     <div className="absolute top-2 right-2">
                       <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1">
                         ${listing.price}
                       </Badge>
                     </div>
                   </div>
                   <div className="p-3">
                     <h3 className="font-medium text-foreground mb-1 line-clamp-1 text-sm">
                       {listing.title}
                     </h3>
                     <p className="text-xs text-muted-foreground mb-2 line-clamp-2 hidden md:block">
                       {listing.description}
                     </p>
                     <div className="flex items-center justify-between text-xs">
                       <Badge variant="outline" className="text-xs">
                         {listing.category}
                       </Badge>
                       <div className="flex items-center text-muted-foreground">
                         <img
                           src={listing.seller.avatar}
                           alt={listing.seller.name}
                           className="w-4 h-4 rounded-full mr-1"
                         />
                         <span className="truncate max-w-16">{listing.seller.name}</span>
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
