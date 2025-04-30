# 🍽️ The Digital Diner - Restaurant Ordering System

[![Demo](https://img.shields.io/badge/Demo-Live%20Site-success)](https://digital-diner-snowy.vercel.app)
![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20PostgreSQL-blue)

A full-stack web application for managing restaurant orders, built with MongoDB, Express, React, Node.js, and PostgreSQL.

## 📋 Table of Contents
- [Features](#features)
- [Deployment](#deployment)
- [Database Design](#database-design)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Assumptions & Challenges](#assumptions--challenges)
- [License](#license)

## ✨ Features
- **Menu Browsing**: View items by category (Appetizers, Mains, Desserts, Beverages)
- **Cart Management**: Add/remove items, adjust quantities, calculate totals
- **Order Placement**: Submit orders with phone number validation
- **Order History**: Retrieve past orders using phone number
- **Admin Panel**: Add menu items (MongoDB) and view all orders (PostgreSQL)

## 🚀 Deployment
- **Frontend**: [Vercel](https://digital-diner-snowy.vercel.app)
- **Backend**: Hosted on Render (or localhost for development)

## 💾 Database Design

### MongoDB (Menu Data)
```javascript
// menuItems Schema
{
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["appetizer", "main", "dessert", "beverage"] },
  description: String,
  image: String
}
```
**Justification**: Chosen for flexible schema to accommodate evolving menu details and unstructured data.

### PostgreSQL (Order Data)
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
  order_id INTEGER REFERENCES orders(id),
  item_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL
);
```
**Justification**: PostgreSQL handles transactional data better with ACID compliance for orders.

## 🔧 Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- PostgreSQL 15+

### Backend Setup
1. Clone repository:
```bash
git clone https://github.com/yourusername/digital-diner.git
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/diner
PGUSER=postgres
PGPASSWORD=postgres
PGHOST=localhost
PGDATABASE=diner
JWT_SECRET=your_secret_key
```

4. Start server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to frontend:
```bash
cd ../frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | `/api/items` | Get all menu items | No |
| POST | `/api/orders` | Create new order | No |
| GET | `/api/orders/:phone` | Get orders by phone number | No |
| POST | `/api/menuItems` | Add new menu item (Admin) | JWT |
| GET | `/api/admin/orders` | Get all orders (Admin) | JWT |

## 🤔 Assumptions & Challenges

### Assumptions
- Phone number used as primary user identifier
- No real-time inventory management
- Simplified admin auth using localStorage
- Menu items don't require versioning

### Challenges
- Coordinating MongoDB+PostgreSQL transactions
- Cart state persistence across React components
- CORS configuration for Netlify deployment
- PostgreSQL schema optimization for order history

### AI Tools Used
- GitHub Copilot for boilerplate code
- ChatGPT for debugging assistance
  (All generated code was reviewed and understood)

## 📄 License
MIT License - See LICENSE for details.