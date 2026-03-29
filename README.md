# 💊 PharmaNest – Backend API

PharmaNest is a **full-stack e-commerce platform** for purchasing **over-the-counter (OTC) medicines**.

This repository contains the **backend API**, built with **Node.js, Express.js, TypeScript, Prisma ORM, and PostgreSQL**.

The backend provides **secure and scalable APIs** for **customers, sellers, and administrators** to manage medicines, orders, reviews, and users.

---

## 🚀 Features

### 🌐 Public Features

- Browse all available medicines
- Search medicines by name
- Filter medicines by category
- Filter medicines by price
- View medicine details
- View top rated medicines

---

### 👤 Customer Features

- Register & login
- Browse medicines
- Add medicines to cart
- Place orders (Cash on Delivery)
- Track order status
- Cancel orders
- Pay order items
- Leave reviews after receiving order
- Manage profile

---

### 🏪 Seller Features

- Register & login as seller
- Add medicines
- Update medicines
- Delete medicines
- Manage medicine stock
- View incoming orders
- Update order item status

---

### 🛡️ Admin Features

- View all users
- ACTIVE / BANNED users
- Manage categories
- View platform order statistics
- Monitor medicines across the platform

---

## 🏗️ Tech Stack

### ⚙️ Backend

- **Node.js**
- **Express.js**
- **TypeScript**

### 🗄️ Database

- **PostgreSQL**
- **Prisma ORM**

### 🔐 Authentication

- **Better Auth**

### 🧩 Architecture

- **Modular MVC Pattern**
- **Role-Based Access Control (RBAC)**

---

## 📁 Project Structure

```
src
│
├── config
│   └── index.ts
│
├── helpers
│   └── paginationHelpers.ts
│
├── lib
│   ├── auth.ts
│   └── prisma.ts
│
├── middlewares
│   ├── auth.ts
│   ├── globalErrorHandler.ts
│   └── notFound.ts
│
├── modules
│   ├── category
│   │   ├── category.routes.ts
│   │   ├── category.controllers.ts
│   │   └── category.services.ts
│   │
│   ├── medicine
│   │   ├── medicine.routes.ts
│   │   ├── medicine.controllers.ts
│   │   └── medicine.services.ts
│   │
│   ├── order
│   │   ├── order.routes.ts
│   │   ├── order.controllers.ts
│   │   └── order.services.ts
│   │
│   ├── orderItem
│   │   ├── orderItem.routes.ts
│   │   ├── orderItem.controllers.ts
│   │   └── orderItem.services.ts
│   │
│   ├── review
│   │   ├── review.routes.ts
│   │   ├── review.controllers.ts
│   │   └── review.services.ts
│   │
│   ├── user
│   │   ├── user.routes.ts
│   │   ├── user.controllers.ts
│   │   └── user.services.ts
│   │
│   └── public
│       ├── public.routes.ts
│       ├── public.controllers.ts
│       └── public.services.ts
│
├── scripts
│   └── seedAdmin.ts
│
├── types
│
├── app.ts
├── server.ts
└── index.ts

```

## 🔐 Role Based Access Control

PharmaNest uses **role-based authorization middleware** to protect routes and ensure that only authorized users can perform specific actions.

### Roles

| Role         | Description                   |
| ------------ | ----------------------------- |
| **ADMIN**    | Platform administrator        |
| **SELLER**   | Medicine vendor               |
| **CUSTOMER** | End user purchasing medicines |

---

### Example Middleware Usage

```ts
router.post("/medicines", auth(Role.SELLER), medicineControllers.addMedicine);
```

## 🗄️ Database Schema

The system uses **Prisma ORM** with **PostgreSQL** as the database.

### Core Models

- **User** – Stores user information including role, profile details, and authentication data.
- **Session** – Manages user login sessions.
- **Account** – Stores third-party authentication providers.
- **Categories** – Medicine categories (e.g., Pain Relief, Vitamins).
- **Medicines** – Medicine product information including price, stock, seller, and category.
- **Orders** – Stores order information created by customers.
- **OrderItem** – Individual medicine items within an order.
- **Reviews** – Customer reviews for medicines.

---

## 📡 API Routes

### 🌐 Public Routes

| Method   | Endpoint                  | Description          |
| -------- | ------------------------- | -------------------- |
| **GET**  | `/api/medicines`          | Get all medicines    |
| **GET**  | `/api/categories`         | Get categories       |
| **GET**  | `/api/medicines/topRated` | Top rated medicines  |
| **GET**  | `/api/medicines/:id`      | Get medicine details |
| **POST** | `/api/medicines/search`   | Search medicine      |

---

### 👤 User Routes

| Method    | Endpoint                   | Access                    |
| --------- | -------------------------- | ------------------------- |
| **GET**   | `/api/user`                | Admin                     |
| **GET**   | `/api/user/:id`            | Admin / Customer / Seller |
| **PATCH** | `/api/user/update-profile` | Logged in user            |
| **PATCH** | `/api/user/:id`            | Admin                     |

---

### 🏪 Seller Routes

| Method     | Endpoint                    | Description                       |
| ---------- | --------------------------- | --------------------------------- |
| **GET**    | `/api/seller/medicines`     | Get all medicines added by seller |
| **GET**    | `/api/seller/medicines/:id` | Get a specific medicine           |
| **POST**   | `/api/seller/medicines`     | Add a new medicine                |
| **PATCH**  | `/api/seller/medicines/:id` | Update medicine                   |
| **DELETE** | `/api/seller/medicines/:id` | Delete medicine                   |

---

### 🛒 Order Routes

| Method   | Endpoint                         | Access   |
| -------- | -------------------------------- | -------- |
| **GET**  | `/api/customer/orders`           | Customer |
| **POST** | `/api/customer/order`            | Customer |
| **GET**  | `/api/customer/orders/sellerEnd` | Seller   |
| **GET**  | `/api/customer/stats/adminEnd`   | Admin    |

---

### 📦 Order Item Routes

| Method    | Endpoint                          | Access   |
| --------- | --------------------------------- | -------- |
| **GET**   | `/api/orderItem/customer/:id`     | Customer |
| **GET**   | `/api/orderItem/seller/:id`       | Seller   |
| **PATCH** | `/api/orderItem/updateStatus/:id` | Seller   |
| **PATCH** | `/api/orderItem/customer/:id`     | Customer |

---

### 🗂️ Category Routes

| Method     | Endpoint                   | Access |
| ---------- | -------------------------- | ------ |
| **GET**    | `/api/category`            | Admin  |
| **GET**    | `/api/category/sellerEnd`  | Seller |
| **POST**   | `/api/category`            | Admin  |
| **PATCH**  | `/api/category/update/:id` | Admin  |
| **DELETE** | `/api/category/:id`        | Admin  |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=Database_Connection_String
APP_URL=Frontend_Localhost_URL
PROD_APP_URL=Frontend_Live_URL
BETTER_AUTH_SECRET=Better_Auth_Secret
BETTER_AUTH_URL=http://localhost:5000
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASS=admin_password
```

## 🛠️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Pritom07/PharmaNest_Server.git
```

### 2️⃣ Setup environment variables

```bash
Create a .env file in the root directory.
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Generate Prisma Client

```bash
npx prisma generate
```

### 5️⃣ Run database migration

```bash
npx prisma migrate dev
```

### 6️⃣ Run the server

```bash
npm run dev
```

### 7️⃣ Seed Admin

```bash
npm run seedAdmin
```

## ⚠️ Error Handling

Centralized error handling with:

```
middlewares/globalErrorHandler.ts
```

### Handles:

- **Prisma validation errors** – e.g., invalid data types or required fields missing
- **Unique constraint violations** – e.g., duplicate email
- **Foreign key errors** – e.g., referencing non-existent category or user
- **Database connection issues** – e.g., connection failures or timeouts

---

## 📦 Pagination Helper

PharmaNest includes a **reusable helper** for pagination located at:

```
helpers/paginationHelpers.ts
```

### Supports:

- **page** – current page number
- **limit** – number of items per page
- **sortBy** – field to sort by
- **sortOrder** – ascending or descending

---

## 🔐 Authentication

Authentication is handled by **Better Auth** via:

```
/api/auth/*
```

### Includes:

- **Email signup**
- **Session management**

---

## 📊 Order Workflow

```
Customer places order
      ↓
OrderItems created
      ↓
Seller processes order
      ↓
Status update:
PLACED → PROCESSING → SHIPPED → DELIVERED
      ↓
Customer leaves review
```
