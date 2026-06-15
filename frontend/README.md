# MedCore System

Sistema Integrado de Gestão Hospitalar desenvolvido para a disciplina de Tecnologias para Internet.

## Descrição

O MedCore System é uma aplicação Full Stack inspirada em sistemas HIS (Health Information Systems), como Tasy, MV Soul e AGHUse, permitindo o gerenciamento de pacientes, profissionais de saúde, especialidades médicas e atendimentos hospitalares por meio de uma API RESTful integrada a uma interface web moderna.

## Tecnologias Utilizadas

### Backend

* Node.js
* Express
* MySQL
* Axios
* CORS

### Frontend

* React
* Vite
* React Router DOM
* Bootstrap 5
* Bootstrap Icons
* Axios

## Funcionalidades

### Dashboard

* Total de pacientes cadastrados
* Total de profissionais ativos
* Total de atendimentos realizados no dia

### Pacientes

* Cadastro
* Listagem
* Busca por nome ou CPF
* Edição
* Exclusão

### Profissionais

* Cadastro
* Listagem
* Edição
* Exclusão
* Relacionamento com especialidades

### Especialidades

* CRUD completo

### Atendimentos

* Cadastro
* Listagem
* Filtro por data
* Filtro por status
* Edição
* Cancelamento de atendimento
* Visualização de detalhes
* Relacionamento entre paciente e profissional

## Estrutura do Projeto

```text
medcore-system/
├── backend/
├── frontend/
└── README.md
```

## Instalação

### Backend

```bash
cd backend
npm install
npm start
```

Servidor disponível em:

```text
http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação disponível em:

```text
http://localhost:5173
```

## Variáveis de Ambiente

Criar um arquivo `.env` dentro da pasta `backend`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=medcore
PORT=3000
```

## Exemplos de Endpoints

### Pacientes

Listar todos:

```http
GET /api/pacientes
```

Buscar por ID:

```http
GET /api/pacientes/:id
```

Cadastrar:

```http
POST /api/pacientes
```

Exemplo:

```json
{
  "nome_completo": "João da Silva",
  "cpf": "12345678900",
  "data_nascimento": "1990-01-01",
  "sexo": "Masculino",
  "telefone": "41999999999",
  "email": "joao@email.com"
}
```

Editar:

```http
PUT /api/pacientes/:id
```

Excluir:

```http
DELETE /api/pacientes/:id
```

---

### Profissionais

Listar todos:

```http
GET /api/profissionais
```

Buscar por ID:

```http
GET /api/profissionais/:id
```

Cadastrar:

```http
POST /api/profissionais
```

Editar:

```http
PUT /api/profissionais/:id
```

Excluir:

```http
DELETE /api/profissionais/:id
```

---

### Especialidades

Listar todas:

```http
GET /api/especialidades
```

Buscar por ID:

```http
GET /api/especialidades/:id
```

Cadastrar:

```http
POST /api/especialidades
```

Editar:

```http
PUT /api/especialidades/:id
```

Excluir:

```http
DELETE /api/especialidades/:id
```

---

### Atendimentos

Listar todos:

```http
GET /api/atendimentos
```

Buscar por ID:

```http
GET /api/atendimentos/:id
```

Cadastrar:

```http
POST /api/atendimentos
```

Editar:

```http
PUT /api/atendimentos/:id
```

Cancelar atendimento:

```http
PUT /api/atendimentos/:id
```

Filtro por data:

```http
GET /api/atendimentos?data=2026-06-15
```

Filtro por status:

```http
GET /api/atendimentos?status=Cancelado
```

## Autor

Gabriel Campos

Projeto acadêmico desenvolvido para a disciplina de Tecnologias para Internet.
