import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Calendar, TrendingUp } from 'lucide-react';

const Transaksi = () => {
  // Mock data - in real app this would come from database
  const transactions = [
    { 
      id: 1, 
      pelanggan: 'Budi Santoso', 
      tanggal: '2025-08-19', 
      total: 43000, 
      status: 'Selesai',
      items: ['Espresso', 'Croissant']
    },
    { 
      id: 2, 
      pelanggan: 'Ani Lestari', 
      tanggal: '2025-08-19', 
      total: 52000, 
      status: 'Proses',
      items: ['Es Kopi Susu Gula Aren', 'Brownies Coklat']
    },
    { 
      id: 3, 
      pelanggan: 'Rizky Ramadhan', 
      tanggal: '2025-08-18', 
      total: 25000, 
      status: 'Selesai',
      items: ['Kopi Tubruk']
    },
    { 
      id: 4, 
      pelanggan: 'Siti Aminah', 
      tanggal: '2025-08-18', 
      total: 32000, 
      status: 'Batal',
      items: ['Matcha Latte']
    },
    { 
      id: 5, 
      pelanggan: 'Andi Pratama', 
      tanggal: '2025-08-17', 
      total: 48000, 
      status: 'Selesai',
      items: ['Red Velvet Latte', 'Croissant']
    },
  ];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Selesai':
        return <Badge className="bg-green-500 text-white">Selesai</Badge>;
      case 'Proses':
        return <Badge className="bg-coffee-primary text-coffee-cream">Proses</Badge>;
      case 'Batal':
        return <Badge variant="destructive">Batal</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalRevenue = transactions
    .filter(t => t.status === 'Selesai')
    .reduce((sum, t) => sum + t.total, 0);

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
                    {transactions.filter(t => t.status === 'Selesai').length}
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
                    {transactions.filter(t => t.status === 'Proses').length}
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
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">#{transaction.id}</TableCell>
                    <TableCell>{transaction.pelanggan}</TableCell>
                    <TableCell>{new Date(transaction.tanggal).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-coffee-accent truncate">
                          {transaction.items.join(', ')}
                        </p>
                        <p className="text-xs text-coffee-accent/60">
                          {transaction.items.length} item(s)
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-coffee-primary">
                      {formatRupiah(transaction.total)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
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