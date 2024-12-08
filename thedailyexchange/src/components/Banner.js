import React, { useRef, useState } from 'react';
import '../styles/Banner.css';
import Ticker from './Ticker';
import PopupCard from './PopupCard';

/**
 * Banner component
 * @param label
 * @param data
 * @returns {Element}
 * @constructor
 */
function Banner({ label, data }) {
  const containerRef = useRef(null);
  const [popupData, setPopupData] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, right: 0 });

  const handleTickerClick = (event, tickerData) => {
    const rect = event.currentTarget.getBoundingClientRect(); // Get the bounding rect of the ticker button
    const popupWidth = 300; // Approximate width of the popup
    const popupHeight = 150; // Approximate height of the popup
  
    // Default positioning
    let top = rect.top + window.scrollY + rect.height + 5; // Position below the ticker
    let right = window.innerWidth - rect.right - 100; // Position relative to the right edge of the ticker
  
    // Adjust horizontal position to prevent overflow
    if (right < 0) {
      right = 10; // Ensure there's a minimum padding on the left
    } else if (right + popupWidth > window.innerWidth) {
      right = window.innerWidth - popupWidth - 10; // Adjust to fit within the right edge
    }
  
    // Adjust vertical position to prevent overflow
    if (top + popupHeight > window.innerHeight + window.scrollY) {
      top = rect.top + window.scrollY - popupHeight - 5; // Position above the ticker
    }
  
    // Update the state
    setPopupData(tickerData);
    setPopupPosition({ top, right });
  };
  
  
  
  
  

  const closePopup = () => {
    setPopupData(null);
  };

  return (
    <div className="banner" ref={containerRef}>
      <div className="banner-label">{label}</div>
      <div className="ticker-container">
        {data.map((tickerData, index) => (
          <div key={index} className="ticker-wrapper">
            <button
              className="ticker-button"
              onClick={(event) => handleTickerClick(event, tickerData)}
            >
              <Ticker
                name={tickerData.ticker}
                price={tickerData.price}
                changeAmount={tickerData.change_amount}
              />
            </button>
          </div>
        ))}
      </div>
      {popupData && (
        <div
          className="popup-container"
          style={{
            position: 'absolute',
            top: popupPosition.top,
            right: popupPosition.right,
          }}
        >
          <PopupCard tickerData={popupData} onClose={closePopup} />
        </div>
      )}
    </div>
  );
}

export default Banner;
