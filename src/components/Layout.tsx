
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Plus, MessageCircle, User, Tag } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/marketplace" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CM</span>
            </div>
            <span className="text-lg font-bold text-foreground">CampusMarket</span>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.college}</p>
                  </div>
                </div>
                
                <nav className="flex flex-col gap-2">
                  <Link
                    to="/marketplace"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/marketplace') 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    Marketplace
                  </Link>
                  <Link
                    to="/create-listing"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/create-listing')
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    Create Listing
                  </Link>
                  <Link
                    to="/messages"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/messages')
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Messages
                  </Link>
                  <Link
                    to="/deals"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/deals')
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Tag className="h-4 w-4" />
                    Student Deals
                  </Link>
                  <Link
                    to="/profile"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/profile')
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </nav>
                
                <div className="pt-4 border-t border-border">
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    Log out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:block sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/marketplace" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CM</span>
            </div>
            <span className="text-xl font-bold text-foreground">CampusMarket</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/marketplace"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/marketplace') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Marketplace
            </Link>
            <Link
              to="/create-listing"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/create-listing') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Sell Item
            </Link>
            <Link
              to="/messages"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/messages') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Messages
            </Link>
            <Link
              to="/deals"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/deals') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Student Deals
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-sm text-muted-foreground">
                {user.college}
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none text-popover-foreground">{user?.name}</p>
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
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
        <div className="flex items-center justify-around px-4 py-2">
          <Link
            to="/marketplace"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('/marketplace')
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Market</span>
          </Link>
          <Link
            to="/create-listing"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('/create-listing')
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs font-medium">Sell</span>
          </Link>
          <Link
            to="/messages"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('/messages')
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs font-medium">Messages</span>
          </Link>
          <Link
            to="/deals"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('/deals')
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Tag className="h-5 w-5" />
            <span className="text-xs font-medium">Deals</span>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('/profile')
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
