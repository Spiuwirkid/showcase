# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ef8dbc69-5c21-472e-a14f-295be33a8d07

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ef8dbc69-5c21-472e-a14f-295be33a8d07) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ef8dbc69-5c21-472e-a14f-295be33a8d07) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

# TemplateHub

TemplateHub adalah marketplace untuk template website premium yang menawarkan berbagai jenis template untuk kebutuhan berbeda seperti e-commerce, portfolio, blog, dan landing page.

## Teknologi yang Digunakan

- **Frontend**: React dengan TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS dengan shadcn/ui
- **Routing**: React Router DOM
- **State Management**: React Query
- **Database**: PostgreSQL
- **ORM**: Prisma

## Cara Menjalankan Proyek

### Prasyarat

- Node.js (versi 18 atau lebih baru)
- PostgreSQL (versi 12 atau lebih baru)

### Langkah-langkah

1. Clone repositori ini
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Siapkan database PostgreSQL dengan kredensial berikut:
   ```
   HOST=localhost
   PORT=5423
   DB_USER=spiuwirkid
   DB=mywebhub
   PASSWORD=p0O9i8u7y6
   ```
4. Buat file `.env` dengan konten berikut:
   ```
   DATABASE_URL="postgresql://spiuwirkid:p0O9i8u7y6@localhost:5423/mywebhub?schema=public"
   ```
5. Jalankan migrasi database:
   ```bash
   npm run prisma:migrate
   ```
6. Isi database dengan data awal:
   ```bash
   npm run prisma:seed
   ```
7. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

## Struktur Database

### Template

- `id`: ID unik template
- `title`: Judul template
- `description`: Deskripsi template
- `image`: URL gambar template
- `category`: Kategori template
- `price`: Harga template
- `featured`: Apakah template ditampilkan di halaman utama
- `tags`: Tag-tag template
- `createdAt`: Waktu pembuatan
- `updatedAt`: Waktu pembaruan terakhir

### Category

- `id`: ID unik kategori
- `name`: Nama kategori (slug)
- `title`: Judul kategori
- `description`: Deskripsi kategori
- `image`: URL gambar kategori
- `createdAt`: Waktu pembuatan
- `updatedAt`: Waktu pembaruan terakhir

### User

- `id`: ID unik pengguna
- `email`: Email pengguna
- `name`: Nama pengguna
- `password`: Password pengguna (terenkripsi)
- `role`: Peran pengguna (admin/user)
- `createdAt`: Waktu pembuatan
- `updatedAt`: Waktu pembaruan terakhir

## Penggunaan Prisma

### Melihat Database

Untuk melihat dan mengelola database melalui UI, jalankan:

```bash
npm run prisma:studio
```

### Membuat Migrasi Baru

Setelah mengubah skema database di `prisma/schema.prisma`, jalankan:

```bash
npm run prisma:migrate
```

### Mengupdate Client Prisma

Setelah mengubah skema database, jalankan:

```bash
npm run prisma:generate
```
