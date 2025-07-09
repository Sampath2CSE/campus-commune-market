import { Link } from 'react-router-dom';
import { Home, Plus, MessageCircle, User, Tag } from 'lucide-react';

interface MobileNavigationProps {
  isActive: (path: string) => boolean;
}

export const MobileNavigation = ({ isActive }: MobileNavigationProps) => {
  return (
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
  );
};