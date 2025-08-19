import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would handle actual login logic with Supabase
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Coffee className="h-12 w-12 text-coffee-cream" />
            <span className="text-3xl font-bold text-coffee-cream">Ngopi Bro</span>
          </Link>
          <p className="text-coffee-cream/80 mt-2">Masuk ke Admin Panel</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-coffee">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-coffee-dark">Login Admin</CardTitle>
            <CardDescription className="text-center text-coffee-accent">
              Masukkan email dan password untuk mengakses dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-coffee-dark">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@ngopibro.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-coffee-accent/30 focus:border-coffee-primary focus:ring-coffee-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-coffee-dark">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="border-coffee-accent/30 focus:border-coffee-primary focus:ring-coffee-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee-accent hover:text-coffee-primary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-coffee-accent/30 text-coffee-primary focus:ring-coffee-primary"
                  />
                  <Label htmlFor="remember" className="text-sm text-coffee-accent">
                    Ingat saya
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-coffee-primary hover:text-coffee-primary/80 font-medium"
                >
                  Lupa password?
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-button hover:bg-coffee-primary/90 text-coffee-cream font-semibold py-2"
              >
                Masuk
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-coffee-accent">
                Belum punya akun admin?{' '}
                <button className="text-coffee-primary hover:text-coffee-primary/80 font-medium">
                  Hubungi Super Admin
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-coffee-cream/80 hover:text-coffee-cream text-sm font-medium"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;