import { useEffect, useState, useCallback } from "react";
import "./App.css";
import "./styles/Titles.css";
import DeviceForm from "./components/DeviceForm/DeviceForm.jsx";
import EditDeviceForm from "./components/EditDeviceForm/EditDeviceForm.js";
import NetworkScanner from "./components/NetworkScanner/NetworkScanner.jsx";
import StatusLoader from "./components/StatusLoader/StatusLoader.jsx";



function App() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDevice, setEditingDevice] = useState(null);
  const [statusMap, setStatusMap] = useState({}); //status do ping


  // CARREGA LISTA DE DISPOSITIVOS

  const fetchDevices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/devices");
      if (!res.ok) throw new Error("Erro ao buscar dispositivos");
      const data = await res.json();
      setDevices(data);
    } catch (err) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  // PING AUTOMÁTICO
 
  const updatePingStatus = useCallback(async () => {
    try {
      const newStatus = {};

      for (const dev of devices) {
        const res = await fetch(`http://localhost:3001/devices/${dev.id}/ping`);
        const data = await res.json();

        newStatus[dev.id] = {
          alive: data.alive,
          time: data.time
        };
      }

      setStatusMap(newStatus);
    } catch (error) {
      console.error("Erro ao atualizar status de ping:", error);
    }
  }, [devices]);

  // roda a cada 5 segundos
  useEffect(() => {
    if (devices.length === 0) return;

    updatePingStatus(); 

    const interval = setInterval(updatePingStatus, 5000);
    return () => clearInterval(interval);
  }, [devices, updatePingStatus]);

  // DELETE

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover este dispositivo?"))
      return;

    try {
      const res = await fetch(`http://localhost:3001/devices/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao remover dispositivo");
      fetchDevices();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="App" style={{ padding: 20 }}>
  <h1 className="main-title">NetPulse - Dispositivos</h1>




      {/* FORM DE ADIÇÃO */}
      {!editingDevice && <DeviceForm onAdd={fetchDevices} />}

      {/* FORM DE EDIÇÃO */}
      {editingDevice && (
        <EditDeviceForm
          device={editingDevice}
          onCancel={() => setEditingDevice(null)}
          onSaved={() => {
            setEditingDevice(null);
            fetchDevices();
          }}
        />
      )}

      <section>
       <h2 className="section-title">Lista de dispositivos</h2>


        {loading && <p>Carregando...</p>}

        {error && (
          <p style={{ color: "crimson" }}>
            Erro: {error}
          </p>
        )}

        {!loading && devices.length === 0 && (
          <p>Nenhum dispositivo encontrado.</p>
        )}

        {!loading && devices.length > 0 && (
          <table className="table-terminal">
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>ID</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Nome</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>IP</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Tipo</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Status</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {devices.map((d) => (
                <tr key={d.id}>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>
                    {d.id}
                  </td>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>
                    {d.name}
                  </td>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>
                    {d.ip_address}
                  </td>
                  <td style={{ border: "1px solid #eee", padding: 8 }}>
                    {d.type}
                  </td>

                  {/* STATUS DO PING */}
                 <td style={{ border: "1px solid #eee", padding: 8 }}>
  {statusMap[d.id] ? (
    statusMap[d.id].alive ? (
      <span style={{ color: "green", fontWeight: "bold" }}>
        🟢 Online ({statusMap[d.id].time} ms)
      </span>
    ) : (
      <span style={{ color: "red", fontWeight: "bold" }}>
        🔴 Offline
      </span>
    )
  ) : (
    <StatusLoader />
  )}
</td>


                  <td style={{ border: "1px solid #eee", padding: 8 }}>
                   <button className="button-terminal" onClick={() => setEditingDevice(d)}>
  Editar
</button>

<button className="button-terminal button-danger" onClick={() => handleDelete(d.id)}>
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
