const db = require("../config/db");

module.exports = {
    async getAll(req, res) {
        try {
            const [rows] = await db.query("SELECT * FROM devices");
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar dispositivos." });
        }
    },

    async create(req, res) {
        try {
            const { name, ip_address, type } = req.body;

            const sql = "INSERT INTO devices (name, ip_address, type) VALUES (?, ?, ?)";
            const values = [name, ip_address, type];

            const [result] = await db.query(sql, values);

            res.json({ id: result.insertId, name, ip_address, type });
        } catch (err) {
            res.status(500).json({ error: "Erro ao criar dispositivo." });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, ip_address, type } = req.body;

            const sql = "UPDATE devices SET name=?, ip_address=?, type=? WHERE id=?";
            await db.query(sql, [name, ip_address, type, id]);

            res.json({ message: "Dispositivo atualizado." });
        } catch (err) {
            res.status(500).json({ error: "Erro ao atualizar dispositivo." });
        }
    },

    async remove(req, res) {
        try {
            const { id } = req.params;

            await db.query("DELETE FROM devices WHERE id=?", [id]);

            res.json({ message: "Dispositivo excluído." });
        } catch (err) {
            res.status(500).json({ error: "Erro ao excluir dispositivo." });
        }
    }
};
