const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const devicesRoutes = require("./routes/devicesRoutes");
app.use("/devices", devicesRoutes);

// Rota inicial
app.get("/", (req, res) => {
    res.send("Servidor NetPulse está rodando!");
});

// ... outros requires
const networkRoutes = require("./routes/networkRoutes");


app.use("/network", networkRoutes);


// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
