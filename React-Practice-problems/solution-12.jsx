import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/users';

const styles = {
  container: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  form: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },
  input: {
    padding: '8px 10px',
    borderRadius: '4px',
    border: '1px solid #cbd5e1',
    fontSize: '13px'
  },
  btnPrimary: {
    padding: '8px 14px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '12px',
    fontSize: '13px'
  },
  th: {
    padding: '8px 10px',
    backgroundColor: '#f1f5f9',
    textAlign: 'left'
  },
  td: {
    padding: '8px 10px',
    borderBottom: '1px solid #e2e8f0'
  }
};

export default function Problem12() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', username: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get(API).then(res => setEmployees(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`${API}/${form.id}`, form);
      setEmployees(employees.map(emp => emp.id === form.id ? form : emp));
      setStatus('Updated successfully.');
    } else {
      const res = await axios.post(API, form);
      setEmployees([{ ...form, id: res.data.id || Date.now() }, ...employees]);
      setStatus('Added successfully.');
    }
    setForm({ id: null, name: '', username: '', email: '' });
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    setEmployees(employees.filter(emp => emp.id !== id));
    setStatus('Deleted successfully.');
  };

  return (
    <div style={styles.container}>
      <h2>Employee CRUD Operations</h2>
      {status && <p style={{ color: '#16a34a', fontSize: '13px' }}>{status}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input style={styles.input} placeholder="Username" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required />
        <input style={styles.input} placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <button style={styles.btnPrimary} type="submit">{isEditing ? 'Save Update' : 'Add Record'}</button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th><th style={styles.th}>Name</th><th style={styles.th}>Email</th><th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td style={styles.td}>{emp.id}</td>
              <td style={styles.td}>{emp.name}</td>
              <td style={styles.td}>{emp.email}</td>
              <td style={styles.td}>
                <button onClick={() => { setForm(emp); setIsEditing(true); }}>Edit</button>
                <button onClick={() => handleDelete(emp.id)} style={{ marginLeft: '6px', color: '#ef4444' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}