import { Package, Tag, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllTemplates } from '../../lib/db/templates';
import { getAllCategories } from '../../lib/db/categories';
import { getAllUsers } from '../../lib/db/users';

export default function AdminDashboard() {
  // Fetch data from database
  const { data: templates = [] } = useQuery({
    queryKey: ['templates'],
    queryFn: getAllTemplates
  });
  
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });
  
  const { data: users = [], isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });
  
  // Calculate total sales (dummy for now)
  const totalSales = 0;
  
  // Get recent templates
  const recentTemplates = [...templates]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  // Stats data
  const stats = [
    { 
      title: 'Total Template', 
      value: templates.length, 
      icon: <Package size={24} />, 
      color: 'bg-blue-500', 
      path: '/admin-dashboard-spiuwirkid/templates' 
    },
    { 
      title: 'Kategori', 
      value: categories.length, 
      icon: <Tag size={24} />, 
      color: 'bg-green-500', 
      path: '/admin-dashboard-spiuwirkid/categories' 
    },
    { 
      title: 'Pengguna', 
      value: users.length, 
      icon: <Users size={24} />, 
      color: 'bg-purple-500', 
      path: '/admin-dashboard-spiuwirkid/users' 
    },
    { 
      title: 'Penjualan Bulan Ini', 
      value: `Rp ${totalSales.toLocaleString('id-ID')}`, 
      icon: <TrendingUp size={24} />, 
      color: 'bg-amber-500', 
      path: '#' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Link 
          to="/admin-dashboard-spiuwirkid/templates/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Tambah Template Baru
        </Link>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link 
            key={index} 
            to={stat.path}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Template Terbaru */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Template Terbaru</h2>
          <Link 
            to="/admin-dashboard-spiuwirkid/templates" 
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Lihat Semua
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Dibuat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTemplates.length > 0 ? (
                recentTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{template.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{template.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">Rp {template.price.toLocaleString('id-ID')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(template.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/admin-dashboard-spiuwirkid/templates/${template.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    Belum ada template yang dibuat
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h2>
        {templates.length > 0 || categories.length > 0 || users.length > 0 ? (
          <div className="space-y-4">
            {templates.length > 0 && (
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Package size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">
                    Template baru <span className="font-medium">{templates[0].title}</span> ditambahkan
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(templates[0].createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}
            
            {categories.length > 0 && (
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Tag size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">
                    Kategori <span className="font-medium">{categories[0].name}</span> ditambahkan
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(categories[0].createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}
            
            {users.length > 0 && (
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Users size={16} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">
                    Pengguna baru <span className="font-medium">{users[0].name || users[0].email}</span> mendaftar
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(users[0].createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Belum ada aktivitas terbaru</p>
        )}
      </div>
    </div>
  );
} 