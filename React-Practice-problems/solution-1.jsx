import React from 'react';

const styles = {
  container: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  heading: {
    color: '#1e293b',
    fontSize: '22px',
    marginBottom: '16px'
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px'
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    width: '240px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
  },
  name: {
    margin: '0 0 10px 0',
    fontSize: '18px',
    color: '#0f172a'
  },
  text: {
    margin: '6px 0',
    fontSize: '14px',
    color: '#475569'
  },
  label: {
    fontWeight: '600',
    color: '#334155'
  }
};

function Employee({ name, id, role, department }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.text}><span style={styles.label}>ID:</span> {id}</p>
      <p style={styles.text}><span style={styles.label}>Role:</span> {role}</p>
      <p style={styles.text}><span style={styles.label}>Dept:</span> {department}</p>
    </div>
  );
}

export default function Problem1() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee Directory</h2>
      <div style={styles.grid}>
        <Employee name="Arun Kumar" id="EMP101" role="Frontend Developer" department="Engineering" />
        <Employee name="Sneha Rao" id="EMP102" role="HR Specialist" department="Human Resources" />
        <Employee name="Rahul Verma" id="EMP103" role="QA Analyst" department="Quality Assurance" />
      </div>
    </div>
  );
}