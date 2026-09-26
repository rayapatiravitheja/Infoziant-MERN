import React, { useState } from 'react';

const styles = {
  container: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    padding: '14px 20px',
    backgroundColor: '#ffffff',
    borderLeft: '4px solid #3b82f6',
    borderTop: '1px solid #e2e8f0',
    borderRight: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0',
    borderRadius: '4px',
    marginBottom: '12px',
    maxWidth: '450px'
  },
  name: {
    margin: '0 0 6px 0',
    fontSize: '16px',
    color: '#1e293b'
  },
  sub: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b'
  }
};

function EmployeeCard({ employee }) {
  return (
    <div style={styles.card}>
      <h4 style={styles.name}>{employee.name} (Emp ID: {employee.id})</h4>
      <p style={styles.sub}>{employee.role} &bull; {employee.department}</p>
    </div>
  );
}

export default function Problem3() {
  const [employees] = useState([
    { id: 101, name: "Arun Kumar", role: "Software Engineer", department: "IT" },
    { id: 102, name: "Sneha Rao", role: "Talent Acquisition", department: "HR" },
    { id: 103, name: "Rahul Verma", role: "QA Engineer", department: "Testing" }
  ]);

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#0f172a', marginBottom: '16px' }}>Staff Overview</h2>
      {employees.map(emp => (
        <EmployeeCard key={emp.id} employee={emp} />
      ))}
    </div>
  );
}