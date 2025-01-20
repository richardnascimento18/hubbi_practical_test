# Documentação da API

## **Endpoints**

---

### **Autenticação**

#### **1. Login**

- **Endpoint:** `/api/auth/login`
- **Método:** `POST`
- **Descrição:** Faz login do usuário e retorna um token JWT.
- **Body:**
  - `email` (string): Email do usuário.
  - `password` (string): Senha do usuário.
- **Respostas:**
  - **200 OK:** Retorna o usuário e o token JWT.
    - Exemplo de resposta:
      - `user`: Dados do usuário autenticado.
      - `token`: Token JWT gerado.
  - **401 Unauthorized:** Caso o usuário ou a senha sejam inválidos.
    - Exemplo de erro: "E-mail ou Senha incorretos".
  - **500 Internal Server Error:** Caso ocorra um erro inesperado.

---

#### **2. Verificar Perfil**

- **Endpoint:** `/api/auth/profile`
- **Método:** `GET`
- **Descrição:** Verifica se o token JWT é válido e retorna os dados do usuário autenticado.
- **Headers:**
  - `Authorization`: Deve conter o token no formato `Bearer <token>`.
- **Respostas:**
  - **200 OK:** Retorna a validade do token e os dados do usuário.
    - Exemplo:
      - `valid`: Indica que o token é válido.
      - `user`: Dados do usuário autenticado.
  - **401 Unauthorized:** Caso o token seja inválido ou expirado.
    - Exemplo de erro: "Token inválido ou expirado".
  - **500 Internal Server Error:** Caso ocorra um erro inesperado.

---

#### **3. Cadastro**

- **Endpoint:** `/api/auth/signup`
- **Método:** `POST`
- **Descrição:** Cria um novo usuário no sistema.
- **Body:**
  - `email` (string): Email do usuário.
  - `password` (string): Senha do usuário.
- **Respostas:**
  - **200 OK:** Usuário criado com sucesso.
    - Exemplo: Dados do usuário criado.
  - **500 Internal Server Error:** Caso não seja possível criar o usuário.
    - Exemplo de erro: "Não foi possível criar o usuário".

---

### **Produtos**

#### **1. Listar Produtos**

- **Endpoint:** `/api/products`
- **Método:** `GET`
- **Descrição:** Retorna a lista de todos os produtos.
- **Respostas:**
  - **200 OK:** Lista de produtos.
  - **500 Internal Server Error:** Caso ocorra um erro ao buscar os produtos.

---

### **Vendas**

#### **1. Criar Venda**

- **Endpoint:** `/api/sales`
- **Método:** `POST`
- **Descrição:** Cria uma nova venda.
- **Body:**
  - `price` (number): Valor da venda.
  - `products` (array): Lista de produtos vendidos (com IDs e quantidades).
  - `date` (string): Data da venda.
- **Respostas:**
  - **201 Created:** Venda criada com sucesso.
  - **500 Internal Server Error:** Caso ocorra um erro ao criar a venda.

#### **2. Listar Vendas**

- **Endpoint:** `/api/sales`
- **Método:** `GET`
- **Descrição:** Retorna a lista de vendas com paginação.
- **Query Params:**
  - `page` (number): Página atual.
  - `limit` (number): Número de itens por página.
- **Respostas:**
  - **200 OK:** Lista de vendas e o total de vendas disponíveis.
  - **500 Internal Server Error:** Caso ocorra um erro ao buscar as vendas.

---

### **Compras**

#### **1. Criar Compra**

- **Endpoint:** `/api/purchases`
- **Método:** `POST`
- **Descrição:** Cria uma nova compra.
- **Body:**
  - `price` (number): Valor total da compra.
  - `sales` (array): IDs das vendas associadas.
  - `products` (array): Produtos comprados (IDs e quantidades).
  - `date` (string): Data da compra.
- **Respostas:**
  - **201 Created:** Compra criada com sucesso.
  - **500 Internal Server Error:** Caso ocorra um erro ao criar a compra.

#### **2. Listar Compras**

- **Endpoint:** `/api/purchases`
- **Método:** `GET`
- **Descrição:** Retorna a lista de compras com paginação.
- **Query Params:**
  - `page` (number): Página atual.
  - `limit` (number): Número de itens por página.
- **Respostas:**
  - **200 OK:** Lista de compras e o total de compras disponíveis.
  - **500 Internal Server Error:** Caso ocorra um erro ao buscar as compras.

---
