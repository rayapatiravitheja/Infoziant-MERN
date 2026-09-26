import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  panel: {
    maxWidth: '340px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  statusBadge: (isActive) => ({
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    backgroundColor: isActive ? '#dcfce7' : '#fee2e2',
    color: isActive ? '#15803d' : '#b91c1c',
    marginBottom: '12px'
  }),
  timer: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '10px 0 16px 0'
  },
  button: (isActive) => ({
    width: '100%',
    padding: '10px',
    backgroundColor: isActive ? '#ef4444' : '#10b981',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  })
};

export default function Problem6() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <div style={styles.statusBadge(isActive)}>
          {isActive ? '● Online & Active' : '○ Offline'}
        </div>
        <div style={styles.timer}>{seconds} seconds</div>
        <button style={styles.button(isActive)} onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Pause Activity' : 'Start Working'}
        </button>
      </div>
    </div>
  );
}