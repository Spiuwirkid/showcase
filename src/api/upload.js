import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Pastikan direktori upload ada
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Direktori upload dibuat: ${uploadDir}`);
}

// Konfigurasi storage untuk multer dengan error handling yang lebih baik
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Periksa apakah direktori masih ada dan bisa ditulis
    if (!fs.existsSync(uploadDir)) {
      return cb(new Error(`Direktori upload tidak ditemukan: ${uploadDir}`), null);
    }
    
    try {
      fs.accessSync(uploadDir, fs.constants.W_OK);
      cb(null, uploadDir);
    } catch (err) {
      cb(new Error(`Tidak bisa menulis ke direktori upload: ${err.message}`), null);
    }
  },
  filename: function (req, file, cb) {
    try {
      const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueFilename);
    } catch (err) {
      cb(new Error(`Error saat membuat nama file: ${err.message}`), null);
    }
  },
});

// Filter file yang diizinkan
const fileFilter = (req, file, cb) => {
  console.log(`Mencoba upload file: ${file.originalname}, tipe: ${file.mimetype}`);
  
  const allowedTypes = [
    "image/jpeg", 
    "image/png", 
    "image/gif", 
    "image/webp",
    "application/zip",
    "application/x-zip-compressed"
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Format file tidak diizinkan: ${file.mimetype}`), false);
  }
};

// Setup multer dengan error handling yang lebih baik
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // Naikkan ke 50MB
  }
}).single("file");

// POST endpoint untuk upload dengan penanganan error yang lebih baik
router.post("/", (req, res) => {
  // Gunakan upload sebagai middleware dan tangani error-nya
  upload(req, res, function(err) {
    console.log("Memproses upload file...");
    
    if (err instanceof multer.MulterError) {
      // Error dari multer
      console.error("Multer error:", err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          error: "Ukuran file terlalu besar. Maksimal 50MB." 
        });
      }
      return res.status(400).json({ error: `Error multer: ${err.message}` });
    } 
    else if (err) {
      // Error lainnya
      console.error("Upload error:", err);
      return res.status(500).json({ error: err.message });
    }
    
    // Tidak ada file yang diupload
    if (!req.file) {
      return res.status(400).json({ error: "Tidak ada file yang diupload" });
    }
    
    try {
      // Buat URL untuk file
      const fileUrl = `/uploads/${req.file.filename}`;
      console.log(`File berhasil diupload: ${req.file.filename}`);
      
      return res.status(200).json({
        success: true,
        message: "File berhasil diupload",
        data: {
          fileName: req.file.filename,
          originalName: req.file.originalname,
          fileUrl: fileUrl,
          size: req.file.size,
        }
      });
    } catch (error) {
      console.error("Error saat membuat respons:", error);
      return res.status(500).json({ error: "Gagal memproses file yang diupload" });
    }
  });
});

export default router;