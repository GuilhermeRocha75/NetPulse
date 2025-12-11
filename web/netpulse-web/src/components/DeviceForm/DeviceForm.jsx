import { useState } from "react";
import "./DeviceForm.css";
import "../../styles/Titles.css";


export default function DeviceForm({ onAdd }) {
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ip_address: ipAddress,
          type
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao adicionar");

      setName("");
      setIpAddress("");
      setType("");
      onAdd();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="device-form" onSubmit={handleSubmit}>
      <h2 className="add-title">Adicionar dispositivo</h2>


      <div className="input-container">
        <input
          placeholder="Nome do dispositivo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="input-container">
        <input
          placeholder="Endereço IP"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          required
        />
      </div>

      <div className="input-container">
        <input
          placeholder="Tipo"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>

      <button className="add-btn" type="submit" disabled={loading}>
        {loading ? "Adicionando..." : "Adicionar"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
