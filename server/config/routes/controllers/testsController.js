const db = require("../config/db");
const ping = require("ping");

module.exports = {
    async testDevice(req, res) {
        try {
            const { id } = req.params;

            const [rows] = await db.query("SELECT ip_address FROM devices WHERE id=?", [id]);
            if (rows.length === 0) return res.status(404).json({ error: "Dispositivo não encontrado." });

            const ip = rows[0].ip_address;

            const result = await ping.promise.probe(ip);

            const status = result.alive ? "up" : "down";
            const latency = !isNaN(result.time) ? parseInt(result.time) : null;

            await db.query(
                "INSERT INTO tests (device_id, status, latency_ms) VALUES (?, ?, ?)",
                [id, status, latency]
            );

            res.json({ status, latency });
        } catch (err) {
            res.status(500).json({ error: "Erro ao testar o dispositivo." });
        }
    },

    async getTests(req, res) {
        try {
            const { id } = req.params;
            const [rows] = await db.query("SELECT * FROM tests WHERE device_id=? ORDER BY timestamp DESC", [id]);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar histórico." });
        }
    }
};
