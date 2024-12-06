import React from 'react';
import '../styles/Navigation.css';

function Navigation({ data }) {
  return (
    <header className="navigation-header">
      <nav>
        <h1 className="navigation-title">The Daily Exchange</h1>
        <h3>Last Updated: {data}</h3>
      </nav>
    </header>
  );
}

export default Navigation;
