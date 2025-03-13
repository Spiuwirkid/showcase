import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingCart, ArrowRight, Star, Tag } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getHotTemplates } from '../lib/db/templates';
import { motion } from 'framer-motion';

export default function HotTemplates() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Fetch hot templates dari API
  const { data: hotTemplates = [], isLoading, error } = useQuery({
    queryKey: ['hotTemplates'],
    queryFn: getHotTemplates
  });
  
  if (isLoading) {
    return (
      <section className="py-24 bg-zinc-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                <span className="text-zinc-900">Hot Templates</span>
              </h2>
              <p className="text-zinc-600 text-lg">
                Template terbaik kami yang sedang populer saat ini.
              </p>
            </div>
          </div>
          
          <div className="grid place-items-center h-64">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-zinc-800 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <div className="absolute top-1 left-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full border-4 border-t-transparent border-r-transparent border-b-zinc-600 border-l-transparent animate-spin" style={{animationDuration: '1.5s'}}></div>
              <div className="absolute top-2 left-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full border-4 border-t-transparent border-r-zinc-400 border-b-transparent border-l-transparent animate-spin" style={{animationDuration: '2s'}}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="py-24 bg-zinc-100">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4 text-red-500">Error Loading Templates</h2>
          <p className="text-zinc-600">
            Maaf, terjadi kesalahan saat memuat template. Silakan coba lagi nanti.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-zinc-100 to-transparent opacity-70"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern-light.svg')] bg-center opacity-5"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
              <span className="text-black">Hot Templates</span>
            </h2>
            <p className="text-zinc-600 text-lg">
              Template terbaik kami yang sedang populer saat ini.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/templates"
              className="inline-flex items-center text-zinc-800 hover:text-black font-medium group"
            >
              Lihat semua template
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200"
            >
              <div className="relative overflow-hidden aspect-[16/9]">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end transition-opacity duration-300 ${hoveredId === template.id ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="p-6 w-full flex justify-between items-center">
                    <Link
                      to={`/template/${template.id}`}
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white rounded-full py-2 px-4 hover:bg-white/30 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </Link>
                    <Link
                      to={template.whatsappLink || `https://wa.me/your-number?text=Saya tertarik dengan template ${template.title}`}
                      className="flex items-center gap-2 bg-white text-black rounded-full py-2 px-4 hover:bg-gray-100 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Beli Sekarang
                    </Link>
                  </div>
                </div>
                
                {/* Labels */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {template.hotTemplate && (
                    <span className="bg-black text-white text-xs font-bold py-1 px-2 rounded-full">HOT</span>
                  )}
                  {template.featured && (
                    <span className="bg-white text-black text-xs font-bold py-1 px-2 rounded-full">FEATURED</span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-zinc-900 hover:text-black transition-colors">
                    <Link to={`/template/${template.id}`}>{template.title}</Link>
                  </h3>
                  <div className="flex items-center gap-1 bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded-full">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-xs font-medium">{template.hotLevel || 4.5}</span>
                  </div>
                </div>
                
                <p className="text-zinc-600 text-sm mb-4 line-clamp-2">
                  {template.shortDescription || template.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-black font-bold">
                      Rp {template.price.toLocaleString('id-ID')}
                    </span>
                    {template.discount && template.discount > 0 && (
                      <span className="text-zinc-400 text-sm line-through">
                        Rp {(template.price + template.discount).toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-500 flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {template.category}
                  </div>
                </div>
                
                {template.tags && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            to="/templates"
            className="group relative overflow-hidden rounded-full bg-black px-8 py-4 font-medium text-white shadow-lg transition-transform hover:scale-105 inline-flex items-center"
          >
            <span className="relative z-10 flex items-center">
              Jelajahi Semua Template
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}