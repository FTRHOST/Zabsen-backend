import { Router, Request, Response } from "express";
import { calculateDistance } from "../utils/geo";

const router = Router();

// Contoh Data Koordinat Cabang (Nantinya ini diambil dari Database Prisma)
const KANTOR_CABANG = {
  latitude: -6.2088, // Contoh: Koordinat Monas / Kantor Pusat
  longitude: 106.8456,
  radius_meter: 50, // Batas maksimal jarak absen 50 meter
};

router.post("/clock-in", async (req: Request, res: Response): Promise<any> => {
  try {
    const { user_id, lat_in, long_in } = req.body;

    if (!lat_in || !long_in) {
      return res
        .status(400)
        .json({ error: "Koordinat lokasi tidak ditemukan dari perangkat." });
    }

    // 1. Hitung Jarak Karyawan ke Kantor
    const jarak = calculateDistance(
      KANTOR_CABANG.latitude,
      KANTOR_CABANG.longitude,
      lat_in,
      long_in,
    );

    // 2. Validasi Jarak
    if (jarak > KANTOR_CABANG.radius_meter) {
      return res.status(403).json({
        error: "Anda berada di luar area kantor.",
        jarak_saat_ini: `${Math.round(jarak)} meter`,
        batas_toleransi: `${KANTOR_CABANG.radius_meter} meter`,
      });
    }

    // 3. Simpan ke Database (Contoh tanpa Prisma terlebih dahulu)
    // const newLog = await prisma.attendanceLog.create({ ... })

    return res.status(200).json({
      message: "Clock-In Berhasil!",
      jarak_tercatat: `${Math.round(jarak)} meter`,
      waktu_server: new Date().toISOString(), // Waktu dari server backend, bukan HP!
    });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
});

export default router;
