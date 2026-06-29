"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistance = void 0;
// Fungsi untuk menghitung jarak (dalam meter) antara 2 titik koordinat
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Jari-jari bumi dalam meter
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Hasil dalam meter
};
exports.calculateDistance = calculateDistance;
//# sourceMappingURL=geo.js.map