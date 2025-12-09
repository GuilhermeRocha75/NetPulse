// src/components/NetworkScanner.jsx
import { useState, useRef } from "react";

export default function NetworkScanner({ base = "172.29.20.", start = 1, end = 254 }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState({ scanned: 0, total: end - start + 1 });
  const [results, setResults] = useState([]); // array of {ip, alive, time}
  const abortRef = useRef(false);

  const startScan = async () => {
    setScanning(true);
    setResults([]);
    setProgress({ scanned: 0, total: end - start + 1 });
    abortRef.current = false;

    const params = new URLSearchParams({
      base,
      start: String(start),
      end: String(end),
      batch: "30", // cliente pode solicitar batch param (server usa default se omitido)
      timeout: "1"
    });

    try {
      // chamamos o endpoint que retorna só os dispositivos ativos no final.
      // Se quiser feedback incremental, precisaríamos de SSE/websocket ou endpoint que retorne streaming.
      const res = await fetch(`/network/scan?${params.toString()}`, { signal: undefined });
      if (!res.ok) {
        throw new Error("Falha no scan");
      }
      const data = await res.json();

      // O endpoint retorna só os ativos; para uma UI com barra de progresso perfeita,
      // precisaríamos de streaming. Aqui mostramos progresso aproximado:
      setResults(data.activeDevices || []);
      setProgress({ scanned: progress.total, total: progress.total });
    } catch (err) {
      console.error("Erro no scan:", err);
      alert("Erro ao escanear a rede");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div style={{ marginTop: 20, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
      <h3>Scanner de rede</h3>

      <div style={{ marginBottom: 8 }}>
        Range: <strong>{base}{start} → {base}{end}</strong>
      </div>

      <div>
        <button onClick={startScan} disabled={scanning} style={{ marginRight: 8 }}>
          {scanning ? "Escaneando..." : "Iniciar Scan"}
        </button>
        <button onClick={() => { abortRef.current = true; setScanning(false); }}>
          Cancelar
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ height: 12, background: "#eee", borderRadius: 6, overflow: "hidden" }}>
          <div style={{
            width: `${(progress.scanned / progress.total) * 100}%`,
            height: "100%",
            background: "#45aaee"
          }} />
        </div>
        <div style={{ marginTop: 6 }}>
          {progress.scanned} / {progress.total} IPs processados
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Dispositivos ativos ({results.length})</h4>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: 6 }}>IP</th>
              <th style={{ border: "1px solid #ddd", padding: 6 }}>Latência (ms)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.ip}>
                <td style={{ border: "1px solid #eee", padding: 6 }}>{r.ip}</td>
                <td style={{ border: "1px solid #eee", padding: 6 }}>{r.time ?? "-"}</td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr><td colSpan={2} style={{ padding: 8 }}>Nenhum dispositivo ativo encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
