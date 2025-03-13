import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ShoppingCart, Check, Star, Eye, Download, Code, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getTemplateById, getTemplatesByCategory } from '../lib/db/templates';

export default function TemplateDetail() {
  const { id } = useParams<{ id: string }>();

  // Fetch template data
  const { data: template, isLoading, error } = useQuery({
    queryKey: ['template', id],
    queryFn: () => getTemplateById(id as string),
    enabled: !!id,
  });

  // Log template data untuk debugging
  console.log('Template data:', template);
  console.log('Features:', template?.features);
  console.log('Features type:', template?.features ? typeof template.features : 'undefined');
  console.log('Features is array:', template?.features ? Array.isArray(template.features) : 'undefined');

  // Fetch related templates
  const { data: relatedTemplates = [] } = useQuery({
    queryKey: ['relatedTemplates', template?.category],
    queryFn: () => getTemplatesByCategory(template?.category || ''),
    enabled: !!template?.category,
  });

  // Filter out the current template and limit to 3 templates
  const filteredRelatedTemplates = relatedTemplates
    .filter(relatedTemplate => relatedTemplate.id !== id)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container-custom pt-32 pb-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container-custom pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Template Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-6">Template yang Anda cari tidak ada atau telah dihapus.</p>
          <Link to="/templates" className="btn-primary py-2 px-4 inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Templates
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate discounted price if applicable
  const originalPrice = template.price;
  const discountedPrice = template.discount > 0 
    ? Math.round(template.price * (1 - template.discount)) 
    : null;
  const displayPrice = discountedPrice || originalPrice;
  const saveAmount = discountedPrice ? originalPrice - discountedPrice : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container-custom pt-24 pb-20">
        {/* Navigation */}
        <div className="mb-6">
          <Link to="/templates" className="inline-flex items-center text-blue-500 hover:text-blue-600 text-sm">
            ← Kembali ke Templates
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Preview Image */}
          <div>
            <div className="rounded-lg overflow-hidden bg-gray-100 border border-gray-200 aspect-[16/9]">
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Template Info */}
          <div>
            {/* Category & Rating */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {template.category || "E-commerce"}
              </span>
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">({template.reviews || 0} ulasan)</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-2">{template.title}</h1>
            <p className="text-gray-600 mb-6">{template.description}</p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-blue-500">Rp {displayPrice.toLocaleString('id-ID')}</span>
              {discountedPrice && (
                <>
                  <span className="text-gray-400 line-through">Rp {originalPrice.toLocaleString('id-ID')}</span>
                  <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                    Hemat Rp {saveAmount.toLocaleString('id-ID')}
                  </span>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mb-1">
                  <Download className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-medium">{template.downloads || 0}</span>
                  <span className="block text-xs text-gray-500">Unduhan</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mb-1">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-medium">Bersih</span>
                  <span className="block text-xs text-gray-500">Kode</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mb-1">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-medium">{template.reviews || 0}</span>
                  <span className="block text-xs text-gray-500">Dukungan</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {template.whatsappLink ? (
                <a 
                  href={template.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Beli Template
                </a>
              ) : (
                <button disabled className="w-full bg-gray-400 text-white py-3 rounded-lg flex items-center justify-center cursor-not-allowed">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Beli Template
                </button>
              )}
              <div className="grid grid-cols-2 gap-3">
                <button className="w-full py-2 border border-gray-200 rounded-lg text-center flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  Simpan
                </button>
                {template.previewLink ? (
                  <a 
                    href={template.previewLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2 border border-gray-200 rounded-lg text-center flex items-center justify-center"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Pratinjau
                  </a>
                ) : (
                  <button disabled className="w-full py-2 border border-gray-200 bg-gray-50 text-gray-400 rounded-lg text-center flex items-center justify-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Pratinjau
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About This Template */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Tentang Template Ini</h2>
            <p className="text-gray-600 mb-8">
              {template.description}
            </p>

            {/* What's Included */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-bold mb-4">Fitur yang Disertakan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                {(() => {
                  // Cek apakah features ada dan merupakan array
                  const hasFeatures = template.features && Array.isArray(template.features) && template.features.length > 0;
                  
                  // Jika ada fitur, tampilkan
                  if (hasFeatures) {
                    return template.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ));
                  }
                  
                  // Jika tidak ada fitur, tampilkan pesan
                  return (
                    <div className="col-span-2 text-gray-500">
                      Tidak ada fitur yang ditambahkan untuk template ini. Silakan edit template untuk menambahkan fitur.
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Template Details Sidebar */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Detail Template</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Kategori:</span>
                <span className="font-medium">{template.category || "E-commerce"}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Rilis:</span>
                <span className="font-medium">
                  {new Date(template.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Terakhir Diperbarui:</span>
                <span className="font-medium">
                  {new Date(template.updatedAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Framework/Technology:</span>
                <span className="font-medium">
                  {template.techSpecs?.framework || "HTML, CSS, JS"}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Dokumentasi:</span>
                <span className="font-medium">
                  {template.techSpecs?.documentation ? "Ya" : "Tidak"}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Lisensi:</span>
                <span className="font-medium">Standard</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold mb-2">Butuh Bantuan?</h4>
              <p className="text-sm text-gray-600 mb-2">Punya pertanyaan tentang template ini?</p>
              <a 
                href={`mailto:${template.supportEmail}`}
                className="text-blue-500 text-sm hover:underline"
              >
                {template.supportEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Related Templates */}
        {filteredRelatedTemplates.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Template Serupa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredRelatedTemplates.map((relatedTemplate) => (
                <Link
                  key={relatedTemplate.id}
                  to={`/template/${relatedTemplate.id}`}
                  className="group"
                >
                  <div className="rounded-lg overflow-hidden bg-gray-100 border border-gray-200 aspect-[16/9] mb-3">
                    <img
                      src={relatedTemplate.image}
                      alt={relatedTemplate.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{relatedTemplate.title}</h3>
                  <p className="text-blue-600">Rp {relatedTemplate.price.toLocaleString('id-ID')}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
