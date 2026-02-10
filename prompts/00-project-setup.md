# 00 — Project Setup

## Deskripsi
Inisialisasi project Next.js 14+ dengan App Router, install semua dependencies, konfigurasi Tailwind CSS, dan buat folder structure lengkap.

## Langkah-langkah

### 1. Init Next.js
```bash
cd dashboard
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 2. Install Dependencies
```bash
npm install recharts framer-motion react-intersection-observer lucide-react
npm install -D @types/node
```

### 3. Tailwind Config (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sub-Holding
        "sh-upstream": "#00539C",
        "sh-downstream": "#E31937",
        "sh-pnre": "#2E8540",
        "sh-gas": "#F5A623",
        // Biodiversity Category
        "bio-rendah": "#E06919",
        "bio-sedang": "#F5A623",
        "bio-tinggi": "#006837",
        // IUCN
        "iucn-cr": "#CC3333",
        "iucn-en": "#E06919",
        "iucn-vu": "#F0C400",
        "iucn-nt": "#5B9BD5",
        "iucn-lc": "#60B236",
        "iucn-dd": "#999999",
        // Neutral
        "pertamina-dark": "#1A1A2E",
        "pertamina-bg": "#F8F9FA",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "count-up": "countUp 1.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
      },
      keyframes: {
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

### 4. Global CSS (`src/styles/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-pertamina-bg text-gray-800 antialiased;
  }
}

@layer components {
  .section-container {
    @apply mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24;
  }
  .section-title {
    @apply text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl;
  }
  .section-subtitle {
    @apply mt-2 text-lg text-gray-600;
  }
  .card {
    @apply rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100;
  }
}
```

### 5. Font Setup (`src/app/layout.tsx` — placeholder)

```typescript
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Dashboard Biodiversity — Pertamina",
  description: "Visualisasi data keanekaragaman hayati di seluruh unit operasi Pertamina",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### 6. Folder Structure

Buat folder kosong berikut:

```
dashboard/src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── [subholding]/
│       └── page.tsx
├── components/
│   ├── layout/
│   ├── sections/
│   ├── charts/
│   └── ui/
├── data/
│   ├── index.ts
│   └── types.ts
├── lib/
│   ├── constants.ts
│   ├── utils.ts
│   └── hooks/
└── styles/
    └── globals.css
```

### 7. Next.js Config (`next.config.js`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

### 8. Copy Data Files

Copy `formatted/summary.json` ke `dashboard/src/data/summary.json` agar bisa di-import langsung oleh Next.js.

Copy `formatted/biodiversity_clean.csv` ke `dashboard/public/data/biodiversity_clean.csv` untuk download/reference.

## Verifikasi

```bash
cd dashboard
npm run dev
# Buka localhost:3000 — harus tampil halaman default Next.js
```
