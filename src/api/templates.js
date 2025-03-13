import express from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";

const router = express.Router();
const prisma = new PrismaClient();

// GET all templates
router.get("/", async (req, res) => {
  try {
    console.log("Processing GET /api/templates request");

    const templates = await prisma.template.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(templates);
  } catch (error) {
    console.error("Error getting templates:", error);
    return res.status(500).json({ error: "Gagal mendapatkan data template" });
  }
});

// GET template by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const template = await prisma.template.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!template) {
      return res.status(404).json({ error: "Template tidak ditemukan" });
    }

    return res.json(template);
  } catch (error) {
    console.error("Error getting template:", error);
    return res.status(500).json({ error: "Gagal mendapatkan data template" });
  }
});

// POST new template
router.post("/", async (req, res) => {
  try {
    const {
      name,
      categoryId,
      description,
      shortDescription,
      price,
      imageUrl,
      downloadUrl,
      hotLevel,
      reviews,
      downloads,
      tags,
      isFeatured,
      isHot,
    } = req.body;

    // Validasi input dasar
    if (!name || !categoryId) {
      return res.status(400).json({ error: "Nama dan kategori harus diisi" });
    }

    const template = await prisma.template.create({
      data: {
        name,
        categoryId,
        description: description || "",
        shortDescription: shortDescription || "",
        price: price ? parseFloat(price) : 0,
        imageUrl: imageUrl || "",
        downloadUrl: downloadUrl || "",
        hotLevel: hotLevel ? parseInt(hotLevel) : 1,
        reviews: reviews ? parseInt(reviews) : 0,
        downloads: downloads ? parseInt(downloads) : 0,
        tags: tags || [],
        isFeatured: isFeatured || false,
        isHot: isHot || false,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Template berhasil dibuat",
      data: template,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    return res.status(500).json({ error: "Gagal membuat template" });
  }
});

// Endpoint lainnya (PUT, DELETE, dll)
// ...

export default router;
