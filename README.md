# 🛒 FreshCart - Food Delivery Platform

A full-stack food delivery platform built with **React.js, Spring Boot, Spring Security, JWT, JPA/Hibernate, and MySQL**.

FreshCart allows users to browse food items, search and filter products, manage their shopping cart, authenticate securely, and place/manage orders.



https://github.com/user-attachments/assets/34290b5c-50f9-45d8-ba9f-559713d75942

https://youtu.be/M5UGuE57NR0




---

##  Overview

FreshCart is a modern full-stack food delivery application with:

* 🔐 JWT-based user authentication
* 🍔 Food/product catalog
* 🛒 Shopping cart management
* 🔎 Search and filtering
* 📦 Order management
* 👤 User profile management
* 📱 Responsive React UI
* 🔒 Spring Security
* 🗄️ MySQL database
* 🔗 RESTful APIs

---

## ✨ Features

### 🛒 Core Features

* User registration and login
* JWT authentication
* Browse food products
* Vegetarian, Non-Vegetarian and Dairy categories
* Search products
* Filter products
* Add products to cart
* Increase/decrease cart quantity
* Remove items from cart
* Clear cart
* Checkout
* Place orders
* View order history
* Track order status
* User profile management

### 🎨 UI/UX Features

* Responsive design
* Modern food-delivery interface
* Product cards
* Category-based browsing
* Interactive cart
* Toast notifications
* Loading states
* Form validation
* Smooth user interactions

### 🔐 Security Features

* JWT authentication
* Spring Security
* Password encryption
* Server-side validation
* CORS configuration
* Protected REST endpoints
* Role-based authorization where applicable

---

#  Technology Stack

## Frontend

* React.js
* React Router
* Redux / Redux Toolkit
* Axios
* JavaScript
* HTML5
* CSS3
* Vite

## Backend

* Java
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* REST APIs
* Maven

## Database

* MySQL

## Development Tools

* Git
* GitHub
* VS Code / IntelliJ IDEA
* Postman
* Node.js
* npm
* Maven

---

# 📁 Project Structure

```text
FreshCart/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── ...
│   │       │
│   │       └── resources/
│   │           ├── application.properties
│   │           └── static/
│   │
│   ├── pom.xml
│   └── ...
│
├── public/
│   ├── veg/
│   ├── nonveg/
│   └── dairy/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

> **Note:** The React frontend is located in the project root. There is no separate `frontend/` directory.

---

#  Installation

## Prerequisites

Make sure you have installed:

* Node.js 18+
* npm
* Java 17+
* Maven 3.9+
* MySQL 8+
* Git

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/imran-049-imran/FreshCart.git
cd FreshCart
```

---

# 2️⃣ Database Setup

Create a MySQL database:

```sql
CREATE DATABASE freshcart;
```

Then configure your database credentials in:

```text
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/freshcart
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

 Do not commit your real database password, JWT secret, API keys, or other credentials to GitHub.

---

# 3️⃣ Backend Setup

Open a terminal:

```bash
cd backend
```

Build the Spring Boot application:

```bash
mvn clean install
```

Run the backend:

```bash
mvn spring-boot:run
```

The backend will normally run on:

```text
http://localhost:8080
```

---

# 4️⃣ Frontend Setup

Open another terminal from the project root:

```bash
cd C:\FreshCart\FreshCart
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔗 Application Architecture

```text
        ┌─────────────────────┐
        │     React Frontend  │
        │      Vite + JS      │
        │    localhost:5173   │
        └──────────┬──────────┘
                   │
                   │ REST API / Axios
                   ▼
        ┌─────────────────────┐
        │   Spring Boot API   │
        │ Spring Security/JWT │
        │    localhost:8080   │
        └──────────┬──────────┘
                   │
                   │ JPA / Hibernate
                   ▼
        ┌─────────────────────┐
        │        MySQL        │
        │      FreshCart      │
        └─────────────────────┘
```

---

#  API Documentation

The backend exposes REST APIs for authentication, products, cart and orders.

## Authentication

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | `/auth/register` | Register user    |
| POST   | `/auth/login`    | Login user       |
| GET    | `/auth/profile`  | Get user profile |
| PUT    | `/auth/profile`  | Update profile   |

## Products / Dishes

| Method | Endpoint                      | Description            |
| ------ | ----------------------------- | ---------------------- |
| GET    | `/dishes`                     | Get all dishes         |
| GET    | `/dishes/category/{category}` | Get dishes by category |
| GET    | `/dishes/{id}`                | Get dish by ID         |
| POST   | `/dishes`                     | Create dish            |
| PUT    | `/dishes/{id}`                | Update dish            |
| DELETE | `/dishes/{id}`                | Delete dish            |

## Cart

| Method | Endpoint                | Description      |
| ------ | ----------------------- | ---------------- |
| GET    | `/cart`                 | Get user cart    |
| POST   | `/cart/add`             | Add item to cart |
| PUT    | `/cart/update/{itemId}` | Update quantity  |
| DELETE | `/cart/remove/{itemId}` | Remove item      |
| DELETE | `/cart/clear`           | Clear cart       |

## Orders

| Method | Endpoint                   | Description       |
| ------ | -------------------------- | ----------------- |
| POST   | `/orders/create`           | Create order      |
| GET    | `/orders`                  | Get user orders   |
| GET    | `/orders/{orderId}`        | Get order details |
| PUT    | `/orders/{orderId}/cancel` | Cancel order      |

> API paths may vary depending on the controller mappings configured in the current backend.

---

#  Database

FreshCart uses **MySQL** with **Spring Data JPA / Hibernate**.

Main entities include:

```text
User
Dish
CartItem
Order
```

Typical relationships:

```text
User
 ├── CartItems
 └── Orders

Dish
 ├── CartItems
 └── OrderItems

Order
 └── OrderItems
```

Hibernate can automatically manage/update database tables when configured with:

```properties
spring.jpa.hibernate.ddl-auto=update
```

---

#  Environment Configuration

Never upload sensitive credentials to GitHub.

Example backend configuration:

```properties
server.port=8080

spring.datasource.url=jdbc:mysql://localhost:3306/freshcart
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update

jwt.secret=YOUR_SECRET_KEY
jwt.expiration=86400000
```

For frontend API configuration, use an environment variable such as:

```env
VITE_API_URL=http://localhost:8080
```

Do not commit `.env` files containing real secrets.

---

#  Production Build

## Frontend

From the project root:

```bash
npm run build
```

The production files will be generated in:

```text
dist/
```

Preview the production build:

```bash
npm run preview
```

## Backend

```bash
cd backend
mvn clean package
```

Run the generated JAR:

```bash
java -jar target/*.jar
```

---

# 🐳 Docker

If Docker configuration is available in the project, the application can be containerized using Docker.

Example:

```bash
docker compose up --build
```

---

#  Testing

## Frontend

Run:

```bash
npm run build
```

This verifies that the React/Vite application can successfully build.

## Backend

Run:

```bash
cd backend
mvn test
```

API endpoints can also be tested using Postman.

---

# 📸 Screenshots

Add application screenshots here.

Recommended screenshots:

* 🏠 Home Page
* 🍔 Food Catalog
* 🥗 Vegetarian Products
* 🍗 Non-Vegetarian Products
* 🥛 Dairy Products
* 🛒 Shopping Cart
* 💳 Checkout
* 👤 User Profile
* 📦 Order History

Example:

```text
docs/screenshots/home.png
docs/screenshots/catalog.png
docs/screenshots/cart.png
docs/screenshots/checkout.png
```

---

# 🤝 Contributing

Contributions are welcome.

### Steps

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git add .
git commit -m "Add new feature"
```

5. Push the branch.

```bash
git push origin feature/new-feature
```

6. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Imran Attar**

GitHub:

https://github.com/imran-049-imran

---

# 🔗 Repository

**FreshCart GitHub Repository**

https://github.com/imran-049-imran/FreshCart

---

# ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.

---

##  Future Improvements

* Cloud deployment
* CI/CD pipeline

---

**Built with ❤️ using React.js, Spring Boot and MySQL.**
