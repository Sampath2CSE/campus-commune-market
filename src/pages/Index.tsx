
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F5FA] via-white to-[#F4F5FA]">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <span className="text-xl font-bold text-[#1A1A1A]">CampusMarket</span>
          </div>
          <div className="flex space-x-3">
            <Link to="/login">
              <Button variant="ghost" className="text-[#6C63FF] hover:bg-[#6C63FF]/10">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] hover:opacity-90 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]/20">
            Students Only • Verified .edu Required
          </Badge>
          <h1 className="text-5xl font-bold text-[#1A1A1A] mb-6 leading-tight">
            Your Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#00BFA6]">Marketplace</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Buy, sell, and rent items safely within your college community. Connect with verified students on your campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] hover:opacity-90 text-white px-8 py-3 text-lg">
                Get Started Free
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF]/10 px-8 py-3 text-lg">
                Browse Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1A1A1A] mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Verify Your Student Status</h3>
                <p className="text-gray-600">
                  Sign up with your .edu email to join your campus community
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Post & Browse Listings</h3>
                <p className="text-gray-600">
                  Buy, sell, or rent items with students from your college only
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Connect Safely</h3>
                <p className="text-gray-600">
                  Message other students directly through our secure chat
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#6C63FF] to-[#00BFA6]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Your Campus Community Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start buying, selling, and connecting with students at your college
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-[#6C63FF] hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-[#1A1A1A] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-4">
            <span className="text-2xl font-bold">CampusMarket</span>
          </div>
          <p className="text-gray-400">
            The trusted marketplace for college students
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
