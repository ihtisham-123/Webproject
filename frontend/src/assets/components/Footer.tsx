import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  const navigate = useNavigate();

  const navItems = [
    { path: '/Home', label: 'Home' },
    { path: '/Offer', label: 'Offers' },
    { path: '/Global', label: 'Features' },
    { path: '/FAQ', label: 'FAQ' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="text-gray-300 py-12 mt-auto bg-[#141937]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div 
                // className="bg-gradient-to-r from-[#3E62DE] to-[#B22ADF] w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => handleNavigation('/Home')}
              >
                <Logo/>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Providing educational resources and insights into financial markets.
              Our platform is designed to empower traders with knowledge and tools.
            </p>
            <div className="text-xs text-gray-500">
              © 2024 Funded Bull FX. All Rights Reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white mb-4">Quick Links</h5>
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="text-sm text-left hover:text-blue-500 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact and Social */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white mb-4">Connect With Us</h5>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <a
                  href="mailto:support@fundedbullfx.com"
                  className="text-sm hover:text-blue-500 transition-colors"
                >
                  support@fundedbullfx.com
                </a>
              </div>
              <div className="flex space-x-4 pt-2">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://instagram.com/fundedbullfx', '_blank');
                  }}
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://facebook.com/fundedbullfx', '_blank');
                  }}
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://twitter.com/fundedbullfx', '_blank');
                  }}
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>
            RISK DISCLOSURE: This platform provides educational information on financial markets.
            Not intended as investment advice. Powered by third-party liquidity providers.
          </p>
        </div>
      </div>
    </footer>
  );
}