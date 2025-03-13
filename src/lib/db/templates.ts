const API_BASE_URL = 'http://localhost:5173/api';

export type Template = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  category: string;
  price: number;
  discount?: number;
  previewLink?: string;
  whatsappLink?: string;
  featured: boolean;
  hotTemplate: boolean;
  hotLevel: number;
  tags: string[];
  features?: string[];
  techSpecs?: {
    framework?: string;
    responsive?: boolean;
    browserSupport?: string[];
    documentation?: boolean;
    lastUpdate?: string;
    filesIncluded?: string;
    license?: string;
  };
  documentation?: {
    installation?: string;
    configuration?: string;
    customization?: string;
  };
  demoContent?: boolean;
  supportInfo?: {
    type?: string;
    duration?: string;
    includes?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
};

export async function getAllTemplates(): Promise<Template[]> {
  const response = await fetch(`${API_BASE_URL}/templates`);
  if (!response.ok) {
    throw new Error('Failed to fetch templates');
  }
  const data = await response.json();
  return data;
}

export async function getTemplateById(id: string): Promise<Template | null> {
  const response = await fetch(`${API_BASE_URL}/templates/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch template');
  }
  return response.json();
}

export async function getTemplatesByCategory(category: string): Promise<Template[]> {
  const response = await fetch(`${API_BASE_URL}/templates?category=${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch templates by category');
  }
  const data = await response.json();
  return data;
}

export async function getFeaturedTemplates(): Promise<Template[]> {
  const response = await fetch(`${API_BASE_URL}/templates?featured=true`);
  if (!response.ok) {
    throw new Error('Failed to fetch featured templates');
  }
  const data = await response.json();
  return data;
}

export async function getHotTemplates(): Promise<Template[]> {
  const response = await fetch(`${API_BASE_URL}/templates?hotTemplate=true`);
  if (!response.ok) {
    throw new Error('Failed to fetch hot templates');
  }
  const data = await response.json();
  return data;
}

export async function createTemplate(data: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>): Promise<Template> {
  const response = await fetch(`${API_BASE_URL}/templates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create template');
  }

  return response.json();
}

export async function updateTemplate(id: string, data: Partial<Omit<Template, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Template> {
  console.log('Updating template with data:', data);
  
  const response = await fetch(`${API_BASE_URL}/templates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error updating template:', error);
    throw new Error(error.error || 'Failed to update template');
  }

  const result = await response.json();
  console.log('Update template response:', result);
  return result;
}

export async function deleteTemplate(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/templates/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete template');
  }
} 