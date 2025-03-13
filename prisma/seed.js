const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Buat kategori dasar jika belum ada
  const categories = [
    {
      name: "landing-page",
      title: "Landing Page",
      description: "Template untuk halaman arahan",
    },
    {
      name: "portfolio",
      title: "Portfolio",
      description: "Template untuk portofolio pribadi",
    },
    {
      name: "e-commerce",
      title: "E-commerce",
      description: "Template untuk toko online",
    },
    { name: "blog", title: "Blog", description: "Template untuk blog" },
    {
      name: "dashboard",
      title: "Dashboard",
      description: "Template untuk dashboard admin",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log("Seed data berhasil ditambahkan");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Jalankan: npx prisma db seed
// setelah melakukan reset database untuk menambahkan data awal
