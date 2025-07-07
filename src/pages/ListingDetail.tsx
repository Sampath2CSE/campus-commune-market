
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';
import { mockListings } from '@/data/mockData';
import { Listing } from '@/types';
import { toast } from 'sonner';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const foundListing = mockListings.find(l => l.id === id);
    if (foundListing) {
      setListing(foundListing);
    } else {
      navigate('/marketplace');
    }
  }, [id, navigate]);

  const handleMessage = () => {
    toast.success('Opening chat with seller...');
    navigate('/messages');
  };

  if (!listing) {
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              <img
                src={listing.images[currentImageIndex]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
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
            </div>
            
            {listing.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-[#6C63FF]' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${listing.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {listing.video && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <video
                  src={listing.video}
                  controls
                  className="w-full h-full object-cover"
                  poster={listing.images[0]}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">
                {listing.title}
              </h1>
              <div className="text-3xl font-bold text-[#6C63FF] mb-4">
                ${listing.price}
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="outline">{listing.category}</Badge>
                <span className="text-sm text-gray-500">
                  Posted {new Date(listing.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Seller Info */}
            <Card className="border-0 shadow-lg bg-white/80">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                  Seller Information
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={listing.seller.avatar} alt={listing.seller.name} />
                    <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-[#1A1A1A]">
                      {listing.seller.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {listing.seller.college}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleMessage}
                  className="w-full bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] hover:opacity-90 text-white"
                >
                  💬 Message Seller
                </Button>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="border-0 bg-blue-50/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">
                  Safety Tips
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Meet in a public place on campus</li>
                  <li>• Bring a friend when meeting</li>
                  <li>• Inspect items before paying</li>
                  <li>• Use campus-approved payment methods</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListingDetail;
