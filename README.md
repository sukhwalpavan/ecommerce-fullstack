# E-Commerce Platform

This is a full-stack e-commerce platform built with React, Java Spring Boot, and PostgreSQL.

## Directory Structure
- `frontend/` - React frontend (Vite)
- `backend/` - Java Spring Boot backend
- `db/` - Database initialization scripts

## Prerequisites
- Node.js & npm (for frontend)
- Java 17+ & Maven (for backend)
- PostgreSQL (for database)

## Setup Instructions

### 1. Database
- Create a PostgreSQL database named `ecommerce`.
- Update the credentials in `backend/src/main/resources/application.properties`.

### 2. Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## Features
- User Authentication (Login / Register)
- Product browsing, searching, and filtering
- Shopping Cart management
- Checkout and Order Management
- Fully responsive modern UI
