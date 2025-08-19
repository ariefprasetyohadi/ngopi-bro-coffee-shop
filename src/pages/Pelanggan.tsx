import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Search, Filter } from 'lucide-react';

const Pelanggan = () => {
  // Mock data - in real app this would come from database
  const customers = [
    { id: 1, nama: 'Budi Santoso', email: 'budi@gmail.com', telepon: '081234567890', totalTransaksi: 5 },
    { id: 2, nama: 'Ani Lestari', email: 'ani@yahoo.com', telepon: '081298765432', totalTransaksi: 3 },
    { id: 3, nama: 'Rizky Ramadhan', email: 'rizky@outlook.com', telepon: '081377788899', totalTransaksi: 8 },
    { id: 4, nama: 'Siti Aminah', email: 'siti@gmail.com', telepon: '081299988877', totalTransaksi: 2 },
    { id: 5, nama: 'Andi Pratama', email: 'andi@gmail.com', telepon: '081255544433', totalTransaksi: 6 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-coffee-cream mb-4">
                Data Pelanggan
              </h1>
              <p className="text-xl text-coffee-cream/90">
                Kelola informasi pelanggan Ngopi Bro
              </p>
            </div>
            <Button className="bg-coffee-cream text-coffee-dark hover:bg-coffee-cream/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Tambah Pelanggan
            </Button>
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
                placeholder="Cari pelanggan..."
                className="w-full pl-10 pr-4 py-2 border border-coffee-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-primary"
              />
            </div>
            <Button variant="outline" className="border-coffee-accent text-coffee-accent hover:bg-coffee-accent hover:text-coffee-cream">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Customer Table */}
          <div className="bg-white rounded-lg shadow-coffee overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Total Transaksi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>{customer.nama}</TableCell>
                    <TableCell className="text-coffee-accent">{customer.email}</TableCell>
                    <TableCell>{customer.telepon}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {customer.totalTransaksi} transaksi
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={customer.totalTransaksi >= 5 ? "default" : "outline"}
                        className={customer.totalTransaksi >= 5 ? "bg-coffee-primary text-coffee-cream" : ""}
                      >
                        {customer.totalTransaksi >= 5 ? 'VIP' : 'Regular'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-coffee-secondary border-coffee-secondary hover:bg-coffee-secondary hover:text-white">
                          Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-coffee text-center">
              <h3 className="text-2xl font-bold text-coffee-primary">{customers.length}</h3>
              <p className="text-coffee-accent">Total Pelanggan</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-coffee text-center">
              <h3 className="text-2xl font-bold text-coffee-primary">
                {customers.filter(c => c.totalTransaksi >= 5).length}
              </h3>
              <p className="text-coffee-accent">Pelanggan VIP</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-coffee text-center">
              <h3 className="text-2xl font-bold text-coffee-primary">
                {customers.reduce((sum, c) => sum + c.totalTransaksi, 0)}
              </h3>
              <p className="text-coffee-accent">Total Transaksi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pelanggan;