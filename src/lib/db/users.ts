// import { PrismaClient } from '@prisma/client';

// URL API server
const API_URL = 'http://localhost:5173';

export type UserWithoutPassword = {
  id: string;
  name: string | null;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
};

export type User = UserWithoutPassword & {
  password: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export type UpdateUserInput = {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'user';
};

// Fungsi untuk mengambil semua users via API
export async function getAllUsers(): Promise<UserWithoutPassword[]> {
  try {
    const response = await fetch(`${API_URL}/api/users`);
    if (!response.ok) {
      throw new Error('Gagal mengambil data pengguna');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting users:', error);
    throw new Error('Gagal mengambil data pengguna');
  }
}

// Create new user
export async function createUser(data: CreateUserInput) {
  try {
    // Check if email already exists
    const existingUser = await fetch(`${API_URL}/api/users/email/${data.email}`);
    if (existingUser) {
      throw new Error('Email sudah terdaftar');
    }

    // Create user
    const response = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, role: data.role }),
    });

    if (!response.ok) {
      throw new Error('Gagal membuat pengguna baru');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Gagal membuat pengguna baru');
  }
}

// Update user
export async function updateUser(id: string, data: UpdateUserInput) {
  try {
    // If updating email, check if new email already exists
    if (data.email) {
      const existingUser = await fetch(`${API_URL}/api/users/email/${data.email}`);
      if (existingUser) {
        throw new Error('Email sudah digunakan');
      }
    }

    // If updating password, hash it
    let updateData = { ...data };
    if (data.password) {
      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData.password = hashedPassword;
    }

    // Update user
    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Gagal memperbarui pengguna');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Gagal memperbarui pengguna');
  }
}

// Delete user
export async function deleteUser(id: string) {
  try {
    // Check if user exists
    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Pengguna tidak ditemukan');
    }

    // Don't allow deleting the last admin
    const user = await fetch(`${API_URL}/api/users/${id}`);
    if (user.role === 'admin') {
      const adminCount = await fetch(`${API_URL}/api/users/count?role=admin`);
      if (adminCount.adminCount <= 1) {
        throw new Error('Tidak dapat menghapus admin terakhir');
      }
    }

    // Delete user
    await response.json();

    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Gagal menghapus pengguna');
  }
}

export async function getUserById(id: string): Promise<UserWithoutPassword | null> {
  try {
    const response = await fetch(`${API_URL}/api/users/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/api/users/email/${email}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user by email ${email}:`, error);
    return null;
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}

export async function isAdmin(user: UserWithoutPassword) {
  return user?.role === 'admin';
}

export async function createAdminUser(name: string, email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role: 'admin' }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { 
        success: false, 
        message: data.error || 'Gagal membuat user admin' 
      };
    }
    
    return { success: true, user: data };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return { success: false, message: 'Gagal membuat user admin' };
  }
}

export async function hasAnyAdmin() {
  try {
    const response = await fetch(`${API_URL}/api/users/has-admin`);
    if (!response.ok) {
      throw new Error('Gagal memeriksa keberadaan admin');
    }
    const data = await response.json();
    return data.hasAdmin;
  } catch (error) {
    console.error('Error checking admin existence:', error);
    return false;
  }
}