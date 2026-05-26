# Fullstack Visitor Counter App

Visitor Counter App is a simple fullstack web application designed to demonstrate communication between a frontend, backend, Redis cache, and PostgreSQL database using Docker containers.

The application includes:

* A frontend interface that displays:

  * backend connection status,
  * total visitor count,
  * saved user messages.

* A backend API that provides:

  * `/ping` → health check endpoint,
  * `/visits` → tracks and returns visit count,
  * `/messages` → stores and retrieves messages.

* Redis integration used for:

  * storing and updating the visitor counter.

* PostgreSQL integration used for:

  * persisting user messages in a database.

The project is intended for learning:

* Docker and container networking,
* frontend ↔ backend communication,
* Redis and PostgreSQL integration,
* environment variables and API configuration,
* fullstack application deployment.


A simple fullstack application built with:

- React frontend
- Node.js + Express backend
- Redis
- PostgreSQL
- Docker

The application demonstrates:
- frontend ↔ backend communication,
- Redis caching/counter,
- PostgreSQL database usage,
- Docker container networking.

---

# Features

- Ping backend API
- Visitor counter using Redis
- Save and retrieve messages using PostgreSQL

---

# Project Structure

```text
frontend/   -> React frontend
backend/    -> Express backend
```

---

# Requirements

- Docker
- Node.js
- PostgreSQL
- Redis

---

# Running the Backend Locally

```bash
cd backend

npm install

npm start
```

Backend runs on:

```text
http://localhost:8081
```

---

# Running the Frontend Locally

```bash
cd frontend

npm install

npm start
```

Frontend runs on:

```text
http://localhost:3002
```

---

# Environment Variables

## Backend `.env`

```env
PORT=8081

REDIS_HOST=redis
REDIS_PORT=6379

POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=postgres

REQUEST_ORIGIN=http://localhost:3002
```

## Frontend `.env`

```env
REACT_APP_BACKEND_URL=http://localhost:8081
```

---

# Docker

## Build Backend

```bash
docker build -t backend-app .
```

## Run Backend

```bash
docker run -d -p 8081:8081 backend-app
```

## Build Frontend

```bash
docker build \
  --build-arg REACT_APP_BACKEND_URL=http://localhost:8081 \
  -t frontend-app .
```

## Run Frontend

```bash
docker run -d -p 3002:3002 frontend-app
```

---

# API Endpoints

| Endpoint | Description |
|---|---|
| `/ping` | Backend health check |
| `/visits` | Redis visit counter |
| `/messages` | Store/retrieve messages |

---

# Author

Itumeleng Kefeletswe
