import './styles/App.css';
import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Banner from './components/Banner';
import Article from './components/Article';
import Archive from './components/Archive';

const OPENAI_API_KEY = ""

function App() {
  const [stockData, setStockData] = useState({
    top_gainers: [],
    top_losers: [],
    most_actively_traded: [],
  });

  const [savedArticles, setSavedArticles] = useState(() => {
    const saved = localStorage.getItem('articles');
    return saved ? JSON.parse(saved) : [];
  });

  const [articleTitle, setArticleTitle] = useState("Today's Article Title");
  const [articleContent, setArticleContent] = useState("Loading...");
  const [isArticleGenerated, setIsArticleGenerated] = useState(false); // New flag to track success

  const fetchStockData = async () => {
    try {
      const mockResponse = `

      {
        "metadata": "Top gainers, losers, and most actively traded US tickers",
        "last_updated": "2024-11-26 16:15:58 US/Eastern",
        "top_gainers": [
          {
            "ticker": "PGHL",
            "price": "107.36",
            "change_amount": "96.82",
            "change_percentage": "918.5958%",
            "volume": "1314723"
          },
          {
            "ticker": "PSTX",
            "price": "9.38",
            "change_amount": "6.52",
            "change_percentage": "227.972%",
            "volume": "30080824"
          },
          {
            "ticker": "IMG",
            "price": "1.6",
            "change_amount": "0.97",
            "change_percentage": "153.9683%",
            "volume": "112012595"
          },
          {
            "ticker": "MDAIW",
            "price": "0.34",
            "change_amount": "0.2012",
            "change_percentage": "144.9568%",
            "volume": "1460789"
          },
          {
            "ticker": "IDAI",
            "price": "0.365",
            "change_amount": "0.185",
            "change_percentage": "102.7778%",
            "volume": "547264245"
          },
          {
            "ticker": "APLMW",
            "price": "0.03",
            "change_amount": "0.0148",
            "change_percentage": "97.3684%",
            "volume": "698152"
          },
          {
            "ticker": "COOTW",
            "price": "0.0276",
            "change_amount": "0.0126",
            "change_percentage": "84.0%",
            "volume": "14173"
          },
          {
            "ticker": "TOYO",
            "price": "5.41",
            "change_amount": "2.43",
            "change_percentage": "81.5436%",
            "volume": "48903459"
          },
          {
            "ticker": "PDYN",
            "price": "7.21",
            "change_amount": "2.8",
            "change_percentage": "63.4921%",
            "volume": "39172257"
          },
          {
            "ticker": "OPTT",
            "price": "0.2877",
            "change_amount": "0.1087",
            "change_percentage": "60.7263%",
            "volume": "249005597"
          },
          {
            "ticker": "ZENA",
            "price": "10.3",
            "change_amount": "3.88",
            "change_percentage": "60.4361%",
            "volume": "79677124"
          },
          {
            "ticker": "BLACW",
            "price": "0.0379",
            "change_amount": "0.0137",
            "change_percentage": "56.6116%",
            "volume": "6217"
          },
          {
            "ticker": "BSFC",
            "price": "0.37",
            "change_amount": "0.131",
            "change_percentage": "54.8117%",
            "volume": "64773349"
          },
          {
            "ticker": "PDYNW",
            "price": "0.2734",
            "change_amount": "0.0914",
            "change_percentage": "50.2198%",
            "volume": "888468"
          },
          {
            "ticker": "MSAIW",
            "price": "0.0387",
            "change_amount": "0.0129",
            "change_percentage": "50.0%",
            "volume": "100"
          },
          {
            "ticker": "CDIOW",
            "price": "0.0371",
            "change_amount": "0.012",
            "change_percentage": "47.8088%",
            "volume": "220"
          },
          {
            "ticker": "SRZNW",
            "price": "0.0147",
            "change_amount": "0.0047",
            "change_percentage": "47.0%",
            "volume": "1100"
          },
          {
            "ticker": "NXLIW",
            "price": "0.6024",
            "change_amount": "0.1879",
            "change_percentage": "45.3317%",
            "volume": "6903"
          },
          {
            "ticker": "HSAI",
            "price": "6.86",
            "change_amount": "2.11",
            "change_percentage": "44.4211%",
            "volume": "36287952"
          },
          {
            "ticker": "CAPTW",
            "price": "0.0289",
            "change_amount": "0.0087",
            "change_percentage": "43.0693%",
            "volume": "100"
          }
        ],
        "top_losers": [
          {
            "ticker": "GDEVW",
            "price": "0.015",
            "change_amount": "-0.015",
            "change_percentage": "-50.0%",
            "volume": "25100"
          },
          {
            "ticker": "CMAXW",
            "price": "0.0055",
            "change_amount": "-0.0045",
            "change_percentage": "-45.0%",
            "volume": "10080"
          },
          {
            "ticker": "FAASW",
            "price": "0.0757",
            "change_amount": "-0.049",
            "change_percentage": "-39.2943%",
            "volume": "11832"
          },
          {
            "ticker": "REVBW",
            "price": "0.0076",
            "change_amount": "-0.0048",
            "change_percentage": "-38.7097%",
            "volume": "50400"
          },
          {
            "ticker": "AP+",
            "price": "0.051",
            "change_amount": "-0.0303",
            "change_percentage": "-37.2694%",
            "volume": "62121"
          },
          {
            "ticker": "ALEC",
            "price": "2.57",
            "change_amount": "-1.39",
            "change_percentage": "-35.101%",
            "volume": "8100375"
          },
          {
            "ticker": "ABVE",
            "price": "0.535",
            "change_amount": "-0.279",
            "change_percentage": "-34.2752%",
            "volume": "1604012"
          },
          {
            "ticker": "LGCL",
            "price": "0.7611",
            "change_amount": "-0.3689",
            "change_percentage": "-32.646%",
            "volume": "2401663"
          },
          {
            "ticker": "ADD",
            "price": "4.19",
            "change_amount": "-1.96",
            "change_percentage": "-31.8699%",
            "volume": "195050"
          },
          {
            "ticker": "CPTNW",
            "price": "0.0075",
            "change_amount": "-0.0035",
            "change_percentage": "-31.8182%",
            "volume": "668744"
          },
          {
            "ticker": "LUCYW",
            "price": "0.0342",
            "change_amount": "-0.0156",
            "change_percentage": "-31.3253%",
            "volume": "250"
          },
          {
            "ticker": "LESL",
            "price": "2.45",
            "change_amount": "-1.06",
            "change_percentage": "-30.1994%",
            "volume": "24530348"
          },
          {
            "ticker": "HYAC+",
            "price": "0.1262",
            "change_amount": "-0.0539",
            "change_percentage": "-29.9278%",
            "volume": "2570"
          },
          {
            "ticker": "IROHR",
            "price": "0.2513",
            "change_amount": "-0.1064",
            "change_percentage": "-29.7456%",
            "volume": "7251"
          },
          {
            "ticker": "CCIXW",
            "price": "0.32",
            "change_amount": "-0.13",
            "change_percentage": "-28.8889%",
            "volume": "346"
          },
          {
            "ticker": "SINT",
            "price": "4.52",
            "change_amount": "-1.82",
            "change_percentage": "-28.7066%",
            "volume": "685715"
          },
          {
            "ticker": "CELUW",
            "price": "0.0157",
            "change_amount": "-0.0063",
            "change_percentage": "-28.6364%",
            "volume": "1601"
          },
          {
            "ticker": "XOSWW",
            "price": "0.005",
            "change_amount": "-0.002",
            "change_percentage": "-28.5714%",
            "volume": "727257"
          },
          {
            "ticker": "SKYQ",
            "price": "0.8303",
            "change_amount": "-0.3297",
            "change_percentage": "-28.4224%",
            "volume": "483783"
          },
          {
            "ticker": "ALSAW",
            "price": "0.0083",
            "change_amount": "-0.0032",
            "change_percentage": "-27.8261%",
            "volume": "4425"
          }
        ],
        "most_actively_traded": [
          {
            "ticker": "IDAI",
            "price": "0.365",
            "change_amount": "0.185",
            "change_percentage": "102.7778%",
            "volume": "547264245"
          },
          {
            "ticker": "MSTZ",
            "price": "1.28",
            "change_amount": "0.26",
            "change_percentage": "25.4902%",
            "volume": "520984694"
          },
          {
            "ticker": "ELAB",
            "price": "0.0125",
            "change_amount": "-0.0034",
            "change_percentage": "-21.3836%",
            "volume": "292565627"
          },
          {
            "ticker": "OPTT",
            "price": "0.2877",
            "change_amount": "0.1087",
            "change_percentage": "60.7263%",
            "volume": "249005597"
          },
          {
            "ticker": "NVDA",
            "price": "136.92",
            "change_amount": "0.9",
            "change_percentage": "0.6617%",
            "volume": "187121896"
          },
          {
            "ticker": "FOXO",
            "price": "0.5194",
            "change_amount": "0.1335",
            "change_percentage": "34.5945%",
            "volume": "133440994"
          },
          {
            "ticker": "RGTI",
            "price": "2.2",
            "change_amount": "-0.55",
            "change_percentage": "-20.0%",
            "volume": "124948458"
          },
          {
            "ticker": "KULR",
            "price": "0.7736",
            "change_amount": "-0.0164",
            "change_percentage": "-2.0759%",
            "volume": "114604613"
          },
          {
            "ticker": "IMG",
            "price": "1.6",
            "change_amount": "0.97",
            "change_percentage": "153.9683%",
            "volume": "112012595"
          },
          {
            "ticker": "SMCI",
            "price": "34.4151",
            "change_amount": "-3.9949",
            "change_percentage": "-10.4007%",
            "volume": "93360864"
          },
          {
            "ticker": "MARA",
            "price": "24.97",
            "change_amount": "-1.45",
            "change_percentage": "-5.4883%",
            "volume": "89426449"
          },
          {
            "ticker": "VSEE",
            "price": "2.03",
            "change_amount": "0.31",
            "change_percentage": "18.0233%",
            "volume": "87516141"
          },
          {
            "ticker": "RIVN",
            "price": "11.55",
            "change_amount": "-0.05",
            "change_percentage": "-0.431%",
            "volume": "80234288"
          },
          {
            "ticker": "ZENA",
            "price": "10.3",
            "change_amount": "3.88",
            "change_percentage": "60.4361%",
            "volume": "79677124"
          },
          {
            "ticker": "SOXL",
            "price": "28.12",
            "change_amount": "-1.21",
            "change_percentage": "-4.1255%",
            "volume": "72142484"
          },
          {
            "ticker": "NIO",
            "price": "4.325",
            "change_amount": "-0.345",
            "change_percentage": "-7.3876%",
            "volume": "70107580"
          },
          {
            "ticker": "INTC",
            "price": "24.05",
            "change_amount": "-0.82",
            "change_percentage": "-3.2971%",
            "volume": "65941922"
          },
          {
            "ticker": "BSFC",
            "price": "0.37",
            "change_amount": "0.131",
            "change_percentage": "54.8117%",
            "volume": "64773349"
          },
          {
            "ticker": "IBIT",
            "price": "51.7",
            "change_amount": "-2.32",
            "change_percentage": "-4.2947%",
            "volume": "64731636"
          },
          {
            "ticker": "TSLA",
            "price": "338.23",
            "change_amount": "-0.36",
            "change_percentage": "-0.1063%",
            "volume": "61133620"
          }
        ]
      }
      `;
      const data = JSON.parse(mockResponse);

      setStockData({
        top_gainers: data.top_gainers,
        top_losers: data.top_losers,
        most_actively_traded: data.most_actively_traded,
      });
    } catch (error) {
      console.error('Error parsing mock data:', error);
    }
  };

  const generateArticle = async () => {
    if (isArticleGenerated) return; // Stop further requests if already successful

    try {
      let prompt = `Based on the stock data provided, write a comprehensive, engaging, and easy-to-understand financial article as a market analyst. Highlight key market events, explain notable stock movements, and analyze their causes, impacts, and implications for investors. For each stock, briefly describe the company, its industry, and relevant economic or sectoral context. Discuss whether performance aligns with or diverges from industry trends and incorporate historical and socio-economic insights where applicable. 

      Organize the article with clear headers and sections: 
      1. **Introduction**: Provide a broad market overview, highlighting key trends, standout stocks, and general sentiment (e.g., bullish or bearish). 
      2. **Top Gainers**: Talk about the gainers, describe each company, and analyze reasons for their performance (e.g., earnings, product launches, or macroeconomic factors)
      3. **Top Losers**: Focus on major decliners, offering company overviews and potential reasons for the drop (e.g., earnings misses, news, or economic challenges)
      4. **Most Actively Traded Stocks**: Highlight stocks with the highest trading volumes, explaining interest and trends
      5. **Implications for Investors**: Summarize what these trends mean for average investors, offering lessons, strategies.
      6. **Conclusion**: Provide a forward-looking perspective on key events or market factors to watch, with thoughtful commentary on potential future trends.
      
      Write the article in ~1,200 words, using a professional yet accessible tone for novice investors. Avoid jargon unless clearly explained. Make sure that the article is in markdown.`;
      
      stockData.top_gainers.slice(0, 3).forEach((stock) => {
        prompt += `
          Gainer: ${stock.ticker}, 
          Price: ${stock.price}, 
          Change: ${stock.change_amount}, 
          Volume: ${stock.volume}.
        `;
      });

      stockData.top_losers.slice(0, 3).forEach((stock) => {
        prompt += `
          Loser: ${stock.ticker}, 
          Price: ${stock.price}, 
          Change: ${stock.change_amount}, 
          Volume: ${stock.volume}.
        `;
      });

      stockData.most_actively_traded.slice(0, 3).forEach((stock) => {
        prompt += `
          Most Traded: ${stock.ticker}, 
          Price: ${stock.price}, 
          Change: ${stock.change_amount}, 
          Volume: ${stock.volume}.
        `;
      });

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const result = await response.json();

      if (result.choices && result.choices.length > 0) {
        setArticleContent(result.choices[0].message.content);
        setIsArticleGenerated(true); // Mark as successful
      } else {
        setArticleContent("No response from AI model.");
      }
    } catch (error) {
      console.error("Failed to generate article", error);
      setArticleContent("Failed to generate article.");
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
    if (!isArticleGenerated) {
      generateArticle(); // Generate article only if not already successful
    }
  }, [stockData, isArticleGenerated]);

  const saveArticle = () => {
    const newArticle = {
      id: savedArticles.length + 1,
      title: articleTitle,
      content: articleContent,
      date: new Date().toLocaleDateString(),
    };

    const updatedArticles = [...savedArticles, newArticle];
    setSavedArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  };

  const clearArticles = () => {
    setSavedArticles([]);
    localStorage.removeItem('articles');
  };

  const setArticleFromArchive = (article) => {
    setArticleTitle(article.title);
    setArticleContent(article.content);
  };

  return (
    <div className="App">
      <Navigation />
      <Banner label="Gainers" data={stockData.top_gainers} />
      <Banner label="Losers" data={stockData.top_losers} />
      <Banner label="Most Traded" data={stockData.most_actively_traded} />
      <Article title={articleTitle} content={articleContent} />
      <Archive
        articles={savedArticles}
        saveArticle={saveArticle}
        clearArticles={clearArticles}
        setArticleContent={setArticleContent}
        setArticleFromArchive={setArticleFromArchive}
      />
    </div>
  );
}

export default App;