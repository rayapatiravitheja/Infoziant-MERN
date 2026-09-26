import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

const styles = {
  nav: {
    display: 'flex',
    gap: '20px',
    padding: '14px 24px',
    backgroundColor: '#1e293b'
  },
  link: {
    color: '#f8fafc',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '14px'
  },
  content: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '300px'
  },
  input: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #cbd5e1'
  },
  button: {
    padding: '8px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

function Home() {
  return <h2>Welcome to Employee Management System</h2>;
}

function Employees({ employees }) {
  return (
    <div>
      <h2>Employees (Total: {employees.length})</h2>
      <ul style={{ paddingLeft: '20px' }}>
        {employees.map((emp) => (
          <li key={emp.id} style={{ margin: '8px 0' }}>
            <strong>{emp.name}</strong> &bull; {emp.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddEmployee({ onAddEmployee }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee({ id: Date.now(), name, role });
    navigate('/employees');
  };

  return (
    <div>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input style={styles.input} placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
        <button style={styles.button} type="submit">Save Record</button>
      </form>
    </div>
  );
}

export default function Problem9() {
  const [employees, setEmployees] = useState([
    { id: 101, name: "Arun Kumar", role: "Developer" },
    { id: 102, name: "Sneha Rao", role: "Manager" }
  ]);

  return (
    <BrowserRouter>
      <div>
        <nav style={styles.nav}>
          <Link style={styles.link} to="/">Home</Link>
          <Link style={styles.link} to="/employees">Employees</Link>
          <Link style={styles.link} to="/add">Add Employee</Link>
        </nav>
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees employees={employees} />} />
            <Route path="/add" element={<AddEmployee onAddEmployee={(e) => setEmployees(prev => [...prev, e])} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}