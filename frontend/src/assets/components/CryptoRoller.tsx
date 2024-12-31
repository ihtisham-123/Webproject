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
  
  import React, { useState, useEffect } from 'react';
  import { ArrowUp, ArrowDown } from 'lucide-react';
  
  const CryptoRoller: React.FC = () => {
    const [prices, setPrices] = useState<PriceData[]>([
      { symbol: 'BTC/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
      { symbol: 'ETH/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
      { symbol: 'BNB/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
      { symbol: 'SOL/USDT', bid: 0, ask: 0, change: 0, status: 'loading' },
      { symbol: 'XRP/USDT', bid: 0, ask: 0, change: 0, status: 'loading' }
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
          const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT'];
          
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
          
          responses.forEach(response => {
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
          });
  
          const priceData = await Promise.all(responses.map(res => res.json())) as BinanceTickerResponse[];
          
          const changeResponse = await fetchWithTimeout('https://api.binance.com/api/v3/ticker/24hr');
          if (!changeResponse.ok) throw new Error(`API Error: ${changeResponse.status}`);
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
      <a href="https://www.tradingview.com/" className="block">
        <div className="w-full overflow-hidden cursor-pointer" style={{ backgroundColor: '#130929' }}>
          {error && (
            <div className="mb-4 text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          <div className="relative">
            <div className="flex animate-scroll-rtl whitespace-nowrap py-3">
              {[...prices, ...prices].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center px-6 min-w-max"
                  style={{ backgroundColor: '#191038' }}
                >
                  <span className="font-bold text-white mr-4">{item.symbol}</span>
                  {item.status === 'loading' ? (
                    <span className="text-gray-400 text-sm">Loading...</span>
                  ) : item.status === 'error' ? (
                    <span className="text-red-400 text-sm">Failed to load</span>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <span className="text-green-400">${formatPrice(item.ask)}</span>
                      <span className={`flex items-center ${
                        item.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.change >= 0 ? (
                          <ArrowUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(item.change).toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </a>
    );
  };
  
  export default CryptoRoller