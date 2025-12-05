import { useEffect, useState } from "react";
import api from "../services/api";

function DeviceList() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    api.get("/devices").then(res => setDevices(res.data));
  }, []);

  return (
    <div>
      <h2>Dispositivos Cadastrados</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>IP</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device.ip_address}</td>
              <td>{device.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeviceList;
