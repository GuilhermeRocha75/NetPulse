import { useState } from "react";

export default function EditDeviceForm({ device, onCancel, onSaved }) {
  const [name, setName] = useState(device.name);
  const [ipAddress, setIpAddress] = useState(device.ip_address);
  const [type, setType] = useState(device.type || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3001/devices/${device.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ip_address: ipAddress,
          type,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao atualizar");

      onSaved(); // volta para lista
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      style={{ marginBottom: 20, padding: 15, border: "1px solid #ccc" }}
    >
      <h3>Editando dispositivo ID {device.id}</h3>

      <div>
        <label>
          Nome<br />
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
      </div>

      <div>
        <label>
          IP<br />
          <input value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} required />
        </label>
      </div>

      <div>
        <label>
          Tipo<br />
          <input value={type} onChange={(e) => setType(e.target.value)} />
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar alterações"}
      </button>

      <button
        type="button"
        onClick={onCancel}
        style={{ marginLeft: 10, background: "#777", color: "white" }}
      >
        Cancelar
      </button>

      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </form>
  );
}
