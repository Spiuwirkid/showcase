import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern-dots.svg')] opacity-10"></div>
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Meningkatkan Kehadiran Online Anda?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Mulai dengan template premium kami hari ini dan luncurkan website Anda lebih cepat dari sebelumnya.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-blue-500 p-1 rounded-full mt-1 mr-3">
                  <Check className="h-4 w-4" />
                </div>
                <p>Lebih dari 100+ template premium berkualitas tinggi</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 p-1 rounded-full mt-1 mr-3">
                  <Check className="h-4 w-4" />
                </div>
                <p>Dukungan teknis selama 30 hari setelah pembelian</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 p-1 rounded-full mt-1 mr-3">
                  <Check className="h-4 w-4" />
                </div>
                <p>Update gratis seumur hidup untuk setiap template</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/templates" 
                className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-8 rounded-lg font-medium inline-flex items-center justify-center"
              >
                Jelajahi Template
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/contact"
                className="border border-white/30 hover:bg-blue-700 py-3 px-8 rounded-lg font-medium inline-flex items-center justify-center"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
          
          <div className="bg-blue-700 p-8 rounded-xl animate-slide-in">
            <h3 className="text-xl font-semibold mb-6">Dapatkan Diskon 25% untuk Pembelian Pertama</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg bg-blue-800 border border-blue-500 text-white placeholder-blue-300"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg bg-blue-800 border border-blue-500 text-white placeholder-blue-300"
                  placeholder="email@anda.com"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 rounded-lg transition-colors"
              >
                Dapatkan Diskon Sekarang
              </button>
              <p className="text-sm text-blue-200 text-center">
                Kami tidak akan pernah membagikan informasi Anda kepada pihak ketiga.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
