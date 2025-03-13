import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-5 md:col-span-2">
            <Link to="/" className="text-3xl font-bold text-white">TemplateHub</Link>
            <p className="text-gray-400 max-w-md">
              Template website premium untuk bisnis modern dan kreator. Tingkatkan kehadiran online Anda dengan template yang dirancang secara profesional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-blue-600 text-white p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-400 text-white p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-pink-600 text-white p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-xl text-white mb-5">Navigasi Cepat</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Beranda</Link></li>
              <li><Link to="/templates" className="hover:text-blue-400 transition-colors">Semua Template</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">Tentang Kami</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Kontak</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-xl text-white mb-5">Kategori</h4>
            <ul className="space-y-3">
              <li><Link to="/category/e-commerce" className="hover:text-blue-400 transition-colors">E-commerce</Link></li>
              <li><Link to="/category/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link></li>
              <li><Link to="/category/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link to="/category/landing-page" className="hover:text-blue-400 transition-colors">Landing Page</Link></li>
              <li><Link to="/category/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} TemplateHub. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">Syarat & Ketentuan</a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">Kebijakan Privasi</a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">Cookie</a>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Dibuat dengan <span className="text-red-500">❤</span> di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
