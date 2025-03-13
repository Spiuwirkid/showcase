import { useParams, Link } from 'react-router-dom';
import { Eye, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCategoryByName, getTemplatesByCategory } from '../lib/db';

type Template = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  featured: boolean;
  tags?: string[];
};

// Temporary mock data until database is fully connected
const CATEGORIES = {
  'e-commerce': {
    title: 'E-commerce Templates',
    description: 'Premium templates for online stores with shopping cart functionality and product showcases.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  'portfolio': {
    title: 'Portfolio Templates',
    description: 'Showcase your work with our beautiful and professional portfolio templates.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  'blog': {
    title: 'Blog Templates',
    description: 'Content-focused templates for writers, bloggers, and content creators.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  'landing-page': {
    title: 'Landing Page Templates',
    description: 'High-converting landing page templates for products, services, and events.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  'dashboard': {
    title: 'Dashboard Templates',
    description: 'Admin panels and dashboard interfaces for data visualization and management.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
};

const TEMPLATES: Template[] = [
  {
    id: '1',
    title: 'Moderna',
    description: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'E-commerce',
    price: 59,
    featured: true,
    tags: ['Modern', 'Shop', 'Minimal'],
  },
  {
    id: '2',
    title: 'Portfolio Pro',
    description: 'Portfolio',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Portfolio',
    price: 49,
    featured: true,
    tags: ['Portfolio', 'Creative', 'Minimal'],
  },
  {
    id: '3',
    title: 'BlogMaster',
    description: 'Blog',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Blog',
    price: 39,
    featured: true,
    tags: ['Blog', 'Content', 'Simple'],
  },
  {
    id: '4',
    title: 'SaaS Landing',
    description: 'Landing Page',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Landing Page',
    price: 69,
    featured: true,
    tags: ['SaaS', 'Landing', 'Business'],
  },
  {
    id: '5',
    title: 'Dashboard X',
    description: 'Dashboard',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Dashboard',
    price: 79,
    featured: false,
    tags: ['Admin', 'Dashboard', 'Analytics'],
  },
  {
    id: '6',
    title: 'Foodie',
    description: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'E-commerce',
    price: 49,
    featured: false,
    tags: ['Food', 'Delivery', 'Restaurant'],
  },
];

export default function CategoryPage() {
  const { id = '' } = useParams();
  const categoryId = id.toLowerCase();
  
  // Comment out React Query for now until database is fully connected
  /*
  const { data: category, isLoading: isCategoryLoading, error: categoryError } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategoryByName(categoryId),
  });
  
  const { data: templates, isLoading: isTemplatesLoading, error: templatesError } = useQuery({
    queryKey: ['templates', categoryId],
    queryFn: () => getTemplatesByCategory(categoryId),
    enabled: !!category,
  });
  
  const isLoading = isCategoryLoading || isTemplatesLoading;
  const error = categoryError || templatesError;
  */
  
  // Use mock data for now
  const category = CATEGORIES[categoryId as keyof typeof CATEGORIES];
  const filteredTemplates = TEMPLATES.filter(template => template.category.toLowerCase() === categoryId);
  
  if (!category) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container-custom pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn-primary py-2 px-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="relative pt-32 pb-20">
        <div className="absolute inset-0 h-96 bg-gradient-to-b from-white to-gray-50 -z-10" />
        
        <div className="container-custom">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">{category.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl animate-slide-in">
              {category.description}
            </p>
          </div>
          
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-medium mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-6">We don't have any templates in this category yet.</p>
              <Link to="/templates" className="btn-primary py-2 px-4">
                Browse All Templates
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template, index) => (
                <div 
                  key={template.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img 
                    src={template.image} 
                    alt={template.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium">{template.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{template.description}</p>
                      </div>
                      <div className="bg-blue-50 text-blue-500 font-medium px-4 py-1 rounded-full text-sm">
                        Rp {template.price.toLocaleString('id-ID')}
                      </div>
                    </div>
                    
                    {template.tags && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {template.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
