import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PricingOffer {
  phase: string;
  amount: number;
  price: number;
  originalPrice: number;
  features: string[];
}

const PricingCards: React.FC = () => {
  const [activePhase, setActivePhase] = useState("HFT Pro");

  const offers: PricingOffer[] = [
    {
      phase: "HFT Pro",
      amount: 1000,
      price: 12,
      originalPrice: 15,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
    {
      phase: "HFT Pro",
      amount: 3000,
      price: 34,
      originalPrice: 42.50,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
    {
      phase: "HFT Pro",
      amount: 5000,
      price: 48,
      originalPrice: 60,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
    {
      phase: "HFT Pro",
      amount: 10000,
      price: 88,
      originalPrice: 110,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },  {
      phase: "HFT Pro",
      amount: 25000,
      price: 188,
      originalPrice: 235,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },  {
      phase: "HFT Pro",
      amount: 50000,
      price: 115,
      originalPrice: 399,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },  {
      phase: "HFT Pro",
      amount: 100000,
      price: 209,
      originalPrice: 705,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },{
      phase: "HFT Pro",
      amount: 200000,
      price: 351,
      originalPrice: 1176,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },


    //--------------------------------------------------------------------------------------------------------------------------
    {
      phase: "Phase-1",
      amount: 1000,
      price: 6,
      originalPrice: 8,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
    {
      phase: "Phase-1",
      amount: 3000,
      price: 16,
      originalPrice: 20,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
    {
      phase: "Phase-1",
      amount: 5000,
      price: 21,
      originalPrice: 26.25,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
    {
      phase: "Phase-1",
      amount: 10000,
      price: 39,
      originalPrice: 49,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
    {
      phase: "Phase-1",
      amount: 25000,
      price: 74,
      originalPrice: 92,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
    {
      phase: "Phase-1",
      amount: 50000,
      price: 51,
      originalPrice: 172,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
    {
      phase: "Phase-1",
      amount: 100000,
      price: 95,
      originalPrice: 315,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
    {
      phase: "Phase-1",
      amount: 200000,
      price: 175,
      originalPrice: 589,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },

    //--------------------------------------------------------------------------------------------------------------------------    
    {
      phase: "Phase-2",
      amount: 1000,
      price: 5,
      originalPrice: 6.25,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    }, {
      phase: "Phase-2",
      amount: 3000,
      price: 11,
      originalPrice: 13.75,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    }, {
      phase: "Phase-2",
      amount: 5000,
      price: 19,
      originalPrice: 23.75,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    }, {
      phase: "Phase-2",
      amount: 10000,
      price: 34,
      originalPrice: 42.50,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    }, {
      phase: "Phase-2",
      amount: 25000,
      price: 84,
      originalPrice: 105,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    }, {
      phase: "Phase-2",
      amount: 50000,
      price: 41,
      originalPrice: 137.50,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    }, {
      phase: "Phase-2",
      amount: 100000,
      price: 69,
      originalPrice: 228,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
    {
      phase: "Phase-2",
      amount: 200000,
      price:122,
      originalPrice: 412,
      features: [
        "Profit Target: 08%",
        "Daily Drawdown: 05%",
        "Max Drawdown: 10%",
        "Drawdown Type: Static",
        "Profit Share after Passing: Upto 100%",
        "EA Trading: Allowed",
        "Min Trading Days: 01",
      ],
    },
  
  ];

  const navigate = useNavigate();
  const gotosignin = (url: string) => {
    navigate(url);
  };

  const phases = ["HFT Pro", "Phase-1", "Phase-2"];

  const calculateDiscount = (price: number, originalPrice: number) =>
    Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <>
      <div className="flex space-x-2 p-4 justify-center">
        {phases.map((phase) => (
          <button
            key={phase}
            onClick={() => setActivePhase(phase)}
            className={`py-2 font-bold px-4 rounded-lg text-white ${
              activePhase === phase
                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                : "bg-zinc-700 hover:bg-zinc-600"
            }`}
          >
            {phase}
          </button>
        ))}
      </div>

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {offers
            .filter((offer) => offer.phase === activePhase)
            .map((offer, index) => (
              <div
                key={`${offer.phase}-${offer.amount}-${index}`}
                className="w-full bg-gradient-to-br from-[#1E1646] to-[#310D42] border-2 border-purple-500 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-center text-white mb-4">
                    ${offer.amount}
                  </h2>
                  <p className="text-4xl text-center font-semibold mb-2">
                    {offer.price}
                    <span className="line-through text-red-400 ml-2 text-base">
                      ${offer.originalPrice}
                    </span>
                  </p>
                  <p className="text-blue-200 mb-4">
                    Save ${((offer.originalPrice - offer.price).toFixed(2))} (
                    {calculateDiscount(offer.price, offer.originalPrice)}% OFF)
                  </p>
                  <ul className="space-y-3 mb-6">
                    {offer.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-blue-100">
                        <span className="mr-3 text-green-400">✔</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      gotosignin('/Signin');
                    }}
                    className="w-full py-3 rounded-lg text-white font-bold bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started →
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PricingCards;