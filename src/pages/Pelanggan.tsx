import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { UserPlus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Customer {
  id: number;
  customer_id?: number;
  customer_name?: string;
  email?: string;
  phone?: string;
  status?: string;
}

const Pelanggan = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('pelanggan' as any)
        .select('*');

      if (error) {
        console.error('Error fetching customers:', error);
        toast({
          title: "Error",
          description: "Failed to fetch customers",
          variant: "destructive"
        });
        return;
      }

      const formattedCustomers: Customer[] = data.map((customer: any) => ({
        id: customer.id,
        customer_id: customer.id,
        customer_name: customer.nama_pelanggan,
        email: customer.email,
        phone: customer.telepon,
        status: customer.status || 'Regular'
      }));

      setCustomers(formattedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCustomer = async () => {
    if (!editingCustomer) return;

    try {
      const { error } = await supabase
        .from('pelanggan' as any)
        .update({
          nama_pelanggan: editingCustomer.customer_name,
          email: editingCustomer.email,
          telepon: editingCustomer.phone,
          status: editingCustomer.status
        })
        .eq('id', editingCustomer.id);

      if (error) {
        console.error('Error updating customer:', error);
        toast({
          title: "Error",
          description: "Failed to update customer",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Customer updated successfully"
      });

      fetchCustomers();
      setEditDialogOpen(false);
      setEditingCustomer(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-coffee-primary text-xl">Loading customers...</div>
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
                    <TableCell>{customer.customer_name || 'No Name'}</TableCell>
                    <TableCell className="text-coffee-accent">{customer.email || 'No Email'}</TableCell>
                    <TableCell>{customer.phone || 'No Phone'}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        0 transaksi
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={customer.status === 'VIP' ? "default" : "outline"}
                        className={customer.status === 'VIP' ? "bg-coffee-primary text-coffee-cream" : ""}
                      >
                        {customer.status || 'Regular'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingCustomer(customer)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Pelanggan</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Nama</label>
                                <Input
                                  value={editingCustomer?.customer_name || ''}
                                  onChange={(e) => setEditingCustomer(prev => 
                                    prev ? { ...prev, customer_name: e.target.value } : null
                                  )}
                                  placeholder="Nama pelanggan"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                  type="email"
                                  value={editingCustomer?.email || ''}
                                  onChange={(e) => setEditingCustomer(prev => 
                                    prev ? { ...prev, email: e.target.value } : null
                                  )}
                                  placeholder="Email pelanggan"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Telepon</label>
                                <Input
                                  value={editingCustomer?.phone || ''}
                                  onChange={(e) => setEditingCustomer(prev => 
                                    prev ? { ...prev, phone: e.target.value } : null
                                  )}
                                  placeholder="Nomor telepon"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Status</label>
                                <Input
                                  value={editingCustomer?.status || ''}
                                  onChange={(e) => setEditingCustomer(prev => 
                                    prev ? { ...prev, status: e.target.value } : null
                                  )}
                                  placeholder="Status pelanggan"
                                />
                              </div>
                              <div className="flex gap-2 pt-4">
                                <Button 
                                  onClick={handleEditCustomer}
                                  className="bg-coffee-primary hover:bg-coffee-primary/90"
                                >
                                  Simpan
                                </Button>
                                <Button 
                                  variant="outline" 
                                  onClick={() => {
                                    setEditDialogOpen(false);
                                    setEditingCustomer(null);
                                  }}
                                >
                                  Batal
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" className="text-coffee-secondary border-coffee-secondary hover:bg-coffee-secondary hover:text-white">
                          <Trash2 className="h-4 w-4" />
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
                {customers.filter(c => c.status === 'VIP').length}
              </h3>
              <p className="text-coffee-accent">Pelanggan VIP</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-coffee text-center">
              <h3 className="text-2xl font-bold text-coffee-primary">0</h3>
              <p className="text-coffee-accent">Total Transaksi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pelanggan;