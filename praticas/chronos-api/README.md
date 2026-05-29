# Chronos Pomodoro — Documentação do Projeto

Este projeto foi desenvolvido como atividade prática da disciplina de Construção de Back-End. O objetivo foi construir uma API REST completa para o Pomodoro Timer Chronos e integrá-la ao frontend já existente, substituindo o armazenamento local (localStorage) por um banco de dados MySQL.

---

## Visão Geral

O projeto é composto por duas partes:

- **Back-end:** API REST construída com Node.js, Express e TypeScript, utilizando Prisma ORM para comunicação com o banco de dados MySQL.
- **Front-end:** Aplicação React (Vite + TypeScript) que consome a API para persistir configurações e tarefas.

---

## Tecnologias Utilizadas

### Back-end
- Node.js
- Express
- TypeScript
- Prisma ORM v6.4.0
- MySQL
- XAMPP

### Front-end
- React
- Vite
- TypeScript
- Fetch API

---

## Estrutura do Projeto

### Back-end

```
pomodoro-api/
  prisma/
    schema.prisma
  src/
    lib/
      prisma.ts
    routes/
      settings.routes.ts
      tasks.routes.ts
    app.ts
    server.ts
  .env
  package.json
  tsconfig.json
```


---

## Configuração e Execução

### Back-end

**1. Instalar as dependências:**
```bash
npm install
```

**2. Configurar o arquivo `.env`:**
```env
DATABASE_URL="mysql://root:root@localhost:3306/pomodoro_db"
PORT=3333
```

**3. Executar a migration:**
```bash
npx prisma migrate dev --name init
```

**4. Iniciar o servidor:**
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

---

### Front-end

**1. Instalar as dependências:**
```bash
npm install
```

**2. Iniciar a aplicação:**
```bash
npm run dev
```

> A API precisa estar rodando antes de abrir o frontend.

---

## Modelagem do Banco de Dados

### Tabela Settings

Armazena as configurações de tempo do Pomodoro. Existe sempre um único registro com `id = 1`.

| Campo | Tipo | Descrição |
|---|---|---|
| id | Int | Identificador fixo (1) |
| workTime | Int | Tempo de foco em minutos |
| shortBreakTime | Int | Tempo de descanso curto em minutos |
| longBreakTime | Int | Tempo de descanso longo em minutos |
| updatedAt | DateTime | Data da última atualização |

### Tabela Task

Armazena o histórico de tarefas realizadas.

| Campo | Tipo | Descrição |
|---|---|---|
| id | String | Identificador único |
| name | String | Nome da tarefa |
| duration | Int | Duração em minutos |
| type | String | Tipo do ciclo |
| startDate | BigInt | Timestamp de início |
| completeDate | BigInt? | Timestamp de conclusão (opcional) |
| interruptDate | BigInt? | Timestamp de interrupção (opcional) |
| createdAt | DateTime | Data de criação do registro |

---

## Endpoints da API

### Health Check

```
GET /health
```

Verifica se a API está funcionando.

**Resposta:**
```json
{ "ok": true }
```

---

### Settings

#### Buscar configurações
```
GET /settings
```

Se não houver registro no banco, a API cria automaticamente com os valores padrão (foco: 25min, descanso curto: 5min, descanso longo: 15min).

**Resposta:**
```json
{
  "id": 1,
  "workTime": 25,
  "shortBreakTime": 5,
  "longBreakTime": 15,
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

#### Atualizar configurações
```
PUT /settings
```

**Body:**
```json
{
  "workTime": 30,
  "shortBreakTime": 10,
  "longBreakTime": 20
}
```

Os três campos são obrigatórios e devem ser números inteiros. Caso contrário, retorna `400` com `"Valores inválidos"`.

---

### Tasks

#### Listar tarefas
```
GET /tasks
```

Retorna todas as tarefas ordenadas por `startDate` de forma decrescente.

---

#### Criar tarefa
```
POST /tasks
```

**Body:**
```json
{
  "id": "1748478000000",
  "name": "Estudar React",
  "duration": 25,
  "type": "workTime",
  "startDate": 1748478000000
}
```

**Resposta:** `201 Created` com a tarefa criada.

---

#### Marcar tarefa como concluída
```
PATCH /tasks/:id/complete
```

**Body:**
```json
{
  "completeDate": 1748481600000
}
```

---

#### Marcar tarefa como interrompida
```
PATCH /tasks/:id/interrupt
```

**Body:**
```json
{
  "interruptDate": 1748481600000
}
```

---

#### Limpar histórico
```
DELETE /tasks
```

Remove todas as tarefas do banco. Retorna `204 No Content`.

---

## Integração Front-end com a API

### Camada de serviço

Foi criado o arquivo `src/services/api.ts` centralizando todas as chamadas à API. Dessa forma, nenhum componente acessa o `fetch` diretamente — tudo passa pela camada de serviço.

As funções disponíveis são: `getSettings`, `saveSettings`, `getTasks`, `createTask`, `completeTask`, `interruptTask` e `deleteTasks`.

---

### Carregamento inicial

Ao iniciar o app, o `TaskContextProvider` busca as configurações e o histórico de tarefas diretamente da API, sem depender do localStorage.

---

### Polling automático

O frontend consulta a API a cada 5 segundos para atualizar a lista de tarefas automaticamente, sem necessidade de recarregar a página. Caso uma tarefa sem `completeDate` e sem `interruptDate` seja encontrada, ela é automaticamente marcada como ativa no frontend.

---

### Persistência das ações

Todas as ações do usuário são salvas na API em tempo real:

- **Iniciar tarefa:** chama `POST /tasks` antes de atualizar o estado local.
- **Interromper tarefa:** chama `PATCH /tasks/:id/interrupt` antes de atualizar o estado local.
- **Concluir tarefa:** chama `PATCH /tasks/:id/complete` quando o timer chega a zero.
- **Salvar configurações:** chama `PUT /settings` antes de atualizar o estado local.
- **Limpar histórico:** chama `DELETE /tasks` antes de resetar o estado local.

---

## Testando com o Postman

O arquivo `Chronos-API.postman_collection.json` está disponível na raiz do projeto.

**Como importar:**
1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo `Chronos-API.postman_collection.json`
4. Crie um ambiente e defina a variável `baseUrl` como `http://localhost:3333`

A coleção possui um script automático que salva o `id` da tarefa criada na variável de ambiente `taskId`, facilitando os testes dos endpoints de PATCH sem precisar copiar o ID manualmente.