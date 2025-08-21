import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import espressoImage from '@/assets/espresso.jpg';
import cappuccinoImage from '@/assets/cappuccino.jpg';
import icedCoffeeImage from '@/assets/iced-coffee.jpg';

interface Category {
  id: number;
  nama_kategori: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const defaultImages = [espressoImage, cappuccinoImage, icedCoffeeImage];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('produk' as any)
        .select('*, kategori:kategori_id(nama_kategori)');

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      const formattedProducts: Product[] = data.map((product: any, index: number) => ({
        id: product.id?.toString() || `product-${index}`,
        name: product.nama_produk || 'Product',  
        description: product.deskripsi || 'No description available',
        price: product.harga || 0,
        image: product.image || defaultImages[index % defaultImages.length],
        category: product.kategori?.nama_kategori || 'Uncategorized'
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('kategori' as any)
        .select('id, nama_kategori');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories((data as any) || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => (product as any).category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-coffee-primary text-xl">Loading products...</div>
      </div>
    );
  }

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
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Button
              onClick={() => setSelectedCategory('all')}
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className={selectedCategory === 'all' ? 'bg-coffee-primary text-coffee-cream' : 'border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream'}
            >
              Semua Kategori
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.nama_kategori)}
                variant={selectedCategory === category.nama_kategori ? 'default' : 'outline'}
                className={selectedCategory === category.nama_kategori ? 'bg-coffee-primary text-coffee-cream' : 'border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream'}
              >
                {category.nama_kategori}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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