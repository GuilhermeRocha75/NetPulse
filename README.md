# 📡 NetPulse

NetPulse é um sistema simples e eficiente para **registrar dispositivos de rede**, acompanhar seus dados e **monitorar sua conectividade em tempo real** por meio de testes de ping automáticos.

O projeto inclui:
- Uma API Node.js para gerenciar dispositivos e testar conectividade.  
- Uma interface React estilizada com tema dark moderno.  
- Scanner de rede integrado.  
- Status visual de conectividade com animações no estilo terminal.  
- Formulários estilizados com inputs modernos.  

---

## 🚀 Funcionalidades Principais

### ✔️ Cadastro de dispositivos  
- Nome  
- IP  
- Tipo  
- Armazenamento no backend  

### ✔️ Edição e remoção  
Interface dedicada para edição com design modernizado que segue o visual da tabela.

### ✔️ Monitoramento automático  
- A cada 5s o sistema testa todos os dispositivos.  
- Exibição de status:
  - 🟢 **Online** (latência exibida)  
  - 🔴 **Offline**  
  - ⌛ **Carregando...** (com animação em terminal)  

### ✔️ Scanner de rede integrado  
- Escaneia um range configurável (padrão 172.29.20.1 → 172.29.20.254)  
- Mostra IPs ativos com suas latências  

### ✔️ Interface moderna  
- Tema dark com efeitos neon  
- Tabela estilo "terminal"  
- Inputs modernos com glow  
- Títulos com estética cyberpunk  

---

## 🛠 Tecnologias Utilizadas

### **Frontend**
- React  
- CSS customizado  
- Animações Uiverse.io  
- Fetch API  

### **Backend**
- Node.js  
- Express  
- Ping para testes de conectividade  

---

## 📂 Estrutura do Projeto

NetPulse/
│
├── backend/
│ ├── server.js
│ ├── routes/
│ └── controllers/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── styles/
│ │ ├── assets/
│ │ ├── App.js
│ │ ├── App.css
│ │ └── index.js
│
└── README.md


---

## 🧪 Como executar o projeto

### 1️⃣ Iniciar o backend

```bash
cd backend
npm install
node server.js

Servidor rodará em:

http://localhost:3001


 Iniciar o frontend
cd frontend
npm install
npm start