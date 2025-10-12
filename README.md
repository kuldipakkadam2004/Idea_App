# 💡 Idea Management System

A full-featured **Idea Management System** built using **Node.js**, **Express.js**, **MongoDB**, and **Redis**.  
This application allows users to **submit, view, update, and delete ideas**, with **secure authentication**, **role-based access**, and **high-performance caching**.

---

## 🚀 Features

- 🔐 **JWT Authentication** – Secure signup, login, and token refresh workflows.  
- 🧑‍💻 **Role-based Authorization** – Admin and User roles with restricted API access.  
- ⚙️ **CRUD Operations** – Create, Read, Update, Delete ideas easily via RESTful APIs.  
- ⚡ **Redis Caching** – Speeds up idea retrieval with in-memory cache management.  
- 🧾 **Input Validation** – Uses **Joi** and middleware for robust request validation.  
- 🧱 **Modular Architecture** – Cleanly separated routes, controllers, and middlewares.  
- 🔒 **Password Hashing** – Secures credentials using **bcrypt** encryption.  
- 🧩 **Cookie & Token Handling** – Implements secure refresh token flow via cookies.  
- 🪵 **Logging** – Uses **morgan** for easy debugging and monitoring.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Cache** | Redis |
| **Authentication** | JWT (Access + Refresh Tokens) |
| **Validation** | Joi |
| **Logging** | Morgan |
| **Environment** | dotenv |



 API Endpoints
 Authentication Routes
Method	Endpoint	Description
POST	/idea_app/v1/auth/signup	Register new user
POST	/idea_app/v1/auth/signin	User login
POST	/idea_app/v1/auth/refresh	Refresh access token


| Method | Endpoint                       | Description                      |
| ------ | ------------------------------ | -------------------------------- |
| GET    | `/idea_app/v1/ideas`           | Fetch all ideas                  |
| GET    | `/idea_app/v1/ideas/:id`       | Get idea by ID                   |
| POST   | `/idea_app/v1/ideas`           | Create new idea                  |
| PUT    | `/idea_app/v1/ideas/:id`       | Update idea                      |
| DELETE | `/idea_app/v1/ideas/:id`       | Delete idea by ID *(Admin only)* |
| DELETE | `/idea_app/v1/ideas/deleteAll` | Delete all ideas *(Admin only)*  |


Middleware Highlights

auth.mw.js → Verifies JWT tokens for protected routes

role.mw.js → Restricts access based on user roles

ideas.mw.js → Validates request bodies and idea IDs

users.mw.js → Ensures valid signup and login data


👨‍💻 Author

Kuldipak Kadam
Backend Developer | Node.js | Express | MongoDB
📧 kuldipakkadam2004@gmail.com
LinkedIn : https://tinyurl.com/2xaks3pz