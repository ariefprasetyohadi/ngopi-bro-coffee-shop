import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coffee, Snowflake, Zap, Heart } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 'hot-coffee',
      name: 'Kopi Panas',
      description: 'Koleksi kopi panas klasik dan specialty yang menghangatkan',
      icon: <Coffee className="h-12 w-12 text-coffee-primary" />,
      items: ['Espresso', 'Americano', 'Cappuccino', 'Latte', 'Macchiato', 'Mocha'],
      color: 'bg-gradient-to-br from-coffee-primary/10 to-coffee-accent/10'
    },
    {
      id: 'cold-coffee',
      name: 'Kopi Dingin',
      description: 'Minuman kopi dingin yang menyegarkan untuk segala cuaca',
      icon: <Snowflake className="h-12 w-12 text-coffee-primary" />,
      items: ['Cold Brew', 'Iced Coffee', 'Frappé', 'Iced Latte', 'Affogato', 'Coffee Float'],
      color: 'bg-gradient-to-br from-blue-100/50 to-coffee-secondary/20'
    },
    {
      id: 'specialty',
      name: 'Specialty Coffee',
      description: 'Kreasi khusus barista dengan cita rasa unik dan premium',
      icon: <Zap className="h-12 w-12 text-coffee-primary" />,
      items: ['V60 Pour Over', 'Chemex', 'French Press', 'Aeropress', 'Siphon', 'Turkish Coffee'],
      color: 'bg-gradient-to-br from-amber-100/50 to-coffee-secondary/20'
    },
    {
      id: 'signature',
      name: 'Signature Blend',
      description: 'Racikan spesial Ngopi Bro yang tidak akan Anda temukan di tempat lain',
      icon: <Heart className="h-12 w-12 text-coffee-primary" />,
      items: ['Bro Special', 'Jakarta Blend', 'Nusantara Mix', 'Sunset Roast', 'Morning Glory', 'Night Owl'],
      color: 'bg-gradient-to-br from-coffee-secondary/30 to-coffee-primary/10'
    }
  ];

  const featuredBeans = [
    {
      name: 'Arabica Gayo',
      origin: 'Aceh, Indonesia',
      description: 'Cita rasa fruity dengan aroma yang kompleks',
      roastLevel: 'Medium'
    },
    {
      name: 'Robusta Lampung',
      origin: 'Lampung, Indonesia',
      description: 'Body yang kuat dengan rasa earthy yang khas',
      roastLevel: 'Dark'
    },
    {
      name: 'Arabica Toraja',
      origin: 'Sulawesi, Indonesia',
      description: 'Keseimbangan sempurna antara acidity dan sweetness',
      roastLevel: 'Medium-Dark'
    },
    {
      name: 'Liberica Ranong',
      origin: 'Kalimantan, Indonesia',
      description: 'Rasa unik dengan hint woody dan floral',
      roastLevel: 'Light-Medium'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-coffee-cream mb-4">
            Kategori Kopi
          </h1>
          <p className="text-xl text-coffee-cream/90 max-w-2xl mx-auto">
            Jelajahi berbagai kategori kopi yang kami tawarkan, dari klasik hingga kreasi khusus
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <Card key={category.id} className={`${category.color} shadow-card hover:shadow-coffee transition-all duration-300 hover:scale-105 border-coffee-secondary/20`}>
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {category.icon}
                  </div>
                  <CardTitle className="text-2xl text-coffee-dark">{category.name}</CardTitle>
                  <CardDescription className="text-coffee-accent/80 text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {category.items.map((item, index) => (
                      <div key={index} className="bg-coffee-cream/50 rounded-lg p-2 text-center text-sm text-coffee-accent font-medium">
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link to="/products">
                    <Button className="w-full bg-gradient-button hover:bg-coffee-primary/90 text-coffee-cream">
                      Lihat Menu {category.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Beans Section */}
      <section className="py-16 bg-coffee-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              Biji Kopi Pilihan
            </h2>
            <p className="text-xl text-coffee-accent/80 max-w-2xl mx-auto">
              Kami bangga menggunakan biji kopi premium dari berbagai daerah di Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBeans.map((bean, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-coffee transition-all duration-300 hover:scale-105 border-coffee-secondary/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-coffee-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee className="h-8 w-8 text-coffee-primary" />
                  </div>
                  <h3 className="font-bold text-coffee-dark text-lg mb-2">{bean.name}</h3>
                  <p className="text-coffee-accent/60 text-sm mb-3">{bean.origin}</p>
                  <p className="text-coffee-accent/80 text-sm mb-4">{bean.description}</p>
                  <div className="bg-coffee-secondary/20 rounded-full px-3 py-1 text-xs font-medium text-coffee-accent">
                    {bean.roastLevel} Roast
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brewing Methods Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-6">
            Metode Seduh Premium
          </h2>
          <p className="text-lg text-coffee-accent/80 mb-8">
            Setiap metode seduh menghasilkan karakter rasa yang berbeda. 
            Barista kami ahli dalam berbagai teknik untuk menghadirkan cita rasa terbaik.
          </p>
          
          <Card className="bg-gradient-card shadow-coffee border-coffee-secondary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-coffee-dark">Pour Over</h4>
                  <p className="text-coffee-accent/80">V60, Chemex, Kalita Wave</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-coffee-dark">Immersion</h4>
                  <p className="text-coffee-accent/80">French Press, AeroPress</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-coffee-dark">Pressure</h4>
                  <p className="text-coffee-accent/80">Espresso, Moka Pot</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-coffee-dark">Cold Brew</h4>
                  <p className="text-coffee-accent/80">24-hour extraction</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-coffee-dark">Siphon</h4>
                  <p className="text-coffee-accent/80">Vacuum brewing</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-coffee-dark">Turkish</h4>
                  <p className="text-coffee-accent/80">Traditional method</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Link to="/products" className="inline-block mt-8">
            <Button size="lg" className="bg-gradient-button hover:bg-coffee-primary/90 text-coffee-cream font-semibold">
              Coba Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Categories;