# Vibe Commerce Backend

Node.js/Express/MongoDB backend for the shopping cart application.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Update with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
PORT=5000
FRONTEND_URL=http://localhost:8080
```

### 3. Seed Database

Populate the database with 10 mock products:

```bash
npm run seed
```

### 4. Start Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/cart` | Get cart items and total |
| POST | `/api/cart` | Add item to cart |
| DELETE | `/api/cart/:id` | Remove item from cart |
| POST | `/api/checkout` | Process checkout |
| GET | `/health` | Health check |

## MongoDB Collections

- **products**: Store product catalog
- **cartitems**: Current cart items
- **orders**: Completed orders

## Testing

1. Ensure MongoDB is running
2. Seed the database: `npm run seed`
3. Start the server: `npm start`
4. Test with the frontend or use tools like Postman/curl

Example curl test:
```bash
# Get products
curl http://localhost:5000/api/products

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"1","qty":2}'

# Get cart
curl http://localhost:5000/api/cart
```
