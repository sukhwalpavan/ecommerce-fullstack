# AuraStore - Full Stack E-Commerce Platform

A fully functional, responsive e-commerce platform built with React.js, Java Spring Boot, and PostgreSQL (Neon).

## 🌐 Live Demo & Links
- **Live Website (Frontend):** [https://ecommerce-fullstack-ruddy.vercel.app](https://ecommerce-fullstack-ruddy.vercel.app)
- **Live API (Backend):** [https://ecommerce-fullstack-f6i5.onrender.com](https://ecommerce-fullstack-f6i5.onrender.com)
- **GitHub Repository:** [https://github.com/sukhwalpavan/ecommerce-fullstack](https://github.com/sukhwalpavan/ecommerce-fullstack)

## 🛠️ Technology Stack
- **Frontend:** React.js, Vite, CSS3, JavaScript (Deployed on Vercel)
- **Backend:** Java 17, Spring Boot, Spring Data JPA (Deployed on Render)
- **Database:** PostgreSQL (Hosted on Neon)

## 🔑 Demo Credentials
You can register a new account on the live website, or use the following demo credentials:
- **Email:** demo@aurastore.com
- **Password:** password123
*(Note: Please register a new account if the demo account is not found).*

## 🚀 Features Implemented
- **User Authentication:** Registration, Login, and encrypted passwords.
- **Product Catalog:** Browse products, responsive grid, category filtering, and product details.
- **Shopping Cart:** Add/remove items, update quantities, dynamic total calculation.
- **Checkout & Orders:** Collect shipping details, order placement, order history.
- **Responsive UI:** Modern, clean design adapting flawlessly to mobile, tablet, and desktop.
- **Database Seeding:** Automatically seeds 6 premium dummy products on application startup.

## ⚙️ Environment Variables

### Backend (`backend/src/main/resources/application.properties`)
```properties
spring.datasource.url=jdbc:postgresql://<NEON_DB_URL>:5432/neondb?sslmode=require
spring.datasource.username=<YOUR_DB_USERNAME>
spring.datasource.password=<YOUR_DB_PASSWORD>
spring.jpa.hibernate.ddl-auto=update
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8080/api
# Change this to the live Render URL after deployment
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
- `POST /api/auth/login` - Authenticate a user
  - Body: `{ "email": "john@example.com", "password": "password123" }`

### Product Endpoints
- `GET /api/products` - Retrieve all products
- `GET /api/products/{id}` - Retrieve a specific product by ID
- `GET /api/products/search?name={query}` - Search products by name
- `GET /api/products/category/{category}` - Filter products by category

### Order Endpoints
- `POST /api/orders` - Place a new order
  - Body: `{ "userId": 1, "shippingAddress": "123 Street", "items": [{"productId": 1, "quantity": 2}] }`
- `GET /api/orders/user/{userId}` - Get order history for a specific user

## 🗄️ Database Configuration (PostgreSQL)
This project uses **Neon** as a managed cloud PostgreSQL provider.
- **Schema & Migration:** The project uses Hibernate's `ddl-auto=update` to automatically generate the required database schema (Users, Products, Orders, OrderItems) upon application startup.
- **Sample Data:** The application includes a `DataSeeder.java` file which implements `CommandLineRunner`. When the application starts, it checks if the products table is empty. If empty, it automatically inserts 6 high-quality premium products into the database.

## 💻 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sukhwalpavan/ecommerce-fullstack.git
   cd ecommerce-fullstack
   ```

2. **Run Backend (Java Spring Boot):**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   *The backend will start on http://localhost:8080 and automatically seed the database.*

3. **Run Frontend (React):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The frontend will start on http://localhost:5173.*
