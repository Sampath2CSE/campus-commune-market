import { Link } from 'react-router-dom';
import { Home, Plus, MessageCircle, User, Tag } from 'lucide-react';

interface BottomNavigationProps {
  isActive: (path: string) => boolean;
}

export const BottomNavigation = ({ isActive }: BottomNavigationProps) => {
  return (
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
  );
};