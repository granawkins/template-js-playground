import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} American Bison Educational Website</p>
        <div className="footer-links">
          <p>
            Images courtesy of public domain sources. Information compiled from
            various wildlife conservation organizations.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
