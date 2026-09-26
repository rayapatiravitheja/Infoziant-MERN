import React, { useState, useRef, useEffect } from 'react';

const styles = {
  container: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    maxWidth: '320px',
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  btn: {
    marginTop: '12px',
    backgroundColor: '#8b5cf6',
    color: '#ffffff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default function Problem8() {
  const [employeeName, setEmployeeName] = useState('John Doe');
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={{ margin: 0, color: '#0f172a' }}>{employeeName}</h3>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>
          Component Render Count: <strong>{renderCount.current}</strong>
        </p>
        <button
          style={styles.btn}
          onClick={() => setEmployeeName(employeeName === 'John Doe' ? 'Jane Smith' : 'John Doe')}
        >
          Toggle Name State
        </button>
      </div>
    </div>
  );
}