#!/bin/bash

# --- Konfigurasi ---
# Ganti ini dengan path absolut folder aplikasi Anda di server
APP_DIR="/var/www/html/gwm"
# Nama PM2 process untuk Next.js
PM2_NAME="gwm-app-production"
# PM2 EXECUTABLE: npm
PM2_EXECUTABLE="npm"
# ARGUMEN untuk executable: run start (ini memanggil script 'start' di package.json)
PM2_ARGS="run start" 

# --- Mulai Deployment ---
echo "⚙️ Memulai proses deployment Next.js yang disederhanakan..."

# Pindah ke direktori aplikasi
cd $APP_DIR || { echo "❌ Direktori $APP_DIR tidak ditemukan!"; exit 1; }
echo "📂 Berada di direktori: $(pwd)"

# 1. Menghapus semua PM2 instance yang sedang berjalan 
echo "🛑 Menghentikan dan menghapus SEMUA instance PM2 yang terdaftar..."
pm2 delete all
echo "✅ Semua instance PM2 lama telah dihapus."

# 2. Instalasi Dependensi
echo "📦 Melakukan npm install --force"
npm install --force || { echo "❌ Gagal menjalankan npm install!"; exit 1; }
echo "✅ Instalasi dependensi selesai."

# 3. Build Aplikasi Next.js
echo "🏗️ Melakukan npm run build"
npm run build || { echo "❌ Gagal menjalankan npm run build!"; exit 1; }
echo "✅ Build selesai."

# 4. Memulai Aplikasi dengan PM2 (MENGGUNAKAN SINTAKS PM2 YANG BENAR)
echo "▶️ Memulai aplikasi dengan PM2 di bawah nama: $PM2_NAME"
# Sintaks: pm2 start <executable> --name <name> -- <args>
pm2 start $PM2_EXECUTABLE --name $PM2_NAME -- $PM2_ARGS

# 5. Menyimpan daftar proses PM2 (untuk persistensi saat reboot)
echo "💾 Menyimpan daftar proses PM2 untuk persisten saat reboot..."
pm2 save
echo "✅ Aplikasi Next.js telah dimulai dan proses disimpan."

# Tampilkan status PM2
echo ""
echo "ℹ️ Status PM2 untuk aplikasi yang baru dimulai:"
pm2 status $PM2_NAME

echo "✨ Deployment Selesai!"