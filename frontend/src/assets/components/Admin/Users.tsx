import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  username: string;
  email: string;
}

interface Order {
  _id: string;
  user: {
    username: string;
    email: string;
  };
  challengeType: string;
  accountSize: string;
  platform: string;
  couponCode: string;
  transactionId: string;
  paymentProof: string | null;
  total: number;
  isActive: boolean;
  createdAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');
  const broadcastChannel = new BroadcastChannel('dashboard-reload');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        setError('Error fetching users. Please try again.');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleUserClick = async (userId: string) => {
    setError(null); // Clear previous errors
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedUser(users.find(user => user._id === userId) || null);
      setOrders(response.data.orders);
    } catch (error) {
      setError('Error fetching orders. Please try again.');
      console.error('Error fetching orders:', error);
    }
  };

  const handleToggleActive = async (orderId: string, currentStatus: boolean) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}`, { isActive: !currentStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, isActive: !currentStatus } : order
        )
      );
      broadcastChannel.postMessage('reload-dashboard');
    } catch (error) {
      console.error('Error toggling order status:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#13111C] p-4">
      <div className="w-full max-w-4xl bg-[#1A1625] border border-purple-500/20 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Users</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1A1625] text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">Username</th>
                <th className="py-2 px-4 border-b border-gray-700">Email</th>
                <th className="py-2 px-4 border-b border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-[#2A1E4A]">
                  <td className="py-2 px-4 border-b border-gray-700">{user.username}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    <button
                      onClick={() => handleUserClick(user._id)}
                      className="px-4 py-2 rounded-md bg-blue-500 text-white"
                    >
                      View Orders
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedUser && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Orders for {selectedUser.username}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#1A1625] text-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-700">Challenge Type</th>
                    <th className="py-2 px-4 border-b border-gray-700">Account Size</th>
                    <th className="py-2 px-4 border-b border-gray-700">Platform</th>
                    <th className="py-2 px-4 border-b border-gray-700">Coupon Code</th>
                    <th className="py-2 px-4 border-b border-gray-700">Transaction ID</th>
                    <th className="py-2 px-4 border-b border-gray-700">Total</th>
                    <th className="py-2 px-4 border-b border-gray-700">Status</th>
                    <th className="py-2 px-4 border-b border-gray-700">Created At</th>
                    <th className="py-2 px-4 border-b border-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-[#2A1E4A]">
                      <td className="py-2 px-4 border-b border-gray-700">{order.challengeType}</td>
                      <td className="py-2 px-4 border-b border-gray-700">{order.accountSize}</td>
                      <td className="py-2 px-4 border-b border-gray-700">{order.platform}</td>
                      <td className="py-2 px-4 border-b border-gray-700">{order.couponCode}</td>
                      <td className="py-2 px-4 border-b border-gray-700">{order.transactionId}</td>
                      <td className="py-2 px-4 border-b border-gray-700">${order.total}</td>
                      <td className={`py-2 px-4 border-b border-gray-700 ${order.isActive ? 'text-green-500' : 'text-red-500'}`}>
                        {order.isActive ? 'Active' : 'Inactive'}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">{new Date(order.createdAt).toLocaleString()}</td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        <button
                          onClick={() => handleToggleActive(order._id, order.isActive)}
                          className={`px-4 py-2 rounded-md ${order.isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
                        >
                          {order.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;