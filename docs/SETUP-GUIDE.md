# 🚀 Setup Guide untuk Developer Baru

Panduan lengkap untuk clone dan melanjutkan development HaloTekno platform.

---

## 📋 Prerequisites

Pastikan sudah terinstall:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** ([Install](https://pnpm.io/installation))
- **Git** ([Download](https://git-scm.com/))
- **Docker Desktop** (untuk database lokal) - Optional
- **PostgreSQL** (jika tidak pakai Docker)

---

## 🔧 Step 1: Clone Repository

```bash
# Clone project
git clone https://github.com/habstrakT808/halotekno-platform.git

# Masuk ke folder project
cd halotekno-platform
```

---

## 📦 Step 2: Install Dependencies

```bash
# Install semua dependencies
pnpm install
```

**Estimasi waktu:** 2-3 menit

---

## 🗄️ Step 3: Setup Database

### Option A: Menggunakan Docker (Recommended)

```bash
# Start PostgreSQL & Redis dengan Docker
docker-compose up -d

# Check apakah container sudah running
docker ps
```

### Option B: PostgreSQL Lokal

Jika sudah install PostgreSQL lokal, buat database baru:

```sql
CREATE DATABASE halotekno;
```

---

## 🔐 Step 4: Setup Environment Variables

```bash
# Copy file .env.example ke .env.local
cp .env.example .env.local
```

Edit file `.env.local` dan isi dengan credentials Anda:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/halotekno"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate: openssl rand -base64 32

# Google OAuth (Optional - untuk login dengan Google)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**Generate NEXTAUTH_SECRET:**

```bash
# Di terminal (Linux/Mac)
openssl rand -base64 32

# Di PowerShell (Windows)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

---

## 🗃️ Step 5: Setup Prisma & Database

```bash
# Generate Prisma Client
pnpm prisma generate

# Push schema ke database (create tables)
pnpm prisma db push

# (Optional) Seed database dengan data dummy
pnpm prisma db seed
```

**Troubleshooting:**

- Jika error "Can't reach database server", pastikan PostgreSQL sudah running
- Check DATABASE_URL di `.env.local` sudah benar

---

## 🚀 Step 6: Run Development Server

```bash
# Start development server
pnpm dev
```

Server akan berjalan di: **http://localhost:3000**

**Jika port 3000 sudah dipakai:**

```bash
# Server otomatis akan pakai port 3001
# Check terminal untuk melihat port yang digunakan
```

---

## ✅ Step 7: Verify Setup

Buka browser dan test:

1. **Landing Page:** http://localhost:3000
   - ✅ Harus muncul landing page dengan light mode
2. **Login Page:** http://localhost:3000/login
   - ✅ Form login harus muncul
3. **Register Page:** http://localhost:3000/register
   - ✅ Form register harus muncul
4. **Catalog Pages:**
   - http://localhost:3000/teknisi
   - http://localhost:3000/sparepart
   - http://localhost:3000/sewa-alat

---

## 📚 Step 8: Baca Dokumentasi

Sebelum mulai coding, baca dokumentasi ini:

1. **README.md** - Overview project & tech stack
2. **docs/PROGRESS-2025-12-24.md** - Progress yang sudah dikerjakan
3. **docs/README.md** - Index dokumentasi

---

## 🔄 Git Workflow

### Membuat Branch Baru

```bash
# Update dari remote
git pull origin main

# Buat branch baru untuk feature
git checkout -b feature/nama-feature

# Contoh:
git checkout -b feature/shopping-cart
git checkout -b fix/navbar-bug
```

### Commit Changes

```bash
# Add files
git add .

# Commit (akan trigger Husky pre-commit hooks)
git commit -m "feat: add shopping cart functionality"

# Push ke GitHub
git push origin feature/nama-feature
```

**Commit Message Format:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance

### Create Pull Request

1. Push branch ke GitHub
2. Buka https://github.com/habstrakT808/halotekno-platform
3. Click "Compare & pull request"
4. Isi description dan submit

---

## 🛠️ Useful Commands

### Development

```bash
# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format
```

### Database

```bash
# Open Prisma Studio (GUI untuk database)
pnpm prisma studio

# Create migration
pnpm prisma migrate dev --name migration-name

# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset

# View database
pnpm prisma db pull
```

### Docker

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Restart containers
docker-compose restart
```

---

## 📁 Project Structure

```
halotekno-platform/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── teknisi/           # Teknisi catalog
│   │   ├── sparepart/         # Sparepart catalog
│   │   └── sewa-alat/         # Sewa alat catalog
│   ├── components/            # React components
│   │   ├── layouts/           # Navbar, Footer
│   │   ├── shared/            # Landing sections
│   │   ├── dashboard/         # Dashboard components
│   │   ├── catalog/           # Catalog components
│   │   └── ui/                # shadcn/ui components
│   ├── lib/                   # Utilities & helpers
│   ├── hooks/                 # Custom React hooks
│   └── styles/                # Global styles
├── prisma/
│   └── schema.prisma          # Database schema
├── docs/                      # Documentation
├── public/                    # Static assets
└── auth.ts                    # NextAuth configuration
```

---

## 🎯 Next Steps (Roadmap)

Berdasarkan `README.md`, ini yang perlu dikerjakan selanjutnya:

### Phase 2: Public Pages (80% Complete)

- [ ] Halaman About
- [ ] Blog/Artikel system

### Phase 3: Customer Features (Priority: P0)

- [ ] Shopping cart functionality
- [ ] Checkout flow
- [ ] Payment manual
- [ ] Order tracking
- [ ] Review & rating

### Phase 4: Admin Features

- [ ] User management
- [ ] Catalog management
- [ ] Order management
- [ ] Payment verification

**Lihat detail lengkap di:** `README.md` section "Roadmap & Task Breakdown"

---

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process di port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Atau biarkan Next.js pakai port lain (3001, 3002, etc)
```

### Database Connection Error

```bash
# Check PostgreSQL running
docker ps

# Restart PostgreSQL
docker-compose restart postgres

# Check DATABASE_URL di .env.local
```

### Prisma Generate Error

```bash
# Clear Prisma cache
rm -rf node_modules/.prisma
pnpm prisma generate
```

### ESLint Errors on Commit

```bash
# Fix auto-fixable errors
pnpm lint --fix

# Format code
pnpm format
```

### Module Not Found

```bash
# Clear cache dan reinstall
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

---

## 💡 Tips untuk Development

1. **Gunakan Prisma Studio** untuk melihat data database

   ```bash
   pnpm prisma studio
   ```

2. **Check ESLint sebelum commit**

   ```bash
   pnpm lint
   ```

3. **Format code otomatis**

   ```bash
   pnpm format
   ```

4. **Baca progress report** di `docs/PROGRESS-2025-12-24.md` untuk tahu apa yang sudah dikerjakan

5. **Follow Git workflow** - selalu buat branch baru untuk setiap feature

6. **Test di mobile view** - Project ini mobile-first

---

## 📞 Need Help?

1. Check dokumentasi di folder `docs/`
2. Baca `README.md` untuk overview project
3. Review code yang sudah ada untuk pattern yang digunakan
4. Check GitHub Issues untuk bug reports

---

## ✅ Checklist Setup

- [ ] Node.js 18+ terinstall
- [ ] pnpm terinstall
- [ ] Repository di-clone
- [ ] Dependencies terinstall (`pnpm install`)
- [ ] Database setup (Docker atau lokal)
- [ ] `.env.local` sudah dikonfigurasi
- [ ] Prisma generate & db push berhasil
- [ ] Dev server berjalan (`pnpm dev`)
- [ ] Landing page bisa diakses
- [ ] Login/Register page berfungsi
- [ ] Dokumentasi sudah dibaca

---

**Happy Coding! 🚀**

Jika ada pertanyaan, refer ke dokumentasi atau review code yang sudah ada.
