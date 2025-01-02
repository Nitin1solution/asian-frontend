'use client'; // Required for React hooks in Next.js server components

import { useEffect } from 'react';

const RemoveActiveClass = () => {
  useEffect(() => {
    // Wait for the DOM to load
    const searchBox = document.querySelector('.main-header-search');
    if (searchBox && searchBox.classList.contains('active')) {
      searchBox.classList.remove('active');
    }
  }, []); // Runs only once after the component mounts

  return null; // No UI needed
};

export default RemoveActiveClass;
