import { PrismaClient } from '@prisma/client';
import * as bcrypt from '../src/lib/bcryptAdapter';

const prisma = new PrismaClient();

async function main() {
  // Buat admin user
  const adminExists = await prisma.user.findUnique({
    where: { email: 'admin@templatehub.com' },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@templatehub.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'admin',
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }

  // Buat admin user baru
  const newAdminExists = await prisma.user.findUnique({
    where: { email: 'davayusteputra@proton.me' },
  });

  if (!newAdminExists) {
    const hashedPassword = await bcrypt.hash('u7y6t^y&u', 10);
    await prisma.user.create({
      data: {
        email: 'davayusteputra@proton.me',
        name: 'Davayus',
        password: hashedPassword,
        role: 'admin',
      },
    });
    console.log('New admin user created: davayusteputra@proton.me');
  } else {
    console.log('Admin user davayusteputra@proton.me already exists');
  }

  // Buat kategori
  const categories = [
    { name: 'Landing Page', slug: 'landing-page', description: 'Template untuk landing page' },
    { name: 'E-commerce', slug: 'e-commerce', description: 'Template untuk toko online' },
    { name: 'Blog', slug: 'blog', description: 'Template untuk blog' },
    { name: 'Portfolio', slug: 'portfolio', description: 'Template untuk portfolio' },
    { name: 'Dashboard', slug: 'dashboard', description: 'Template untuk dashboard admin' },
  ];

  for (const category of categories) {
    const existingCategory = await prisma.category.findUnique({
      where: { slug: category.slug },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: category,
      });
      console.log(`Category ${category.name} created`);
    } else {
      console.log(`Category ${category.name} already exists`);
    }
  }

  // Buat template
  const landingPageCategory = await prisma.category.findUnique({
    where: { slug: 'landing-page' },
  });

  const ecommerceCategory = await prisma.category.findUnique({
    where: { slug: 'e-commerce' },
  });

  const blogCategory = await prisma.category.findUnique({
    where: { slug: 'blog' },
  });

  if (landingPageCategory && ecommerceCategory && blogCategory) {
    const templates = [
      {
        name: 'Modern Landing Page',
        slug: 'modern-landing-page',
        description: 'Template landing page modern dengan animasi dan responsif',
        price: 49.99,
        discountPrice: 39.99,
        previewUrl: 'https://example.com/preview/modern-landing',
        categoryId: landingPageCategory.id,
        featured: true,
        hotTemplate: true,
        hotLevel: 3,
      },
      {
        name: 'E-commerce Starter',
        slug: 'ecommerce-starter',
        description: 'Template e-commerce dengan fitur keranjang dan checkout',
        price: 79.99,
        discountPrice: 59.99,
        previewUrl: 'https://example.com/preview/ecommerce-starter',
        categoryId: ecommerceCategory.id,
        featured: true,
        hotTemplate: true,
        hotLevel: 2,
      },
      {
        name: 'Blog Minimalist',
        slug: 'blog-minimalist',
        description: 'Template blog dengan desain minimalis dan fokus pada konten',
        price: 29.99,
        discountPrice: null,
        previewUrl: 'https://example.com/preview/blog-minimalist',
        categoryId: blogCategory.id,
        featured: false,
        hotTemplate: false,
        hotLevel: 0,
      },
      {
        name: 'Corporate Landing',
        slug: 'corporate-landing',
        description: 'Template landing page untuk perusahaan dengan desain profesional',
        price: 59.99,
        discountPrice: 49.99,
        previewUrl: 'https://example.com/preview/corporate-landing',
        categoryId: landingPageCategory.id,
        featured: true,
        hotTemplate: false,
        hotLevel: 0,
      },
      {
        name: 'E-commerce Pro',
        slug: 'ecommerce-pro',
        description: 'Template e-commerce lengkap dengan dashboard admin',
        price: 99.99,
        discountPrice: 89.99,
        previewUrl: 'https://example.com/preview/ecommerce-pro',
        categoryId: ecommerceCategory.id,
        featured: true,
        hotTemplate: true,
        hotLevel: 1,
      },
    ];

    for (const template of templates) {
      const existingTemplate = await prisma.template.findUnique({
        where: { slug: template.slug },
      });

      if (!existingTemplate) {
        await prisma.template.create({
          data: template,
        });
        console.log(`Template ${template.name} created`);
      } else {
        console.log(`Template ${template.name} already exists`);
      }
    }
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 