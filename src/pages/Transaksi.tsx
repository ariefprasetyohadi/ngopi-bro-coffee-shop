import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Transaction {
  id: number;
  transaction_id?: number;
  pelanggan_id?: number;
  product_name?: string;
  quantity?: number;
  subtotal?: number;
  date?: string;
  aksi?: string;
}

const Transaksi = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStatus, setEditingStatus] = useState<{ [key: number]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transaksi' as any)
        .select('*');

      if (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: "Error",
          description: "Failed to fetch transactions",
          variant: "destructive"
        });
        return;
      }

      const formattedTransactions: Transaction[] = data.map((transaction: any) => ({
        id: transaction.id,
        transaction_id: transaction.id,
        pelanggan_id: transaction.pelanggan_id,
        product_name: 'Product ' + (transaction.produk_id || 'Unknown'),
        quantity: transaction.Jumlah || 0,
        subtotal: transaction.subtotal || 0,
        date: transaction.tanggal || new Date().toISOString().split('T')[0],
        aksi: transaction.aksi || 'Pending'
      }));

      setTransactions(formattedTransactions);
      
      // Initialize editing status
      const initialStatus: { [key: number]: string } = {};
      formattedTransactions.forEach(transaction => {
        initialStatus[transaction.id] = transaction.aksi || 'Pending';
      });
      setEditingStatus(initialStatus);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (transactionId: number, newStatus: string) => {
    setEditingStatus(prev => ({
      ...prev,
      [transactionId]: newStatus
    }));
  };

  const handleSaveTransaction = async (transactionId: number) => {
    try {
      const { error } = await supabase
        .from('transaksi' as any)
        .update({ aksi: editingStatus[transactionId] })
        .eq('id', transactionId);

      if (error) {
        console.error('Error updating transaction:', error);
        toast({
          title: "Error",
          description: "Gagal mengupdate status transaksi",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Status transaksi berhasil diupdate"
      });

      // Update local state
      setTransactions(prev => 
        prev.map(transaction => 
          transaction.id === transactionId 
            ? { ...transaction, aksi: editingStatus[transactionId] }
            : transaction
        )
      );
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-coffee-primary text-xl">Loading transactions...</div>
      </div>
    );
  }

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
                Kelola semua transaksi penjualan Ngopi Bro
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-accent h-4 w-4" />
              <input
                type="text"
                placeholder="Cari transaksi..."
                className="w-full pl-10 pr-4 py-2 border border-coffee-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-primary"
              />
            </div>
            <Button variant="outline" className="border-coffee-accent text-coffee-accent hover:bg-coffee-accent hover:text-coffee-cream">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Transaction Table */}
          <div className="bg-white rounded-lg shadow-coffee overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>ID Pelanggan</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.transaction_id}</TableCell>
                    <TableCell>{transaction.pelanggan_id || 'N/A'}</TableCell>
                    <TableCell>{transaction.product_name}</TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>Rp {transaction.subtotal?.toLocaleString('id-ID')}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Select 
                        value={editingStatus[transaction.id] || 'Pending'} 
                        onValueChange={(value) => handleStatusChange(transaction.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Selesai">Selesai</SelectItem>
                          <SelectItem value="Batal">Batal</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSaveTransaction(transaction.id)}
                        className="bg-coffee-primary text-coffee-cream hover:bg-coffee-primary/90"
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Simpan
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-coffee text-center">
              <h3 className="text-2xl font-bold text-coffee-primary">{transactions.length}</h3>
              <p className="text-coffee-accent">Total Transaksi</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-coffee text-center">
              <h3 className="text-2xl font-bold text-coffee-primary">
                {transactions.filter(t => t.aksi === 'Selesai').length}
              </h3>
              <p className="text-coffee-accent">Transaksi Selesai</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-coffee text-center">
              <h3 className="text-2xl font-bold text-coffee-primary">
                {transactions.filter(t => t.aksi === 'Pending').length}
              </h3>
              <p className="text-coffee-accent">Transaksi Pending</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-coffee text-center">
              <h3 className="text-2xl font-bold text-coffee-primary">
                Rp {transactions.reduce((sum, t) => sum + (t.subtotal || 0), 0).toLocaleString('id-ID')}
              </h3>
              <p className="text-coffee-accent">Total Pendapatan</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transaksi;