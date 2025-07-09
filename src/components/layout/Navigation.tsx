import { Link } from 'react-router-dom';

interface NavigationProps {
  isActive: (path: string) => boolean;
}

export const Navigation = ({ isActive }: NavigationProps) => {
  return (
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
  );
};