const API_URL = 'http://localhost:5173';

export type Category = {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getAllCategories(): Promise<Category[]> {
  try {
    console.log('Fetching categories from:', `${API_URL}/api/categories`);
    const response = await fetch(`${API_URL}/api/categories`);
    
    // Tambahkan log untuk debugging
    console.log('Categories response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}

export async function getCategoryByName(name: string): Promise<Category | null> {
  const categories = await getAllCategories();
  return categories.find(category => category.name === name) || null;
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const categories = await getAllCategories();
  return categories.find(category => category.id === id) || null;
}

export async function createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
  const response = await fetch(`${API_URL}/api/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create category');
  }

  return response.json();
}

export async function updateCategory(id: string, data: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Category> {
  const response = await fetch(`${API_URL}/api/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update category');
  }

  return response.json();
}

export async function deleteCategory(id: string): Promise<Category> {
  const response = await fetch(`${API_URL}/api/categories/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete category');
  }

  return response.json();
} 