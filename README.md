#  NetPulse
> **Monitoramento de Conectividade em Tempo Real**

O **NetPulse** é um sistema *Full Stack* projetado para registrar dispositivos de rede e monitorar sua conectividade (Ping) em tempo real. Com uma interface moderna estilo "Cyberpunk/Terminal", ele oferece feedback visual imediato sobre o status da sua infraestrutura.

---

##  Funcionalidades

- **Dashboard em Tempo Real:** visualização clara de dispositivos Online/Offline.
- **Monitoramento Automático:** testes de ping a cada 5 segundos.
- **Gerenciamento Completo:** cadastro, edição e remoção de dispositivos.
- **Scanner de Rede:** ferramenta integrada para descobrir IPs ativos em um intervalo.
- **Histórico de Latência:** exibe o tempo de resposta (ms).

---

##  Tecnologias Utilizadas

### **Backend**
- Node.js
- Express
- MySQL
- Biblioteca `ping` (Node.js)

### **Frontend**
- React
- CSS personalizado (tema dark neon)
- Fetch API

---

##  Pré-requisitos

Antes de iniciar, garanta que possui:

1. **Node.js 16+**  
   https://nodejs.org/en/download/

2. **MySQL Server**  
   Pode ser nativo, via XAMPP, Workbench ou Docker.

3. **Permissões do Sistema:**  
   - Linux/macOS: o comando `ping` deve estar disponível.  
   - Windows: permitir tráfego ICMP no firewall.

---

##  Como Executar o Projeto

### **1. Configuração do Banco de Dados**

1. Abra seu gerenciador MySQL (Workbench, phpMyAdmin, etc).
2. Crie um banco de dados.
3. Execute o arquivo `database/schema.sql` contido no projeto.
4. Verifique suas credenciais no arquivo:  
   `server/config/db.js`  
   Ajuste *host, user, password* se necessário.

---

### **2. Configurando e Iniciando o Backend**

No terminal:

```bash
cd server
npm install express mysql2 cors ping
npm run dev     # se tiver nodemon
# OU
node index.js
```
Servidor rodando em: http://localhost:3001

3. Configurando e Iniciando o Frontend
Em outro terminal:

```bash
cd web/netpulse-web
npm install
npm start
```
Frontend disponível em: http://localhost:3000

## API Endpoints
Dispositivos
- GET /devices → Lista todos os dispositivos

- POST /devices → Cadastra novo dispositivo
- Body: { name, ip_address, type }

- PUT /devices/:id → Atualiza um dispositivo

- DELETE /devices/:id → Remove um dispositivo

Scanner de Rede
- GET /network/scan?base=192.168.0.&start=1&end=50
Varre um intervalo de IPs.

## Solução de Problemas Comuns
❌ Erro de Conexão com o Banco (ECONNREFUSED)
MySQL não está rodando

Credenciais incorretas em server/config/db.js

❌ Erro ao Executar Ping
Linux pode exigir permissões elevadas

Windows pode estar bloqueando ICMP no firewall

❌ Frontend Não Mostra Dados
Verifique se o backend está ativo na porta 3001

Veja erros no console do navegador (F12)

Problemas com CORS também podem aparecer

# Desenvolvido por
- Guilherme Rocha
- Rafael Moraes
