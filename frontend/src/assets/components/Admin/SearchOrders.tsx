import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

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

const SearchOrders = () => {
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');
  const broadcastChannel = new BroadcastChannel('dashboard-reload');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data.orders);
    } catch (error) {
      setError('Error searching orders. Please try again.');
      console.error('Error searching orders:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
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
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Search Orders</h2>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="query">
              Search by Username or Email
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded-lg bg-input text-black focus:outline-none focus:ring focus:ring-ring"
              placeholder="Enter username or email"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground w-full py-2 rounded-md shadow-sm bg-gradient-to-r from-[#3E62DE] to-[#B22ADF] hover:from-[#B22ADF] hover:to-[#3E62DE] hover:bg-gradient-to-r transition-all duration-200"
          >
            Search
          </button>
        </form>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1A1625] text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">Username</th>
                <th className="py-2 px-4 border-b border-gray-700">Email</th>
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
                  <td className="py-2 px-4 border-b border-gray-700">{order.user.username}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{order.user.email}</td>
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
    </div>
  );
};

export default SearchOrders;