import React, { useState } from 'react';

const styles = {
  container: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  searchInput: {
    width: '320px',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    marginBottom: '16px'
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    maxWidth: '320px'
  },
  listItem: {
    padding: '10px 14px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '14px',
    color: '#334155'
  }
};

export default function Problem5() {
  const [employees] = useState([
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "David Williams" },
    { id: 5, name: "Emma Watson" }
  ]);
  const [search, setSearch] = useState('');

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#0f172a' }}>Employee Directory Search</h2>
      <input
        style={styles.searchInput}
        placeholder="Search employee by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul style={styles.list}>
        {filtered.length > 0 ? (
          filtered.map(emp => (
            <li key={emp.id} style={styles.listItem}>{emp.name}</li>
          ))
        ) : (
          <li style={{ ...styles.listItem, color: '#94a3b8' }}>No employees matched</li>
        )}
      </ul>
    </div>
  );
}