import DeviceList from "../components/DeviceList";

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>NetPulse – Monitoramento de Dispositivos</h1>
      <DeviceList />
    </div>
  );
}
