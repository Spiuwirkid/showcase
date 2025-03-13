import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all categories
router.get("/", async (req, res) => {
  try {
    console.log("GET /api/categories - mencoba menemukan kategori");

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { templates: true },
        },
      },
    });

    console.log(`Menemukan ${categories.length} kategori`);

    // Format respons dan pastikan valid JSON
    const formattedCategories = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      title: cat.title || cat.name, // Fallback ke name jika title tidak ada
      description: cat.description || "",
      image: cat.image || "",
      templateCount: cat._count.templates,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));

    console.log("Mengembalikan respons JSON");
    return res.json(formattedCategories);
  } catch (error) {
    console.error("Error getting categories:", error);
    return res.status(500).json({ error: "Gagal mengambil data kategori" });
  }
});

// Tambahkan endpoint POST untuk membuat kategori baru
router.post("/", async (req, res) => {
  try {
    console.log("Processing POST /api/categories request", req.body);

    // Validasi input
    const { name, title, description, image } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        error: "Nama kategori harus diisi",
      });
    }

    // Cek apakah kategori dengan nama tersebut sudah ada
    const existing = await prisma.category.findUnique({
      where: { name },
    });

    if (existing) {
      return res.status(400).json({
        error: "Kategori dengan nama tersebut sudah ada",
      });
    }

    // Buat kategori baru
    const category = await prisma.category.create({
      data: {
        name,
        title: title || name,
        description: description || "",
        image: image || "",
      },
    });

    console.log(`Created new category: ${category.name}`);

    // Sebelum mengembalikan respons, log untuk debug
    console.log("Sending response:", {
      status: 201,
      category: {
        id: category.id,
        name: category.name,
        // ...
      },
    });

    // Respons yang lebih lengkap
    return res.status(201).json({
      success: true,
      message: "Kategori berhasil dibuat",
      data: category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ error: "Gagal membuat kategori" });
  }
});

// Tambahkan endpoint PUT untuk mengupdate kategori
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, description, image } = req.body;

    console.log(`Processing PUT /api/categories/${id} request`, req.body);

    // Validasi input
    if (!name || name.trim() === "") {
      return res.status(400).json({
        error: "Nama kategori harus diisi",
      });
    }

    // Periksa apakah kategori ada
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return res.status(404).json({
        error: "Kategori tidak ditemukan",
      });
    }

    // Periksa apakah nama sudah digunakan oleh kategori lain
    if (name !== existingCategory.name) {
      const duplicateName = await prisma.category.findUnique({
        where: { name },
      });

      if (duplicateName) {
        return res.status(400).json({
          error: "Kategori dengan nama tersebut sudah ada",
        });
      }
    }

    // Update kategori
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        title: title || name,
        description: description || existingCategory.description || "",
        image: image || existingCategory.image || "",
      },
    });

    console.log(`Updated category: ${updatedCategory.name}`);

    return res.status(200).json({
      success: true,
      message: "Kategori berhasil diupdate",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ error: "Gagal mengupdate kategori" });
  }
});

// Endpoint lain untuk kategori...
// ...

export default router;
