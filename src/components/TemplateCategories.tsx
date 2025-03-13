import { Link } from 'react-router-dom';
import { ArrowRight, Eye, ShoppingCart } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'e-commerce',
    title: 'Moderna',
    description: 'E-commerce',
    count: 15,
    price: 59,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Modern', 'Shop', 'Minimal'],
  },
  {
    id: 'portfolio',
    title: 'Portfolio Pro',
    description: 'Portfolio',
    count: 12,
    price: 49,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Portfolio', 'Creative', 'Minimal'],
  },
  {
    id: 'blog',
    title: 'BlogMaster',
    description: 'Blog',
    count: 10,
    price: 39,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Blog', 'Content', 'Simple'],
  },
];

export default function TemplateCategories() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <h2 className="section-heading text-center animate-fade-in">Browse by Category</h2>
        <p className="section-subheading text-center mx-auto animate-slide-in">
          Explore templates by category to find the perfect match for your project.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          {CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {category.id === 'portfolio' && (
                <div className="relative">
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-6">
                    <span className="text-sm uppercase tracking-wider mb-1">{category.description}</span>
                    <h3 className="text-2xl font-medium mb-3">{category.title}</h3>
                    <p className="text-white/90 mb-6">Showcase your work with this minimal portfolio template.</p>
                    <div className="flex gap-3">
                      <Link 
                        to={`/template/${category.id}`} 
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 flex items-center text-sm font-medium transition-colors"
                      >
                        <Eye className="mr-2 h-4 w-4" /> Preview
                      </Link>
                      <Link 
                        to={`/buy/${category.id}`} 
                        className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 flex items-center text-sm font-medium transition-colors"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Buy for Rp {category.price.toLocaleString('id-ID')}
                      </Link>
                    </div>
                  </div>
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-56 object-cover"
                  />
                </div>
              )}
              
              {category.id !== 'portfolio' && (
                <>
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium">{category.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{category.description}</p>
                      </div>
                      <div className="bg-blue-50 text-blue-500 font-medium px-4 py-1 rounded-full text-sm">
                        Rp {category.price.toLocaleString('id-ID')}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                      {category.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
