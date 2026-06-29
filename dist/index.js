"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Mendaftarkan Endpoint Absensi
app.use("/api/attendance", attendance_1.default);
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "Server Backend Berjalan Normal!" });
});
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map