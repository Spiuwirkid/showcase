import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import readline from "readline";

const prisma = new PrismaClient();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fungsi untuk membuat pertanyaan dan mendapatkan jawaban
function question(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

async function createAdminDirectly() {
  try {
    console.log("=== MEMBUAT USER ADMIN BARU ===");
    console.log(
      "Data yang dimasukkan tidak akan disimpan di kode aplikasi, hanya di database."
    );
    console.log("-----------------------------------");

    // Meminta input dari user
    const email = await question("Masukkan email admin: ");
    const name = await question("Masukkan nama admin: ");
    const password = await question("Masukkan password admin: ");

    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`\nUser dengan email ${email} sudah ada di database.`);
      rl.close();
      return;
    }

    // Hash password menggunakan bcrypt asli
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password berhasil di-hash dengan bcrypt");

    // Buat user admin baru
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "admin",
      },
    });

    console.log("\nUser admin baru berhasil dibuat:");
    console.log(`Email: ${newUser.email}`);
    console.log(`Nama: ${newUser.name}`);
    console.log(`Role: ${newUser.role}`);
    console.log(
      "\nSilakan gunakan kredensial ini untuk login ke dashboard admin."
    );
  } catch (error) {
    console.error("Error saat membuat user admin:", error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

createAdminDirectly();
