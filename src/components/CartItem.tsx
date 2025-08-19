import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card border-coffee-secondary/20">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Product Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-grow">
            <h3 className="font-semibold text-coffee-dark">{item.name}</h3>
            <p className="text-sm text-coffee-accent/80 mb-2">{item.description}</p>
            <div className="text-lg font-bold text-coffee-primary">
              {formatPrice(item.price)}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="h-8 w-8 p-0 border-coffee-secondary hover:bg-coffee-secondary/20"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-semibold text-coffee-dark">
              {item.quantity}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="h-8 w-8 p-0 border-coffee-secondary hover:bg-coffee-secondary/20"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => removeFromCart(item.id)}
            className="h-8 w-8 p-0 border-destructive/20 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Total for this item */}
        <div className="mt-3 pt-3 border-t border-coffee-secondary/20 text-right">
          <span className="text-sm text-coffee-accent/80">Subtotal: </span>
          <span className="font-bold text-coffee-primary">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;