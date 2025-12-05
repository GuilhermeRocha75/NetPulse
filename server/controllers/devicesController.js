const db = require("../config/db");

// LISTAR TODOS OS DISPOSITIVOS
exports.getDevices = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM devices ORDER BY id DESC");
        res.json(rows);
    } catch (error) {
        console.error("Erro ao buscar dispositivos:", error);
        res.status(500).json({ error: "Erro ao buscar dispositivos" });
    }
};

// CRIAR UM NOVO DISPOSITIVO
exports.createDevice = async (req, res) => {
    const { name, ip_address, type } = req.body;

    if (!name || !ip_address) {
        return res.status(400).json({ error: "Nome e IP são obrigatórios" });
    }

    try {
        const sql = "INSERT INTO devices (name, ip_address, type) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, [name, ip_address, type]);

        res.json({
            message: "Dispositivo criado com sucesso",
            id: result.insertId
        });
    } catch (error) {
        console.error("Erro ao criar dispositivo:", error);
        res.status(500).json({ error: "Erro ao criar dispositivo" });
    }
};

// ATUALIZAR UM DISPOSITIVO
exports.updateDevice = async (req, res) => {
    const { id } = req.params;
    const { name, ip_address, type } = req.body;

    try {
        const sql = "UPDATE devices SET name=?, ip_address=?, type=? WHERE id=?";
        await db.query(sql, [name, ip_address, type, id]);

        res.json({ message: "Dispositivo atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar dispositivo:", error);
        res.status(500).json({ error: "Erro ao atualizar dispositivo" });
    }
};

// EXCLUIR UM DISPOSITIVO
exports.deleteDevice = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("DELETE FROM devices WHERE id=?", [id]);
        res.json({ message: "Dispositivo removido com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir dispositivo:", error);
        res.status(500).json({ error: "Erro ao excluir dispositivo" });
    }
};
