# Descrição

Esta é uma aplicação em que você consegue criar, editar e excluir uma conta, além de criar, editar e excluir tarefas e rascunhos.

## Instalação

Ao clonar o repositório, utilize o seguinte comando na pasta raiz para instalar as dependêndias do projeto:

```bash
$ npm install
```

## Configuração e inicialização da aplicação

1. Crie um novo arquivo .env.dev na raíz do projeto, trazendo as informações do arquivo .env.example para seu novo arquivo -- variáveis serão utilizadas para o ambiente em produção;
2. Crie um novo arquivo .env.test na raíz do projeto, trazendo as informações do arquivo .env.example para seu novo arquivo -- variáveis serão utilizadas para o ambiente em desenvolvimento;
3. Substitua as informações de exemplo da variável "DATABASE_URL", além de adicionar uma SECRET_KEY e EXPIRES_IN nos arquivos .env.dev e .env.test.

Para aplicar as migrações do prisma e criar as tabelas, rode os seguintes comandos na raiz do projeto:

```bash
$ npm run migrate:dev
$ npm run migrate:test
```

Estes comandos irão aplicar as migrações no ambiente de desenvolvimento e no ambiente de teste, respectivamente.

Para iniciar a aplicação, rode o seguinte comando na raiz do projeto:

```bash
$ npm run dev
```

Para rodar os testes, rode o seguinte comando na raiz do projeto:

```bash
$ npm run test
```

## Rotas

### Usuário

1. Criação de usuário

**POST /users**

Corpo da requisição:

```bash
{
	"name": "João",
	"email": "joao@email.com",
	"password": "senha123"
}
```

Resposta (Sucesso) - 201 Created

```json
{
  "id": "randomstring",
  "name": "João",
  "email": "joao@email.com",
  "todos": [],
  "drafts": []
}
```

Resposta (Dados inválidos) - 403 Forbidden

```json
{
  "message": {
    "name": [
      "Required"
    ],
    "email": [
      "Required"
    ],
    "password": [
      "Required"
    ]
  }
}
```

```json
{
  "message": {
    "name": [
      "Expected string, received number"
    ],
    "email": [
      "Expected string, received number"
    ],
    "password": [
      "Expected string, received number"
    ]
  }
}
```

Resposta (Email existente) - 409 Conflict

```json
{
  "message": "Email already exists"
}
```

2. Busca de usuário

**GET /users/:userId**

> ```js
> Authorization: `Bearer ${token}`
> ```

Resposta (Sucesso) - 200 OK

```json
{
  "id": "randomstring",
  "name": "João",
  "email": "joao@email.com",
  "todos": [],
  "drafts": []
}
```

Resposta (Usuário não encontrado) - 404 Not Found

```json
{
  "message": "User not found."
}
```

Resposta (Token não enviado) - 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

Resposta (Permissão insuficiente) - 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

> Nesta API o usuário pode visualizar apenas o próprio perfil, enviando seu token de autenticação. Este erro será lançado caso o usuário tente visualizar o perfil de outra pessoa.

3. Deleção de usuário

**DELETE /users/:userId**

> ```js
> Authorization: `Bearer ${token}`
> ```

Resposta (Sucesso) - 204 No Content

```json
{}
```

Resposta (Usuário não encontrado) - 404 Not Found

```json
{
  "message": "User not found."
}
```

Resposta (Token não enviado) - 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

Resposta (Permissão insuficiente) - 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

4. Atualização de usuário

**PATCH /users/user:Id**

> ```js
> Authorization: `Bearer ${token}`
> ```

Corpo da requisição:

```json
{
  "name": "João",
  "email": "joao@email.com",
  "password": "senha123"
}
```

> Por se tratar de uma rota de atualização PATCH, as chaves não são obrigatórias, você é capaz de atualizar somente o nome, por exemplo!

Resposta (Sucesso) - 200 OK

```json
{
  "id": "randomstring",
  "name": "João",
  "email": "joao@email.com",
  "todos": [],
  "drafts": []
}
```

Resposta (Dados inválidos) - 403 Forbidden

```json
{
  "message": {
    "name": [
      "Expected string, received number"
    ],
    "email": [
      "Expected string, received number"
    ],
    "password": [
      "Expected string, received number"
    ]
  }
}
```

Resposta (Usuário não encontrado) - 404 Not Found

```json
{
  "message": "User not found."
}
```

Resposta (Token não enviado) - 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

Resposta (Permissão insuficiente) - 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

Resposta (Email existente) - 409 Conflict

```json
{
  "message": "Email already exists"
}
```

### Sessão

1. Login

**POST /session**

Corpo da requisição:

```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

Resposta (Sucesso) - 200 OK

```json
{
  "token": "randomstring",
  "data": {
    "id": "randomstring",
    "name": "João",
    "email": "joao@email.com",
    "todos": [],
    "drafts": []
  }
}
```

Resposta (E-mail e/ou senha incorretos) - 401 Unauthorized

```json
{
  "message": "Invalid e-mail or password"
}
```

Resposta (Dados inválidos) - 403 Forbidden

```json
{
  "message": {
    "email": [
      "Required"
    ],
    "password": [
      "Required"
    ]
  }
}
```

```json
{
  "message": {
    "email": [
      "Expected string, received number"
    ],
    "password": [
      "Expected string, received number"
    ]
  }
}
```

### Tarefas

1. Criação de tarefa

**POST /todos/user/:userId**

> ```js
> Authorization: `Bearer ${token}`
> ```

Corpo da requisição:

```json
{
  "title": "Titulo da tarefa",
  "description": "Descrição da tarefa (opcional)",
  "dueDate": "2024-06-11T00:00:00Z"
}
```

Resposta (Sucesso) - 201 Created

```json
{
  "id": "randomstring",
  "title": "Titulo da tarefa",
  "description": "Descrição da tarefa (opcional)",
  "status": false,
  "createdAt": "2024-06-11T21:08:03.907Z",
  "dueDate": "2024-06-11T00:00:00.000Z",
  "finishedAt": null,
  "ownerId": "randomstring"
}
```

Resposta (Dados inválidos) - 403 Forbidden

```json
{
  "message": {
    "title": [
      "Required"
    ],
    "dueDate": [
      "Required"
    ]
  }
}
```

```json
{
  "message": {
    "title": [
      "Expected string, received number"
    ],
    "description": [
      "Expected string, received number"
    ],
    "dueDate": [
      "Expected datetime, received string"
    ]
  }
}
```

Resposta (Usuário não encontrado) - 404 Not Found

```json
{
  "message": "User not found."
}
```

Resposta (Token não enviado) - 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

Resposta (Permissão insuficiente) - 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

2. Deleção de tarefa

**DELETE /todos/user/:userId/todo/:todoId**

> ```js
> Authorization: `Bearer ${token}`
> ```

Resposta (Sucesso) - 204 No Content

```json
{}
```

Resposta (Usuário não encontrado) - 404 Not Found

```json
{
  "message": "User not found."
}
```

Resposta (Token não enviado) - 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

Resposta (Permissão insuficiente) - 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

Resposta (Tarefa não encontrada) - 404 Not Found

```json
{
  "message": "Todo not found."
}
```

3. Atualização de tarefa

**PATCH /todos/user/:userId/todo/:todoId**

> ```js
> Authorization: `Bearer ${token}`
> ```

Corpo da requisição:

```json
{
  "title": "Titulo da tarefa",
  "description": "Descrição da tarefa (opcional)",
  "status": true,
  "dueDate": "2024-06-11T00:00:00.000Z",
}
```

> Por se tratar de uma rota de atualização PATCH, as chaves não são obrigatórias, você é capaz de atualizar somente o titulo, por exemplo!

Resposta (Sucesso) - 200 OK

```json
{
  "id": "randomstring",
  "title": "Titulo da tarefa",
  "description": "Descrição da tarefa (opcional)",
  "status": true,
  "createdAt": "2024-06-11T21:08:03.907Z",
  "dueDate": "2024-06-11T00:00:00.000Z",
  "finishedAt": "2024-06-11T22:10:15.907Z",
  "ownerId": "randomstring"
}
```

Resposta (Dados inválidos) - 403 Forbidden

```json
{
  "message": {
    "title": [
      "Expected string, received number"
    ],
    "description": [
      "Expected string, received number"
    ],
    "status": [
      "Expected boolean, received date"
    ],
    "dueDate": [
      "Expected datetime, received string"
    ]
  }
}
```

Resposta (Tarefa não encontrada) - 404 Not Found

```json
{
  "message": "Todo not found."
}
```

Resposta (Usuário não encontrado) - 404 Not Found

```json
{
  "message": "User not found."
}
```

Resposta (Token não enviado) - 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

Resposta (Permissão insuficiente) - 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```
