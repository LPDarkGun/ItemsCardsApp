import React from 'react';

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <button onClick={() => setIsDarkMode(!isDarkMode)} className="btn btn-primary">
      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

export default DarkModeToggle;
