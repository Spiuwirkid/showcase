import { Star, ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    content: "Template yang saya beli tidak hanya menakjubkan secara visual tetapi juga sangat terstruktur. Menghemat waktu pengembangan saya hingga berminggu-minggu.",
    author: "Sarah Johnson",
    role: "Desainer Produk",
    company: "DesignCraft",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5
  },
  {
    id: 2,
    content: "Kualitas luar biasa dengan harga yang jauh lebih murah dibandingkan pengembangan kustom. Klien saya terkesan dengan betapa profesionalnya situs saya.",
    author: "Michael Chen",
    role: "Developer Freelance",
    company: "CodeMasters",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 3,
    content: "Dukungan yang saya terima luar biasa. Setiap pertanyaan dijawab dengan cepat dan dokumentasinya sangat komprehensif.",
    author: "Alex Rivera",
    role: "Direktur Marketing",
    company: "GrowthLabs",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Apa Kata Pelanggan Kami</h2>
          <p className="text-lg text-gray-600">
            Jangan hanya percaya kata-kata kami. Berikut yang pelanggan kami katakan tentang template kami.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              
              <div className="mb-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-2 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#"
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
          >
            Lihat semua ulasan
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}