import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import attendanceRoutes from "./routes/attendance";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Mendaftarkan Endpoint Absensi
app.use("/api/attendance", attendanceRoutes);

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "Server Backend Berjalan Normal!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
