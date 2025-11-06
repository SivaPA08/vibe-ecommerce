# Backend API Specification for Vibe Commerce

This document outlines the REST API endpoints required for the shopping cart application. The backend should be built with **Node.js/Express** and **MongoDB**.

## Base URL
```
http://localhost:5000
```

## API Endpoints

### 1. GET /api/products
Get all available products.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "price": number,
    "image": "string (optional)",
    "description": "string (optional)"
  }
]
```

**Example Response:**
```json
[
  {
    "id": "1",
    "name": "Wireless Headphones",
    "price": 79.99,
    "description": "High-quality wireless headphones with noise cancellation"
  },
  {
    "id": "2",
    "name": "Smart Watch",
    "price": 199.99,
    "description": "Fitness tracking smart watch with heart rate monitor"
  }
]
```

---

### 2. GET /api/cart
Get the current cart with all items and total.

**Response:**
```json
{
  "items": [
    {
      "id": "string",
      "productId": "string",
      "productName": "string",
      "price": number,
      "qty": number
    }
  ],
  "total": number
}
```

**Example Response:**
```json
{
  "items": [
    {
      "id": "cart_item_1",
      "productId": "1",
      "productName": "Wireless Headphones",
      "price": 79.99,
      "qty": 2
    }
  ],
  "total": 159.98
}
```

---

### 3. POST /api/cart
Add a product to the cart.

**Request Body:**
```json
{
  "productId": "string",
  "qty": number
}
```

**Response:**
```json
{
  "id": "string",
  "productId": "string",
  "productName": "string",
  "price": number,
  "qty": number
}
```

**Example Request:**
```json
{
  "productId": "1",
  "qty": 1
}
```

**Example Response:**
```json
{
  "id": "cart_item_1",
  "productId": "1",
  "productName": "Wireless Headphones",
  "price": 79.99,
  "qty": 1
}
```

---

### 4. DELETE /api/cart/:id
Remove an item from the cart.

**URL Parameters:**
- `id` - The cart item ID to remove

**Response:**
```json
{
  "message": "Item removed from cart"
}
```

---

### 5. POST /api/checkout
Process checkout and return a mock receipt.

**Request Body:**
```json
{
  "cartItems": [
    {
      "id": "string",
      "productId": "string",
      "productName": "string",
      "price": number,
      "qty": number
    }
  ],
  "name": "string",
  "email": "string"
}
```

**Response:**
```json
{
  "total": number,
  "timestamp": "ISO 8601 date string",
  "items": [
    {
      "id": "string",
      "productId": "string",
      "productName": "string",
      "price": number,
      "qty": number
    }
  ],
  "customerName": "string",
  "customerEmail": "string"
}
```

**Example Request:**
```json
{
  "cartItems": [
    {
      "id": "cart_item_1",
      "productId": "1",
      "productName": "Wireless Headphones",
      "price": 79.99,
      "qty": 2
    }
  ],
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Example Response:**
```json
{
  "total": 159.98,
  "timestamp": "2025-11-06T10:30:00.000Z",
  "items": [
    {
      "id": "cart_item_1",
      "productId": "1",
      "productName": "Wireless Headphones",
      "price": 79.99,
      "qty": 2
    }
  ],
  "customerName": "John Doe",
  "customerEmail": "john@example.com"
}
```

---

## MongoDB Collections

### Products Collection
```javascript
{
  _id: ObjectId,
  id: String,
  name: String,
  price: Number,
  image: String (optional),
  description: String (optional)
}
```

### Cart Items Collection
```javascript
{
  _id: ObjectId,
  id: String,
  productId: String,
  productName: String,
  price: Number,
  qty: Number,
  createdAt: Date
}
```

### Orders Collection (for checkout)
```javascript
{
  _id: ObjectId,
  total: Number,
  timestamp: Date,
  items: Array,
  customerName: String,
  customerEmail: String
}
```

---

## CORS Configuration
Ensure CORS is enabled to allow requests from the frontend:
```javascript
app.use(cors({
  origin: 'http://localhost:8080' // or your frontend URL
}));
```

---

## Error Handling
All endpoints should return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

**Error Response Format:**
```json
{
  "error": "Error message description"
}
```
