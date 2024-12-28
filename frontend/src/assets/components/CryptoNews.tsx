import React, { useState, useEffect, useRef } from 'react';
import { Clock, TrendingUp } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  published_on: number;
  imageurl: string;
  categories: string;
  url: string;
  source_info: {
    name: string;
  };
}

interface NewsApiResponse {
  Data: NewsItem[];
  Message: string;
  Type: number;
}

const CryptoNewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const newsPerPage = 5;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
        
        if (!response.ok) throw new Error('Failed to fetch news');
        
        const data: NewsApiResponse = await response.json();
        setNews(data.Data);
        setDisplayedNews(data.Data.slice(0, newsPerPage));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        const nextPage = page + 1;
        const startIndex = (nextPage - 1) * newsPerPage;
        const endIndex = startIndex + newsPerPage;
        
        if (startIndex < news.length) {
          setDisplayedNews(prev => [...prev, ...news.slice(startIndex, endIndex)]);
          setPage(nextPage);
        }
      }
    };

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [news, page]);

  const handleNewsClick = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto h-[600px] p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 text-red-500">
        Error loading news: {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="hover:text-black h-[600px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {displayedNews.map((item) => (
          <div 
            key={item.id} 
            onClick={() => handleNewsClick(item.url)}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 
                     transition-colors cursor-pointer hover:text-black shadow-sm hover:shadow-md"
          >
            <div className="flex items-start gap-4 hover:text-black">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(item.published_on * 1000).toLocaleString()}</span>
                  <TrendingUp className="w-4 h-4 ml-2" />
                  <span>{item.categories}</span>
                </div>
                <h3 className="hover:text-black font-medium text-white">{item.title}</h3>
                <p className="hover:text-black text-sm text-white mt-1">
                  {item.source_info?.name || 'Crypto News'}
                </p>
              </div>
              {item.imageurl && (
                <img 
                  src={item.imageurl} 
                  alt={item.title}
                  className="w-16 h-16 rounded object-cover"
                />
              )}
            </div>
          </div>
        ))}
        <div ref={containerRef} className="h-4" />
      </div>
    </div>
  );
};

export default CryptoNewsFeed;