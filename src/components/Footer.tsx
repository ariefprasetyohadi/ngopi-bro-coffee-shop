import React from 'react';
import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-coffee-accent text-coffee-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Coffee className="h-8 w-8 text-coffee-secondary" />
              <span className="text-2xl font-bold">Ngopi Bro</span>
            </div>
            <p className="text-coffee-cream/80 mb-6 max-w-md">
              Tempat ngopi terbaik untuk para bro dan sista yang ingin menikmati 
              kopi berkualitas dengan suasana yang nyaman dan hangat.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-coffee-cream/80 hover:text-coffee-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-coffee-cream/80 hover:text-coffee-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-coffee-cream/80 hover:text-coffee-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-coffee-cream/80 hover:text-coffee-secondary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-coffee-cream/80 hover:text-coffee-secondary transition-colors">
                  Produk
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-coffee-cream/80 hover:text-coffee-secondary transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-coffee-cream/80 hover:text-coffee-secondary transition-colors">
                  Keranjang
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-coffee-secondary flex-shrink-0" />
                <span className="text-coffee-cream/80 text-sm">
                  Jl. Kopi Nikmat No. 123<br />
                  Jakarta Selatan, 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-coffee-secondary flex-shrink-0" />
                <span className="text-coffee-cream/80 text-sm">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-coffee-secondary flex-shrink-0" />
                <span className="text-coffee-cream/80 text-sm">info@ngopibro.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-coffee-cream/20 mt-8 pt-8 text-center">
          <p className="text-coffee-cream/60 text-sm">
            © 2024 Ngopi Bro. Semua hak dilindungi. Dibuat dengan ❤️ untuk para pecinta kopi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;