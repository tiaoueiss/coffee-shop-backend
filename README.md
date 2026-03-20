# Coffee Shop Web API

## CSC456 – Advanced Web Programming | Project 2

A RESTful Web API for a Coffee Shop management system built with **Node.js**, **Express**, **MongoDB/Mongoose**, and **SQLite/Sequelize**.

---

## Project Overview

This project implements a backend API that supports full CRUD operations for managing a coffee shop's customers, categories, products, orders, and feedback. It demonstrates:

- **MongoDB with Mongoose** for entities with relationships (many-to-one & many-to-many).
- **SQLite with Sequelize** for a standalone entity table (Feedback).
- RESTful API design and modular project structure.

---

## Entity Types & Relationships

### MongoDB Entities

| Entity     | Fields                                          |
|------------|-------------------------------------------------|
| Customer   | name, email, phone, loyaltyPoints               |
| Category   | name, description                               |
| Product    | name, description, price, size, isAvailable, category (ref) |
| Order      | customer (ref), products (refs with quantity), orderDate, totalAmount, status |

### SQLite Entity

| Entity   | Fields                                        |
|----------|-----------------------------------------------|
| Feedback | customerName, email, rating (1–5), comment, createdAt |

### Relationships

- **Customer → Orders** (Many-to-One): One customer can place many orders. Each order belongs to one customer.
- **Category → Products** (Many-to-One): One category contains many products. Each product belongs to one category.
- **Orders ↔ Products** (Many-to-Many): One order can contain many products, and one product can appear in many orders. Each entry includes a quantity field.

---

## Tech Stack

| Technology | Purpose                        |
|------------|--------------------------------|
| Node.js    | Runtime environment            |
| Express    | Web framework for REST API     |
| MongoDB    | NoSQL database                 |
| Mongoose   | MongoDB ODM (Object Data Modeling) |
| SQLite     | SQL database (file-based)      |
| Sequelize  | SQL ORM for SQLite             |
| Postman    | API testing & documentation    |

---

## Project Structure

```
coffee-shop-api/
├── config/
│   ├── mongodb.js          # MongoDB connection setup
│   └── sqlite.js           # SQLite/Sequelize connection setup
├── models/
│   ├── Customer.js          # Mongoose model
│   ├── Category.js          # Mongoose model
│   ├── Product.js           # Mongoose model
│   ├── Order.js             # Mongoose model
│   └── Feedback.js          # Sequelize model (SQLite)
├── routes/
│   ├── customerRoutes.js
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── feedbackRoutes.js
├── .env                     # Environment variables
├── server.js                # Entry point
├── package.json
└── README.md
```

---


## 📡 API Endpoints

### Customer Routes — `/api/customers`

| Method | Endpoint                     | Description                        |
|--------|------------------------------|------------------------------------|
| GET    | `/api/customers`             | Get all customers                  |
| GET    | `/api/customers/:id`         | Get a single customer by ID        |
| POST   | `/api/customers`             | Create a new customer              |
| PUT    | `/api/customers/:id`         | Update a customer by ID            |
| DELETE | `/api/customers/:id`         | Delete a customer by ID            |
| GET    | `/api/customers/:id/orders`  | Get all orders for a customer      |

### Category Routes — `/api/categories`

| Method | Endpoint                       | Description                        |
|--------|--------------------------------|------------------------------------|
| GET    | `/api/categories`              | Get all categories                 |
| GET    | `/api/categories/:id`          | Get a single category by ID        |
| POST   | `/api/categories`              | Create a new category              |
| PUT    | `/api/categories/:id`          | Update a category by ID            |
| DELETE | `/api/categories/:id`          | Delete a category by ID            |
| GET    | `/api/categories/:id/products` | Get all products in a category     |

### Product Routes — `/api/products`

| Method | Endpoint              | Description                              |
|--------|-----------------------|------------------------------------------|
| GET    | `/api/products`       | Get all products (with category info)    |
| GET    | `/api/products/:id`   | Get a single product by ID               |
| POST   | `/api/products`       | Create a new product (with categoryId)   |
| PUT    | `/api/products/:id`   | Update a product by ID                   |
| DELETE | `/api/products/:id`   | Delete a product by ID                   |

### Order Routes — `/api/orders`

| Method | Endpoint            | Description                                        |
|--------|---------------------|----------------------------------------------------|
| GET    | `/api/orders`       | Get all orders (with customer & product details)   |
| GET    | `/api/orders/:id`   | Get a single order by ID                           |
| POST   | `/api/orders`       | Create a new order (with customerId & products)    |
| PUT    | `/api/orders/:id`   | Update an order by ID                              |
| DELETE | `/api/orders/:id`   | Delete an order by ID                              |

### Feedback Routes (SQLite) — `/api/feedbacks`

| Method | Endpoint              | Description                 |
|--------|-----------------------|-----------------------------|
| GET    | `/api/feedbacks`      | Get all feedbacks           |
| GET    | `/api/feedbacks/:id`  | Get a single feedback by ID |
| POST   | `/api/feedbacks`      | Create a new feedback       |
| PUT    | `/api/feedbacks/:id`  | Update a feedback by ID     |
| DELETE | `/api/feedbacks/:id`  | Delete a feedback by ID     |

-
## 🔄 NoSQL vs SQL Comparison

| Aspect              | MongoDB (NoSQL)                              | SQLite (SQL)                              |
|---------------------|----------------------------------------------|-------------------------------------------|
| Schema              | Flexible, schema-less                        | Fixed schema, structured                  |
| Relationships       | References & embedding                       | Foreign keys & joins                      |
| Use Case            | Complex entities with relationships          | Simple, standalone data (logs, feedback)  |
| Querying            | JSON-like queries, aggregation pipeline      | SQL queries (SELECT, JOIN, WHERE)         |
| Scalability         | Horizontal (sharding)                        | Vertical (single file)                    |
| Best For            | Rapidly evolving data models                 | Structured, relational data               |

In this project, MongoDB handles the core business entities (Customers, Products, Categories, Orders) where flexible schemas and relationship references are beneficial. SQLite handles the Feedback entity as a simple, standalone table demonstrating relational database integration.

---

## 👤 Author

**Tia Maria Oueis & Gaelle Medawar** — CSC456 Advanced Web Programming

---