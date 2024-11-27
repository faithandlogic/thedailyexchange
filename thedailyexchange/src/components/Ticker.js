import React from 'react';
import '../styles/Ticker.css';

function Ticker({ name, price, changeAmount }) {
  return (
    <div className="ticker">
      <div className="ticker-name">{name}</div>
      <div className="ticker-price">${price}</div>
      <div
        className={`ticker-change ${
          parseFloat(changeAmount) > 0 ? 'positive' : 'negative'
        }`}
      >
        {changeAmount > 0 ? `+${changeAmount}` : changeAmount}
      </div>
    </div>
  );
}

export default Ticker;
