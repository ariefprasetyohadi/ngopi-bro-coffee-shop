import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/contexts/CartContext';
import espressoImage from '@/assets/espresso.jpg';
import cappuccinoImage from '@/assets/cappuccino.jpg';
import icedCoffeeImage from '@/assets/iced-coffee.jpg';

const Products = () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Espresso Tradisional',
      description: 'Kopi espresso murni dengan cita rasa kuat dan aroma yang menggugah selera. Dibuat dari biji kopi pilihan terbaik.',
      price: 25000,
      image: espressoImage
    },
    {
      id: '2',
      name: 'Cappuccino Premium',
      description: 'Perpaduan sempurna espresso dengan susu steamed dan foam lembut. Disajikan dengan latte art yang cantik.',
      price: 35000,
      image: cappuccinoImage
    },
    {
      id: '3',
      name: 'Iced Coffee Special',
      description: 'Kopi dingin yang menyegarkan dengan campuran cold brew dan susu. Perfect untuk cuaca panas.',
      price: 30000,
      image: icedCoffeeImage
    },
    {
      id: '4',
      name: 'Americano',
      description: 'Espresso yang diperpanjang dengan air panas. Rasa kopi yang bold namun smooth di tenggorokan.',
      price: 28000,
      image: espressoImage
    },
    {
      id: '5',
      name: 'Latte Vanilla',
      description: 'Kombinasi lembut espresso, steamed milk, dan sentuhan vanilla yang manis. Cocok untuk pemula.',
      price: 38000,
      image: cappuccinoImage
    },
    {
      id: '6',
      name: 'Cold Brew Original',
      description: 'Kopi yang diseduh dengan metode cold brew selama 12 jam untuk menghasilkan rasa yang smooth dan less acidic.',
      price: 32000,
      image: icedCoffeeImage
    },
    {
      id: '7',
      name: 'Macchiato Caramel',
      description: 'Espresso dengan sedikit steamed milk dan foam, ditambah siraman caramel yang manis di atasnya.',
      price: 40000,
      image: cappuccinoImage
    },
    {
      id: '8',
      name: 'Mocha Chocolate',
      description: 'Perpaduan espresso, cokelat, dan steamed milk yang menghasilkan rasa kopi-cokelat yang lezat.',
      price: 42000,
      image: cappuccinoImage
    },
    {
      id: '9',
      name: 'Frappé Coffee',
      description: 'Kopi dingin yang di-blend dengan es dan whipped cream. Tekstur creamy dan rasa yang menyegarkan.',
      price: 45000,
      image: icedCoffeeImage
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-coffee-cream mb-4">
            Menu Kopi Ngopi Bro
          </h1>
          <p className="text-xl text-coffee-cream/90 max-w-2xl mx-auto">
            Pilih dari berbagai macam kopi berkualitas premium yang kami tawarkan
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter/Category buttons could go here in the future */}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-coffee-cream/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-coffee-dark mb-4">
            Tidak menemukan yang Anda cari?
          </h2>
          <p className="text-lg text-coffee-accent/80 mb-6">
            Hubungi kami untuk menu spesial atau saran kopi yang sesuai dengan selera Anda
          </p>
          <a 
            href="tel:+6281234567890" 
            className="inline-block bg-gradient-button hover:bg-coffee-primary/90 text-coffee-cream font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Hubungi Kami
          </a>
        </div>
      </section>
    </div>
  );
};

export default Products;