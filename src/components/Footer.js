// Footer.js
import React from 'react';
import '../styles/Footer.css'; // Create a CSS file for styling if needed

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Darla Ward. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
