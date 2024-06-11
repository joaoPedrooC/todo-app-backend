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
$ npm run start
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