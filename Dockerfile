# Gunakan image resmi Node.js yang sudah ringan
FROM node:22-bullseye-slim

# Install dependensi sistem yang dibutuhkan Prisma
RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files dulu untuk memanfaatkan layer cache
COPY package*.json ./
COPY prisma ./prisma/

# Install dependensi
RUN npm ci

# Generate Prisma Client (PENTING)
RUN npx prisma generate

# Copy seluruh kode
COPY . .

# Build proyek
RUN npm run build

# Jalankan server
CMD ["node", "dist/index.js"]
