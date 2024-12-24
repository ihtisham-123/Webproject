import React, { useState } from "react";

interface NewsItem {
  time: string;
  title: string;
}

const MarketNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([
    { time: "2 hours ago", title: "Bitcoin reaches $50,000 milestone!" },
    { time: "Yesterday", title: "Global markets rally as tech stocks soar" },
    { time: "Yesterday", title: "Global markets rally as tech stocks soar" },
]);

  const addNews = () => {
    // Add a new news item
    const newNews: NewsItem = {
      time: "Just now",
      title: "New Breaking News: React simplifies development!",
    };
    setNews([...news, newNews]);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
      <h2 style={{ color: "#333", fontSize: "20px", marginBottom: "10px" }}>Latest News</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {news.map((item, index) => (
          <li
            key={index}
            style={{
              backgroundColor: "#fff",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <small style={{ color: "#888" }}>{item.time}</small>
            <h3 style={{ margin: "5px 0", fontSize: "16px", color: "#333" }}>{item.title}</h3>
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default MarketNews;
