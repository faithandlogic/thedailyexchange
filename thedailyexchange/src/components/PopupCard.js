import React, { useEffect, useState } from 'react';
import '../styles/PopupCard.css';


function PopupCard({ tickerData, onClose }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const prompt = `Describe the company: ${tickerData.ticker}, Include the full company name, describe the company so someone can get a comprehensive understanding of the company's practices. Make sure it is 4 sentences or less.`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data from OpenAI API');
        }

        const data = await response.json();
        const completion = data.choices[0]?.message?.content || 'No description available.';
        setDescription(completion);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
  }, [tickerData.ticker]);

  return (
    <div className="popup-card">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>{tickerData.ticker}</h2>
      {loading && <p>Loading company description...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <p>{description}</p>}
    </div>
  );
}

export default PopupCard;
