import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import CartItem from '@/components/CartItem';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { state, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handleCheckout = () => {
    if (state.items.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Silakan tambahkan produk terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    // Here you would integrate with a payment system
    toast({
      title: "Checkout berhasil!",
      description: "Terima kasih atas pesanan Anda. Kami akan segera memproses pesanan.",
    });
    
    clearCart();
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-hero py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-coffee-cream mb-4">
              Keranjang Belanja
            </h1>
          </div>
        </section>

        {/* Empty Cart */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="bg-gradient-card shadow-card border-coffee-secondary/20">
              <CardContent className="py-16">
                <ShoppingBag className="h-24 w-24 text-coffee-accent/50 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-coffee-dark mb-4">
                  Keranjang Anda Kosong
                </h2>
                <p className="text-coffee-accent/80 mb-8 text-lg">
                  Belum ada produk yang ditambahkan ke keranjang. 
                  Mari mulai berbelanja dan temukan kopi favorit Anda!
                </p>
                <Link to="/products">
                  <Button size="lg" className="bg-gradient-button hover:bg-coffee-primary/90 text-coffee-cream font-semibold">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Mulai Berbelanja
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-coffee-cream mb-4">
            Keranjang Belanja
          </h1>
          <p className="text-xl text-coffee-cream/90">
            Review pesanan Anda sebelum checkout
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-coffee-dark">
                  Item Pesanan ({state.items.reduce((sum, item) => sum + item.quantity, 0)})
                </h2>
                <Link to="/products">
                  <Button variant="outline" className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Lanjut Belanja
                  </Button>
                </Link>
              </div>

              {state.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-card shadow-coffee border-coffee-secondary/20 sticky top-4">
                <CardHeader>
                  <CardTitle className="text-coffee-dark">Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-coffee-secondary/20">
                    <span className="text-coffee-accent">Subtotal</span>
                    <span className="font-semibold text-coffee-dark">
                      {formatPrice(state.total)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-coffee-secondary/20">
                    <span className="text-coffee-accent">Biaya Pengiriman</span>
                    <span className="font-semibold text-coffee-dark">Gratis</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b-2 border-coffee-primary/20">
                    <span className="text-coffee-accent">Pajak (PPN 11%)</span>
                    <span className="font-semibold text-coffee-dark">
                      {formatPrice(state.total * 0.11)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-xl font-bold text-coffee-dark">Total</span>
                    <span className="text-2xl font-bold text-coffee-primary">
                      {formatPrice(state.total * 1.11)}
                    </span>
                  </div>

                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-button hover:bg-coffee-primary/90 text-coffee-cream font-bold text-lg py-3 shadow-coffee"
                  >
                    Checkout Sekarang
                  </Button>

                  <div className="text-center pt-4">
                    <button
                      onClick={clearCart}
                      className="text-sm text-coffee-accent/60 hover:text-destructive transition-colors"
                    >
                      Kosongkan Keranjang
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;