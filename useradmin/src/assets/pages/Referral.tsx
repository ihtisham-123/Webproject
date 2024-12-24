import React, { useState } from 'react';

function Referral() {
  function generateReferralCode(length = 4) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referralCode = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters[randomIndex];
    }
    return referralCode;
  }

  const initialCode = generateReferralCode();
  const [referralCode, setReferralCode] = useState(initialCode);

  const handleGenerateCode = () => {
    const newCode = generateReferralCode();
    setReferralCode(newCode);
  };

  return (
    <div className="bg-background text-foreground p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Referral Program</h1>
      <p className="mb-4">Share your referral link and earn instant bonuses!</p>
      <div className="flex items-center mb-6">
        <input
          type="text"
        //   value={https://example.com/refer/${referralCode}}
          className="border border-border rounded-l-lg p-2 w-full"
          readOnly
        />
        <button
          className="bg-primary text-primary-foreground rounded-r-lg p-2 hover:bg-primary/80"
          onClick={handleGenerateCode}
        >
          Generate New Code
        </button>
      </div>
      <ul>
        {/* Add referral program details */}
      </ul>
    </div>
  );
}

export default Referral;