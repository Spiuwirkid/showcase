import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Tambahkan error handler global
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Tambahkan unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found in the DOM");
  }
  
  createRoot(rootElement).render(<App />);
} catch (error) {
  console.error("Error rendering application:", error);
  
  // Tampilkan pesan error ke pengguna
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1 style="color: #e53e3e;">Terjadi Kesalahan</h1>
        <p>Aplikasi tidak dapat dimuat. Silakan coba muat ulang halaman.</p>
        <button onclick="window.location.reload()" style="background: #3182ce; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-top: 16px;">
          Muat Ulang
        </button>
      </div>
    `;
  }
}
