# Next.js Frontend

Ini adalah project frontend yang dibuat menggunakan **Next.js App Router**, **Tailwind CSS**, dan komponen dari **ShadCN UI**. Aplikasi ini dirancang untuk menampilkan data dinamis dengan autentikasi, CRUD data, dan dashboard.

## 🔧 Fitur Utama

- ✅ Login & Register dengan JWT
- ✅ Routing dengan App Router (Next.js 15+)
- ✅ Dashboard setelah login
- ✅ CRUD item (Create, Read, Update, Delete)
- ✅ Edit Profile
- ✅ UI dinamis dengan Tailwind CSS & ShadCN
- ✅ Proteksi halaman via middleware auth
- ✅ Integrasi ke backend Golang (Pendekatan Clean Architecture)

## 🧱 Struktur Proyek

```
src/
├── app/
│   ├── login/               # Halaman login
│   ├── register/            # Halaman register
│   ├── dashboard/           # Layout dashboard & halaman item
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page (home)
├── components/              # Komponen custom (Sidebar, Layout, dsb)
├── lib/                     # Helper/utility functions
└── styles/                  # Konfigurasi Tailwind
```

## 🌐 Deployment

Frontend ini telah dideploy ke Vercel dan dapat diakses di:
[https://frontend-app-dicky.vercel.app/](https://frontend-app-dicky.vercel.app/)

## 🔗 Integration

Aplikasi ini terhubung dengan backend Golang yang dikembangkan menggunakan pendekatan Clean Architecture. Komunikasi dilakukan via REST API, menggunakan endpoint dari backend lokal atau server production.

🔗 Repo backend: [go-backend](https://github.com/dickysetiawan031000/go-backend)


## 🚀 Cara Menggunakan

### 1. Clone Repository

```bash
git clone https://github.com/username/frontend-app.git

cd frontend-app 
```

### 2. Install Dependencies

```bash
npm install

# atau jika menggunakan yarn

yarn install
```

### 3. Setup Environment Variables

Buat file `.env.local` dan tambahkan variabel berikut:

notes : Disesuaikan dengan port yang berjalan pada project go-backend nya.

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 4. Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`.

### 5. Build & Deploy

```bash
npm run build
npm start
```

## ⚙️ Teknologi

- Next.JS
- React.JS
- Tailwind CSS
- Shadcn UI
- Axios
- Middleware Auth
- Progressive Enhancement
---

© 2025 - Dicky Setiawan
