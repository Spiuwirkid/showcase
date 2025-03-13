import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [heroData, setHeroData] = useState({
    showcaseImage: '/showcase-template-dark.webp',
    tagline: 'Template Premium Terbaik di Indonesia',
    headingLine1: 'Transformasi Digital Terbaik untuk',
    headingLine2: 'Brand Anda',
    description: 'Koleksi template premium yang akan mengubah kehadiran digital Anda. Dirancang untuk kecepatan, konversi, dan pengalaman pengguna terbaik.',
    primaryButtonText: 'Jelajahi Template',
    secondaryButtonText: 'Lihat Kategori'
  });
  
  useEffect(() => {
    // Fetch hero settings from API
    const fetchHeroSettings = async () => {
      try {
        const response = await fetch('http://localhost:5173/api/settings/hero');
        if (response.ok) {
          const data = await response.json();
          setHeroData(data);
        }
      } catch (error) {
        console.error('Error fetching hero settings:', error);
      }
    };
    
    fetchHeroSettings();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-white">
      {/* Cyber Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/cyber-grid-pattern.svg')] bg-center opacity-10"></div>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-gray-100 to-gray-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-gray-100 to-gray-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-black/10 text-black backdrop-blur-sm mb-8 border border-black/20"
          >
            {heroData.tagline}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-8 text-black"
          >
            {heroData.headingLine1} <span className="text-black underline decoration-2 underline-offset-4">{heroData.headingLine2}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {heroData.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link
              to="/templates"
              className="group relative overflow-hidden rounded-full bg-black px-8 py-4 font-medium text-white shadow-lg transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                {heroData.primaryButtonText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              to="/category/landing-page"
              className="relative overflow-hidden rounded-full bg-transparent backdrop-blur-sm border border-black/20 px-8 py-4 font-medium text-black transition-all hover:bg-black/5"
            >
              {heroData.secondaryButtonText}
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-24 relative"
          >
            {/* Browser Frame Mockup dengan warna kontras */}
            <div className="relative mx-auto max-w-5xl rounded-lg shadow-2xl overflow-hidden border border-black-200">
              <div className="bg-white-100 h-8 flex items-center px-4 border-b border-black-200">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                </div>
              </div>
              <div className="bg-white aspect-[16/9] flex items-center justify-center">
                <img 
                  src={heroData.showcaseImage} 
                  alt="Template Showcase" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-black text-white font-bold py-2 px-4 rounded-full shadow-lg transform rotate-12">
              Terlaris!
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}