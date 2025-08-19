import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Heart, Award, Users } from 'lucide-react';
import heroImage from '@/assets/hero-coffee.jpg';
import espressoImage from '@/assets/espresso.jpg';
import cappuccinoImage from '@/assets/cappuccino.jpg';
import icedCoffeeImage from '@/assets/iced-coffee.jpg';

const Home = () => {
  const features = [
    {
      icon: <Coffee className="h-8 w-8 text-coffee-primary" />,
      title: "Kopi Berkualitas Premium",
      description: "Biji kopi pilihan terbaik dari petani lokal Indonesia"
    },
    {
      icon: <Heart className="h-8 w-8 text-coffee-primary" />,
      title: "Dibuat dengan Cinta",
      description: "Setiap cangkir diseduh dengan perhatian dan dedikasi penuh"
    },
    {
      icon: <Award className="h-8 w-8 text-coffee-primary" />,
      title: "Barista Berpengalaman",
      description: "Tim barista profesional dengan pengalaman bertahun-tahun"
    },
    {
      icon: <Users className="h-8 w-8 text-coffee-primary" />,
      title: "Komunitas Coffee Lovers",
      description: "Tempat berkumpulnya para pecinta kopi dari berbagai kalangan"
    }
  ];

  const popularProducts = [
    {
      id: '1',
      name: 'Espresso Tradisional',
      image: espressoImage,
      price: 25000
    },
    {
      id: '2',
      name: 'Cappuccino Premium',
      image: cappuccinoImage,
      price: 35000
    },
    {
      id: '3',
      name: 'Iced Coffee Special',
      image: icedCoffeeImage,
      price: 30000
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-coffee-dark/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-coffee-cream px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Ngopi Bro
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-coffee-secondary font-semibold">
            Ngopi Biar Bro!
          </p>
          <p className="text-xl md:text-2xl mb-8 text-coffee-cream/90 max-w-2xl mx-auto">
            Temukan cita rasa kopi terbaik Indonesia di tempat yang nyaman dan hangat
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-gradient-button hover:bg-coffee-primary/90 text-coffee-cream font-bold text-lg px-8 py-4 shadow-coffee">
              Pesan Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              Kenapa Pilih Ngopi Bro?
            </h2>
            <p className="text-xl text-coffee-accent/80 max-w-2xl mx-auto">
              Kami berkomitmen memberikan pengalaman ngopi terbaik untuk setiap pelanggan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-gradient-card shadow-card hover:shadow-coffee transition-all duration-300 hover:scale-105 border-coffee-secondary/20">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-coffee-dark">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-coffee-accent/80">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-20 bg-coffee-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              Menu Favorit
            </h2>
            <p className="text-xl text-coffee-accent/80 max-w-2xl mx-auto">
              Pilihan kopi terpopuler yang disukai para bro dan sista
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularProducts.map((product) => (
              <Card key={product.id} className="bg-gradient-card shadow-card hover:shadow-coffee transition-all duration-300 hover:scale-105 border-coffee-secondary/20">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <CardTitle className="text-coffee-dark mb-2">{product.name}</CardTitle>
                  <div className="text-2xl font-bold text-coffee-primary mb-4">
                    {formatPrice(product.price)}
                  </div>
                  <Link to="/products">
                    <Button className="w-full bg-gradient-button hover:bg-coffee-primary/90 text-coffee-cream">
                      Lihat Detail
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream">
                Lihat Semua Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-coffee-cream mb-6">
            Siap untuk Ngopi Bareng?
          </h2>
          <p className="text-xl text-coffee-cream/90 mb-8">
            Bergabunglah dengan komunitas pecinta kopi Ngopi Bro dan rasakan pengalaman ngopi yang tak terlupakan
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-coffee-cream text-coffee-primary hover:bg-coffee-cream/90 font-bold text-lg px-8 py-4">
              Mulai Order Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;