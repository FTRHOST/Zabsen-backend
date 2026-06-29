// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // Hapus properti 'engine' dan 'datasource' jika menyebabkan error.
  // Prisma 7 secara otomatis mendeteksi database dari variabel lingkungan
  // atau dari konfigurasi standar di schema.prisma jika sudah diset dengan benar.

  // Jika Anda perlu mendefinisikan URL secara eksplisit:
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
