import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Vithi  IT Solutions. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="text-blue-400">Privacy Policy</a> | 
          <a href="/terms-of-service" className="text-blue-400"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
