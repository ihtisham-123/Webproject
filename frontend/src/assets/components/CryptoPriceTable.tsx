import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PriceData {
  symbol: string;
  bid: number;
  ask: number;
  change: number;
  status: 'loading' | 'error' | 'success';
}

interface BinanceTickerResponse {
  symbol: string;
  bidPrice: string;
  askPrice: string;
}

interface Binance24HResponse {
  symbol: string;
  priceChangePercent: string;
}

const CryptoPriceTable: React.FC = () => {
  const [prices, setPrices] = useState<PriceData[]>([
    { symbol: 'BTC/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
    { symbol: 'ETH/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
    { symbol: 'BNB/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
    { symbol: 'SOL/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
    { symbol: 'XRP/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
    { symbol: 'ADA/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
    { symbol: 'DOGE/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
    { symbol: 'DOT/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
    { symbol: 'MATIC/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
    { symbol: 'LINK/USDT', bid: 0, ask: 0, change: 0, status: 'loading' }
  ]);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let retryTimeout: NodeJS.Timeout | undefined;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    const fetchPrices = async (): Promise<void> => {
      try {
        setError(null);
        const symbols = [
          'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT',
          'ADAUSDT', 'DOGEUSDT', 'DOTUSDT', 'MATICUSDT', 'LINKUSDT'
        ];
        
        const fetchWithTimeout = async (url: string, timeout = 5000): Promise<Response> => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);
          
          try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            return response;
          } catch (error) {
            clearTimeout(timeoutId);
            throw error;
          }
        };

        const responses = await Promise.all(
          symbols.map(symbol =>
            fetchWithTimeout(`https://api.binance.com/api/v3/ticker/bookTicker?symbol=${symbol}`)
          )
        );
        
        const priceData = await Promise.all(responses.map(res => res.json())) as BinanceTickerResponse[];
        
        const changeResponse = await fetchWithTimeout('https://api.binance.com/api/v3/ticker/24hr');
        const changeData = await changeResponse.json() as Binance24HResponse[];

        if (isMounted) {
          setPrices(prev => prev.map((item, index) => {
            const symbol = symbols[index];
            const tickerData = priceData[index];
            const changeInfo = changeData.find(d => d.symbol === symbol);
            
            return {
              ...item,
              bid: parseFloat(tickerData.bidPrice),
              ask: parseFloat(tickerData.askPrice),
              change: changeInfo ? parseFloat(changeInfo.priceChangePercent) : 0,
              status: 'success'
            };
          }));
          setLastUpdateTime(new Date().toLocaleTimeString());
          retryCount = 0;
        }
      } catch (error) {
        console.error('Error fetching prices:', error);
        if (isMounted) {
          setError(error instanceof Error ? error.message : 'Unknown error');
          setPrices(prev => prev.map(item => ({ ...item, status: 'error' })));
          
          if (retryCount < MAX_RETRIES) {
            const backoffTime = Math.min(1000 * Math.pow(2, retryCount), 10000);
            retryTimeout = setTimeout(fetchPrices, backoffTime);
            retryCount++;
          }
        }
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  const formatPrice = (price: number): string => {
    if (price >= 1) {
      return price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else {
      return price.toLocaleString(undefined, {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#130929' }}>
        {error && (
          <div className="p-4 text-red-400 text-sm text-center border-b border-gray-700">
            {error}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-700">
                <th className="text-left p-4">Coin</th>
                <th className="text-right p-4">Selling</th>
                <th className="text-right p-4">Buying</th>
                <th className="text-right p-4">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((item, index) => (
                <tr 
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="p-4 text-white font-medium">{item.symbol}</td>
                  <td className="p-4 text-right">
                    {item.status === 'loading' ? (
                      <span className="text-gray-400">Loading...</span>
                    ) : item.status === 'error' ? (
                      <span className="text-red-400">Error</span>
                    ) : (
                      <span className="text-green-400">${formatPrice(item.ask)}</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {item.status === 'loading' ? (
                      <span className="text-gray-400">Loading...</span>
                    ) : item.status === 'error' ? (
                      <span className="text-red-400">Error</span>
                    ) : (
                      <span className="text-green-400">${formatPrice(item.bid)}</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {item.status === 'loading' ? (
                      <span className="text-gray-400">Loading...</span>
                    ) : item.status === 'error' ? (
                      <span className="text-red-400">Error</span>
                    ) : (
                      <div className={`flex items-center justify-end ${
                        item.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.change >= 0 ? (
                          <ArrowUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(item.change).toFixed(2)}%
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {lastUpdateTime && (
          <div className="p-2 text-right text-sm text-gray-400">
            Last updated: {lastUpdateTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoPriceTable;