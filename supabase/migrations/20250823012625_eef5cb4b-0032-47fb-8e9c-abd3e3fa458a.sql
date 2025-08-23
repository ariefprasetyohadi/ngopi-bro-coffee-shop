-- Enable INSERT and UPDATE permissions for pelanggan table
CREATE POLICY "Allow insert for all users" ON public.pelanggan
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for all users" ON public.pelanggan  
FOR UPDATE USING (true);

-- Enable INSERT and UPDATE permissions for transaksi table
CREATE POLICY "Allow insert for all users" ON public.transaksi
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for all users" ON public.transaksi
FOR UPDATE USING (true);