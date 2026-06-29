import { Router, Request, Response } from "express";
import { calculateDistance } from "../utils/geo";

const router = Router();

const KANTOR_CABANG = {
  latitude: -6.2088,
  longitude: 106.8456,
  radius_meter: 50,
};

router.post("/clock-in", async (req: Request, res: Response): Promise<any> => {
  try {
    const { user_id, lat_in, long_in } = req.body;

    if (!lat_in || !long_in) {
      return res
        .status(400)
        .json({ error: "Koordinat lokasi tidak ditemukan." });
    }

    const jarak = calculateDistance(
      KANTOR_CABANG.latitude,
      KANTOR_CABANG.longitude,
      lat_in,
      long_in,
    );

    if (jarak > KANTOR_CABANG.radius_meter) {
      return res.status(403).json({
        error: "Anda berada di luar area kantor.",
        jarak_saat_ini: `${Math.round(jarak)} meter`,
      });
    }

    return res.status(200).json({
      message: "Clock-In Berhasil!",
      jarak_tercatat: `${Math.round(jarak)} meter`,
      waktu_server: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
});

export default router;
