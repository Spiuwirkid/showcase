import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

const router = express.Router();
const prisma = new PrismaClient();

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password diperlukan" });
    }

    // Cari user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    // Verifikasi password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    // Kalau bukan admin, tolak
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Anda tidak memiliki akses admin" });
    }

    // Generate token sederhana (dalam produksi sebaiknya gunakan JWT)
    const token = crypto.randomBytes(32).toString("hex");

    // Simpan token di database (atau gunakan Redis di produksi)
    await prisma.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 jam
      },
    });

    // Hapus password dari response
    const { password: _, ...userWithoutPassword } = user;

    // Kirim token dalam respons
    res.json({
      success: true,
      user: userWithoutPassword,
      token,
      message: "Login berhasil",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Gagal melakukan login" });
  }
});

// Tambahkan endpoint untuk verifikasi token
router.post("/verify-token", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ error: "Token tidak ditemukan" });
    }

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return res
        .status(401)
        .json({ error: "Token tidak valid atau kadaluarsa" });
    }

    // Hapus password dari response user
    const { password: _, ...userWithoutPassword } = session.user;

    res.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ error: "Gagal memverifikasi token" });
  }
});

export default router;
