import "./styles/App.css";
import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Banner from "./components/Banner";
import Article from "./components/Article";
import Archive from "./components/Archive";
import { config } from "./config/config";
import { v4 as uuid } from "uuid";
import ArticleForm from "./components/ArticleForm";


function App() {
  // state to store stock data
  const [stockData, setStockData] = useState({
    last_updated: "",
    top_gainers: [],
    top_losers: [],
    most_actively_traded: [],
  });

  // state to store saved articles
  const [savedArticles, setSavedArticles] = useState(() => {
    const saved = localStorage.getItem("articles");
    return saved ? JSON.parse(saved) : [];
  });

  // state to store article title and content
  const [articleTitle, setArticleTitle] = useState("Today's Article Title");
  const [articleContent, setArticleContent] = useState("Loading...");

  // state to check if article is generating(loading) or not
  const [isArticleGenerated, setIsArticleGenerated] = useState(false);

  // state to store selected article for editing
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Function to fetch stock data from API
  const fetchStockData = async () => {
    const lastFetched = localStorage.getItem("lastFetched");
    const now = Date.now();

    // Only fetch new data if more than 24 hours have passed
    if (lastFetched && now - parseInt(lastFetched) < 24 * 60 * 60 * 1000) {
      const cachedData = localStorage.getItem("stockData");
      if (cachedData) {
        setStockData(JSON.parse(cachedData));
      }
      return;
    }

    try {
      const response = await fetch(API_URL);
      console.log("API_URL", config.API_URL);
      console.log("response", response);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Save data locally for reuse
      localStorage.setItem("stockData", JSON.stringify(data));
      localStorage.setItem("lastFetched", now.toString());

      setStockData({
        last_updated: data.last_updated,
        top_gainers: data.top_gainers,
        top_losers: data.top_losers,
        most_actively_traded: data.most_actively_traded,
      });
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  // Function to generate article from stock data using OpenAI API
  const generateArticle = async () => {
    if (isArticleGenerated) return;

    try {
      let prompt = `Based on the stock data provided, write a comprehensive, engaging, and easy-to-understand financial article from a market analyst perspecitve. Highlight key market events and insights from the data, explain with detail notable stock movements, and analyze their causes, impacts, and implications for investors. For each stock, briefly describe the company, its industry, and relevant economic or sectoral context. Discuss whether performance aligns with or diverges from industry trends and incorporate historical and socio-economic insights where applicable.

      Organize the article with clear headers and sections: 
      1. **Introduction**: Provide market overview, highlighting key trends, standout stocks, and general sentiment (e.g., bullish or bearish). 
      2. **Top Gainers**: Talk about gainers, describe each company, and analyze reasons for their performance (e.g., earnings, product launches, or macroeconomic factors)
      3. **Top Losers**: Focus on major decliners, offering company overviews and potential reasons for the drop (e.g., earnings misses, news, or economic challenges)
      4. **Most Actively Traded Stocks**: Highlight stocks with highest trading volumes, explaining interest and trends
      5. **Implications for Investors**: Summarize what trends mean for average investors, offering lessons, strategies.
      6. **Conclusion**: Provide a forward-looking perspective on key events or market factors to watch, with thoughtful commentary on potential future trends.
      
      Write ~1,200 words, using a professional and accessible tone for novice investors. Avoid jargon unless clearly explained. Make sure that the article is in markdown. Make sure the tone is not boring and cliche information is avoided.`;

      stockData.top_gainers.slice(0, 3).forEach((stock) => {
        prompt += `
          Gainer: ${stock?.ticker}, 
          Price: ${stock?.price}, 
          Change: ${stock?.change_amount}, 
          Volume: ${stock?.volume}.
        `;
      });

      stockData.top_losers.slice(0, 3).forEach((stock) => {
        prompt += `
          Loser: ${stock?.ticker}, 
          Price: ${stock?.price}, 
          Change: ${stock?.change_amount}, 
          Volume: ${stock?.volume}.
        `;
      });

      stockData.most_actively_traded.slice(0, 3).forEach((stock) => {
        prompt += `
          Most Traded: ${stock?.ticker}, 
          Price: ${stock?.price}, 
          Change: ${stock?.change_amount}, 
          Volume: ${stock?.volume}.
        `;
      });

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo", // Updated to use GPT-4
            messages: [{ role: "user", content: prompt }],
          })
        });

      const result = await response.json();

      if (result.choices && result.choices.length > 0) {
        const generatedArticle = result.choices[0].message.content;
        setArticleContent(generatedArticle);
        setIsArticleGenerated(true);

        // Generate the article title based on the content
        generateArticleTitle(generatedArticle);
      } else {
        setArticleContent("No response from AI model.");
      }
    } catch (error) {
      console.error("Failed to generate article", error);
      setArticleContent("Failed to generate article.");
    }
  };

  const generateArticleTitle = async (article) => {
    try {
      const prompt = `Generate a 6 word or less title for the following article content. Return only the title and nothing else. DO NOT ADD quotation marks.

      Article Content:
      ${article}`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4", // Updated to use GPT-4
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const result = await response.json();

      if (result.choices && result.choices.length > 0) {
        const title = result.choices[0].message.content.trim();
        setArticleTitle(title);
      } else {
        setArticleTitle("Untitled Article");
      }
    } catch (error) {
      console.error("Failed to generate article title", error);
      setArticleTitle("Untitled Article");
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  // Generate article when stock data is fetched
  useEffect(() => {
    if (!isArticleGenerated) {
      generateArticle();
    }
  }, [stockData, isArticleGenerated]);

  // Function to save article to archive
  const saveArticle = () => {
    const newArticle = {
      id: uuid(),
      title: articleTitle,
      content: articleContent,
      date: new Date().toLocaleDateString(),
    };

    const updatedArticles = [...savedArticles, newArticle];
    setSavedArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
  };

  // Function to clear all articles from archive
  const clearArticles = () => {
    setSelectedArticle(null);
    setSavedArticles([]);
    localStorage.removeItem("articles");
  };

  const deleteArticle = (id) => {
    const updatedArticles = savedArticles.filter((article) => article.id !== id);
    setSavedArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  };

  const setArticleFromArchive = (article) => {
    setArticleTitle(article.title);
    setArticleContent(article.content);
  };

  return (
    <div className="App">
      {/* Navigation bar showing navigation title and last updated */}
      <Navigation data={stockData.last_updated} />
      {/* Banner component displaying gainers */}
      <Banner label="Gainers" data={stockData.top_gainers} />
      {/* Banner component displaying losers */}
      <Banner label="Losers" data={stockData.top_losers} />
      {/* Banner component displaying most traded */}
      <Banner label="Most Traded" data={stockData.most_actively_traded} />
      {/* Article component displaying current generated article */}
      <Article title={articleTitle} content={articleContent} />
      {/* Archive component displaying saved articles */}
      <Archive
        articles={savedArticles}
        saveArticle={saveArticle}
        clearArticles={clearArticles}
        setArticleContent={setArticleContent}
        setArticleFromArchive={setArticleFromArchive}
        deleteArticle={deleteArticle}
      />
      {/* ArticleForm component for editing saved articles */}
      {selectedArticle && (
        <ArticleForm
          savedArticles={savedArticles}
          setSavedArticles={setSavedArticles}
          article={selectedArticle}
        />
      )}
    </div>
  );
}

export default App;