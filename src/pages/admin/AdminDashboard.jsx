import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Search
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import AdminStatsCards from '@/components/admin/AdminStatsCards';
import AdminProductManagement from '@/components/admin/AdminProductManagement';
import AdminUserManagement from '@/components/admin/AdminUserManagement';
import AdminOrderManagement from '@/components/admin/AdminOrderManagement';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedProducts = JSON.parse(localStorage.getItem('ecoShopProducts') || '[]');
    setProducts(storedProducts);

    const storedUsers = JSON.parse(localStorage.getItem('ecoShopUsers') || '[]');
    setUsers(storedUsers);

    const storedOrders = JSON.parse(localStorage.getItem('ecoShopOrders') || '[]');
    setOrders(storedOrders);

    const totalRevenue = storedOrders.reduce((sum, order) => sum + order.total, 0);
    setStats({
      totalUsers: storedUsers.length,
      totalProducts: storedProducts.length,
      totalOrders: storedOrders.length,
      totalRevenue
    });
  };

  const statsCardsData = [
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-emerald-600', bgColor: 'bg-emerald-50' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        </motion.div>

        <AdminStatsCards stats={statsCardsData} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="products" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-3">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search across tabs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <TabsContent value="products">
              <AdminProductManagement 
                productsData={products} 
                setProductsData={setProducts} 
                searchTerm={searchTerm} 
                loadData={loadData}
              />
            </TabsContent>
            <TabsContent value="users">
              <AdminUserManagement 
                usersData={users} 
                setUsersData={setUsers} 
                searchTerm={searchTerm} 
                loadData={loadData}
              />
            </TabsContent>
            <TabsContent value="orders">
              <AdminOrderManagement 
                ordersData={orders} 
                searchTerm={searchTerm} 
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;