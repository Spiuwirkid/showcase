import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const router = express.Router();
const prisma = new PrismaClient();

// Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Gagal mengambil data pengguna" });
  }
});

// Cek apakah ada admin
router.get("/has-admin", async (req: Request, res: Response) => {
  try {
    const adminCount = await prisma.user.count({
      where: { role: "admin" }
    });
    
    res.json({ hasAdmin: adminCount > 0 });
  } catch (error) {
    console.error("Error checking admin existence:", error);
    res.status(500).json({ error: "Gagal memeriksa keberadaan admin" });
  }
});

// Cek apakah user adalah admin
router.post("/is-admin", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email diperlukan" });
    }
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true }
    });
    
    res.json({ isAdmin: user?.role === "admin" });
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ error: "Gagal memeriksa status admin" });
  }
});

// Register admin/user
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email dan password diperlukan" });
    }
    
    // Cek apakah email sudah digunakan
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ error: "Email sudah digunakan" });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Buat user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    });
    
    // Hapus password dari respons
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Gagal membuat pengguna" });
  }
});

export default router;