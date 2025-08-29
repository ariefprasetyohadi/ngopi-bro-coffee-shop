-- Fix security vulnerabilities by restricting access to sensitive data

-- 1. Drop existing overly permissive policies on pelanggan table
DROP POLICY IF EXISTS "Allow select for all" ON public.pelanggan;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.pelanggan;
DROP POLICY IF EXISTS "Allow insert for all users" ON public.pelanggan;
DROP POLICY IF EXISTS "Allow update for all users" ON public.pelanggan;

-- 2. Create secure RLS policies for pelanggan table (customer data)
-- Only authenticated users can access customer data
CREATE POLICY "Authenticated users can view customer data" 
ON public.pelanggan 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert customer data" 
ON public.pelanggan 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update customer data" 
ON public.pelanggan 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- 3. Fix login table security (remove public access to credentials)
DROP POLICY IF EXISTS "Enable read access for all users" ON public.login;

CREATE POLICY "Authenticated users only can access login" 
ON public.login 
FOR SELECT 
TO authenticated
USING (true);

-- 4. Fix transaction data access
DROP POLICY IF EXISTS "Allow select for all" ON public.transaksi;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.transaksi;
DROP POLICY IF EXISTS "Allow insert for all users" ON public.transaksi;
DROP POLICY IF EXISTS "Allow update for all users" ON public.transaksi;

CREATE POLICY "Authenticated users can view transactions" 
ON public.transaksi 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert transactions" 
ON public.transaksi 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update transactions" 
ON public.transaksi 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Fix transaction items access
DROP POLICY IF EXISTS "Enable read access for all users" ON public.transaksi_items;

CREATE POLICY "Authenticated users can view transaction items" 
ON public.transaksi_items 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert transaction items" 
ON public.transaksi_items 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update transaction items" 
ON public.transaksi_items 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Create a profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'staff',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 7. Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();