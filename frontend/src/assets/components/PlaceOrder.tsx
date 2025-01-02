import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

interface DecodedToken {
  id: string;
  username: string;
  email: string;
}

interface FormData {
  username: string;
  email: string;
  challengeType: string;
  accountSize: string;
  platform: string;
  couponCode: string;
  transactionId: string;
  paymentProof: File | null;
}

interface AccountSizePricing {
  [key: string]: {
    [key: string]: number;
  };
}

interface PlatformSelectorProps {
  onPlatformChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onTransactionIdChange: (id: string) => void;
}

const PlatformSelector = ({ onPlatformChange, onTransactionIdChange }: PlatformSelectorProps) => {
  const [platform, setPlatform] = useState('');
  const [depositAddress, setDepositAddress] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const platforms = [
    { value: 'MT4', label: 'MT4' },
    { value: 'MT5', label: 'MT5' },
  ];

  const generateTransactionId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return 'TNX' + Array.from({ length: 20 }, () => 
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  };

  useEffect(() => {
    if (platform) {
      const newTransactionId = generateTransactionId();
      const newDepositAddress = `${platform}Q${newTransactionId}`;
      setDepositAddress(newDepositAddress);
      setTransactionId(newTransactionId);
      onTransactionIdChange(newTransactionId);
    }
  }, [platform]);


  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlatform(e.target.value);
    onPlatformChange(e);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-gray-400 mb-1">Platform*</label>
        <select
          id="platform"
          value={platform}
          onChange={handleChange}
          className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        >
          <option value="" className="bg-[#1a103d]">Select Platform</option>
          {platforms.map(p => (
            <option key={p.value} value={p.value} className="bg-[#1a103d]">
              {p.label}
            </option>
          ))}
        </select>
        {platform && (
          <div className="absolute right-3 top-10 bg-yellow-500 text-black text-xs px-2 py-0.5 rounded">
            Silver ⚡ Member
          </div>
        )}
      </div>

      {platform && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-center">
            <QRCodeSVG value={depositAddress} size={128} level="H" />
          </div>
          <div className="text-sm text-gray-400 text-center">
            <p>Deposit Account: {depositAddress}</p>
            <p className="mt-1">Transaction ID: {transactionId}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function PlaceOrder() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    challengeType: '',
    accountSize: '',
    platform: '',
    couponCode: '',
    transactionId: '',
    paymentProof: null
  });

  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  const challengeTypes = [
    { value: 'PHASE-1', label: 'PHASE-1' },
    { value: 'PHASE-2', label: 'PHASE-2' },
    { value: 'HFT-Pro', label: 'HFT Pro' },
  ];

  const accountSizePricing: AccountSizePricing = {
    'PHASE-1': {
      '1000': 12,
      '3000': 34,
      '5000': 48,
      '10000': 88,
      '25000': 188,
      '50000': 115,
      '100000': 209,
      '200000': 351
    },
    'PHASE-2': {
      '1000': 5,
      '3000': 11,
      '5000': 19,
      '10000': 34,
      '25000': 84,
      '50000': 41,
      '100000': 69,
      '200000': 122
    },
    'HFT-Pro': {
      '1000': 12,
      '3000': 34,
      '5000': 48,
      '10000': 88,
      '25000': 188,
      '50000': 115,
      '100000': 209,
      '200000': 351
    }
  };

  const getAccountSizes = () => [
    { value: '1000', label: '$1,000' },
    { value: '3000', label: '$3,000' },
    { value: '5000', label: '$5,000' },
    { value: '10000', label: '$10,000' },
    { value: '25000', label: '$25,000' },
    { value: '50000', label: '$50,000' },
    { value: '100000', label: '$100,000' },
    { value: '200000', label: '$200,000' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.id);
      setFormData(prev => ({
        ...prev,
        username: decoded.username,
        email: decoded.email,
      }));
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (id === 'challengeType' || id === 'accountSize') {
      const newChallengeType = id === 'challengeType' ? value : formData.challengeType;
      const newAccountSize = id === 'accountSize' ? value : formData.accountSize;
      
      if (newChallengeType && newAccountSize) {
        const price = accountSizePricing[newChallengeType]?.[newAccountSize] || 0;
        setTotal(price);
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      paymentProof: file
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

    try {
      await axios.post('http://localhost:5000/api/orders/create', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      });
      setMessage('Order placed successfully!');
      setError('');
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Please try again.';
      setError(`Failed to place order: ${errorMessage}`);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a103d] text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
          Pay with Binance
        </button>

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
              required
            >
              <option value="" className="bg-[#1a103d]">Select Challenge Type</option>
              {challengeTypes.map(type => (
                <option key={type.value} value={type.value} className="bg-[#1a103d]">
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Account Size*</label>
            <div className="relative">
              <select
                id="accountSize"
                value={formData.accountSize}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="" className="bg-[#1a103d]">Select Size</option>
                {getAccountSizes().map(size => (
                  <option key={size.value} value={size.value} className="bg-[#1a103d]">
                    {size.label}
                  </option>
                ))}
              </select>
              {formData.challengeType && formData.accountSize && (
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ${accountSizePricing[formData.challengeType]?.[formData.accountSize]}
                </div>
              )}
            </div>
            {formData.challengeType && (
              <div className="mt-2 space-y-1 text-sm text-gray-400">
                {getAccountSizes().map(size => (
                  <div key={size.value} className="flex justify-between">
                    <span>{size.label}</span>
                    <span>${accountSizePricing[formData.challengeType]?.[size.value]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <PlatformSelector 
            onPlatformChange={handleInputChange}
            onTransactionIdChange={(id) => setFormData(prev => ({ ...prev, transactionId: id }))}
          />

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