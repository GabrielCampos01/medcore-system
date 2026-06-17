# MedCore System

Sistema Integrado de Gestão Hospitalar desenvolvido para a disciplina de Tecnologias para Internet.

---

# Descrição

O MedCore System é uma aplicação Full Stack inspirada em sistemas HIS (Health Information Systems), como Tasy e MV Soul.

O sistema permite o gerenciamento de:

* Pacientes
* Profissionais de Saúde
* Especialidades Médicas
* Atendimentos

A aplicação foi desenvolvida utilizando React no frontend, Node.js e Express no backend e MySQL como banco de dados relacional.

---

# Tecnologias Utilizadas

## Frontend

* React
* Vite
* React Router DOM
* Bootstrap 5
* Bootstrap Icons
* Axios

## Backend

* Node.js
* Express
* MySQL2
* CORS
* Dotenv

## Banco de Dados

* MySQL

## Ferramentas

* VS Code
* Git
* GitHub
* MySQL Workbench
* Postman
* Thunder Client

---

# Funcionalidades

## Dashboard

* Total de pacientes cadastrados
* Total de profissionais ativos
* Total de atendimentos do dia

## Pacientes

* Cadastro
* Listagem
* Busca por nome ou CPF
* Edição
* Exclusão
* Validação de CPF único
* Validação de e-mail único

## Profissionais

* Cadastro
* Listagem
* Edição
* Exclusão
* Relacionamento com especialidades
* Validação de CRM único

## Especialidades

* Cadastro
* Listagem
* Edição
* Exclusão

## Atendimentos

* Cadastro
* Listagem
* Edição
* Cancelamento de atendimento
* Filtro por data
* Filtro por status
* Visualização de detalhes
* Relacionamento entre paciente e profissional

---

# Estrutura do Projeto

```text
medcore-system/
│
├── backend/
│   ├── database.sql
│   ├── .env.example
│   ├── package.json
│   └── src/
│
├── frontend/
│   ├── package.json
│   └── src/
│
├── .gitignore
└── README.md
```

---

# Como Clonar o Projeto

```bash
git clone https://github.com/GabrielCampos01/medcore-system.git
```

Entrar na pasta:

```bash
cd medcore-system
```

---

# Configuração do Banco de Dados

## Requisitos

* MySQL Server
* MySQL Workbench

## Criando o Banco

1. Abrir o MySQL Workbench.
2. Conectar ao servidor MySQL.
3. Criar uma nova aba SQL.
4. Abrir o arquivo:

```text
backend/database.sql
```

5. Executar todo o script.

O arquivo irá:

* Criar o banco `medcore`
* Criar as tabelas
* Criar os relacionamentos
* Inserir registros iniciais para testes

---

# Configuração do Backend

Entrar na pasta:

```bash
cd backend
```

Instalar dependências:

```bash
npm install
```

---

## Variáveis de Ambiente

Por questões de segurança, o arquivo `.env` não é enviado ao GitHub.

Utilize o arquivo:

```text
.env.example
```

como modelo.

Crie um arquivo:

```text
.env
```

na pasta backend.

Exemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=medcore
DB_PORT=3306
PORT=3000
```

Altere os valores conforme sua instalação do MySQL.

---

## Executando o Backend

npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

---

# Configuração do Frontend

Abrir um novo terminal.

Entrar na pasta:

```bash
cd frontend
```

Instalar dependências:

```bash
npm install
```

Observação:

A pasta `node_modules` não é enviada ao GitHub.

Por isso, após clonar o projeto, é obrigatório executar:

```bash
npm install
```

para baixar todas as dependências do React, Vite, Bootstrap e demais bibliotecas.

---

## Executando o Frontend

```bash
npm run dev
```

Aplicação disponível em:

```text
http://localhost:5173
```

---

# Endpoints Principais

## Pacientes

```http
GET    /api/pacientes
GET    /api/pacientes/:id
POST   /api/pacientes
PUT    /api/pacientes/:id
DELETE /api/pacientes/:id
```

---

## Profissionais

```http
GET    /api/profissionais
GET    /api/profissionais/:id
POST   /api/profissionais
PUT    /api/profissionais/:id
DELETE /api/profissionais/:id
```

---

## Especialidades

```http
GET    /api/especialidades
GET    /api/especialidades/:id
POST   /api/especialidades
PUT    /api/especialidades/:id
DELETE /api/especialidades/:id
```

---

## Atendimentos

```http
GET    /api/atendimentos
GET    /api/atendimentos/:id
POST   /api/atendimentos
PUT    /api/atendimentos/:id
```

Filtros:

```http
GET /api/atendimentos?data=2026-06-15
GET /api/atendimentos?status=Cancelado
```

---

# Testando a API

A API pode ser testada utilizando:

* Postman
* Thunder Client
* Insomnia

Exemplo de cadastro de paciente:

```http
POST /api/pacientes
```

```json
{
  "nome_completo": "João da Silva",
  "cpf": "12345678900",
  "telefone": "(41) 99999-9999",
  "email": "joao@email.com"
}
```

---

# Autor

Gabriel Campos

Projeto acadêmico desenvolvido para a disciplina de Tecnologias para Internet.
