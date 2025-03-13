import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTemplateById, createTemplate, updateTemplate } from '../../lib/db/templates';
import { getAllCategories } from '../../lib/db/categories';

export default function TemplateForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id) && id !== 'new';

  // State untuk form
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    price: string;
    discount: string;
    previewLink: string;
    whatsappLink: string;
    supportEmail: string;
    description: string;
    shortDescription: string;
    status: string;
    featured: boolean;
    hotTemplate: boolean;
    hotLevel: number;
    image: string;
    imageFile: File | null;
    tags: string[];
    features: string[];
    downloads: number;
    reviews: number;
    commonFeatures: {
      responsiveDesign: boolean;
      shoppingCart: boolean;
      accountManagement: boolean;
      productReviews: boolean;
      productFiltering: boolean;
      paymentProcessing: boolean;
      wishlist: boolean;
      seoOptimized: boolean;
      customFeatures: string[];
    };
    techSpecs: {
      framework: string;
      responsive: boolean;
      browserSupport: string[];
      documentation: boolean;
      lastUpdate: string;
    };
    documentation: {
      installation: string;
      configuration: string;
      customization: string;
    };
    demoContent: boolean;
    supportInfo: {
      type: string;
      duration: string;
      includes: string[];
    };
  }>({
    title: '',
    category: '',
    price: '',
    discount: '',
    previewLink: '',
    whatsappLink: '',
    supportEmail: '',
    description: '',
    shortDescription: '',
    status: 'Aktif',
    featured: false,
    hotTemplate: false,
    hotLevel: 0,
    image: '',
    imageFile: null,
    tags: [],
    features: [],
    downloads: 0,
    reviews: 0,
    commonFeatures: {
      responsiveDesign: false,
      shoppingCart: false,
      accountManagement: false,
      productReviews: false,
      productFiltering: false,
      paymentProcessing: false,
      wishlist: false,
      seoOptimized: false,
      customFeatures: []
    },
    techSpecs: {
      framework: '',
      responsive: true,
      browserSupport: ['Chrome', 'Firefox', 'Safari', 'Edge'],
      documentation: true,
      lastUpdate: new Date().toISOString().split('T')[0]
    },
    documentation: {
      installation: '',
      configuration: '',
      customization: ''
    },
    demoContent: true,
    supportInfo: {
      type: 'Email',
      duration: '6 months',
      includes: ['Bug fixes', 'Code customization help']
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch categories
  const { data: categoriesData = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  // Get categories names
  const categories = categoriesData.map(category => category.name);

  // Fetch template data if editing
  const { data: templateData, isLoading: templateLoading } = useQuery({
    queryKey: ['template', id],
    queryFn: () => getTemplateById(id as string),
    enabled: isEditing
  });

  // Create template mutation
  const createTemplateMutation = useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      navigate('/admin-dashboard-spiuwirkid/templates');
    }
  });

  // Update template mutation
  const updateTemplateMutation = useMutation({
    mutationFn: (data: any) => updateTemplate(id as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      queryClient.invalidateQueries({ queryKey: ['template', id] });
      navigate('/admin-dashboard-spiuwirkid/templates');
    }
  });

  // Set form data when template data is loaded
  useEffect(() => {
    if (templateData) {
      // Extract common features from features array if they exist
      const commonFeatures = {
        responsiveDesign: templateData.features?.includes('Responsive design (for all devices)') || false,
        shoppingCart: templateData.features?.includes('Shopping cart functionality') || false,
        accountManagement: templateData.features?.includes('Customer account management') || false,
        productReviews: templateData.features?.includes('Product reviews and ratings') || false,
        productFiltering: templateData.features?.includes('Product filtering and sorting') || false,
        paymentProcessing: templateData.features?.includes('Integrated payment processing') || false,
        wishlist: templateData.features?.includes('Wishlist feature') || false,
        seoOptimized: templateData.features?.includes('SEO optimized structure') || false,
        customFeatures: templateData.features?.filter(feature => 
          !['Responsive design (for all devices)', 'Shopping cart functionality', 'Customer account management', 
            'Product reviews and ratings', 'Product filtering and sorting', 'Integrated payment processing', 
            'Wishlist feature', 'SEO optimized structure'].includes(feature)
        ) || []
      };

      setFormData({
        title: templateData.title,
        category: templateData.category,
        price: templateData.price.toString(),
        discount: templateData.discount?.toString() || '0',
        previewLink: templateData.previewLink || '',
        whatsappLink: templateData.whatsappLink || '',
        supportEmail: templateData.supportEmail || '',
        description: templateData.description || '',
        shortDescription: templateData.shortDescription || '',
        status: 'Aktif',
        featured: templateData.featured,
        hotTemplate: templateData.hotTemplate,
        hotLevel: templateData.hotLevel,
        image: templateData.image,
        imageFile: null,
        tags: templateData.tags || [],
        features: templateData.features || [],
        downloads: templateData.downloads || 0,
        reviews: templateData.reviews || 0,
        commonFeatures,
        techSpecs: {
          framework: templateData.techSpecs?.framework || '',
          responsive: templateData.techSpecs?.responsive || true,
          browserSupport: templateData.techSpecs?.browserSupport || ['Chrome', 'Firefox', 'Safari', 'Edge'],
          documentation: templateData.techSpecs?.documentation || true,
          lastUpdate: templateData.techSpecs?.lastUpdate || new Date().toISOString().split('T')[0]
        },
        documentation: {
          installation: templateData.documentation?.installation || '',
          configuration: templateData.documentation?.configuration || '',
          customization: templateData.documentation?.customization || ''
        },
        demoContent: templateData.demoContent || true,
        supportInfo: {
          type: templateData.supportInfo?.type || 'Email',
          duration: templateData.supportInfo?.duration || '6 months',
          includes: templateData.supportInfo?.includes || ['Bug fixes', 'Code customization help']
        }
      });
    }
  }, [templateData]);

  // Handle perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle tags input
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags }));
  };

  // Handle perubahan input untuk features
  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value.split('\n').map(feature => feature.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, features }));
  };

  // Handle perubahan input untuk techSpecs
  const handleTechSpecsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      techSpecs: {
        ...prev.techSpecs,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }
    }));
  };

  // Handle perubahan input untuk documentation
  const handleDocumentationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      documentation: {
        ...prev.documentation,
        [name]: value
      }
    }));
  };

  // Handle perubahan input untuk supportInfo
  const handleSupportInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      supportInfo: {
        ...prev.supportInfo,
        [name]: value
      }
    }));
  };

  // Handle common features checkbox changes
  const handleCommonFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      commonFeatures: {
        ...prev.commonFeatures,
        [name]: checked
      }
    }));
  };

  // Handle custom features input
  const handleCustomFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const customFeatures = e.target.value.split('\n').map(feature => feature.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      commonFeatures: {
        ...prev.commonFeatures,
        customFeatures
      }
    }));
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validasi form
      if (!formData.title || !formData.category || !formData.price || !formData.description || (!formData.image && !formData.imageFile)) {
        setError('Mohon lengkapi semua field yang wajib diisi');
        setLoading(false);
        return;
      }

      let imageUrl = formData.image;

      // Upload gambar jika ada file baru
      if (formData.imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append('image', formData.imageFile);

        const uploadResponse = await fetch('http://localhost:5173/api/upload', {
          method: 'POST',
          body: formDataUpload,
        });

        if (!uploadResponse.ok) {
          throw new Error('Gagal mengupload gambar');
        }

        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.url;
      }

      // Combine common features and custom features into a single features array
      const features = [
        ...(formData.commonFeatures.responsiveDesign ? ['Responsive design (for all devices)'] : []),
        ...(formData.commonFeatures.shoppingCart ? ['Shopping cart functionality'] : []),
        ...(formData.commonFeatures.accountManagement ? ['Customer account management'] : []),
        ...(formData.commonFeatures.productReviews ? ['Product reviews and ratings'] : []),
        ...(formData.commonFeatures.productFiltering ? ['Product filtering and sorting'] : []),
        ...(formData.commonFeatures.paymentProcessing ? ['Integrated payment processing'] : []),
        ...(formData.commonFeatures.wishlist ? ['Wishlist feature'] : []),
        ...(formData.commonFeatures.seoOptimized ? ['SEO optimized structure'] : []),
        ...formData.commonFeatures.customFeatures
      ];

      console.log('Features yang akan dikirim ke API:', features);
      console.log('Common features:', formData.commonFeatures);
      console.log('Custom features:', formData.commonFeatures.customFeatures);

      // Prepare data for submission
      const templateData = {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription,
        image: imageUrl,
        category: formData.category,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount || '0'),
        previewLink: formData.previewLink,
        whatsappLink: formData.whatsappLink,
        featured: formData.featured,
        hotTemplate: formData.hotTemplate,
        hotLevel: parseInt(formData.hotLevel.toString()),
        tags: formData.tags,
        features: features,
        techSpecs: formData.techSpecs,
        documentation: formData.documentation,
        demoContent: formData.demoContent,
        supportInfo: formData.supportInfo,
        supportEmail: formData.supportEmail,
        downloads: formData.downloads,
        reviews: formData.reviews
      };

      console.log('Data template lengkap yang dikirim:', templateData);

      if (isEditing) {
        updateTemplateMutation.mutate(templateData);
      } else {
        createTemplateMutation.mutate(templateData);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  if (templateLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/admin-dashboard-spiuwirkid/templates')}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edit Template' : 'Tambah Template Baru'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama Template */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Template <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Kategori */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Harga */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Harga (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Gambar <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-24 w-24 border rounded-md overflow-hidden bg-gray-100">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Create object URL for preview
                        const imageUrl = URL.createObjectURL(file);
                        setFormData(prev => ({ ...prev, image: imageUrl, imageFile: file }));
                      }
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    PNG, JPG, GIF hingga 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Link */}
          <div>
            <label htmlFor="previewLink" className="block text-sm font-medium text-gray-700 mb-1">
              Link Preview
            </label>
            <input
              type="url"
              id="previewLink"
              name="previewLink"
              value={formData.previewLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/preview"
            />
          </div>

          {/* Downloads */}
          <div>
            <label htmlFor="downloads" className="block text-sm font-medium text-gray-700 mb-1">
              Downloads
            </label>
            <input
              type="number"
              id="downloads"
              name="downloads"
              value={formData.downloads}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Reviews */}
          <div>
            <label htmlFor="reviews" className="block text-sm font-medium text-gray-700 mb-1">
              Reviews
            </label>
            <input
              type="number"
              id="reviews"
              name="reviews"
              value={formData.reviews}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (pisahkan dengan koma)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="modern, responsive, business"
            />
          </div>

          {/* Featured & Hot Template */}
          <div className="flex space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                Featured Template
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hotTemplate"
                name="hotTemplate"
                checked={formData.hotTemplate}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hotTemplate" className="ml-2 text-sm text-gray-700">
                Hot Template
              </label>
            </div>
          </div>

          {/* Hot Level */}
          <div>
            <label htmlFor="hotLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Hot Level (1-5)
            </label>
            <select
              id="hotLevel"
              name="hotLevel"
              value={formData.hotLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!formData.hotTemplate}
            >
              <option value="0">0 - Tidak Hot</option>
              <option value="1">1 - Sedikit Hot</option>
              <option value="2">2 - Cukup Hot</option>
              <option value="3">3 - Hot</option>
              <option value="4">4 - Sangat Hot</option>
              <option value="5">5 - Terpanas</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Lengkap <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Deskripsi ini akan ditampilkan di halaman detail template
            </p>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          {/* Deskripsi Singkat */}
          <div className="md:col-span-2">
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Singkat <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Deskripsi ini akan ditampilkan saat hover pada card template
            </p>
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={3}
              maxLength={150}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Masukkan deskripsi singkat (maksimal 150 karakter)"
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">
              {formData.shortDescription.length}/150 karakter
            </p>
          </div>

          {/* WhatsApp Link */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link WhatsApp
            </label>
            <input
              type="url"
              name="whatsappLink"
              value={formData.whatsappLink}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://wa.me/62xxx?text=Saya%20tertarik%20dengan%20template%20ini"
            />
            <p className="mt-1 text-sm text-gray-500">
              Format: https://wa.me/62xxx?text=Pesan
            </p>
          </div>
        </div>

        {/* Fitur-fitur Template */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Fitur-fitur Template (What's Included)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="responsiveDesign"
                name="responsiveDesign"
                checked={formData.commonFeatures.responsiveDesign}
                onChange={handleCommonFeatureChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="responsiveDesign" className="text-sm text-gray-700">
                Responsive design (for all devices)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="shoppingCart"
                name="shoppingCart"
                checked={formData.commonFeatures.shoppingCart}
                onChange={handleCommonFeatureChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="shoppingCart" className="text-sm text-gray-700">
                Shopping cart functionality
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="accountManagement"
                name="accountManagement"
                checked={formData.commonFeatures.accountManagement}
                onChange={handleCommonFeatureChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="accountManagement" className="text-sm text-gray-700">
                Customer account management
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="productReviews"
                name="productReviews"
                checked={formData.commonFeatures.productReviews}
                onChange={handleCommonFeatureChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="productReviews" className="text-sm text-gray-700">
                Product reviews and ratings
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="productFiltering"
                name="productFiltering"
                checked={formData.commonFeatures.productFiltering}
                onChange={handleCommonFeatureChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="productFiltering" className="text-sm text-gray-700">
                Product filtering and sorting
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="paymentProcessing"
                name="paymentProcessing"
                checked={formData.commonFeatures.paymentProcessing}
                onChange={handleCommonFeatureChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="paymentProcessing" className="text-sm text-gray-700">
                Integrated payment processing
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="wishlist"
                name="wishlist"
                checked={formData.commonFeatures.wishlist}
                onChange={handleCommonFeatureChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="wishlist" className="text-sm text-gray-700">
                Wishlist feature
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="seoOptimized"
                name="seoOptimized"
                checked={formData.commonFeatures.seoOptimized}
                onChange={handleCommonFeatureChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="seoOptimized" className="text-sm text-gray-700">
                SEO optimized structure
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="customFeatures" className="block text-sm font-medium text-gray-700 mb-1">
              Fitur Tambahan (satu fitur per baris)
            </label>
            <textarea
              id="customFeatures"
              name="customFeatures"
              value={formData.commonFeatures.customFeatures.join('\n')}
              onChange={handleCustomFeaturesChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Multi-language support&#10;Advanced analytics&#10;Custom theme options"
            />
          </div>
        </div>

        {/* Spesifikasi Teknis */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Spesifikasi Teknis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="framework" className="block text-sm font-medium text-gray-700 mb-1">
                Framework/Technology
              </label>
              <input
                type="text"
                id="framework"
                name="framework"
                value={formData.techSpecs.framework}
                onChange={handleTechSpecsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, Vue, Laravel, etc."
              />
            </div>
            <div>
              <label htmlFor="lastUpdate" className="block text-sm font-medium text-gray-700 mb-1">
                Terakhir Diperbarui
              </label>
              <input
                type="date"
                id="lastUpdate"
                name="lastUpdate"
                value={formData.techSpecs.lastUpdate}
                onChange={handleTechSpecsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="responsive"
                name="responsive"
                checked={formData.techSpecs.responsive}
                onChange={handleTechSpecsChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="responsive" className="text-sm text-gray-700">
                Responsive Design
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="documentation"
                name="documentation"
                checked={formData.techSpecs.documentation}
                onChange={handleTechSpecsChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="documentation" className="text-sm text-gray-700">
                Includes Documentation
              </label>
            </div>
          </div>
        </div>

        {/* Dokumentasi */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Dokumentasi</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="installation" className="block text-sm font-medium text-gray-700 mb-1">
                Panduan Instalasi
              </label>
              <textarea
                id="installation"
                name="installation"
                value={formData.documentation.installation}
                onChange={handleDocumentationChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Langkah-langkah instalasi template..."
              />
            </div>
            <div>
              <label htmlFor="configuration" className="block text-sm font-medium text-gray-700 mb-1">
                Konfigurasi
              </label>
              <textarea
                id="configuration"
                name="configuration"
                value={formData.documentation.configuration}
                onChange={handleDocumentationChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Panduan konfigurasi template..."
              />
            </div>
            <div>
              <label htmlFor="customization" className="block text-sm font-medium text-gray-700 mb-1">
                Panduan Kustomisasi
              </label>
              <textarea
                id="customization"
                name="customization"
                value={formData.documentation.customization}
                onChange={handleDocumentationChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cara melakukan kustomisasi template..."
              />
            </div>
          </div>
        </div>

        {/* Informasi Support */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Informasi Dukungan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="supportType" className="block text-sm font-medium text-gray-700 mb-1">
                Tipe Dukungan
              </label>
              <select
                id="supportType"
                name="type"
                value={formData.supportInfo.type}
                onChange={handleSupportInfoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Email">Email Support</option>
                <option value="Ticket">Ticket System</option>
                <option value="Forum">Forum Support</option>
              </select>
            </div>
            <div>
              <label htmlFor="supportDuration" className="block text-sm font-medium text-gray-700 mb-1">
                Durasi Dukungan
              </label>
              <select
                id="supportDuration"
                name="duration"
                value={formData.supportInfo.duration}
                onChange={handleSupportInfoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="3 months">3 Bulan</option>
                <option value="6 months">6 Bulan</option>
                <option value="12 months">12 Bulan</option>
                <option value="lifetime">Seumur Hidup</option>
              </select>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Informasi Dukungan</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email Dukungan</label>
              <input
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: support@namadomain.com"
              />
            </div>
            {/* ... existing support info fields ... */}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/admin-dashboard-spiuwirkid/templates')}
            className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading || createTemplateMutation.isPending || updateTemplateMutation.isPending}
          >
            {(loading || createTemplateMutation.isPending || updateTemplateMutation.isPending) ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={18} className="mr-1" />
                Simpan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 