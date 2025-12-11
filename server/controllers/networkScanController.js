// server/controllers/networkScanController.js
const ping = require("ping");

/**
 * Faz um scan por ping no range baseIP + start..end
 * Faz em batches para limitar concorrência e não travar o servidor.
 */
exports.scanNetwork = async (req, res) => {
  try {
  
    const baseIP = req.query.base || "172.29.20.";
    const start = parseInt(req.query.start ?? "1", 10);
    const end = parseInt(req.query.end ?? "254", 10);
    const batchSize = parseInt(req.query.batch ?? "25", 10); // quantos pings simultâneos
    const timeout = parseInt(req.query.timeout ?? "1", 10); // timeout em segundos por ping

    if (start < 1 || end > 254 || start > end) {
      return res.status(400).json({ error: "Range inválido" });
    }

    const ips = [];
    for (let i = start; i <= end; i++) ips.push(`${baseIP}${i}`);

    const active = [];
    const total = ips.length;

    // função que executa ping para um IP
    const probe = async (ip) => {
      try {
        const result = await ping.promise.probe(ip, { timeout, extra: ["-c", "1"] });
        if (result.alive) {
          return { ip, alive: true, time: result.time ?? null };
        }
        return { ip, alive: false };
      } catch (err) {
        return { ip, alive: false };
      }
    };

    // rodar em batches para limitar concorrência
    for (let i = 0; i < ips.length; i += batchSize) {
      const batch = ips.slice(i, i + batchSize);
      // lança os probes da batch em paralelo
      const promises = batch.map((ip) => probe(ip));
      // aguarda a batch terminar
      const results = await Promise.all(promises);

      // coleta ativos (quem respondeu)
      for (const r of results) {
        if (r.alive) active.push(r);
      }

 
    }

    res.json({
      scanned: total,
      totalActive: active.length,
      activeDevices: active,
    });
  } catch (err) {
    console.error("Erro no network scan:", err);
    res.status(500).json({ error: "Erro ao escanear a rede" });
  }
};
