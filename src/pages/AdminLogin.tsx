import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, UserPlus, User } from 'lucide-react';
import { authenticateUser, createAdminUser, hasAnyAdmin } from '../lib/db/users';
import { toast } from 'sonner';

// Tetapkan variabel URL API yang konsisten
const API_BASE_URL = 'http://localhost:5173/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [adminExists, setAdminExists] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah sudah ada admin saat komponen dimuat
    const checkAdmin = async () => {
      const hasAdmin = await hasAnyAdmin();
      setAdminExists(hasAdmin);
      if (!hasAdmin) {
        setShowRegister(true); // Tampilkan form register jika belum ada admin
      }
    };
    checkAdmin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Gunakan fungsi dari lib/db/users.ts langsung
      const result = await authenticateUser(email, password);
      
      if (!result || !result.success) {
        setError('Email atau password salah');
        setLoading(false);
        return;
      }
      
      // Periksa role admin langsung dari user yang sudah diautentikasi
      if (result.user.role !== 'admin') {
        setError('Anda tidak memiliki akses admin');
        setLoading(false);
        return;
      }
      
      // Simpan token, bukan password!
      localStorage.setItem('adminToken', result.token);
      
      toast.success('Login berhasil!');
      navigate('/admin-dashboard-spiuwirkid/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan saat login.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError('');

    try {
      // Validasi input
      if (!registerName || !registerEmail || !registerPassword) {
        setRegisterError('Semua field harus diisi');
        setRegisterLoading(false);
        return;
      }

      // Password minimal 8 karakter
      if (registerPassword.length < 8) {
        setRegisterError('Password minimal 8 karakter');
        setRegisterLoading(false);
        return;
      }

      // Gunakan fungsi dari lib/db/users.ts langsung
      const result = await createAdminUser(
        registerName,
        registerEmail,
        registerPassword
      );

      if (!result.success) {
        setRegisterError(result.message || 'Gagal membuat akun admin');
        setRegisterLoading(false);
        return;
      }

      toast.success('Akun admin berhasil dibuat! Silakan login.');
      setShowRegister(false);
      setEmail(registerEmail);
      setPassword('');
    } catch (err) {
      console.error('Register error:', err);
      setRegisterError('Terjadi kesalahan saat membuat akun admin.');
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {!adminExists ? 'Buat Admin Pertama' : (showRegister ? 'Buat Admin Baru' : 'Admin Login')}
          </h1>
          <p className="text-gray-600 mt-2">
            {!adminExists 
              ? 'Buat akun admin pertama untuk TemplateHub'
              : (showRegister 
                ? 'Daftar akun admin baru untuk TemplateHub' 
                : 'Masuk ke dashboard admin TemplateHub')}
          </p>
        </div>

        {(showRegister && (!adminExists || !loading)) ? (
          <>
            {registerError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                {registerError}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label htmlFor="registerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="registerName"
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nama Admin"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="registerEmail"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="registerPassword"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={registerLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              >
                {registerLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    {!adminExists ? 'Buat Admin Pertama' : 'Buat Admin Baru'}
                  </>
                )}
              </button>

              {adminExists && (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setShowRegister(false)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Kembali ke halaman login
                  </button>
                </div>
              )}
            </form>
          </>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="admin@templatehub.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Memproses...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
} 