import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminOrderManagement = ({ ordersData, searchTerm }) => {

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = ordersData.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    // Note: This component doesn't have setOrdersData, so this change won't persist in UI
    // unless passed down and handled in AdminDashboard.jsx or similar parent.
    // For now, we'll just update localStorage directly.
    localStorage.setItem('ecoShopOrders', JSON.stringify(updatedOrders));
    toast({
      title: "Order status updated!",
      description: `Order #${orderId} is now ${newStatus}.`
    });
    // Ideally, trigger a re-fetch or update state in parent component here.
  };


  const filteredOrders = ordersData.filter(order =>
    order.id.includes(searchTerm) ||
    (order.customerInfo && order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.customerInfo && order.customerInfo.firstName && order.customerInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.customerInfo && order.customerInfo.lastName && order.customerInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customerInfo ? `${order.customerInfo.firstName || ''} ${order.customerInfo.lastName || ''}` : 'N/A'}
                    <div className="text-xs text-gray-500">{order.customerInfo ? order.customerInfo.email : 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={`${
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="p-1 border rounded-md text-xs"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminOrderManagement;