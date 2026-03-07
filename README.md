# Task Tracker Full Stack App

A full-stack task management application with authentication, role-based access, and task CRUD functionality.

## Tech Stack

Frontend
- React (Vite)
- TailwindCSS
- Axios
- React Router

Backend
- Node.js
- Express
- PostgreSQL
- JWT Authentication

## Features

- User registration and login
- JWT authentication using cookies
- Task creation, update and deletion
- Admin dashboard
- Role-based access control
- Responsive UI
- Automated tests

## Project Structure
```
├── 📁 backend
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
│   │   │   ├── 📄 adminRoutes.js
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
├── 📁 frontend
│   ├── 📁 public
│   ├── 📁 src
│   │   ├── 📁 api
│   │   │   └── 📄 axios.js
│   │   ├── 📁 components
│   │   │   ├── 📁 feedback
│   │   │   │   ├── 📄 emptyState.jsx
│   │   │   │   ├── 📄 errorMessage.jsx
│   │   │   │   └── 📄 loader.jsx
│   │   │   ├── 📁 tasks
│   │   │   │   ├── 📄 taskCard.jsx
│   │   │   │   └── 📄 taskForm.jsx
│   │   │   ├── 📁 ui
│   │   │   │   ├── 📄 button.jsx
│   │   │   │   ├── 📄 card.jsx
│   │   │   │   ├── 📄 container.jsx
│   │   │   │   ├── 📄 index.js
│   │   │   │   └── 📄 input.jsx
│   │   │   ├── 📁 users
│   │   │   │   └── 📄 userCard.jsx
│   │   │   ├── 📄 navbar.jsx
│   │   │   └── 📄 protectedRoute.jsx
│   │   ├── 📁 contexts
│   │   │   ├── 📄 authContext.js
│   │   │   ├── 📄 authProvider.jsx
│   │   │   └── 📄 useAuth.js
│   │   ├── 📁 pages
│   │   │   ├── 📄 adminDashboard.jsx
│   │   │   ├── 📄 dashboard.jsx
│   │   │   ├── 📄 login.jsx
│   │   │   └── 📄 register.jsx
│   │   ├── 📁 services
│   │   │   ├── 📄 adminService.js
│   │   │   ├── 📄 authService.jsx
│   │   │   └── 📄 taskService.jsx
│   │   ├── 📁 styles
│   │   │   └── 📄 theme.js
│   │   ├── 📁 tests
│   │   │   ├── 📄 dashbord.test.jsx
│   │   │   ├── 📄 login.test.jsx
│   │   │   └── 📄 taskAPI.test.jsx
│   │   ├── 📁 utils
│   │   │   └── 📄 constants.js
│   │   ├── 📄 App.jsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.jsx
│   ├── ⚙️ .env.example
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 vite.config.js
├── ⚙️ .gitignore
├── 📄 LICENSE
└── 📝 README.md
```

## Running the Backend

cd backend
npm install
npm run dev

## Running the Frontend

cd frontend
npm install
npm run dev

## Running Tests

Backend

npm test

Frontend

npm test

# UIscreenshots in docs folder
