# TechUp Week 09 — PostgreSQL Auth Blog Studio

Starter code for the Friday full-stack workshop.

Requirements: Node.js 20.19 or newer and a local PostgreSQL server.

## Student board

Download [`student-board.excalidraw`](./student-board.excalidraw) and open it with [Excalidraw](https://excalidraw.com/).

This README contains the setup steps, mission summary, and API summary. The board adds the architecture flow, ERD, mission prompts, endpoint exercise, and exit check.

## Your missions

1. Register a user with a hashed password.
2. Login and return a JWT.
3. List public posts from PostgreSQL.
4. Create a post with a verified Bearer token.
5. Connect the React application by filling only `client/src/config/apiEndpoints.js`.

Bonus missions: view, edit, and delete a post. Edit and delete must be limited to the post owner.

## Project structure

- `client/` — completed Vite + React interface
- `server/` — Express starter with PostgreSQL, bcrypt, and JWT mission comments
- `server/db/schema.sql` — database tables and seed posts
- `server/requests.http` — requests for testing the API

## 1. Prepare PostgreSQL

Create a local database named:

```text
techup_blog_studio
```

Run `server/db/schema.sql` against that database.

## 2. Start the server

```bash
cd server
npm install
```

Copy `.env.example` to `.env`, then update the values if your PostgreSQL credentials are different.

```bash
npm run dev
```

The API runs at `http://localhost:4000`.

## 3. Start the client

Open another terminal:

```bash
cd client
npm install
npm run dev
```

## Frontend task

Edit only:

```text
client/src/config/apiEndpoints.js
```

Fill the four required endpoint paths:

- `register`
- `login`
- `listPosts`
- `createPost`

Do not add Axios calls, tokens, form state, or validation. Those parts are already prepared.

## API summary

| Method | Endpoint | Access |
|---|---|---|
| `GET` | `/health` | Public |
| `POST` | `/auth/register` | Public |
| `POST` | `/auth/login` | Public |
| `GET` | `/posts` | Public |
| `POST` | `/posts` | Bearer token |

Bonus endpoints:

- `GET /posts/:postId`
- `PUT /posts/:postId`
- `DELETE /posts/:postId`
