-- Fix security vulnerabilities by updating existing policies

-- 1. Drop ALL existing policies on pelanggan table to avoid conflicts
DO $$
BEGIN
    -- Drop all existing policies on pelanggan table
    DROP POLICY IF EXISTS "Allow select for all" ON public.pelanggan;
    DROP POLICY IF EXISTS "Enable read access for all users" ON public.pelanggan;
    DROP POLICY IF EXISTS "Allow insert for all users" ON public.pelanggan;
    DROP POLICY IF EXISTS "Allow update for all users" ON public.pelanggan;
    DROP POLICY IF EXISTS "Authenticated users can view customer data" ON public.pelanggan;
    DROP POLICY IF EXISTS "Authenticated users can insert customer data" ON public.pelanggan;
    DROP POLICY IF EXISTS "Authenticated users can update customer data" ON public.pelanggan;
EXCEPTION
    WHEN OTHERS THEN NULL; -- Ignore errors if policies don't exist
END $$;

-- 2. Create new secure policies for pelanggan table
CREATE POLICY "secure_pelanggan_select" 
ON public.pelanggan 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "secure_pelanggan_insert" 
ON public.pelanggan 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "secure_pelanggan_update" 
ON public.pelanggan 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- 3. Fix login table security
DO $$
BEGIN
    DROP POLICY IF EXISTS "Enable read access for all users" ON public.login;
    DROP POLICY IF EXISTS "Authenticated users only can access login" ON public.login;
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

CREATE POLICY "secure_login_select" 
ON public.login 
FOR SELECT 
TO authenticated
USING (true);

-- 4. Fix transaction data access
DO $$
BEGIN
    DROP POLICY IF EXISTS "Allow select for all" ON public.transaksi;
    DROP POLICY IF EXISTS "Enable read access for all users" ON public.transaksi;
    DROP POLICY IF EXISTS "Allow insert for all users" ON public.transaksi;
    DROP POLICY IF EXISTS "Allow update for all users" ON public.transaksi;
    DROP POLICY IF EXISTS "Authenticated users can view transactions" ON public.transaksi;
    DROP POLICY IF EXISTS "Authenticated users can insert transactions" ON public.transaksi;
    DROP POLICY IF EXISTS "Authenticated users can update transactions" ON public.transaksi;
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

CREATE POLICY "secure_transaksi_select" 
ON public.transaksi 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "secure_transaksi_insert" 
ON public.transaksi 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "secure_transaksi_update" 
ON public.transaksi 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Fix transaction items access
DO $$
BEGIN
    DROP POLICY IF EXISTS "Enable read access for all users" ON public.transaksi_items;
    DROP POLICY IF EXISTS "Authenticated users can view transaction items" ON public.transaksi_items;
    DROP POLICY IF EXISTS "Authenticated users can insert transaction items" ON public.transaksi_items;
    DROP POLICY IF EXISTS "Authenticated users can update transaction items" ON public.transaksi_items;
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

CREATE POLICY "secure_transaksi_items_select" 
ON public.transaksi_items 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "secure_transaksi_items_insert" 
ON public.transaksi_items 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "secure_transaksi_items_update" 
ON public.transaksi_items 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);