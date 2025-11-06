import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Product, Cart, CheckoutData, Receipt } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { CartSheet } from "@/components/CartSheet";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { ReceiptDialog } from "@/components/ReceiptDialog";
import { useToast } from "@/hooks/use-toast";
import { Store } from "lucide-react";

const Index = () => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: api.getProducts,
  });

  // Fetch cart
  const { data: cart = { items: [], total: 0 }, isLoading: cartLoading } = useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: api.getCart,
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: ({ productId, qty }: { productId: string; qty: number }) =>
      api.addToCart(productId, qty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Added to cart",
        description: "Product added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: (id: string) => api.removeFromCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Removed from cart",
        description: "Product removed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove product from cart",
        variant: "destructive",
      });
    },
  });

  // Checkout mutation
  const checkoutMutation = useMutation({
    mutationFn: (data: CheckoutData) => api.checkout(cart.items, data),
    onSuccess: (receiptData) => {
      setReceipt(receiptData);
      setCheckoutOpen(false);
      setReceiptOpen(true);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Order successful!",
        description: "Your order has been placed",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to complete checkout",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = (productId: string) => {
    addToCartMutation.mutate({ productId, qty: 1 });
  };

  const handleRemoveFromCart = (id: string) => {
    removeFromCartMutation.mutate(id);
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products before checkout",
        variant: "destructive",
      });
      return;
    }
    setCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (data: CheckoutData) => {
    checkoutMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Vibe Commerce</h1>
          </div>
          <CartSheet
            cart={cart}
            onRemove={handleRemoveFromCart}
            onCheckout={handleCheckout}
            isLoading={removeFromCartMutation.isPending}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Our Products</h2>
          <p className="text-muted-foreground">
            Browse our collection and add items to your cart
          </p>
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                isLoading={addToCartMutation.isPending}
              />
            ))}
          </div>
        )}
      </main>

      {/* Dialogs */}
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        onSubmit={handleCheckoutSubmit}
        isLoading={checkoutMutation.isPending}
      />
      <ReceiptDialog
        open={receiptOpen}
        onOpenChange={setReceiptOpen}
        receipt={receipt}
      />
    </div>
  );
};

export default Index;
