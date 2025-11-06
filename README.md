# Vibe Commerce - E-Commerce Cart Frontend

A full-stack shopping cart application built for Vibe Commerce screening assignment. This repository contains the **React frontend** that connects to a Node.js/Express/MongoDB backend.

##  Features

-  Product grid with "Add to Cart" functionality
-  Shopping cart with item management (add/remove)
-  Real-time cart total calculation
-  Checkout form with validation
-  Order confirmation receipt modal
-  Responsive design for all devices
-  Beautiful UI with shadcn/ui components
-  TypeScript for type safety
-  Form validation with React Hook Form + Zod

##  Tech Stack

**Frontend:**
- React 
- TypeScript
- Vite
- TanStack Query (React Query)
- React Hook Form + Zod validation
- shadcn/ui components
- Tailwind CSS
- Lucide React icons

**Backend (separate - see BACKEND_API_SPEC.md):**
- Node.js/Express
- MongoDB

##  Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:5000` (see BACKEND_API_SPEC.md)

##  Getting Started

### 1. Clone and Install

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

### 2. Configure Backend URL

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the backend URL if different from default:
```
VITE_API_URL=http://localhost:5000
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## 🔌 Backend Integration

This frontend requires a backend API with the following endpoints:

- `GET /api/products` - Fetch all products
- `GET /api/cart` - Get current cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/checkout` - Process checkout

**See [BACKEND_API_SPEC.md](./BACKEND_API_SPEC.md) for complete API specification.**

##  Design System

The app uses a custom design system with:
- Purple primary color (#8B5CF6)
- Semantic color tokens
- Consistent spacing and typography
- Dark mode support

##  Key Components

### ProductCard
Displays product information with add-to-cart button.

### CartSheet
Slide-out panel showing cart items, quantities, and total.

### CheckoutDialog
Form for customer information (name, email) with validation.

### ReceiptDialog
Order confirmation with receipt details and timestamp.

##  Input Validation

All forms include client-side validation:
- Name: 2-100 characters
- Email: Valid email format, max 255 characters
- Proper error messages and user feedback

##  Responsive Design

Fully responsive layout with breakpoints:
- Mobile: 1 column product grid
- Tablet: 2 columns
- Desktop: 3-4 columns

##  Testing the App

1. Ensure backend is running
2. Start the frontend dev server
3. Browse products and click "Add to Cart"
4. Open cart from header icon
5. Adjust quantities or remove items
6. Click "Proceed to Checkout"
7. Fill in customer details
8. View order confirmation receipt
