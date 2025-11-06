import { Product, CartItem, Cart, CheckoutData, Receipt } from "@/types";

// Update this with your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  // Get cart
  async getCart(): Promise<Cart> {
    const response = await fetch(`${API_BASE_URL}/api/cart`);
    if (!response.ok) throw new Error("Failed to fetch cart");
    return response.json();
  },

  // Add to cart
  async addToCart(productId: string, qty: number): Promise<CartItem> {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, qty }),
    });
    if (!response.ok) throw new Error("Failed to add to cart");
    return response.json();
  },

  // Remove from cart
  async removeFromCart(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/cart/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to remove from cart");
  },

  // Checkout
  async checkout(cartItems: CartItem[], customerData: CheckoutData): Promise<Receipt> {
    const response = await fetch(`${API_BASE_URL}/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems, ...customerData }),
    });
    if (!response.ok) throw new Error("Failed to checkout");
    return response.json();
  },
};
