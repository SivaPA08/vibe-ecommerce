import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Receipt } from "@/types";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receipt: Receipt | null;
}

export const ReceiptDialog = ({ open, onOpenChange, receipt }: ReceiptDialogProps) => {
  if (!receipt) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Order Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Thank you for your order, {receipt.customerName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="border-t border-b py-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order Date:</span>
              <span className="font-medium">
                {new Date(receipt.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{receipt.customerEmail}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Order Items:</h4>
            {receipt.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.productName} × {item.qty}
                </span>
                <span className="font-medium">
                  {(item.price * item.qty).toFixed(2)} Rs
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-2xl font-bold text-primary">
                {receipt.total.toFixed(2)} Rs
              </span>
            </div>
          </div>

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
