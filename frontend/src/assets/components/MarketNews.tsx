import React, { useState } from "react";

interface NewsItem {
  time: string;
  title: string;
  gradient: string;
}

const MarketNews: React.FC = () => {
  const [news] = useState<NewsItem[]>([
    {
      time: "10 hours ago",
      title: "Honda Stock Surges 12% on $7 Billion Share Buyback Plan, Looking to Hit Moon",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      time: "11 hours ago",
      title: "XAU/USD: Gold Set to Outshine S&P 500 in 2024 as Bullion Makes Roaring Comeback",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      time: "11 hours ago",
      title: "USD/JPY: Dollar Floats Well-Bid Near 6-Month High as Holiday Week Gets Underway",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      time: "11 hours ago",
      title: "DJC: Nasdaq Composite Jumps 1%, Fueling Hopes of Santa Rally in Holiday Week",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      time: "2 days ago",
      title: "BTC/USD: Bitcoin Wobbles Under Six Digits After Crawling Out of $41,000 Weekend Dip",
      gradient: "from-indigo-500 to-cyan-500"
    },
    {
      time: "2 days ago",
      title: "EUR/USD: Euro Seeks Higher Grounds After Fed-Fueled Dollar Selloff",
      gradient: "from-green-500 to-emerald-500"
    }
  ]);

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-semibold">Top Stories</h2>
          <div className="text-white opacity-50">TF</div>
        </div>

        <div className="space-y-4">
          {news.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-[#141937] rounded-lg hover:bg-[#1a1f37] transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <div className="text-sm text-gray-400 mb-1">{item.time}</div>
                <h3 className="text-white text-sm font-medium leading-snug">
                  {item.title}
                </h3>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} flex-shrink-0`}>
                <div className="w-full h-full backdrop-blur-sm rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketNews;