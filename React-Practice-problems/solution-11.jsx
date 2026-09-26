import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  container: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '16px',
    fontSize: '14px'
  },
  th: {
    backgroundColor: '#f1f5f9',
    color: '#1e293b',
    textAlign: 'left',
    padding: '10px 14px',
    borderBottom: '2px solid #cbd5e1'
  },
  td: {
    padding: '10px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#334155'
  }
};

export default function Problem11() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: '24px' }}>Fetching records from API...</p>;
  if (error) return <p style={{ padding: '24px', color: '#ef4444' }}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#0f172a' }}>Remote Personnel Data (Axios GET)</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Company</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td style={styles.td}>{emp.id}</td>
              <td style={styles.td}><strong>{emp.name}</strong></td>
              <td style={styles.td}>{emp.username}</td>
              <td style={styles.td}>{emp.email}</td>
              <td style={styles.td}>{emp.phone}</td>
              <td style={styles.td}>{emp.company?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}