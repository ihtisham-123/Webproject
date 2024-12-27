import { useState } from 'react';

const Withdraw = () => {
  const [kycVerified, setKycVerified] = useState(false);
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const handleSubmit = (e :any) => {
    e.preventDefault();
    if (!kycVerified) {
      alert('Please complete KYC verification first');
      return;
    }
    // Handle withdrawal logic here
  };

  return (
    <div className="min-h-screen bg-[#13111C] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Withdrawal</h1>
          <p className="text-gray-400 mt-2">
            Please complete your KYC verification to apply for withdrawal.
          </p>
        </div>

        {/* KYC Warning Card */}
        {!kycVerified && (
          <div className="bg-[#1A1625] border border-yellow-500/20 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-yellow-400 text-xl">⚠️</span>
              <p className="text-yellow-400">
                KYC verification is required before making any withdrawals. Please complete your verification first.
              </p>
            </div>
          </div>
        )}

        {/* Withdrawal Form */}
        <div className="bg-[#1A1625] border border-purple-500/20 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">
                Amount to Withdraw
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 bg-[#13111C] border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                disabled={!kycVerified}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">
                Wallet Address
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter your wallet address"
                className="w-full px-4 py-3 bg-[#13111C] border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                disabled={!kycVerified}
              />
            </div>

            <div className="space-y-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!kycVerified}
              >
                {kycVerified ? 'Withdraw' : 'Complete KYC to Withdraw'}
              </button>
            </div>
          </form>

          {/* Additional Information */}
          <div className="mt-6 space-y-3">
            <h3 className="text-white font-medium">Important Notes:</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <span className="text-purple-400">•</span>
                <span>Minimum withdrawal amount: 0.001 BTC</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <span className="text-purple-400">•</span>
                <span>Processing time: 24-48 hours</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <span className="text-purple-400">•</span>
                <span>Ensure your wallet address is correct before submission</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;