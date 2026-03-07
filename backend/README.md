# Task Tracker Backend

Backend API for the **Task Tracker Full Stack Application**.
This service provides authentication, role-based access control, and task management using a REST API.

---

## Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JWT Authentication**
* **bcrypt (password hashing)**
* **Jest + Supertest (API testing)**

---

## Features

* User registration and login
* JWT authentication
* Role-based access (`admin` / `user`)
* Task CRUD operations
* Protected API routes
* Environment variable configuration
* Automated API testing

---

## Folder Structure

```
📁 backend
│   ├── 📁 src
│   │   ├── 📁 config
│   │   │   └── 📄 db.js
│   │   ├── 📁 controllers
│   │   │   ├── 📄 authController.js
│   │   │   └── 📄 taskController.js
│   │   ├── 📁 middleware
│   │   │   ├── 📄 authMiddleware.js
│   │   │   └── 📄 roleMiddleware.js
│   │   ├── 📁 routes
│   │   │   ├── 📄 authRoutes.js
│   │   │   └── 📄 taskRoutes.js
│   │   ├── 📁 utils
│   │   │   └── 📄 generateToken.js
│   │   ├── 📄 index.js
│   │   └── 📄 server.js
│   ├── 📁 tests
│   │   ├── 📄 auth.test.js
│   │   ├── 📄 task.test.js
│   │   └── 📄 token.test.js
│   ├── ⚙️ .env.example
│   ├── 📝 README.md
│   ├── 📄 jest.config.js
│   ├── ⚙️ package-lock.json
│   └── ⚙️ package.json
```

---

## Environment Variables

Create a `.env` file in the backend root.

Example:

```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/tasktracker
JWT_SECRET=YOUR_SECRET_KEY
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

A template is provided in `.env.example`.

---

## Installation

```
npm install
```

---

## Running the Server

Development mode:

```
npm run dev
```

Production mode:

```
npm start
```

Server will start at:

```
http://localhost:5000
```

---

## Running Tests

```
npm test
```

Tests are written using **Jest** and **Supertest**.

Current test coverage includes:

* Authentication tests
* Token validation tests
* Protected route tests

---

## API Endpoints

### Authentication

Register user

```
POST /auth/register
```

Login user

```
POST /auth/login
```

Get current user

```
GET /auth/me
```

Logout

```
POST /auth/logout
```

---

### Tasks

Create task

```
POST /task
```

Get tasks

```
GET /task
```

Update task

```
PUT /task/:id
```

Delete task

```
DELETE /task/:id
```

---

## Security Features

* Passwords hashed using **bcrypt**
* JWT stored in **HTTP-only cookies**
* Protected routes with authentication middleware
* Role-based authorization
* Environment variables for sensitive data

---

## Author

Yadu Krishna k
