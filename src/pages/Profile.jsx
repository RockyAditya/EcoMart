import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Edit3, Save, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
      // Load user orders from localStorage
      const allOrders = JSON.parse(localStorage.getItem('ecoShopOrders') || '[]');
      const userOrders = allOrders.filter(order => order.customerInfo.email === user.email);
      setOrders(userOrders);
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile({ name: formData.name, email: formData.email });
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1"
          >
            <Card>
              <CardHeader className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <CardTitle>{user.name}</CardTitle>
                <p className="text-sm text-gray-600">{user.email}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                  {isEditing ? 'Save Profile' : 'Edit Profile'}
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Details & Orders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            {/* Editable Profile Details */}
            {isEditing && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveProfile} className="w-full eco-gradient text-white">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-green-600" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <ul className="space-y-4">
                    {orders.slice(0, 3).map(order => ( // Display latest 3 orders
                      <li key={order.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-800">Order #{order.id}</span>
                          <span className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm text-gray-700 mb-1">
                          Total: <span className="font-medium">${order.total.toFixed(2)}</span>
                        </div>
                        <div className="text-sm text-gray-700">
                          Status: <span className="font-medium capitalize text-green-600">{order.status}</span>
                        </div>
                        <Button variant="link" size="sm" className="mt-2 p-0 h-auto text-green-600">View Details</Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">You haven't placed any orders yet.</p>
                )}
                {orders.length > 3 && (
                  <Button variant="outline" className="w-full mt-4">View All Orders</Button>
                )}
              </CardContent>
            </Card>

            {/* Wishlist (Placeholder) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Your Wishlist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your wishlist is currently empty. Start adding your favorite eco-products!</p>
                <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/products')}>
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;