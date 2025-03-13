import { useState, useEffect, useRef } from 'react';
import { Save, Upload, Image as ImageIcon, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const API_BASE_URL = 'http://localhost:5173/api';

interface HeroSettings {
  showcaseImage: string;
  tagline: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export default function HeroSettings() {
  const [settings, setSettings] = useState<HeroSettings>({
    showcaseImage: '/showcase-template-dark.webp',
    tagline: 'Template Premium Terbaik di Indonesia',
    headingLine1: 'Transformasi Digital Terbaik untuk',
    headingLine2: 'Brand Anda',
    description: 'Koleksi template premium yang akan mengubah kehadiran digital Anda. Dirancang untuk kecepatan, konversi, dan pengalaman pengguna terbaik.',
    primaryButtonText: 'Jelajahi Template',
    secondaryButtonText: 'Lihat Kategori'
  });
  
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch current settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/settings/hero`);
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
          setImagePreview(data.showcaseImage);
        }
      } catch (error) {
        console.error("Error fetching hero settings:", error);
        // Fallback to defaults if can't fetch
      }
    };
    
    fetchSettings();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Hanya file gambar yang diperbolehkan (.jpg, .png, .webp)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Ukuran file maksimal 5MB');
      return;
    }

    setError('');
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setImageFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Jika ada file gambar baru, upload dulu
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadResponse = await fetch(`${API_BASE_URL}/settings/hero/upload`, {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Gagal mengupload gambar');
        }
        
        const { imagePath } = await uploadResponse.json();
        setSettings({ ...settings, showcaseImage: imagePath });
      }
      
      // Simpan pengaturan
      const response = await fetch(`${API_BASE_URL}/settings/hero`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal menyimpan pengaturan');
      }
      
      toast.success('Pengaturan berhasil disimpan');
      // Reset state
      setImageFile(null);
    } catch (error) {
      console.error('Error saving hero settings:', error);
      setError(error.message || 'Terjadi kesalahan saat menyimpan pengaturan');
      toast.error(error.message || 'Gagal menyimpan pengaturan');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Pengaturan Hero</h1>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Hero Browser Preview */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Gambar Showcase</h2>
            <p className="text-sm text-gray-600 mb-4">
              Gambar ini akan ditampilkan di dalam browser mockup pada halaman utama.
              Upload gambar dengan rasio 16:9 untuk hasil terbaik.
            </p>
            
            <div 
              className={`border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'} 
                rounded-lg p-4 text-center cursor-pointer transition-colors mb-4`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Hero showcase preview" 
                    className="w-full h-auto rounded-md max-h-[300px] object-contain mx-auto"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <div className="py-10">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Drag & drop gambar di sini, atau klik untuk memilih
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Format yang didukung: JPG, PNG, WEBP (Maks. 5MB)
                  </p>
                </div>
              )}
            </div>
            
            {/* Browser Mockup Preview */}
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-2 text-gray-700">Preview Browser Mockup</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 h-7 flex items-center px-3 border-b border-gray-200">
                  <div className="flex space-x-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="bg-gray-800 aspect-[16/9] flex items-center justify-center">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Browser preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">
                      Belum ada gambar yang dipilih
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Text Settings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Pengaturan Teks Hero</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  id="tagline"
                  name="tagline"
                  value={settings.tagline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="headingLine1" className="block text-sm font-medium text-gray-700 mb-1">
                  Heading Baris 1
                </label>
                <input
                  type="text"
                  id="headingLine1"
                  name="headingLine1"
                  value={settings.headingLine1}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="headingLine2" className="block text-sm font-medium text-gray-700 mb-1">
                  Heading Baris 2 <span className="text-gray-500 text-xs">(dengan highlight)</span>
                </label>
                <input
                  type="text"
                  id="headingLine2"
                  name="headingLine2"
                  value={settings.headingLine2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={settings.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="primaryButtonText" className="block text-sm font-medium text-gray-700 mb-1">
                  Teks Tombol Utama
                </label>
                <input
                  type="text"
                  id="primaryButtonText"
                  name="primaryButtonText"
                  value={settings.primaryButtonText}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="secondaryButtonText" className="block text-sm font-medium text-gray-700 mb-1">
                  Teks Tombol Sekunder
                </label>
                <input
                  type="text"
                  id="secondaryButtonText"
                  name="secondaryButtonText"
                  value={settings.secondaryButtonText}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Simpan Pengaturan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}