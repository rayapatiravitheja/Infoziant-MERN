import React, { useRef, useEffect } from 'react';

const styles = {
  container: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  form: {
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px'
  },
  btn: {
    backgroundColor: '#475569',
    color: '#ffffff',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  }
};

export default function Problem7() {
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#0f172a' }}>Auto-Focus Input Form</h2>
      <div style={styles.form}>
        <input ref={nameInputRef} style={styles.input} placeholder="Employee Name (Auto Focused)" />
        <input style={styles.input} placeholder="Work Email" />
        <input style={styles.input} placeholder="Job Title" />
        <button style={styles.btn} onClick={() => nameInputRef.current?.focus()}>
          Re-focus Name Input
        </button>
      </div>
    </div>
  );
}