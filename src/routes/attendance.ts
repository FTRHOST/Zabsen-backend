import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { calculateDistance } from "../utils/geo";

const router = Router();
const prisma = new PrismaClient(); // Inisialisasi Prisma Client

const KANTOR_CABANG = {
  latitude: -6.2088,
  longitude: 106.8456,
  radius_meter: 50,
};

router.post("/clock-in", async (req: Request, res: Response): Promise<any> => {
  try {
    const { user_id, lat_in, long_in } = req.body;

    if (!user_id || !lat_in || !long_in) {
      return res
        .status(400)
        .json({ error: "Data pengguna atau koordinat lokasi tidak lengkap." });
    }

    // 1. Hitung Jarak Karyawan ke Kantor
    const jarak = calculateDistance(
      KANTOR_CABANG.latitude,
      KANTOR_CABANG.longitude,
      lat_in,
      long_in,
    );

    // 2. Validasi Jarak (Geofencing)
    if (jarak > KANTOR_CABANG.radius_meter) {
      return res.status(403).json({
        error: "Anda berada di luar area kantor.",
        jarak_saat_ini: `${Math.round(jarak)} meter`,
      });
    }

    // 3. Simpan Log Absen ke Database menggunakan Prisma
    const newLog = await prisma.attendanceLog.create({
      data: {
        user_id: user_id,
        lat_in: lat_in,
        long_in: long_in,
        status: "hadir", // Nantinya bisa dinamis (hadir/telat) berdasarkan jam
      },
    });

    return res.status(200).json({
      message: "Clock-In Berhasil disimpan ke database!",
      jarak_tercatat: `${Math.round(jarak)} meter`,
      data: newLog,
    });
  } catch (error) {
    console.error(error); // Untuk melihat log error di terminal/Coolify
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan pada server database." });
  }
});

export default router;
