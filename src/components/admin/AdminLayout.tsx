import { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Loader2
} from 'lucide-react';
import { authenticateUser } from '../../lib/db/users';

const API_URL = 'http://localhost:5173';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized === false) {
      navigate('/admin-dashboard-spiuwirkid');
    }
  }, [isAuthorized, navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Ambil token dari storage
        const token = localStorage.getItem('adminToken');

        if (!token) {
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        // Verifikasi token dengan API
        const response = await fetch(`${API_URL}/api/auth/verify-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        
        if (!response.ok) {
          setIsAuthorized(false);
          localStorage.removeItem('adminToken'); // Hapus token tidak valid
        } else {
          const data = await response.json();
          if (data.success && data.user.role === 'admin') {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Cek ukuran layar
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-dashboard-spiuwirkid');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin-dashboard-spiuwirkid/dashboard' },
    { icon: <Package size={20} />, label: 'Template', path: '/admin-dashboard-spiuwirkid/templates' },
    { icon: <Tag size={20} />, label: 'Kategori', path: '/admin-dashboard-spiuwirkid/categories' },
    { icon: <Users size={20} />, label: 'Pengguna', path: '/admin-dashboard-spiuwirkid/users' },
    { icon: <Settings size={20} />, label: 'Pengaturan', path: '/admin-dashboard-spiuwirkid/settings' },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-700">Memverifikasi akses...</span>
      </div>
    );
  }

  if (isAuthorized === false) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-5 border-b">
            <Link to="/admin-dashboard-spiuwirkid/dashboard" className="text-xl font-bold text-blue-600">
              TemplateHub Admin
            </Link>
            {isMobile && (
              <button onClick={toggleSidebar} className="md:hidden">
                <X size={24} />
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span className="mr-3 text-gray-500">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} className="mr-3 text-gray-500" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`${
            isSidebarOpen ? 'hidden' : 'block'
          } fixed left-4 top-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden`}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 