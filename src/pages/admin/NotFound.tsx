import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-600 mt-2 max-w-md">
        Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
      </p>
      <Link 
        to="/admin-dashboard-spiuwirkid/dashboard" 
        className="flex items-center mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        Kembali ke Dashboard
      </Link>
    </div>
  );
} 