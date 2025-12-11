import { useState } from "react";
import "./EditDeviceForm.css";

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

      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <form className="edit-form" onSubmit={handleUpdate}>
  <h3>Editando dispositivo ID {device.id}</h3>

  <div className="field">
    <label>Nome</label>
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>

  <div className="field">
    <label>IP</label>
    <input
      value={ipAddress}
      onChange={(e) => setIpAddress(e.target.value)}
      required
    />
  </div>

  <div className="field">
    <label>Tipo</label>
    <input 
      value={type} 
      onChange={(e) => setType(e.target.value)} 
    />
  </div>

  <div className="buttons">
    <button type="submit" className="save-btn" disabled={loading}>
      {loading ? "Salvando..." : "Salvar alterações"}
    </button>

    <button type="button" className="cancel-btn" onClick={onCancel}>
      Cancelar
    </button>
  </div>

  {error && <p className="error">{error}</p>}
</form>

  );
}
