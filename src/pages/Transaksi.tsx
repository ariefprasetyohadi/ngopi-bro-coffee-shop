import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Filter, Edit, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Customer {
  id: number;
  nama_pelanggan: string;
  email?: string;
  telepon?: string;
  status?: string;
}

interface Product {
  id: number;
  nama_produk: string;
  harga: number;
  stok: number;
}

interface Transaction {
  transaksi_id: number;
  tanggal: string;
  aksi: string;
  nama_pelanggan: string;
  nama_produk: string;
  jumlah: number;
  harga: number;
  subtotal: number;
}

const Transaksi = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Customer and Product data
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Form data
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [transactionStatus, setTransactionStatus] = useState<string>('proses');
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    nama_pelanggan: '',
    email: '',
    telepon: '',
    status: 'reguler'
  });
  
  const { toast } = useToast();

  useEffect(() => {
    fetchTransactions();
    fetchCustomers();
    fetchProducts();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, statusFilter]);

  const fetchTransactions = async () => {
    try {
      // Use type assertion to work around TypeScript limitations with views
      const { data, error } = await supabase
        .from('v_transaksi_lengkap' as any)
        .select('*')
        .order('tanggal', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: "Error",
          description: "Failed to fetch transactions",
          variant: "destructive"
        });
        return;
      }

      const formattedData: Transaction[] = (data || []).map((item: any) => ({
        transaksi_id: item.transaksi_id,
        tanggal: item.tanggal,
        aksi: item.aksi,
        nama_pelanggan: item.nama_pelanggan,
        nama_produk: item.nama_produk,
        jumlah: item.jumlah,
        harga: item.harga,
        subtotal: item.subtotal
      }));

      setTransactions(formattedData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('pelanggan')
        .select('*');

      if (error) {
        console.error('Error fetching customers:', error);
        return;
      }

      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('produk')
        .select('*');

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterTransactions = () => {
    if (statusFilter === 'all') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter(t => t.aksi.toLowerCase() === statusFilter.toLowerCase()));
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction({ ...transaction });
    setIsEditDialogOpen(true);
  };

  const handleSaveEditedTransaction = async () => {
    if (!editingTransaction) return;

    try {
      // Use type assertion to work around TypeScript limitations
      const { error } = await supabase
        .from('transaksi' as any)
        .update({
          aksi: editingTransaction.aksi
        })
        .eq('id', editingTransaction.transaksi_id);

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
      let customerId = selectedCustomerId;
      
      // If creating new customer, insert it first
      if (showNewCustomerForm && newCustomer.nama_pelanggan) {
        const { data: customerData, error: customerError } = await supabase
          .from('pelanggan')
          .insert({
            nama_pelanggan: newCustomer.nama_pelanggan,
            email: newCustomer.email,
            telepon: newCustomer.telepon,
            status: newCustomer.status
          })
          .select()
          .single();

        if (customerError) {
          console.error('Error adding customer:', customerError);
          toast({
            title: "Error",
            description: "Gagal menambahkan pelanggan baru",
            variant: "destructive"
          });
          return;
        }
        
        customerId = customerData.id;
      }

      if (!customerId || !selectedProductId) {
        toast({
          title: "Error",
          description: "Silakan pilih pelanggan dan produk",
          variant: "destructive"
        });
        return;
      }

      const selectedProduct = products.find(p => p.id === selectedProductId);
      if (!selectedProduct) {
        toast({
          title: "Error",
          description: "Produk tidak ditemukan",
          variant: "destructive"
        });
        return;
      }

      const subtotal = quantity * selectedProduct.harga;
      
      const { error } = await supabase
        .from('transaksi')
        .insert({
          pelanggan_id: customerId,
          produk_id: selectedProductId,
          Jumlah: quantity,
          subtotal: subtotal,
          tanggal: new Date().toISOString().split('T')[0],
          aksi: transactionStatus
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

      // Reset form
      setIsAddDialogOpen(false);
      setSelectedCustomerId(null);
      setSelectedProductId(null);
      setQuantity(1);
      setTransactionStatus('proses');
      setShowNewCustomerForm(false);
      setNewCustomer({
        nama_pelanggan: '',
        email: '',
        telepon: '',
        status: 'reguler'
      });
      
      // Refresh data
      fetchTransactions();
      fetchCustomers();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const calculateSubtotal = () => {
    const selectedProduct = products.find(p => p.id === selectedProductId);
    return selectedProduct ? quantity * selectedProduct.harga : 0;
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
            
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="selesai">Selesai</SelectItem>
                <SelectItem value="proses">Proses</SelectItem>
                <SelectItem value="batal">Batal</SelectItem>
              </SelectContent>
            </Select>

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
                  {/* Customer Selection */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer_select" className="text-right">Pelanggan</Label>
                    <div className="col-span-3">
                      <Select 
                        value={showNewCustomerForm ? 'new' : selectedCustomerId?.toString() || ''} 
                        onValueChange={(value) => {
                          if (value === 'new') {
                            setShowNewCustomerForm(true);
                            setSelectedCustomerId(null);
                          } else {
                            setShowNewCustomerForm(false);
                            setSelectedCustomerId(parseInt(value));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih pelanggan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">+ Pelanggan Baru</SelectItem>
                          {customers.map((customer) => (
                            <SelectItem key={customer.id} value={customer.id.toString()}>
                              {customer.nama_pelanggan}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* New Customer Form */}
                  {showNewCustomerForm && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new_customer_name" className="text-right">Nama Pelanggan</Label>
                        <Input
                          id="new_customer_name"
                          className="col-span-3"
                          value={newCustomer.nama_pelanggan}
                          onChange={(e) => setNewCustomer(prev => ({ ...prev, nama_pelanggan: e.target.value }))}
                          placeholder="Masukkan nama pelanggan"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new_customer_email" className="text-right">Email</Label>
                        <Input
                          id="new_customer_email"
                          type="email"
                          className="col-span-3"
                          value={newCustomer.email}
                          onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Masukkan email"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new_customer_phone" className="text-right">Telepon</Label>
                        <Input
                          id="new_customer_phone"
                          className="col-span-3"
                          value={newCustomer.telepon}
                          onChange={(e) => setNewCustomer(prev => ({ ...prev, telepon: e.target.value }))}
                          placeholder="Masukkan nomor telepon"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new_customer_status" className="text-right">Status</Label>
                        <Select 
                          value={newCustomer.status} 
                          onValueChange={(value) => setNewCustomer(prev => ({ ...prev, status: value }))}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reguler">Reguler</SelectItem>
                            <SelectItem value="vip">VIP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {/* Product Selection */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product_select" className="text-right">Produk</Label>
                    <Select 
                      value={selectedProductId?.toString() || ''} 
                      onValueChange={(value) => setSelectedProductId(parseInt(value))}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Pilih produk" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.nama_produk} - Rp {product.harga?.toLocaleString('id-ID')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">Jumlah</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      className="col-span-3"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    />
                  </div>

                  {/* Transaction Status */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="transaction_status" className="text-right">Status Transaksi</Label>
                    <Select 
                      value={transactionStatus} 
                      onValueChange={(value) => setTransactionStatus(value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proses">Proses</SelectItem>
                        <SelectItem value="selesai">Selesai</SelectItem>
                        <SelectItem value="batal">Batal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subtotal Display */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Subtotal</Label>
                    <div className="col-span-3 text-lg font-semibold">
                      Rp {calculateSubtotal().toLocaleString('id-ID')}
                    </div>
                  </div>

                  {/* Date Display */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Tanggal</Label>
                    <div className="col-span-3 text-sm text-muted-foreground">
                      {new Date().toLocaleDateString('id-ID')}
                    </div>
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
                  <TableHead>ID Transaksi</TableHead>
                  <TableHead>Tanggal Transaksi</TableHead>
                  <TableHead>Nama Pelanggan</TableHead>
                  <TableHead>Produk yang Dibeli</TableHead>
                  <TableHead>Jumlah Produk</TableHead>
                  <TableHead>Harga Satuan</TableHead>
                  <TableHead>Total Harga</TableHead>
                  <TableHead>Status Transaksi</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction, index) => (
                  <TableRow key={`${transaction.transaksi_id}-${index}`}>
                    <TableCell className="font-medium">{transaction.transaksi_id}</TableCell>
                    <TableCell>{transaction.tanggal}</TableCell>
                    <TableCell>{transaction.nama_pelanggan}</TableCell>
                    <TableCell>{transaction.nama_produk}</TableCell>
                    <TableCell>{transaction.jumlah}</TableCell>
                    <TableCell>Rp {transaction.harga?.toLocaleString('id-ID')}</TableCell>
                    <TableCell>Rp {transaction.subtotal?.toLocaleString('id-ID')}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          transaction.aksi === 'selesai' ? 'default' : 
                          transaction.aksi === 'proses' ? 'secondary' : 
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
                                <Label htmlFor="edit_id" className="text-right">ID Transaksi</Label>
                                <Input
                                  id="edit_id"
                                  className="col-span-3"
                                  value={editingTransaction.transaksi_id}
                                  disabled
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_nama_pelanggan" className="text-right">Nama Pelanggan</Label>
                                <Input
                                  id="edit_nama_pelanggan"
                                  className="col-span-3"
                                  value={editingTransaction.nama_pelanggan}
                                  disabled
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_nama_produk" className="text-right">Produk</Label>
                                <Input
                                  id="edit_nama_produk"
                                  className="col-span-3"
                                  value={editingTransaction.nama_produk}
                                  disabled
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_jumlah" className="text-right">Jumlah</Label>
                                <Input
                                  id="edit_jumlah"
                                  type="number"
                                  className="col-span-3"
                                  value={editingTransaction.jumlah}
                                  disabled
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_harga" className="text-right">Harga Satuan</Label>
                                <Input
                                  id="edit_harga"
                                  type="number"
                                  className="col-span-3"
                                  value={editingTransaction.harga}
                                  disabled
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_subtotal" className="text-right">Total Harga</Label>
                                <Input
                                  id="edit_subtotal"
                                  type="number"
                                  className="col-span-3"
                                  value={editingTransaction.subtotal}
                                  disabled
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_tanggal" className="text-right">Tanggal</Label>
                                <Input
                                  id="edit_tanggal"
                                  type="date"
                                  className="col-span-3"
                                  value={editingTransaction.tanggal}
                                  disabled
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit_status" className="text-right">Status</Label>
                                <Select 
                                  value={editingTransaction.aksi} 
                                  onValueChange={(value) => setEditingTransaction(prev => prev ? ({ ...prev, aksi: value }) : null)}
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="proses">Proses</SelectItem>
                                    <SelectItem value="selesai">Selesai</SelectItem>
                                    <SelectItem value="batal">Batal</SelectItem>
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
                {transactions.filter(t => t.aksi === 'selesai').length}
              </h3>
              <p className="text-coffee-accent">Transaksi Selesai</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-coffee text-center">
              <h3 className="text-2xl font-bold text-coffee-primary">
                {transactions.filter(t => t.aksi === 'proses').length}
              </h3>
              <p className="text-coffee-accent">Transaksi Proses</p>
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