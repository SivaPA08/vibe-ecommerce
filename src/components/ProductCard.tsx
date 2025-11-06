import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
	product: Product;
	onAddToCart: (productId: string) => void;
	isLoading?: boolean;
}

export const ProductCard = ({ product, onAddToCart, isLoading }: ProductCardProps) => {
	return (
		<Card className="overflow-hidden transition-shadow hover:shadow-lg">
			<CardHeader className="p-0">
				<div className="aspect-square bg-muted flex items-center justify-center">
					{product.image ? (
						<img src={product.image} alt={product.name} className="object-cover w-full h-full" />
					) : (
						<ShoppingCart className="w-16 h-16 text-muted-foreground" />
					)}
				</div>
			</CardHeader>
			<CardContent className="p-4">
				<CardTitle className="text-lg mb-2">{product.name}</CardTitle>
				{product.description && (
					<p className="text-sm text-muted-foreground mb-3">{product.description}</p>
				)}
				<p className="text-2xl font-bold text-primary">{product.price.toFixed(2)} Rs</p>
			</CardContent>
			<CardFooter className="p-4 pt-0">
				<Button
					onClick={() => onAddToCart(product.id)}
					className="w-full"
					disabled={isLoading}
				>
					<ShoppingCart className="mr-2 h-4 w-4" />
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	);
};
