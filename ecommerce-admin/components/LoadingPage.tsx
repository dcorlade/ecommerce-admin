import React from 'react';
import '@/css/LoadingPage.css';
const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;
