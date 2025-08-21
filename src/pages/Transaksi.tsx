import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Filter, Save, Edit, Plus } from 'lucide-react';
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
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({});
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

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction({ ...transaction });
    setIsEditDialogOpen(true);
  };

  const handleSaveEditedTransaction = async () => {
    if (!editingTransaction) return;

    try {
      const { error } = await supabase
        .from('transaksi' as any)
        .update({
          pelanggan_id: editingTransaction.pelanggan_id,
          produk_id: parseInt(editingTransaction.product_name?.replace('Product ', '') || '0'),
          Jumlah: editingTransaction.quantity,
          subtotal: editingTransaction.subtotal,
          tanggal: editingTransaction.date,
          aksi: editingTransaction.aksi
        })
        .eq('id', editingTransaction.id);

      if (error) {
        console.error('Error updating transaction:', error);
        toast({
          title: "Error",
          description: "Gagal mengupdate transaksi",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Transaksi berhasil diupdate"
      });

      setIsEditDialogOpen(false);
      fetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleAddTransaction = async () => {
    try {
      const { error } = await supabase
        .from('transaksi' as any)
        .insert({
          pelanggan_id: newTransaction.pelanggan_id,
          produk_id: parseInt(newTransaction.product_name?.replace('Product ', '') || '1'),
          Jumlah: newTransaction.quantity || 1,
          subtotal: newTransaction.subtotal || 0,
          tanggal: new Date().toISOString().split('T')[0],
          aksi: 'Pending'
        });

      if (error) {
        console.error('Error adding transaction:', error);
        toast({
          title: "Error",
          description: "Gagal menambahkan transaksi",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Transaksi berhasil ditambahkan"
      });

      setIsAddDialogOpen(false);
      setNewTransaction({});
      fetchTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-coffee-primary text-coffee-cream hover:bg-coffee-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  + Tambahkan Pesanan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambahkan Pesanan Baru</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pelanggan_id" className="text-right">ID Pelanggan</Label>
                    <Input
                      id="pelanggan_id"
                      type="number"
                      className="col-span-3"
                      value={newTransaction.pelanggan_id || ''}
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, pelanggan_id: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product_name" className="text-right">Produk</Label>
                    <Input
                      id="product_name"
                      className="col-span-3"
                      placeholder="Product 1"
                      value={newTransaction.product_name || ''}
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, product_name: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">Jumlah</Label>
                    <Input
                      id="quantity"
                      type="number"
                      className="col-span-3"
                      value={newTransaction.quantity || ''}
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subtotal" className="text-right">Subtotal</Label>
                    <Input
                      id="subtotal"
                      type="number"
                      className="col-span-3"
                      value={newTransaction.subtotal || ''}
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, subtotal: parseFloat(e.target.value) }))}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
                  <Button onClick={handleAddTransaction}>Tambahkan</Button>
                </div>
              </DialogContent>
            </Dialog>
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
                      <Badge 
                        variant={
                          transaction.aksi === 'Selesai' ? 'default' : 
                          transaction.aksi === 'Pending' ? 'secondary' : 
                          'destructive'
                        }
                      >
                        {transaction.aksi}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditTransaction(transaction)}
                            className="bg-coffee-primary text-coffee-cream hover:bg-coffee-primary/90"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Kelola
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Kelola Transaksi</DialogTitle>
                          </DialogHeader>
                          {editingTransaction && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_pelanggan_id" className="text-right">ID Pelanggan</Label>
                                <Input
                                  id="edit_pelanggan_id"
                                  type="number"
                                  className="col-span-3"
                                  value={editingTransaction.pelanggan_id || ''}
                                  onChange={(e) => setEditingTransaction(prev => prev ? ({ ...prev, pelanggan_id: parseInt(e.target.value) }) : null)}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_product_name" className="text-right">Produk</Label>
                                <Input
                                  id="edit_product_name"
                                  className="col-span-3"
                                  value={editingTransaction.product_name || ''}
                                  onChange={(e) => setEditingTransaction(prev => prev ? ({ ...prev, product_name: e.target.value }) : null)}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_quantity" className="text-right">Jumlah</Label>
                                <Input
                                  id="edit_quantity"
                                  type="number"
                                  className="col-span-3"
                                  value={editingTransaction.quantity || ''}
                                  onChange={(e) => setEditingTransaction(prev => prev ? ({ ...prev, quantity: parseInt(e.target.value) }) : null)}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_subtotal" className="text-right">Subtotal</Label>
                                <Input
                                  id="edit_subtotal"
                                  type="number"
                                  className="col-span-3"
                                  value={editingTransaction.subtotal || ''}
                                  onChange={(e) => setEditingTransaction(prev => prev ? ({ ...prev, subtotal: parseFloat(e.target.value) }) : null)}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_date" className="text-right">Tanggal</Label>
                                <Input
                                  id="edit_date"
                                  type="date"
                                  className="col-span-3"
                                  value={editingTransaction.date || ''}
                                  onChange={(e) => setEditingTransaction(prev => prev ? ({ ...prev, date: e.target.value }) : null)}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_status" className="text-right">Status</Label>
                                <Select 
                                  value={editingTransaction.aksi || 'Pending'} 
                                  onValueChange={(value) => setEditingTransaction(prev => prev ? ({ ...prev, aksi: value }) : null)}
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Selesai">Selesai</SelectItem>
                                    <SelectItem value="Batal">Batal</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Batal</Button>
                            <Button onClick={handleSaveEditedTransaction}>Simpan</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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