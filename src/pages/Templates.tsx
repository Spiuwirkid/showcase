import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingCart, Filter, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useQuery } from '@tanstack/react-query';
import { getAllTemplates } from '../lib/db/templates';
import { getAllCategories } from '../lib/db/categories';

export default function Templates() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Fetch templates from database
  const { data: templates = [], isLoading: templatesLoading, error: templatesError } = useQuery({
    queryKey: ['templates'],
    queryFn: getAllTemplates
  });
  
  // Fetch categories from database
  const { data: categoriesData = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });
  
  // Create categories list with "All" option
  const categories = ['All', ...categoriesData.map(category => category.name)];
  
  // Filter templates based on selected category and price range
  const filteredTemplates = templates.filter(template => {
    if (selectedCategory !== 'All' && template.category !== selectedCategory) {
      return false;
    }
    if (template.price < priceRange[0] || template.price > priceRange[1]) {
      return false;
    }
    return true;
  });
  
  // Find max price for range slider
  const maxPrice = Math.max(...templates.map(template => template.price), 1000000);
  
  if (templatesLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (templatesError) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom">
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-red-700">Terjadi kesalahan saat memuat data template.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <div className="mb-12">image.png
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">Semua Template</h1>
            <p className="text-lg text-muted-foreground animate-slide-in">
              Jelajahi koleksi template website premium kami untuk proyek Anda berikutnya.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <button
              className="lg:hidden flex items-center gap-2 p-3 border rounded-md mb-4"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <X size={18} /> : <Filter size={18} />}
              {showFilters ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
            </button>
            
            {/* Sidebar Filters */}
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Kategori</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === category 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Rentang Harga</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Minimum:</span>
                      <span className="text-sm font-medium">Rp {priceRange[0].toLocaleString('id-ID')}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max={maxPrice} 
                      step="100000"
                      value={priceRange[0]} 
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} 
                      className="w-full accent-primary"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Maksimum:</span>
                      <span className="text-sm font-medium">Rp {priceRange[1].toLocaleString('id-ID')}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max={maxPrice} 
                      step="100000"
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} 
                      className="w-full accent-primary"
                    />
                  </div>
                </div>
                
                <button
                  className="w-full py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, maxPrice]);
                  }}
                >
                  Reset Filter
                </button>
              </div>
            </div>
            
            {/* Templates Grid */}
            <div className="lg:w-3/4">
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="text-xl font-medium mb-2">Tidak ada template yang ditemukan</h3>
                  <p className="text-muted-foreground">Coba sesuaikan filter Anda.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template, index) => (
                    <div 
                      key={template.id}
                      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={template.image} 
                          alt={template.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                            {template.category}
                          </span>
                        </div>
                        {/* Price Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                            Rp {template.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          {/* <p className="text-white/90 text-sm mb-4">{template.shortDescription}</p> */}
                          <div className="flex items-center gap-3">
                            <Link 
                              to={`/template/${template.id}`}
                              className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium flex items-center flex-1 justify-center"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Link>
                            <a 
                              href={`https://wa.me/your-number?text=Saya tertarik dengan template ${template.title}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center flex-1 justify-center"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Beli
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        <div className="mb-3">
                          <h3 className="font-medium text-lg text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-500 transition-colors">
                            {template.title}
                          </h3>
                          {template.tags && (
                            <div className="flex flex-wrap gap-1.5">
                              {template.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
