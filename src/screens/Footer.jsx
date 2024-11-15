import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <a href="#documentation">Documentation</a>
        <span className="footer-separator">|</span>
        <a href="#linkedin">LinkedIn</a>
        <span className="footer-separator">|</span>
        <a href="#faq">FAQ</a>
      </div>
      <div className="footer-version">
        <p>v2.1.0 Last updated: Oct 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
