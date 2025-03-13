// Adapter untuk bcrypt di lingkungan browser
// Untuk produksi, autentikasi dilakukan melalui API server

// URL API server
const API_URL = 'http://localhost:5173';

export const compare = async (plaintext: string, hash: string): Promise<boolean> => {
  try {
    // Kirim permintaan ke server untuk verifikasi password
    const response = await fetch(`${API_URL}/api/auth/verify-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: plaintext, hash }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Gagal memverifikasi password');
    }

    const data = await response.json();
    return data.isValid;
  } catch (error) {
    console.error('Error saat verifikasi password:', error);
    return false;
  }
};

export const hash = async (plaintext: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/hash-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: plaintext }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Gagal melakukan hash password');
    }

    const data = await response.json();
    return data.hash;
  } catch (error) {
    console.error('Error saat hashing password:', error);
    throw error;
  }
};

export default {
  compare,
  hash
}; 