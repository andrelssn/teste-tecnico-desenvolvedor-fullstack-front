# 🛒 Sistema de Produtos e Clientes

Este é um aplicativo web desenvolvido com **React** e **Vite**, que permite gerenciar **produtos** e **clientes**. O sistema possui um **frontend moderno em dark theme**, com funcionalidades de **CRUD (Create, Read, Update, Delete)**, modais, e integração com uma **API REST** para persistência de dados.

---

## 💻 Tecnologias utilizadas

- **Frontend:** React, Vite, Material-UI (MUI), React Router  
- **Backend (API):** Node.js, Express, Prisma, SQLite/MySQL/PostgreSQL (dependendo da configuração)  
- **Outras ferramentas:** Axios para requisições HTTP  

---

## ⚡ Funcionalidades

### Produtos
- Listar produtos existentes
- Adicionar novo produto
- Editar produto
- Deletar produto
- Campos: **nome**, **preço**, **estoque**

### Clientes
- Listar clientes existentes
- Adicionar novo cliente
- Editar cliente
- Deletar cliente
- Campos: **nome**, **email**

### Interface
- Tema dark
- Modais para cadastro e edição
- Cards responsivos para exibir produtos e clientes
- Feedback visual ao salvar ou deletar

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js (v16+)
- npm ou yarn
- API rodando localmente (porta padrão: 3000)

### Passos
1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
cd nome-do-projeto
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
```

3. Renomeie o `.env.example` para `.env` e configure o URL da API que está rodando em sua máquina:

```bash
VITE_API_URL=http://localhost:3000
REACT_APP_VERSION=1.0.0
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

5. Abra no navegador:

```bash
http://localhost:5173
```
