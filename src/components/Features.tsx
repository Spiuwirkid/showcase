import { Check, Zap, Layout, Code, Share2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    title: 'Desain Responsif',
    description: 'Semua template sepenuhnya responsif dan berfungsi dengan sempurna di semua perangkat.',
    icon: Layout
  },
  {
    title: 'Teknologi Modern',
    description: 'Dibangun dengan framework dan teknologi terbaru untuk performa optimal.',
    icon: Zap
  },
  {
    title: 'Ramah Developer',
    description: 'Kode yang bersih dan terdokumentasi dengan baik yang akan dihargai oleh developer.',
    icon: Code
  },
  {
    title: 'Optimasi SEO',
    description: 'Template dibuat dengan praktik SEO terbaik untuk visibilitas yang lebih baik.',
    icon: Share2
  },
  {
    title: 'Kustomisasi Mudah',
    description: 'Mudah menyesuaikan warna, font, dan tata letak untuk mencocokkan brand Anda.',
    icon: Layout
  },
  {
    title: 'Update Rutin',
    description: 'Template diperbarui secara rutin dengan fitur baru dan peningkatan.',
    icon: RefreshCw
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 animate-fade-in">
            Mengapa Memilih Template Kami
          </h2>
          <p className="text-lg text-gray-600 animate-slide-in">
            Dibangun dengan teknologi terbaru dan prinsip desain untuk performa dan estetika optimal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-blue-100 text-blue-600 rounded-lg w-12 h-12 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/templates" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg inline-flex items-center transition-colors">
            Jelajahi Template
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
