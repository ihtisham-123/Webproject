import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  country: string;
  phoneNumber: string;
  address: string;
  state: string;
  city: string;
  zipCode: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
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
    const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [orders, setOrders] = useState<{ [key: string]: Order[] }>({});
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
        setUsers(response.data.data.users);
      } catch (error) {
        setError('Error fetching users. Please try again.');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleUserClick = async (userId: string) => {
    setError(null); // Clear previous errors
    setSelectedUserId(userId);

    try {
      const response = await axios.get(`http://localhost:5000/api/admin/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders((prevOrders) => ({
        ...prevOrders,
        [userId]: response.data.orders,
      }));
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
        Object.keys(prevOrders).reduce((acc, userId) => {
          acc[userId] = prevOrders[userId].map((order) =>
            order._id === orderId ? { ...order, isActive: !currentStatus } : order
          );
          return acc;
        }, {} as { [key: string]: Order[] })
      );
      broadcastChannel.postMessage('reload-dashboard');
    } catch (error) {
      console.error('Error toggling order status:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#13111C] p-4">
        <div>
            <button
            onClick={() => navigate('/admin/dashboard')}
            className='flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 '>Seacrh</button>
        </div>
      <div className="w-full max-w-7xl bg-[#1A1625] border border-purple-500/20 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Users</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1A1625] text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">Name</th>
                <th className="py-2 px-4 border-b border-gray-700">Username</th>
                <th className="py-2 px-4 border-b border-gray-700">Email</th>
                <th className="py-2 px-4 border-b border-gray-700">Country</th>
                <th className="py-2 px-4 border-b border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <React.Fragment key={user._id}>
                  <tr className="hover:bg-[#2A1E4A]">
                    <td className="py-2 px-4 border-b border-gray-700">{user.name}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{user.username}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{user.email}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{user.country}</td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      <button
                        onClick={() => handleUserClick(user._id)}
                        className="px-4 py-2 rounded-md bg-blue-500 text-white"
                      >
                        {selectedUserId === user._id ? 'Hide Orders' : 'View Orders'}
                      </button>
                    </td>
                  </tr>
                  {selectedUserId === user._id && orders[user._id] && (
                    <tr>
                      <td colSpan={5} className="p-4">
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
                              {orders[user._id].map((order) => (
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
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;