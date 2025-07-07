
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { mockListings } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const userListings = mockListings.filter(listing => listing.seller.id === user?.id);

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center space-x-6 mb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-[#6C63FF] text-white text-2xl">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <Badge className="mt-2 bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]/20">
              {user?.college}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">
                My Listings ({userListings.length})
              </h2>
              <Link to="/create-listing">
                <Button className="bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] hover:opacity-90 text-white">
                  + Add New Listing
                </Button>
              </Link>
            </div>

            {userListings.length === 0 ? (
              <Card className="border-0 shadow-lg bg-white/80">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                    No listings yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start by creating your first listing
                  </p>
                  <Link to="/create-listing">
                    <Button className="bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] hover:opacity-90 text-white">
                      Create Listing
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map(listing => (
                  <Link key={listing.id} to={`/listing/${listing.id}`}>
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-0">
                        <div className="aspect-square relative overflow-hidden rounded-t-lg">
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover"
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
                            <span className="text-xs text-gray-500">
                              {new Date(listing.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1A1A1A]">
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="border-gray-200 focus:border-[#6C63FF]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    disabled
                    className="border-gray-200 bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">
                    Email cannot be changed for security reasons
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>College</Label>
                  <Input
                    value={user?.college || ''}
                    disabled
                    className="border-gray-200 bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">
                    College is automatically assigned based on your email domain
                  </p>
                </div>

                <div className="flex space-x-4 pt-4">
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] hover:opacity-90 text-white"
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF]/10"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
