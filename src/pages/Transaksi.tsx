import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Calendar, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Transaction {
  no: number;
  date?: string;
  action?: string;
  quantity?: number;
  subtotal?: number;
  transaction_id: number;
  product_id: number;
  customer?: string;
}

const Transaksi = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('detail_transaction')
        .select('*');

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-coffee-primary text-xl">Loading transactions...</div>
      </div>
    );
  }

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-white">Selesai</Badge>;
      case 'pending':
        return <Badge className="bg-coffee-primary text-coffee-cream">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Batal</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalRevenue = transactions.reduce((sum, t) => sum + (t.subtotal || 0), 0);
  const completedTransactions = transactions.filter(t => t.action === 'completed').length;
  const pendingTransactions = transactions.filter(t => t.action === 'pending').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-coffee-cream mb-4">
                Data Transaksi
              </h1>
              <p className="text-xl text-coffee-cream/90">
                Pantau semua transaksi penjualan kopi
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-coffee-cream text-coffee-cream hover:bg-coffee-cream hover:text-coffee-primary">
                <Calendar className="h-4 w-4 mr-2" />
                Filter Tanggal
              </Button>
              <Button className="bg-coffee-cream text-coffee-dark hover:bg-coffee-cream/90">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-coffee">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-coffee-accent text-sm">Total Transaksi</p>
                  <h3 className="text-2xl font-bold text-coffee-dark">{transactions.length}</h3>
                </div>
                <TrendingUp className="h-8 w-8 text-coffee-primary" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-coffee">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-coffee-accent text-sm">Pendapatan</p>
                  <h3 className="text-xl font-bold text-coffee-dark">{formatRupiah(totalRevenue)}</h3>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-coffee">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-coffee-accent text-sm">Selesai</p>
                  <h3 className="text-2xl font-bold text-coffee-dark">
                    {completedTransactions}
                  </h3>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-coffee">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-coffee-accent text-sm">Pending</p>
                  <h3 className="text-2xl font-bold text-coffee-dark">
                    {pendingTransactions}
                  </h3>
                </div>
                <div className="w-8 h-8 bg-coffee-primary rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="bg-white rounded-lg shadow-coffee overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.no}>
                    <TableCell className="font-medium">#{transaction.transaction_id}</TableCell>
                    <TableCell>{transaction.customer || 'No Customer'}</TableCell>
                    <TableCell>{transaction.date ? new Date(transaction.date).toLocaleDateString('id-ID') : 'No Date'}</TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-coffee-accent truncate">
                          Product ID: {transaction.product_id}
                        </p>
                        <p className="text-xs text-coffee-accent/60">
                          Qty: {transaction.quantity || 0}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-coffee-primary">
                      {formatRupiah(transaction.subtotal || 0)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.action || 'pending')}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transaksi;