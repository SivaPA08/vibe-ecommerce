import { Cart as CartType } from "@/types";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CartSheetProps {
  cart: CartType;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  isLoading?: boolean;
}

export const CartSheet = ({ cart, onRemove, onCheckout, isLoading }: CartSheetProps) => {
  const itemCount = cart.items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({itemCount} items)</SheetTitle>
        </SheetHeader>
        
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
            <ShoppingCart className="h-16 w-16 mb-4" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-250px)] pr-4 mt-6">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-4 p-4 border rounded-lg bg-card"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.productName}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.qty}
                      </p>
                      <p className="font-semibold text-primary mt-1">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onRemove(item.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t pt-4 mt-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-2xl text-primary">${cart.total.toFixed(2)}</span>
              </div>
              <Button 
                onClick={onCheckout} 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
