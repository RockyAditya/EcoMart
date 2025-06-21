import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const AdminUserManagement = ({ usersData, setUsersData, searchTerm, loadData }) => {
  const handleToggleUserStatus = (userId) => {
    const updatedUsers = usersData.map(user =>
      user.id === userId
        ? { ...user, isActive: user.isActive === undefined ? false : !user.isActive } // Default to active if undefined
        : user
    );
    setUsersData(updatedUsers);
    localStorage.setItem('ecoShopUsers', JSON.stringify(updatedUsers));
    toast({ title: "User status updated", description: "User status has been changed successfully." });
    loadData(); // Reload stats and other data
  };
  
  const handleToggleUserRole = (userId) => {
    const updatedUsers = usersData.map(user =>
      user.id === userId
        ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' }
        : user
    );
    setUsersData(updatedUsers);
    localStorage.setItem('ecoShopUsers', JSON.stringify(updatedUsers));
    toast({ title: "User role updated", description: "User role has been changed successfully." });
    loadData();
  };


  const filteredUsers = usersData.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'Admin' : 'User'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={user.isActive !== false ? 'default' : 'destructive'}>
                      {user.isActive !== false ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleToggleUserStatus(user.id)}>
                      {user.isActive !== false ? 'Deactivate' : 'Activate'}
                    </Button>
                     <Button variant="ghost" size="sm" onClick={() => handleToggleUserRole(user.id)}>
                      {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                    </Button>
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

export default AdminUserManagement;