import { useState } from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
  // State untuk form
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'TemplateHub',
    siteDescription: 'Marketplace untuk template website premium',
    contactEmail: 'admin@templatehub.com',
    phoneNumber: '+62 812 3456 7890',
    address: 'Jl. Contoh No. 123, Jakarta, Indonesia'
  });

  const [socialSettings, setSocialSettings] = useState({
    facebook: 'https://facebook.com/templatehub',
    twitter: 'https://twitter.com/templatehub',
    instagram: 'https://instagram.com/templatehub',
    youtube: '',
    linkedin: 'https://linkedin.com/company/templatehub'
  });

  const [paymentSettings, setPaymentSettings] = useState({
    currency: 'IDR',
    paymentMethods: ['bank_transfer', 'credit_card', 'paypal'],
    bankName: 'Bank Central Asia',
    accountNumber: '1234567890',
    accountName: 'PT Template Hub Indonesia'
  });

  // Handle perubahan input untuk pengaturan umum
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  // Handle perubahan input untuk pengaturan sosial media
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialSettings(prev => ({ ...prev, [name]: value }));
  };

  // Handle perubahan input untuk pengaturan pembayaran
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentSettings(prev => ({ ...prev, [name]: value }));
  };

  // Handle perubahan checkbox untuk metode pembayaran
  const handlePaymentMethodChange = (method: string) => {
    setPaymentSettings(prev => {
      const methods = [...prev.paymentMethods];
      
      if (methods.includes(method)) {
        return {
          ...prev,
          paymentMethods: methods.filter(m => m !== method)
        };
      } else {
        return {
          ...prev,
          paymentMethods: [...methods, method]
        };
      }
    });
  };

  // Handle submit form
  const handleSubmit = (e: React.FormEvent, formType: 'general' | 'social' | 'payment') => {
    e.preventDefault();
    
    // Simulasi penyimpanan pengaturan (akan diganti dengan panggilan API nanti)
    console.log(`Menyimpan pengaturan ${formType}:`, 
      formType === 'general' ? generalSettings : 
      formType === 'social' ? socialSettings : 
      paymentSettings
    );

    alert(`Pengaturan ${formType} berhasil disimpan!`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Pengaturan</h1>

      {/* Pengaturan Umum */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Umum</h2>
        <form onSubmit={(e) => handleSubmit(e, 'general')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Situs
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={generalSettings.siteName}
                onChange={handleGeneralChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email Kontak
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={generalSettings.contactEmail}
                onChange={handleGeneralChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Telepon
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={generalSettings.phoneNumber}
                onChange={handleGeneralChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Alamat
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={generalSettings.address}
                onChange={handleGeneralChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi Situs
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                value={generalSettings.siteDescription}
                onChange={handleGeneralChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save size={18} className="mr-1" />
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>

      {/* Pengaturan Sosial Media */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Sosial Media</h2>
        <form onSubmit={(e) => handleSubmit(e, 'social')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                value={socialSettings.facebook}
                onChange={handleSocialChange}
                placeholder="https://facebook.com/yourusername"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                Twitter
              </label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                value={socialSettings.twitter}
                onChange={handleSocialChange}
                placeholder="https://twitter.com/yourusername"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                value={socialSettings.instagram}
                onChange={handleSocialChange}
                placeholder="https://instagram.com/yourusername"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-1">
                YouTube
              </label>
              <input
                type="url"
                id="youtube"
                name="youtube"
                value={socialSettings.youtube}
                onChange={handleSocialChange}
                placeholder="https://youtube.com/yourchannel"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={socialSettings.linkedin}
                onChange={handleSocialChange}
                placeholder="https://linkedin.com/company/yourcompany"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save size={18} className="mr-1" />
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>

      {/* Pengaturan Pembayaran */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Pembayaran</h2>
        <form onSubmit={(e) => handleSubmit(e, 'payment')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                Mata Uang
              </label>
              <select
                id="currency"
                name="currency"
                value={paymentSettings.currency}
                onChange={handlePaymentChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="IDR">Rupiah (IDR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="SGD">Singapore Dollar (SGD)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metode Pembayaran
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="bank_transfer"
                    checked={paymentSettings.paymentMethods.includes('bank_transfer')}
                    onChange={() => handlePaymentMethodChange('bank_transfer')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="bank_transfer" className="ml-2 text-sm text-gray-700">
                    Transfer Bank
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="credit_card"
                    checked={paymentSettings.paymentMethods.includes('credit_card')}
                    onChange={() => handlePaymentMethodChange('credit_card')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="credit_card" className="ml-2 text-sm text-gray-700">
                    Kartu Kredit
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="paypal"
                    checked={paymentSettings.paymentMethods.includes('paypal')}
                    onChange={() => handlePaymentMethodChange('paypal')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="paypal" className="ml-2 text-sm text-gray-700">
                    PayPal
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Bank
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={paymentSettings.bankName}
                onChange={handlePaymentChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Rekening
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={paymentSettings.accountNumber}
                onChange={handlePaymentChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Pemilik Rekening
              </label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                value={paymentSettings.accountName}
                onChange={handlePaymentChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save size={18} className="mr-1" />
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 