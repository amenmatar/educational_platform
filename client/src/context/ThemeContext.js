import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    document.documentElement.style.background = darkMode ? '#0f172a' : '#f3f4f6';
    document.body.style.background = darkMode ? '#0f172a' : '#f3f4f6';
    document.body.style.color = darkMode ? '#e2e8f0' : '#1f2937';
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const value = { darkMode, toggleDarkMode: () => setDarkMode((v) => !v) };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
