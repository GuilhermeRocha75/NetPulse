const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// Configurações básicas
app.use(cors());
app.use(express.json());

// Teste inicial para confirmar que o servidor está ativo
app.get("/", (req, res) => {
    res.send("Servidor NetPulse está rodando!");
});

// Iniciando servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
 