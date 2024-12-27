import React, { useState } from 'react';

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const baseUrl = 'https://fundexbuffx.com/refer/';
  const referralLink = `${baseUrl}fbn7yB3`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#13111C] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Referral Program</h1>
          <p className="text-gray-400 mt-2">Share your referral link and earn instant bonuses!</p>
        </div>

        {/* Referral Link Section */}
        <div className="bg-[#1A1625] border border-purple-500/20 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 bg-[#13111C] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button
              onClick={copyToClipboard}
              className="p-3 bg-[#13111C] border border-purple-500/20 rounded-lg hover:bg-purple-500/10 transition-colors"
            >
              {copied ? (
                <span className="text-green-400">✓</span>
              ) : (
                <span className="text-white">📋</span>
              )}
            </button>
          </div>
        </div>

        {/* How it works section */}
        <div className="bg-[#1A1625] border border-purple-500/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">How it works:</h2>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3 text-gray-300">
              <span className="text-purple-400">•</span>
              <span>Share your unique referral link with friends and fellow traders.</span>
            </li>
            <li className="flex items-start space-x-3 text-gray-300">
              <span className="text-purple-400">•</span>
              <span>When someone signs up using your link and makes a purchase, you earn a bonus!</span>
            </li>
            <li className="flex items-start space-x-3 text-gray-300">
              <span className="text-purple-400">•</span>
              <span>You'll receive 15% of their order amount as a bonus.</span>
            </li>
            <li className="flex items-start space-x-3 text-gray-300">
              <span className="text-purple-400">•</span>
              <span>Your referral bonus is added to your account immediately after their successful purchase.</span>
            </li>
            <li className="flex items-start space-x-3 text-gray-300">
              <span className="text-purple-400">•</span>
              <span>Your referral bonus could be withdrawn on the basis of their deposit's confirmation by us.</span>
            </li>
            <li className="flex items-start space-x-3 text-gray-300">
              <span className="text-purple-400">•</span>
              <span>You can withdraw your bonus instantly - no waiting period!</span>
            </li>
          </ul>
          <p className="text-purple-400 mt-6 font-medium">Start sharing now and boost your earnings!</p>
        </div>
      </div>
    </div>
  );
};

export default Referral;