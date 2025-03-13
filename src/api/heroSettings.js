import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Setup storage untuk file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "public/uploads";
    // Pastikan direktori ada
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + uuidv4();
    cb(null, "hero-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    // Hanya terima file gambar
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diperbolehkan"));
    }
  },
});

// GET: Ambil pengaturan hero
router.get("/", async (req, res) => {
  try {
    let heroSettings = await prisma.heroSettings.findFirst();

    // Jika tidak ada data, kembalikan default
    if (!heroSettings) {
      heroSettings = {
        id: "",
        showcaseImage: "/showcase-template-dark.webp",
        tagline: "Template Premium Terbaik di Indonesia",
        headingLine1: "Transformasi Digital Terbaik untuk",
        headingLine2: "Brand Anda",
        description:
          "Koleksi template premium yang akan mengubah kehadiran digital Anda. Dirancang untuk kecepatan, konversi, dan pengalaman pengguna terbaik.",
        primaryButtonText: "Jelajahi Template",
        secondaryButtonText: "Lihat Kategori",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    res.json(heroSettings);
  } catch (error) {
    console.error("Error fetching hero settings:", error);
    res.status(500).json({ error: "Gagal mengambil pengaturan hero" });
  }
});

// POST: Update pengaturan hero
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    let heroSettings = await prisma.heroSettings.findFirst();

    if (heroSettings) {
      // Update
      heroSettings = await prisma.heroSettings.update({
        where: { id: heroSettings.id },
        data,
      });
    } else {
      // Create
      heroSettings = await prisma.heroSettings.create({
        data,
      });
    }

    res.json(heroSettings);
  } catch (error) {
    console.error("Error updating hero settings:", error);
    res.status(500).json({ error: "Gagal menyimpan pengaturan hero" });
  }
});

// POST: Upload gambar hero
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Tidak ada file yang diunggah" });
    }

    // Path relatif untuk disimpan di DB
    const imagePath = `/uploads/${req.file.filename}`;

    res.json({
      imagePath,
      success: true,
      message: "Gambar berhasil diunggah",
    });
  } catch (error) {
    console.error("Error uploading hero image:", error);
    res.status(500).json({ error: "Gagal mengunggah gambar" });
  }
});

export default router;
