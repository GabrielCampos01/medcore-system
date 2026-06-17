#TESTEEE

Sistema Integrado de Gestão Hospitalar desenvolvido para a disciplina de Tecnologias para Internet.

---

## Descrição

O MedCore System é uma aplicação Full Stack inspirada em sistemas HIS (Health Information Systems), como Tasy e MV Soul.

O sistema permite o gerenciamento de:

* Pacientes
* Profissionais de Saúde
* Especialidades Médicas
* Atendimentos

A aplicação foi desenvolvida utilizando React no frontend, Node.js e Express no backend e MySQL como banco de dados relacional.

---

## Tecnologias Utilizadas

### Frontend

* React
* Vite
* React Router DOM
* Bootstrap 5
* Bootstrap Icons
* Axios

### Backend

* Node.js
* Express
* MySQL2
* CORS
* Dotenv

### Banco de Dados

* MySQL

### Ferramentas

* VS Code
* Git
* GitHub
* MySQL Workbench
* Postman
* Thunder Client

---

## Funcionalidades

### Dashboard

* Total de pacientes cadastrados
* Total de profissionais ativos
* Total de atendimentos do dia

### Pacientes

* Cadastro de pacientes
* Listagem de pacientes
* Busca por nome ou CPF
* Edição de dados
* Exclusão de pacientes
* Validação de CPF único
* Validação de e-mail único

### Profissionais

* Cadastro de profissionais
* Listagem de profissionais
* Edição de dados
* Exclusão de profissionais
* Relacionamento com especialidades
* Validação de registro profissional único
* Validação de e-mail único

### Especialidades

* Cadastro de especialidades
* Listagem de especialidades
* Edição de especialidades
* Exclusão de especialidades
* Validação de nome único

### Atendimentos

* Cadastro de atendimentos
* Listagem de atendimentos
* Edição de atendimentos
* Cancelamento de atendimento
* Filtro por data
* Filtro por status
* Visualização de detalhes
* Relacionamento entre paciente e profissional

No frontend, o atendimento não é removido diretamente da listagem ao ser cancelado. O sistema altera o status do atendimento para `Cancelado`, mantendo o histórico registrado.

---

## Estrutura do Projeto

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

Observação: caso a pasta do frontend esteja com outro nome no repositório, como `front-end`, utilize esse mesmo nome nos comandos.

---

## Como Clonar o Projeto

```bash
git clone https://github.com/GabrielCampos01/medcore-system.git
```

Entrar na pasta do projeto:

```bash
cd medcore-system
```

---

## Configuração do Banco de Dados

### Requisitos

Para executar o projeto, é necessário ter instalado:

* MySQL Server
* MySQL Workbench

### Criando o Banco de Dados

1. Abrir o MySQL Workbench.
2. Conectar ao servidor MySQL local.
3. Criar uma nova aba SQL.
4. Abrir o arquivo:

```text
backend/database.sql
```

5. Executar todo o script.

O arquivo `database.sql` irá:

* Criar o banco de dados `medcore`
* Criar as tabelas do sistema
* Criar os relacionamentos entre as tabelas
* Inserir registros iniciais para testes

As principais tabelas criadas são:

* `pacientes`
* `profissionais`
* `especialidades`
* `atendimentos`

---

## Configuração do Backend

Entrar na pasta do backend:

```bash
cd backend
```

Instalar as dependências:

```bash
npm install
```

A pasta `node_modules` não é enviada ao GitHub. Por isso, após clonar o projeto, é obrigatório executar `npm install` para baixar todas as dependências do backend.

---

## Variáveis de Ambiente

Por questões de segurança, o arquivo `.env` não é enviado ao GitHub.

O repositório possui o arquivo:

```text
.env.example
```

Esse arquivo serve como modelo.

Crie um arquivo chamado:

```text
.env
```

dentro da pasta `backend`.

Exemplo de configuração:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=medcore
DB_PORT=3306
PORT=3000
```

Altere os valores de `DB_USER` e `DB_PASSWORD` conforme o usuário e senha configurados no seu MySQL local.

Exemplo:

```env
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=usuario
DB_NAME=medcore
DB_PORT=3306
PORT=3000
```

---

## Executando o Backend

Para rodar o backend em modo de desenvolvimento:

```bash
npm run dev
```

Caso exista o script `start` configurado no `package.json`, também é possível executar:

```bash
npm start
```

A API ficará disponível em:

```text
http://localhost:3000
```

Para testar se a API está funcionando, acesse no navegador:

```text
http://localhost:3000
```

A resposta esperada é uma mensagem informando que a API está funcionando.

---

## Configuração do Frontend

Abrir um novo terminal.

Voltar para a pasta principal do projeto, se necessário:

```bash
cd ..
```

Entrar na pasta do frontend:

```bash
cd frontend
```

Instalar as dependências:

```bash
npm install
```

A pasta `node_modules` não é enviada ao GitHub. Por isso, após clonar o projeto, é obrigatório executar `npm install` para baixar todas as dependências do frontend.

---

## Executando o Frontend

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

---

## Fluxo Para Rodar o Projeto Completo

Após clonar o repositório, siga esta ordem:

1. Executar o arquivo `backend/database.sql` no MySQL Workbench.
2. Criar o arquivo `.env` dentro da pasta `backend`, usando o `.env.example` como modelo.
3. Instalar e rodar o backend:

```bash
cd backend
npm install
npm run dev
```

4. Abrir outro terminal, instalar e rodar o frontend:

```bash
cd frontend
npm install
npm run dev
```

5. Acessar o sistema no navegador:

```text
http://localhost:5173
```

---

## Endpoints Principais da API

### Pacientes

```http
GET    /api/pacientes
GET    /api/pacientes/:id
POST   /api/pacientes
PUT    /api/pacientes/:id
DELETE /api/pacientes/:id
```

### Profissionais

```http
GET    /api/profissionais
GET    /api/profissionais/:id
POST   /api/profissionais
PUT    /api/profissionais/:id
DELETE /api/profissionais/:id
```

### Especialidades

```http
GET    /api/especialidades
GET    /api/especialidades/:id
POST   /api/especialidades
PUT    /api/especialidades/:id
DELETE /api/especialidades/:id
```

### Atendimentos

```http
GET    /api/atendimentos
GET    /api/atendimentos/:id
POST   /api/atendimentos
PUT    /api/atendimentos/:id
DELETE /api/atendimentos/:id
```

### Filtros de Atendimentos

Filtrar por data:

```http
GET /api/atendimentos?data=2026-06-15
```

Filtrar por status:

```http
GET /api/atendimentos?status=Cancelado
```

---

## Exemplos de Requisições

### Cadastro de Paciente

```http
POST /api/pacientes
```

```json
{
  "nome_completo": "João da Silva",
  "cpf": "12345678900",
  "data_nascimento": "1990-01-01",
  "sexo": "Masculino",
  "telefone": "(41) 99999-9999",
  "email": "joao@email.com",
  "endereco": "Rua Exemplo, 123",
  "convenio": "Unimed",
  "numero_carteirinha": "123456"
}
```

### Cadastro de Especialidade

```http
POST /api/especialidades
```

```json
{
  "nome": "Cardiologia",
  "descricao": "Especialidade relacionada ao coração",
  "area": "Clínica Médica"
}
```

### Cadastro de Profissional

```http
POST /api/profissionais
```

```json
{
  "nome": "Carlos Mendes",
  "crm_coren_crf": "12345",
  "especialidade_id": 1,
  "cargo": "Médico",
  "turno": "Manhã",
  "telefone": "(41) 97777-1111",
  "email": "carlos@email.com",
  "ativo": true
}
```

### Cadastro de Atendimento

```http
POST /api/atendimentos
```

```json
{
  "paciente_id": 1,
  "profissional_id": 1,
  "data_hora": "2026-06-15 09:00:00",
  "tipo": "Consulta",
  "status": "Agendado",
  "diagnostico": "Aguardando atendimento",
  "observacoes": "Primeira consulta",
  "valor": 150.00
}
```

---

## Testando a API

A API pode ser testada utilizando:

* Postman
* Thunder Client
* Insomnia

Antes de testar os endpoints, verifique se:

* O MySQL está rodando.
* O banco `medcore` foi criado.
* O arquivo `.env` foi configurado corretamente.
* O backend está rodando em `http://localhost:3000`.

---

## Arquivos Ignorados pelo Git

O projeto utiliza `.gitignore` para evitar o envio de arquivos desnecessários ou sensíveis para o GitHub.

Arquivos e pastas ignorados:

```text
node_modules
.env
dist
.DS_Store
```

Explicação:

* `node_modules`: dependências instaladas localmente, recriadas com `npm install`.
* `.env`: arquivo com configurações locais e dados sensíveis.
* `dist`: pasta gerada no build do frontend.
* `.DS_Store`: arquivo criado automaticamente pelo macOS.

---

## Observações Importantes

* O arquivo `.env` deve ser criado manualmente em cada computador.
* O arquivo `.env.example` deve permanecer no GitHub como modelo.
* O arquivo `database.sql` deve ser executado antes de iniciar o backend.
* O backend precisa estar rodando para que o frontend consiga buscar e salvar dados.
* O frontend consome a API através do Axios.
* O banco utilizado é o MySQL.

---

## Autor

Gabriel Campos

Projeto acadêmico desenvolvido para a disciplina de Tecnologias para Internet.
