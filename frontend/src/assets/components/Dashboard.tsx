import  { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [showPassword, setShowPassword] = useState(false);

  const chartData = Array.from({ length: 5 }, (_, i) => ({
    name: String(i + 1),
    value: 1000
  }));

  const StatCard = ({ label, value, className = "" }:any) => (
    <div className="bg-[#1A1625] p-4 rounded-lg border border-purple-500/20">
      <div className="text-sm text-gray-400">{label}</div>
      <div className={`text-xl font-bold ${className || "text-white"}`}>{value}</div>
    </div>
  );

  const ChartCard = ({ label, value, color }:any) => (
    <div className="bg-[#1A1625] p-4 rounded-lg border border-purple-500/20 h-32">
      <div className="text-sm text-gray-400 mb-2">{label}</div>
      <div className="text-xl text-white font-bold">{value}</div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const DetailRow = ({ label, value, valueClassName = "text-white" }:any) => (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#13111C] p-6">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-gray-400">FBX39985773</div>
        <button className="bg-[#1A1625] text-gray-300 px-4 py-2 rounded-lg text-sm">
          View Order Summary
        </button>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Account Size" value="$1000.00" />
        <StatCard label="Account Status" value="Active" className="text-green-400" />
        <StatCard label="Win Rate" value="0" />
        <StatCard label="Loss Rate" value="0" />
      </div>

      {/* Middle Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ChartCard label="Days Traded" value="0" color="#3B82F6" />
        <ChartCard label="Total Profit/Loss" value="0" color="#10B981" />
        <ChartCard label="Referral Bonus" value="$0.00" color="#6366F1" />
      </div>

      {/* Main Chart */}
      <div className="bg-[#1A1625] p-4 rounded-lg border border-purple-500/20 mb-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Account Details */}
        <div className="bg-[#1A1625] p-6 rounded-lg border border-purple-500/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Account Details</h2>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-md text-sm">Active</span>
          </div>
          
          <div className="space-y-3">
            <DetailRow label="Login User Name" value="FBX39985773" />
            <DetailRow label="Server" value="LiteFinance-MT5-Demo" />
            <DetailRow label="Account Type" value="Challenge Phase-2" valueClassName="text-green-400" />
            <DetailRow label="Platform Type" value="MT5" />
            <DetailRow label="Platform Login" value="90072540" />
            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-400">Platform Password</span>
              <div className="flex items-center">
                <span className="text-white mr-2">
                  {showPassword ? "your-password" : "••••••••••"}
                </span>
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-white"
                >
                  👁️
                </button>
              </div>
            </div>
            <DetailRow label="Starting Balance" value="$1000.00" />
            <DetailRow label="Current Balance" value="$1000.00" />
            <DetailRow label="Profit Target" value="$100" />
            <DetailRow label="Order Date" value="12/15/2024, 12:36:39 AM" />
          </div>
        </div>

        {/* Trading Stats */}
        <div className="bg-[#1A1625] p-6 rounded-lg border border-purple-500/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Trading Stats</h2>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-md text-sm">Active</span>
          </div>
          
          <div className="space-y-3">
            <DetailRow label="Total Trades" value="0" />
            <DetailRow label="Trades Won" value="0" />
            <DetailRow label="Trades Loss" value="0" />
            <DetailRow label="Win Rate" value="50%" />
            <DetailRow label="Loss Rate" value="50%" />
            <DetailRow label="Total Winnings" value="$0.00" />
            <DetailRow label="Total Losses" value="$0.00" />
            <DetailRow label="Profit Factor" value="N/A" />
            <DetailRow label="Average Profit Per Trade" value="N/A" />
          </div>
        </div>

        {/* Current Equity Section */}
        <div className="lg:col-span-2 bg-[#1A1625] p-6 rounded-lg border border-purple-500/20">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-400">Current Equity</h2>
            <span className="text-2xl font-bold text-white">$1000.00</span>
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