import { useEffect, useState, useCallback } from "react";
import "./App.css";
import DeviceForm from "./components/DeviceForm";

function App() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar dispositivos
  const fetchDevices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/devices");
      if (!res.ok) throw new Error("Erro ao buscar dispositivos");
      const data = await res.json();
      setDevices(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  // Função para remover dispositivo
  const removeDevice = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover este dispositivo?")) return;

    try {
      const res = await fetch(`http://localhost:3001/devices/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao remover dispositivo");

      // Atualiza lista depois de remover
      fetchDevices();
    } catch (err) {
      console.error(err);
      alert("Erro ao remover dispositivo.");
    }
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>NetPulse - Dispositivos</h1>

      <DeviceForm onAdd={fetchDevices} />

      <section>
        <h2>Lista de dispositivos</h2>

        {loading && <p>Carregando...</p>}

        {error && <p style={{ color: "crimson" }}>Erro: {error}</p>}

        {!loading && devices.length === 0 && <p>Nenhum dispositivo encontrado.</p>}

        {!loading && devices.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>ID</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Nome</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>IP</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Tipo</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id}>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>{d.id}</td>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>{d.name}</td>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>{d.ip_address}</td>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>{d.type}</td>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>
                    <button
                      onClick={() => removeDevice(d.id)}
                      style={{
                        backgroundColor: "crimson",
                        color: "white",
                        padding: "6px 12px",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;
