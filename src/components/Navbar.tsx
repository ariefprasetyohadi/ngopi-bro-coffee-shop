import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Coffee, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useCart();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Produk', path: '/product' },
    { name: 'Kategori', path: '/categories' },
    { name: 'Pelanggan', path: '/pelanggan' },
    { name: 'Transaksi', path: '/transaksi' },
    { name: 'Tentang Kami', path: '/about' },
  ];

  return (
    <nav className="bg-gradient-hero shadow-coffee sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-coffee-cream" />
            <span className="text-2xl font-bold text-coffee-cream">Ngopi Bro</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-coffee-cream hover:text-coffee-secondary transition-colors ${
                  location.pathname === item.path ? 'font-semibold border-b-2 border-coffee-cream' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-coffee-cream/10 border-coffee-cream text-coffee-cream hover:bg-coffee-cream hover:text-coffee-primary"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>

          {/* Cart Button */}
          <Link to="/cart">
            <Button variant="outline" size="sm" className="relative bg-coffee-cream/10 border-coffee-cream text-coffee-cream hover:bg-coffee-cream hover:text-coffee-primary">
              <ShoppingCart className="h-4 w-4" />
              {state.items.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-coffee-secondary text-coffee-dark min-w-5 h-5 text-xs flex items-center justify-center">
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-coffee-cream hover:text-coffee-secondary transition-colors text-sm ${
                  location.pathname === item.path ? 'font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;