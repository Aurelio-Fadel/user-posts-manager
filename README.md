# 📝 API Sistema de Posts e Autores

Uma API RESTful completa para gerenciamento de usuários, autores e posts, desenvolvida com Node.js, Express e MongoDB.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação via JSON Web Token
- **Swagger/OpenAPI** - Documentação da API
- **bcrypt** - Hash de senhas (presumido)

## 📋 Funcionalidades

### 🔐 Autenticação
- Login com email e senha
- Autenticação JWT
- Middleware de proteção de rotas

### 👥 Gerenciamento de Usuários
- ✅ Cadastro de novos usuários
- ✅ Listagem de usuários
- ✅ Busca por ID
- ✅ Atualização de dados (protegida)
- ✅ Exclusão de usuários (protegida)
- ✅ Busca por nome

### ✍️ Gerenciamento de Autores
- ✅ Cadastro de autores
- ✅ Listagem de autores
- ✅ Busca por ID
- ✅ Atualização de dados
- ✅ Exclusão de autores
- ✅ Busca por nome

### 📝 Gerenciamento de Posts
- ✅ Criação de posts com autor embedido
- ✅ Listagem de posts
- ✅ Busca por ID
- ✅ Atualização de posts
- ✅ Exclusão de posts

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/api-posts-autores.git
cd api-posts-autores
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de dados
MONGODB_URI=mongodb://localhost:27017/posts-api
# ou para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/posts-api

# JWT
JWT_SECRET=seu-jwt-secret-super-seguro
JWT_EXPIRES_IN=7d

# Servidor
PORT=3000
NODE_ENV=development
```

### 4. Inicie o servidor
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📖 Documentação da API

A documentação completa da API está disponível via Swagger UI:

```
http://localhost:3000/api-docs
```

### Endpoints Principais

#### 🔐 Autenticação
```http
POST /api/auth/login
```

#### 👥 Usuários
```http
GET    /api/users              # Listar usuários
POST   /api/users              # Criar usuário
GET    /api/users/:id          # Buscar por ID
PUT    /api/users/:id          # Atualizar (🔒 protegido)
DELETE /api/users/:id          # Deletar (🔒 protegido)
GET    /api/users/search/:name # Buscar por nome
```

#### ✍️ Autores
```http
GET    /api/authors              # Listar autores
POST   /api/authors              # Criar autor
GET    /api/authors/:id          # Buscar por ID
PUT    /api/authors/:id          # Atualizar
DELETE /api/authors/:id          # Deletar
GET    /api/authors/search/:name # Buscar por nome
```

#### 📝 Posts
```http
GET    /api/posts     # Listar posts
POST   /api/posts     # Criar post
GET    /api/posts/:id # Buscar por ID
PUT    /api/posts/:id # Atualizar
DELETE /api/posts/:id # Deletar
```

## 🔑 Autenticação

Para acessar rotas protegidas, inclua o token JWT no header:

```http
Authorization: Bearer seu-jwt-token-aqui
```

### Exemplo de Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }'
```

## 📊 Estrutura do Banco de Dados

### Usuário (User)
```javascript
{
  name: String,     // obrigatório
  email: String,    // obrigatório, único
  password: String, // obrigatório (hash)
  createdAt: Date,
  updatedAt: Date
}
```

### Autor (Author)
```javascript
{
  name: String,  // obrigatório
  email: String, // obrigatório
  createdAt: Date,
  updatedAt: Date
}
```

### Post
```javascript
{
  title: String,       // obrigatório
  description: String, // opcional
  author: {           // embedido
    name: String,
    email: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testando a API

### Usando curl

#### Criar um usuário:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123"
  }'
```

#### Criar um autor:
```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@email.com"
  }'
```

#### Criar um post:
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu primeiro post",
    "description": "Conteúdo do post...",
    "author": {
      "name": "Maria Santos",
      "email": "maria@email.com"
    }
  }'
```

### Usando Postman
1. Importe a coleção Swagger/OpenAPI
2. Configure a variável `baseUrl` como `http://localhost:3000/api`
3. Para rotas protegidas, configure o Bearer Token

## 📁 Estrutura do Projeto

```
projeto/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── authorController.js
│   │   └── postController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Author.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── authors.js
│   │   └── posts.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── config/
│       └── swagger.js
├── .env
├── package.json
└── README.md
```

## 🔒 Segurança

- ✅ Senhas criptografadas com bcrypt
- ✅ Autenticação JWT
- ✅ Validação de dados de entrada
- ✅ Middleware de autenticação
- ✅ Headers de segurança

## 🚀 Deploy

### Heroku
```bash
# Login no Heroku
heroku login

# Criar app
heroku create nome-da-sua-api

# Configurar variáveis de ambiente
heroku config:set MONGODB_URI=sua-string-conexao-mongodb
heroku config:set JWT_SECRET=seu-jwt-secret

# Deploy
git push heroku main
```

### Vercel/Railway/Render
Configure as variáveis de ambiente no painel de controle da plataforma.
