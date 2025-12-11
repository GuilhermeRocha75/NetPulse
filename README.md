# 📡 NetPulse

> **Monitoramento de Conectividade em Tempo Real**

O **NetPulse** é um sistema *Full Stack* projetado para registrar dispositivos de rede e monitorar sua conectividade (Ping) em tempo real. Com uma interface moderna estilo "Cyberpunk/Terminal", ele oferece feedback visual imediato sobre o status da sua infraestrutura.

---

## 📸 Funcionalidades

* **Dashboard em Tempo Real:** Visualização clara de dispositivos Online/Offline.
* **Monitoramento Automático:** Testes de ping a cada 5 segundos.
* **Gerenciamento Completo:** Cadastro, edição e remoção de dispositivos.
* **Scanner de Rede:** Ferramenta integrada para descobrir IPs ativos em um intervalo da rede.
* **Histórico de Latência:** Armazena e exibe o tempo de resposta (ms).

---

## 🛠 Tecnologias Utilizadas

### **Backend**
* [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript.
* [Express](https://expressjs.com/) - Framework para construção da API REST.
* [MySQL](https://www.mysql.com/) - Banco de dados relacional.
* `ping` - Biblioteca Node.js para execução de comandos ICMP.

### **Frontend**
* [React](https://react.dev/) - Biblioteca para construção da interface.
* CSS Modules/Custom - Estilização com tema Dark Neon.
* Fetch API - Comunicação nativa com o backend.

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

1.  **Node.js** (versão 16 ou superior):
    * [Download Node.js](https://nodejs.org/en/download/)
2.  **MySQL Server**:
    * Você precisa ter um serviço MySQL rodando localmente (ex: via XAMPP, Workbench ou Docker).
3.  **Permissões de Sistema**:
    * **Linux/Mac:** O sistema utiliza o comando `ping` do SO.
    * **Windows:** Certifique-se de que o firewall não está bloqueando solicitações ICMP locais.

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo na ordem para configurar o ambiente.

### 1. Configuração do Banco de Dados

1.  Acesse seu gerenciador de banco de dados (MySQL Workbench, phpMyAdmin, DBeaver, etc.).
2.  Crie um novo banco de dados ou execute o script SQL fornecido no projeto.
3.  Localize o arquivo `database/schema.sql` e execute seu conteúdo para criar as tabelas `devices` e `tests`.

> **Importante:** Verifique as credenciais de conexão no arquivo `server/config/db.js`. Se o seu usuário/senha do MySQL forem diferentes do padrão (`root`/senha em branco ou `root`), altere este arquivo.

### 2. Configurando e Iniciando o Backend

Abra um terminal na pasta raiz do projeto e navegue até a pasta do servidor:

```bash
cd server
Instale as dependências do projeto:

Bash

npm install express mysql2 cors ping
Inicie o servidor:

Bash

# Modo de desenvolvimento (com nodemon, se instalado)
npm run dev

# OU Modo padrão com Node
node index.js
O servidor rodará por padrão em: http://localhost:3001

3. Configurando e Iniciando o Frontend
Abra outro terminal (mantenha o backend rodando), volte à raiz e entre na pasta web:

Bash

cd web/netpulse-web
Instale as dependências do React:

Bash

npm install
Inicie a aplicação React:

Bash

npm start
O navegador abrirá automaticamente em: http://localhost:3000

📡 API Endpoints
Se você quiser testar a API diretamente (via Postman ou Insomnia):

GET /devices - Lista todos os dispositivos.

POST /devices - Cadastra novo dispositivo ({ name, ip_address, type }).

PUT /devices/:id - Atualiza um dispositivo.

DELETE /devices/:id - Remove um dispositivo.

GET /network/scan - Inicia varredura de rede (ex: ?base=192.168.0.&start=1&end=50).

🐛 Solução de Problemas Comuns
Erro de Conexão com o Banco (ECONNREFUSED):

Verifique se o MySQL está rodando.

Confira se as credenciais em server/config/db.js (host, user, password) estão corretas.

Erro de Permissão no Ping:

Em alguns sistemas Linux, pode ser necessário rodar o Node com sudo para enviar pacotes ICMP, embora a biblioteca tente contornar isso.

Frontend não carrega dados:

Verifique se o backend está rodando na porta 3001.

Verifique o console do navegador (F12) para ver se há erros de CORS ou conexão.

Desenvolvido por Guilherme Rocha.