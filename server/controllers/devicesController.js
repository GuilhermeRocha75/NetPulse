const db = require("../config/db");
const ping = require("ping");


// GET /devices
const getDevices = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM devices");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar dispositivos:", err);
    res.status(500).json({ error: "Erro ao buscar dispositivos" });
  }
};


// POST /devices
const createDevice = async (req, res) => {
  const { name, ip_address, type } = req.body;

  if (!name || !ip_address) {
    return res.status(400).json({ error: "Nome e IP são obrigatórios" });
  }

  try {
    const sql = "INSERT INTO devices (name, ip_address, type) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [name, ip_address, type || null]);

    res.json({
      id: result.insertId,
      name,
      ip_address,
      type,
    });
  } catch (err) {
    console.error("Erro ao inserir dispositivo:", err);
    res.status(500).json({ error: "Erro ao inserir dispositivo" });
  }
};


// PUT /devices/:id
const updateDevice = async (req, res) => {
  const { id } = req.params;
  const { name, ip_address, type } = req.body;

  try {
    const sql =
      "UPDATE devices SET name = ?, ip_address = ?, type = ? WHERE id = ?";
    const [result] = await db.query(sql, [name, ip_address, type || null, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Dispositivo não encontrado" });
    }

    res.json({ message: "Dispositivo atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar dispositivo:", err);
    res.status(500).json({ error: "Erro ao atualizar dispositivo" });
  }
};


// DELETE /devices/:id
const deleteDevice = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = "DELETE FROM devices WHERE id = ?";
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Dispositivo não encontrado" });
    }

    res.json({ message: "Dispositivo removido com sucesso" });
  } catch (err) {
    console.error("Erro ao remover dispositivo:", err);
    res.status(500).json({ error: "Erro ao remover dispositivo" });
  }
};


// GET /devices/:id/ping
const pingDevice = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT ip_address FROM devices WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Dispositivo não encontrado" });
    }

    const ip = rows[0].ip_address;

    const result = await ping.promise.probe(ip, { timeout: 2 });

    res.json({
      ip,
      alive: result.alive,
      time: result.time,
    });
  } catch (err) {
    console.error("Erro no ping:", err);
    res.status(500).json({ error: "Falha ao realizar ping" });
  }
};

module.exports = {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice,
  pingDevice,
};
