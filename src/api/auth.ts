import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const router = express.Router();
const prisma = new PrismaClient();

// Login endpoint
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password diperlukan" });
    }
    
    // Cari user
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return res.status(401).json({ error: "Email atau password salah" });
    }
    
    // Verifikasi password
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: "Email atau password salah" });
    }
    
    // Hapus password dari response
    const { password: _, ...userWithoutPassword } = user;
    
    // Kirim respons sukses
    res.json({ 
      success: true,
      user: userWithoutPassword,
      message: "Login berhasil"
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Gagal melakukan login" });
  }
});

export default router; 