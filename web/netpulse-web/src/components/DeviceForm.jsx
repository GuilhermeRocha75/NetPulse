import { useState, useEffect } from "react";

export default function DeviceForm({ onAdd, onEdit, editingDevice }) {
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Preenche o form automaticamente quando estiver editando
  useEffect(() => {
    if (editingDevice) {
      setName(editingDevice.name);
      setIpAddress(editingDevice.ip_address);
      setType(editingDevice.type || "");
    }
  }, [editingDevice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !ipAddress.trim()) {
      setError("Nome e IP são obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      // 👉 SE ESTIVER EDITANDO
      if (editingDevice) {
        const res = await fetch(`http://localhost:3001/devices/${editingDevice.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            ip_address: ipAddress.trim(),
            type: type.trim() || null,
          }),
        });

        if (!res.ok) throw new Error("Falha ao atualizar dispositivo");

        if (onEdit) onEdit();
      }

      // 👉 SE ESTIVER ADICIONANDO
      else {
        const res = await fetch("http://localhost:3001/devices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            ip_address: ipAddress.trim(),
            type: type.trim() || null,
          }),
        });

        if (!res.ok) throw new Error("Falha ao cadastrar dispositivo");

        if (onAdd) onAdd();
      }

      // Limpa o form
      setName("");
      setIpAddress("");
      setType("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>{editingDevice ? "Editar dispositivo" : "Adicionar dispositivo"}</h3>

      <div>
        <label>
          Nome<br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do dispositivo"
            required
          />
        </label>
      </div>

      <div>
        <label>
          IP address<br />
          <input
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="192.168.0.10"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Tipo<br />
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Servidor / Switch / Roteador (opcional)"
          />
        </label>
      </div>

      <div style={{ marginTop: 8 }}>
        <button  style={{ background: "#20ad67ff", color: "white"}} type="submit" disabled={loading}>
          {loading
            ? editingDevice
              ? "Salvando..."
              : "Adicionando..."
            : editingDevice
            ? "Salvar alterações"
            : "Adicionar"}
        </button>
      </div>

      {error && (
        <div style={{ color: "crimson", marginTop: 8 }}>
          {error}
        </div>
      )}
    </form>
  );
}
