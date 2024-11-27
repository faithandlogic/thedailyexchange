import React from 'react';
import '../styles/Banner.css';
import Ticker from './Ticker';

function Banner({ label, data }) {
  return (
    <div className="banner">
      <div className="banner-label">{label}</div>
      <div className="ticker-container">
        {data.map((tickerData, index) => (
          <Ticker
            key={index}
            name={tickerData.ticker}
            price={tickerData.price}
            changeAmount={tickerData.change_amount}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
