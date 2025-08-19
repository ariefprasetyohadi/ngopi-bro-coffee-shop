import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart, Product } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Berhasil ditambahkan!",
      description: `${product.name} telah ditambahkan ke keranjang.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <Card className="h-full bg-gradient-card shadow-card hover:shadow-coffee transition-all duration-300 hover:scale-105 border-coffee-secondary/20">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-coffee-dark mb-2">{product.name}</CardTitle>
        <CardDescription className="text-coffee-accent/80 text-sm mb-3">
          {product.description}
        </CardDescription>
        <div className="text-2xl font-bold text-coffee-primary">
          {formatPrice(product.price)}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-button hover:bg-coffee-primary/90 text-coffee-cream font-semibold"
        >
          Tambah ke Keranjang
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;