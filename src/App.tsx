import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Pelanggan from "./pages/Pelanggan";
import Transaksi from "./pages/Transaksi";
import Auth from "./pages/Auth";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/*" element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                      <Route path="/product" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                      <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
                      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                      <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                      <Route path="/pelanggan" element={<ProtectedRoute><Pelanggan /></ProtectedRoute>} />
                      <Route path="/transaksi" element={<ProtectedRoute><Transaksi /></ProtectedRoute>} />
                      <Route path="*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
