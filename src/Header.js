import React from 'react';
import './index.css';

function Header(props) {
  return (
    <header className="header">
      <div className="menu-icon">
        <button className="menu-button" onClick={props.onMenuClick}>
          <svg viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="12"></rect>
            <rect y="30" width="100" height="12"></rect>
            <rect y="60" width="100" height="12"></rect>
          </svg>
        </button>
      </div>
      <div className="logo">
        <h1>Lotion</h1>
        <p className="tagline">Like Notion, but Worse</p>
      </div>
    </header>
  );
}

export default Header;