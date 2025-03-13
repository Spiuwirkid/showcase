import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { name: 'Beranda', path: '/', hasDropdown: false },
  { name: 'Templates', path: '/templates', hasDropdown: false },
  { name: 'Kategori', path: '#', hasDropdown: true },
  { name: 'Tentang Kami', path: '/about', hasDropdown: false },
  { name: 'Kontak', path: '/contact' },
];

const CATEGORIES = [
  { name: 'Portfolio', path: '/category/portfolio', count: 12 },
  { name: 'E-Commerce', path: '/category/e-commerce', count: 8 },
  { name: 'Landing Page', path: '/category/landing-page', count: 15 },
  { name: 'Dashboard', path: '/category/dashboard', count: 6 },
  { name: 'Blog', path: '/category/blog', count: 9 },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 backdrop-blur-md bg-black/80 shadow-lg' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className={`relative text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-white' : 'text-black'
          } group`}
        >
          Template<span className={isScrolled ? 'text-white' : 'text-black'}>Hub</span>
          <span className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${
            isScrolled ? 'bg-white' : 'bg-black'
          } group-hover:animate-ping`}></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.name} className="relative group px-2">
              {item.hasDropdown ? (
                <button
                  onClick={() => setCategoryDropdown(!categoryDropdown)}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors group ${
                    isScrolled ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {item.name}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${categoryDropdown ? 'rotate-180' : ''}`} />
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    isScrolled ? 'bg-white' : 'bg-black'
                  } transform scale-x-0 group-hover:scale-x-100 transition-transform`}></span>
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors relative group ${
                    isScrolled ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    isScrolled ? 'bg-white' : 'bg-black'
                  } transform scale-x-0 group-hover:scale-x-100 transition-transform`}></span>
                </Link>
              )}

              {/* Dropdown for categories */}
              <AnimatePresence>
                {item.hasDropdown && categoryDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 w-64 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-xl"
                  >
                    {CATEGORIES.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
                        onClick={() => setCategoryDropdown(false)}
                      >
                        <span>{category.name}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Action buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '200px', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <input 
                  type="text" 
                  placeholder="Cari template..." 
                  className={`w-full pl-10 pr-4 py-2 rounded-full ${
                    isScrolled 
                      ? 'bg-zinc-800/90 border border-zinc-700/50 text-white placeholder-zinc-400' 
                      : 'bg-gray-100 border border-gray-200 text-black placeholder-gray-500'
                  } focus:outline-none focus:ring-2 ${
                    isScrolled ? 'focus:ring-white/30' : 'focus:ring-black/30'
                  }`}
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
                <Search className={`absolute left-3 top-2.5 h-4 w-4 ${
                  isScrolled ? 'text-zinc-400' : 'text-gray-500'
                }`} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {!searchOpen && (
            <button
              onClick={() => setSearchOpen(true)}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                isScrolled 
                  ? 'bg-zinc-800/70 text-gray-300 hover:bg-zinc-700 hover:text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black'
              } transition-colors`}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          )}
          
          <Link
            to="/contact"
            className={`relative overflow-hidden group px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-lg ${
              isScrolled 
                ? 'bg-white hover:bg-gray-100 text-black' 
                : 'bg-black hover:bg-gray-900 text-white'
            }`}
          >
            <span className="relative z-10 flex items-center">
              Hubungi Kami
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 rounded-md z-50 ${
            isScrolled ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-black'
          }`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 md:hidden"
          >
            {/* Mobile menu content dengan warna yang sesuai */}
            <div className="h-full flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <Link 
                  to="/" 
                  className="text-2xl font-bold text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Template<span className="text-black">Hub</span>
                </Link>
              </div>
              
              {/* Content mobile menu lainnya... */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}