import React, { useState } from 'react';

const styles = {
  container: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  box: {
    maxWidth: '320px',
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  counterNumber: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#2563eb',
    margin: '16px 0'
  },
  btnGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center'
  },
  btnPrimary: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  btnDanger: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  }
};

export default function Problem2() {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h3 style={{ margin: 0, color: '#334155' }}>Employee Counter</h3>
        <div style={styles.counterNumber}>{count}</div>
        <div style={styles.btnGroup}>
          <button style={styles.btnPrimary} onClick={() => setCount(prev => prev + 1)}>
            + Add
          </button>
          <button style={styles.btnDanger} onClick={() => setCount(prev => (prev > 0 ? prev - 1 : 0))}>
            - Remove
          </button>
        </div>
      </div>
    </div>
  );
}