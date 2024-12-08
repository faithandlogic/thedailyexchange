import React from 'react';
import '../styles/Banner.css';
import Ticker from './Ticker';

/**
 * Banner component
 * @param label
 * @param data
 * @returns {Element}
 * @constructor
 */
function Banner({ label, data }) {
  return (
    <div className="banner">
      <div className="banner-label">{label}</div>
      <div className="ticker-container">
        {/* Displaying the list of tickers */}
        {data?.map((tickerData, index) => (
          // The Ticker component used to display each ticker in the banner
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
