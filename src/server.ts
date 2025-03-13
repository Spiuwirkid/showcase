import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// Tambahkan ekstensi .js untuk ESM
import apiRouter from './api/index.ts';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startServer = async () => {
  try {
    // Inisialisasi Express dan middleware
    const app = express();
    const PORT = process.env.SERVER_PORT || 5173;

    // Inisialisasi Prisma dan test koneksi
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log('Berhasil terhubung ke database');

    // Middleware - urutannya penting!
    app.use(cors({
      origin: ['http://localhost:8080', 'http://localhost:5173'],
      credentials: true
    }));
    app.use(bodyParser.json());
    app.use(express.json());

    // Tambahkan kode ini setelah app.use(express.json())
    app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

    // Logging middleware untuk debug
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      
      // Debug khusus untuk API categories
      if (req.path.includes('/api/categories')) {
        console.log('Debug categories route:', req.path);
        console.log('Headers:', req.headers);
      }
      
      next();
    });

    // Serve static files
    app.use(express.static(join(__dirname, '../public')));

    // Root endpoint
    app.get('/', (req: Request, res: Response) => {
      res.json({
        message: 'API Server berjalan dengan baik',
        info: 'Ini adalah server API. Untuk mengakses aplikasi web, silakan buka http://localhost:8080',
        endpoints: {
          auth: '/api/auth/*',
          users: '/api/users/*',
          health: '/health'
        }
      });
    });

    // POSISI INI SANGAT PENTING!
    // API routes harus didaftarkan SEBELUM fallback route
    app.use('/api', apiRouter);

    // Endpoint untuk health check
    app.get('/health', (req: Request, res: Response) => {
      res.json({ status: 'ok' });
    });

    // Perhatikan bahwa ini adalah route terakhir
    // dan hanya akan dijalankan jika tidak ada route lain yang cocok
    app.get('*', (req: Request, res: Response) => {
      // Tambahkan pengecekan khusus untuk API paths
      if (req.url.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint tidak ditemukan' });
      }
      
      // Jika bukan API, kirim SPA HTML
      res.sendFile(join(__dirname, '../index.html'));
    });

    // Tambahkan error handler
    app.use((err: Error, req: Request, res: Response, next: any) => {
      console.error(err.stack);
      res.status(500).json({ 
        error: 'Terjadi kesalahan pada server',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    });

    // Jalankan server
    const portNumber = typeof PORT === 'string' ? parseInt(PORT) : PORT;
    app.listen(portNumber, '0.0.0.0', () => {
      console.log(`Server berjalan di port ${portNumber}`);
      console.log(`API dapat diakses di http://localhost:${portNumber}`);
      console.log(`Aplikasi web dapat diakses di http://localhost:8080`);
    });

    // Handle shutdown
    process.on('SIGINT', async () => {
      await prisma.$disconnect();
      console.log('Server dihentikan');
      process.exit(0);
    });

    return app;
  } catch (error) {
    console.error('Error saat menjalankan server:', error);
    process.exit(1);
  }
};

const app = await startServer();
export default app; 