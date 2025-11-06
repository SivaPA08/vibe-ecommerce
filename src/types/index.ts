export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  qty: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CheckoutData {
  name: string;
  email: string;
}

export interface Receipt {
  total: number;
  timestamp: string;
  items: CartItem[];
  customerName: string;
  customerEmail: string;
}
