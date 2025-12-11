#  NetPulse
> **Monitoramento de Conectividade em Tempo Real**

O **NetPulse** é um sistema *Full Stack* projetado para registrar dispositivos de rede e monitorar sua conectividade (Ping) em tempo real.  
Com uma interface moderna estilo *Cyberpunk/Terminal*, ele oferece feedback visual imediato sobre o status da sua infraestrutura.

---

##  Funcionalidades

- **Dashboard em Tempo Real:** visualização clara de dispositivos Online/Offline.  
- **Monitoramento Automático:** testes de ping a cada 5 segundos.  
- **Gerenciamento Completo:** cadastro, edição e remoção de dispositivos.  
- **Scanner de Rede:** ferramenta integrada para descobrir IPs ativos.  
- **Histórico de Latência:** armazena e exibe o tempo de resposta (ms).  

---

##  Tecnologias Utilizadas

### **Backend**
- Node.js  
- Express  
- MySQL  
- Biblioteca `ping` (para testes ICMP)

### **Frontend**
- React  
- CSS customizado estilo *Dark Neon*  
- Fetch API

---

##  Pré-requisitos

Antes de rodar o projeto, garanta que possui instalado:

1. **Node.js** (16+)
2. **MySQL Server**  
3. **Permissão para enviar pacotes ICMP** (caso necessário)

---

##  Como Executar o Projeto

### **1. Configurar o Banco de Dados**

1. Abra seu gerenciador MySQL (Workbench, phpMyAdmin, etc).  
2. Crie o banco e execute o arquivo:

database/schema.sql

csharp
Copiar código

3. Verifique as credenciais em:

server/config/db.js

yaml
Copiar código

---

### **2. Iniciar o Backend**

```bash
cd server

npm install

# Modo dev (se tiver nodemon)
npm run dev

# Ou:
node index.js
O backend estará rodando em:

arduino
Copiar código
http://localhost:3001
3. Iniciar o Frontend
bash
Copiar código
cd web/netpulse-web

npm install

npm start
Abra no navegador:

arduino
Copiar código
http://localhost:3000
## API Endpoints
Dispositivos
GET /devices – Lista todos

POST /devices – Cria novo

PUT /devices/:id – Atualiza

DELETE /devices/:id – Remove

Rede
GET /network/scan?base=192.168.0.&start=1&end=50
Escaneia um intervalo da rede local.

 ## Solução de Problemas Comuns
1. ECONNREFUSED (Erro ao conectar no MySQL)
MySQL não está rodando

Credenciais incorretas em db.js

Porta errada configurada

2. Ping não funciona
Firewall bloqueando ICMP

No Linux, pode exigir permissões elevadas

3. Frontend não mostra dispositivos
Backend não está rodando na porta 3001

Erro de CORS

Verifique F12 → Console do navegador

## Desenvolvido por
Guilherme Rocha
Rafael Moraes
