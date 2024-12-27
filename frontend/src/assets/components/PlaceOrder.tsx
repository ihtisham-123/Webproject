import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios'; // Use axios directly

interface DecodedToken {
  id: string;
  username: string;
  email: string;
}

export default function PlaceOrder() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    challengeType: '',
    accountSize: '',
    platform: '',
    couponCode: '',
    transactionId: '',
    paymentProof: null as File | null,
  });

  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  const challengeTypes = [
    { value: 'standard', label: 'Standard Challenge', price: 100 },
    { value: 'aggressive', label: 'Aggressive Challenge', price: 150 },
    { value: 'expert', label: 'Expert Challenge', price: 200 },
  ];

  const accountSizes = [
    { value: '5k', label: '$5,000', price: 50 },
    { value: '10k', label: '$10,000', price: 100 },
    { value: '25k', label: '$25,000', price: 250 },
    { value: '50k', label: '$50,000', price: 500 },
  ];

  const platforms = [
    { value: 'mt4', label: 'MetaTrader 4' },
    { value: 'mt5', label: 'MetaTrader 5' },
    { value: 'ctrader', label: 'cTrader' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.id);
      setFormData((prev) => ({
        ...prev,
        username: decoded.username,
        email: decoded.email,
      }));
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === 'challengeType' || id === 'accountSize') {
      calculateTotal(
        id === 'challengeType' ? value : formData.challengeType,
        id === 'accountSize' ? value : formData.accountSize
      );
    }
  };

  const calculateTotal = (challengeType: string, accountSize: string) => {
    const challengePrice = challengeTypes.find((c) => c.value === challengeType)?.price || 0;
    const sizePrice = accountSizes.find((s) => s.value === accountSize)?.price || 0;
    setTotal(challengePrice + sizePrice);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      paymentProof: file,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
     const formDataToSend = {
      ...formData,
      total: total,
      userId: userId
    };

    const token = localStorage.getItem('token');
    console.log(formDataToSend);

    try {
      console.log(token);
      await axios.post('http://localhost:5000/api/orders/create',formDataToSend,{
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      });
      setMessage('Order placed successfully!');
      setError('');
      
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred.');
      }
      const errorMessage = error instanceof Error ? error.message : 'Please try again.';
      setError(`Failed to place order: ${errorMessage}`);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a103d] text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
          Pay with CoinPayments
        </button>

        <div className="text-center text-gray-400">
          or with <span className="font-semibold text-white">Binance</span>
        </div>

        <form onSubmit={handleSubmit} method='POST' className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Username*</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="ALPerera"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Email*</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="sarahhk123@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Challenge Type*</label>
            <select
              id="challengeType"
              value={formData.challengeType}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="" className="bg-[#1a103d]">Select Challenge</option>
              {challengeTypes.map(type => (
                <option key={type.value} value={type.value} className="bg-[#1a103d]">
                  {type.label} (${type.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Account Size*</label>
            <select
              id="accountSize"
              value={formData.accountSize}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="" className="bg-[#1a103d]">Select Size</option>
              {accountSizes.map(size => (
                <option key={size.value} value={size.value} className="bg-[#1a103d]">
                  {size.label} (${size.price})
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-gray-400 mb-1">Platform*</label>
            <select
              id="platform"
              value={formData.platform}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="" className="bg-[#1a103d]">Select Platform</option>
              {platforms.map(platform => (
                <option key={platform.value} value={platform.value} className="bg-[#1a103d]">
                  {platform.label}
                </option>
              ))}
            </select>
            {formData.platform && (
              <div className="absolute right-3 top-10 bg-yellow-500 text-black text-xs px-2 py-0.5 rounded">
                Silver ⚡ Member
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Coupon Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="couponCode"
                value={formData.couponCode}
                onChange={handleInputChange}
                className="flex-1 bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter coupon code"
              />
              <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg">
                Apply
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Your Transaction ID*</label>
            <input
              type="text"
              id="transactionId"
              value={formData.transactionId}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your Transaction Id"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">
              Payment Proof Image/screenshot (TxId must be Visible)
            </label>
            <input
              type="file"
              id="paymentProof"
              onChange={handleFileChange}
              className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4 border-t border-gray-600">
            <p className="text-gray-400 text-lg">
              Total: <span className="text-white font-bold">${total}</span>
            </p>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
            Place Order
          </button>
        </form>

        {message && <p className="text-green-500 text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}