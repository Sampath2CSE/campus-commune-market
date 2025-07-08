
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [college, setCollege] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.endsWith('.edu')) {
      toast.error('Only .edu email addresses are allowed');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!college.trim()) {
      toast.error('Please enter your college name');
      return;
    }

    setIsLoading(true);
    
    const { error } = await signup(name, email, password, college);
    
    if (error) {
      toast.error(error);
    } else {
      toast.success('Account created! Please check your email to verify your account.');
      navigate('/login');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F5FA] via-white to-[#F4F5FA] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">CM</span>
            </div>
            <span className="text-2xl font-bold text-[#1A1A1A]">CampusMarket</span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-[#1A1A1A]">Join Your Campus</CardTitle>
            <CardDescription className="text-gray-600">
              Create your account with your .edu email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#6C63FF]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">University Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#6C63FF]"
                />
                <p className="text-xs text-gray-500">
                  Must be a valid .edu email address
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="college">College/University</Label>
                <Input
                  id="college"
                  type="text"
                  placeholder="e.g., Harvard University"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#6C63FF]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#6C63FF]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#6C63FF]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] hover:opacity-90 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#6C63FF] font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
