import { PrismaClient } from '@prisma/client';

// Inisialisasi PrismaClient
let prisma: PrismaClient;

// Selalu gunakan koneksi database yang sebenarnya
if (process.env.NODE_ENV === 'production') {
  // Di produksi, buat instance baru setiap kali
  prisma = new PrismaClient();
} else {
  // Di development, gunakan koneksi yang sama untuk mencegah terlalu banyak koneksi
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = (global as any).prisma;
}

export { prisma }; 
