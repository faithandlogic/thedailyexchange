import React from 'react';
import '../styles/PopupCard.css';

function PopupCard({ tickerData, onClose }) {
  return (
    <div className="popup-card">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>{tickerData.ticker}</h2>
      <p>Price: {tickerData.price}</p>
      <p>Change: {tickerData.change_amount}</p>
      <p>Volume: {tickerData.volume}</p>
    </div>
  );
}

export default PopupCard;
