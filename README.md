# Task Management Backend

A TypeScript Express.js backend for a task management application with authentication and task CRUD operations.

## Features

- ✅ User authentication (Register, Login, Refresh Token)
- ✅ JWT-based authorization
- ✅ Task CRUD operations
- ✅ Task filtering by status (pending/done)
- ✅ Task search functionality
- ✅ Pagination support
- ✅ SQLite database with Prisma ORM
- ✅ CORS enabled for frontend communication

## Prerequisites

- Node.js (v16+)
- npm or yarn

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create or verify `.env` file:

```env
DATABASE_URL="file:./dev.db"
PORT=5000
ACCESS_SECRET=access_secret_key
REFRESH_SECRET=refresh_secret_key
```

### 3. Database Setup

Initialize Prisma and create the database:

```bash
npx prisma migrate dev --name init
```

This will:
- Create the SQLite database
- Run migrations
- Generate Prisma Client

### 4. Start the Server

Development mode (with auto-reload):

```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### Tasks (Protected - require authentication)
- `GET /tasks` - Get all tasks with pagination, search, and filtering
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update task title
- `PATCH /tasks/:id/toggle` - Toggle task status
- `DELETE /tasks/:id` - Delete a task

## Project Structure

```
src/
├── controllers/
│   ├── auth.controller.ts     # Authentication logic
│   └── task.controller.ts     # Task operations
├── routes/
│   ├── auth.routes.ts         # Auth endpoints
│   └── task.routes.ts         # Task endpoints
├── middleware/
│   └── auth.middleware.ts     # JWT verification
├── utils/
│   ├── prisma.ts              # Prisma client
│   ├── jwt.ts                 # JWT utilities
│   └── hash.ts                # Password hashing
├── app.ts                     # Express app setup
└── server.ts                  # Server entry point
```

## Technologies Used

- Express.js - Web framework
- TypeScript - Type safety
- Prisma - ORM
- SQLite - Database
- bcrypt - Password hashing
- jsonwebtoken - JWT authentication
- CORS - Cross-origin requests
- ts-node-dev - Development server