import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 24px',
      backgroundColor: isDark ? '#18181b' : '#f1f5f9',
      borderBottom: `1px solid ${isDark ? '#27272a' : '#e2e8f0'}`
    }}>
      <span style={{ fontWeight: '600', color: isDark ? '#fafafa' : '#0f172a' }}>EMS Portal</span>
      <button
        onClick={toggleTheme}
        style={{
          padding: '6px 14px',
          borderRadius: '6px',
          cursor: 'pointer',
          backgroundColor: isDark ? '#27272a' : '#ffffff',
          color: isDark ? '#f4f4f5' : '#09090b',
          border: '1px solid #71717a'
        }}
      >
        Switch to {isDark ? 'Light' : 'Dark'}
      </button>
    </nav>
  );
}

function MainArea() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div style={{
      minHeight: '260px',
      padding: '30px',
      backgroundColor: isDark ? '#09090b' : '#ffffff',
      color: isDark ? '#f4f4f5' : '#09090b',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <h2>Context-Based Theme Switcher</h2>
      <p>Active Layout Palette: <strong>{theme.toUpperCase()}</strong></p>
    </div>
  );
}

export default function Problem10() {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <MainArea />
      </div>
    </ThemeProvider>
  );
}