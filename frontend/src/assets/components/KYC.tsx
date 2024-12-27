import React, { useState } from 'react';

const KYC = () => {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="min-h-screen bg-[#13111C] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">KYC Status</h1>
        </div>

        {/* Status Card */}
        <div className="bg-[#1A1625] border border-purple-500/20 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium">Verification Status</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              isVerified 
                ? 'bg-green-500/20 text-green-400'
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {isVerified ? 'Verified' : 'Pending'}
            </span>
          </div>
          
          <div className="bg-[#13111C] rounded-lg p-4 mb-4">
            <p className="text-yellow-400 text-sm text-center">
              KYC verification will be available after successfully passing the challenge phase. Complete your challenge to unlock KYC submission.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isVerified ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'
              }`}>
                1
              </div>
              <span className="text-gray-400">Complete Challenge Phase</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 text-gray-400">
                2
              </div>
              <span className="text-gray-400">Submit KYC Documents</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 text-gray-400">
                3
              </div>
              <span className="text-gray-400">Verification Review</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isVerified}
        >
          Start KYC Process
        </button>
      </div>
    </div>
  );
};

export default KYC;