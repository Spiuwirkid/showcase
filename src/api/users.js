import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient();

// Cek apakah ada admin
router.get("/has-admin", async (req, res) => {
  try {
    const adminCount = await prisma.user.count({
      where: { role: "admin" },
    });

    res.json({ hasAdmin: adminCount > 0 });
  } catch (error) {
    console.error("Error checking admin existence:", error);
    res.status(500).json({ error: "Gagal memeriksa keberadaan admin" });
  }
});

// Register admin
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Cek apakah email sudah digunakan
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email sudah digunakan" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user admin
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "admin",
      },
    });

    // Hapus password dari respons
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating admin user:", error);
    res.status(500).json({ error: "Gagal membuat pengguna admin" });
  }
});

export default router;
