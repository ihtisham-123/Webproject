import { useState, useEffect, ChangeEvent } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

interface TradingStats {
  totalTrades: number;
  tradesWon: number;
  tradesLost: number;
  winRate: number;
  lossRate: number;
  totalWinnings: number;
  totalLosses: number;
  profitFactor: number;
  avgProfitPerTrade: number;
}

interface AccountDetails {
  serverName: string;
  accountType: string;
  platformLogin: string;
  platformPassword: string;
  startingBalance: number;
  currentBalance: number;
  profitTarget: number;
}

interface User {
  _id: string;
  username: string;
  email: string;
}

interface Order {
  _id: string;
  user: User;
  challengeType: string;
  accountSize: string;
  platform: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  total: number;
  transactionId: string;
  paymentProof: string | null;
  tradingStats: TradingStats;
  accountDetails: AccountDetails;
}

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const decoded: { id: string } = jwtDecode(token);
        const response = await axios.get(`http://localhost:5000/api/orders/user/${decoded.id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
        }});
        if (Array.isArray(response.data.data.orders)) {
          setOrders(response.data.data.orders);
          if (response.data.data.orders.length > 0) {
            setSelectedOrder(response.data.data.orders[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const formatOrderId = (orderId: string) => {
    // Take the last 6 characters of the order ID
    const shortId = orderId.slice(-6);
    return `FBX${shortId}`;
  };

  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const orderId = e.target.value;
    const order = orders.find((order) => order._id === orderId);
    setSelectedOrder(order || null);
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "text-green-400" : "text-red-400";
  };

  const getStatusBgColor = (isActive: boolean) => {
    return isActive ? "bg-green-500/20" : "bg-red-500/20";
  };

  const StatCard = ({ label, value, className = "" }: { label: string; value: string | number; className?: string }) => (
    <div className="bg-[#1A1625] p-4 rounded-lg border border-purple-500/20">
      <div className="text-sm text-gray-400">{label}</div>
      <div className={`text-xl font-bold ${className || "text-white"}`}>{value}</div>
    </div>
  );

  const ChartCard = ({ label, value, color }: { label: string; value: string | number; color: string }) => {
    const chartData = Array.from({ length: 5 }, (_, i) => ({
      name: String(i + 1),
      value: typeof value === 'number' ? value / 5 : 0,
    }));

    return (
      <div className="bg-[#1A1625] p-4 rounded-lg border border-purple-500/20 h-32">
        <div className="text-sm text-gray-400 mb-2">{label}</div>
        <div className="text-xl text-white font-bold">{value}</div>
        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const DetailRow = ({ 
    label, 
    value, 
    valueClassName = "text-white" 
  }: { 
    label: string; 
    value: string | number; 
    valueClassName?: string 
  }) => (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#13111C] p-6">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-gray-400">
          {selectedOrder?.user?.username || "FBX39985773"}
        </div>
        <div className="relative">
          <select
            className="bg-[#1A1625] text-gray-300 px-4 py-2 rounded-lg text-sm"
            value={selectedOrder?._id || ''}
            onChange={handleOrderChange}
          >
            <option value="" disabled>Select Order</option>
            {orders.map((order) => (
              <option key={order._id} value={order._id}>
                 {formatOrderId(order._id)}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-[#1A1625] text-gray-300 px-4 py-2 rounded-lg text-sm">
          View Order Summary
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
          label="Account Size" 
          value={`$${selectedOrder?.accountSize || "0"}`} 
        />
        <StatCard 
          label="Account Status" 
          value={selectedOrder?.isActive ? "Active" : "Inactive"} 
          className={getStatusColor(selectedOrder?.isActive ?? false)} 
        />
        <StatCard 
          label="Win Rate" 
          value={`${selectedOrder?.tradingStats?.winRate || 0}%`} 
        />
        <StatCard 
          label="Loss Rate" 
          value={`${selectedOrder?.tradingStats?.lossRate || 0}%`} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ChartCard 
          label="Days Traded" 
          value={selectedOrder?.tradingStats?.totalTrades || 0} 
          color="#3B82F6" 
        />
        <ChartCard 
          label="Total Profit/Loss" 
          value={`$${selectedOrder?.tradingStats?.totalWinnings || 0}`} 
          color="#10B981" 
        />
        <ChartCard 
          label="Referral Bonus" 
          value="$0.00" 
          color="#6366F1" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Account Details */}
        <div className="bg-[#1A1625] p-6 rounded-lg border border-purple-500/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Account Details</h2>
            <span 
              className={`${getStatusBgColor(selectedOrder?.isActive ?? false)} 
                ${getStatusColor(selectedOrder?.isActive ?? false)} 
                px-3 py-1 rounded-md text-sm`}
            >
              {selectedOrder?.isActive ? "Active" : "Inactive"}
            </span>
          </div>
          
          <div className="space-y-3">
            <DetailRow 
              label="Login User Name" 
              value={'FX'+selectedOrder?.user?.username || "FBX39985773"} 
            />
            <DetailRow 
              label="Server" 
              value={selectedOrder?.accountDetails?.serverName || "LiteFinance-MT5-Demo"} 
            />
            <DetailRow 
              label="Account Type" 
              value={selectedOrder?.challengeType || "PHASE-2"} 
              valueClassName={getStatusColor(selectedOrder?.isActive ?? false)}
            />
            <DetailRow 
              label="Platform Type" 
              value={(selectedOrder?.platform || "mt5").toUpperCase()} 
            />
            <DetailRow 
              label="Platform Login" 
              value={'LOGIN_'+selectedOrder?.user?.username || "90072540"} 
            />
            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-400">Platform Password</span>
              <div className="flex items-center">
                <span className="text-white mr-2">
                  {showPassword ? ('PASS_'+selectedOrder?.user?.username || "defaultpass123") : "••••••••••"}
                </span>
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-white"
                >
                  👁
                </button>
              </div>
            </div>
            <DetailRow 
              label="Starting Balance" 
              value={`$${selectedOrder?.accountSize || "0"}`} 
            />
            <DetailRow 
              label="Current Balance" 
              value={`$${selectedOrder?.accountSize || "0"}`} 
            />
            <DetailRow 
              label="Profit Target" 
              value={`$${selectedOrder?.accountSize || "0"}`} 
            />
            <DetailRow 
              label="Order Date" 
              value={selectedOrder?.createdAt || new Date().toLocaleString()} 
            />
          </div>
        </div>

        {/* Trading Stats */}
        <div className="bg-[#1A1625] p-6 rounded-lg border border-purple-500/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Trading Stats</h2>
            <span 
              className={`${getStatusBgColor(selectedOrder?.isActive ?? false)} 
                ${getStatusColor(selectedOrder?.isActive ?? false)} 
                px-3 py-1 rounded-md text-sm`}
            >
              {selectedOrder?.isActive ? "Active" : "Inactive"}
            </span>
          </div>
          
          <div className="space-y-3">
            <DetailRow label="Total Trades" value={selectedOrder?.tradingStats?.totalTrades || 0} />
            <DetailRow label="Trades Won" value={selectedOrder?.tradingStats?.tradesWon || 0} />
            <DetailRow label="Trades Lost" value={selectedOrder?.tradingStats?.tradesLost || 0} />
            <DetailRow label="Win Rate" value={`${selectedOrder?.tradingStats?.winRate || 0}%`} />
            <DetailRow label="Loss Rate" value={`${selectedOrder?.tradingStats?.lossRate || 0}%`} />
            <DetailRow label="Total Winnings" value={`$${selectedOrder?.tradingStats?.totalWinnings || 0}`} />
            <DetailRow label="Total Losses" value={`$${selectedOrder?.tradingStats?.totalLosses || 0}`} />
            <DetailRow label="Profit Factor" value={selectedOrder?.tradingStats?.profitFactor || "N/A"} />
            <DetailRow label="Average Profit Per Trade" value={selectedOrder?.tradingStats?.avgProfitPerTrade || "N/A"} />
          </div>
        </div>

        {/* Current Equity Section */}
        <div className="lg:col-span-2 bg-[#1A1625] p-6 rounded-lg border border-purple-500/20">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-400">Current Equity</h2>
            <span className="text-2xl font-bold text-white">
              ${selectedOrder?.accountSize || 0}
            </span>
            <button className="text-gray-400 hover:text-white">
              📷
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;