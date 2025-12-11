
import { useState, useRef } from "react";
import "./NetworkScanner.css"; 

export default function NetworkScanner({ base = "172.29.20.", start = 1, end = 254 }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState({ scanned: 0, total: end - start + 1 });
  const [results, setResults] = useState([]);
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
      batch: "30",
      timeout: "1"
    });

    try {
      const res = await fetch(`/network/scan?${params.toString()}`);
      if (!res.ok) throw new Error("Falha no scan");

      const data = await res.json();
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
    <div className="scanner-box">
      <h3>Scanner de rede</h3>

      <div className="scanner-range">
        Range: <strong>{base}{start} → {base}{end}</strong>
      </div>

      <div className="scanner-buttons">
        <button onClick={startScan} disabled={scanning}>
          {scanning ? "Escaneando..." : "Iniciar Scan"}
        </button>

        <button
          className="cancel-btn"
          onClick={() => { abortRef.current = true; setScanning(false); }}
        >
          Cancelar
        </button>
      </div>

      <div className="progress-area">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(progress.scanned / progress.total) * 100}%` }}
          />
        </div>
        <div className="progress-text">
          {progress.scanned} / {progress.total} IPs processados
        </div>
      </div>

      <div className="results-area">
        <h4>Dispositivos ativos ({results.length})</h4>

        <table className="results-table">
          <thead>
            <tr>
              <th>IP</th>
              <th>Latência (ms)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.ip}>
                <td>{r.ip}</td>
                <td>{r.time ?? "-"}</td>
              </tr>
            ))}

            {results.length === 0 && (
              <tr>
                <td colSpan={2} className="no-results">Nenhum dispositivo ativo encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
