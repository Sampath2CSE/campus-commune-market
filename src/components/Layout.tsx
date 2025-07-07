
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F5FA] via-white to-[#F4F5FA]">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/marketplace" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#6C63FF] to-[#00BFA6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <span className="text-xl font-bold text-[#1A1A1A]">CampusMarket</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/marketplace"
              className={`text-sm font-medium transition-colors hover:text-[#6C63FF] ${
                isActive('/marketplace') ? 'text-[#6C63FF]' : 'text-gray-600'
              }`}
            >
              Marketplace
            </Link>
            <Link
              to="/create-listing"
              className={`text-sm font-medium transition-colors hover:text-[#6C63FF] ${
                isActive('/create-listing') ? 'text-[#6C63FF]' : 'text-gray-600'
              }`}
            >
              Sell Item
            </Link>
            <Link
              to="/messages"
              className={`text-sm font-medium transition-colors hover:text-[#6C63FF] ${
                isActive('/messages') ? 'text-[#6C63FF]' : 'text-gray-600'
              }`}
            >
              Messages
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-sm text-gray-600">
                {user.college}
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-[#6C63FF] text-white">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
