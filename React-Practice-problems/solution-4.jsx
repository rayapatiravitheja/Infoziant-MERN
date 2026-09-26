import React, { useState } from 'react';

const styles = {
  container: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '380px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none'
  },
  submitBtn: {
    backgroundColor: '#0ea5e9',
    color: '#ffffff',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  previewCard: {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    border: '1px dashed #94a3b8',
    borderRadius: '6px',
    maxWidth: '380px'
  }
};

export default function Problem4() {
  const initialForm = { name: '', email: '', role: '', department: '', salary: '' };
  const [formData, setFormData] = useState(initialForm);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData(initialForm);
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#0f172a' }}>Register New Personnel</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} name="name" placeholder="Employee Name" value={formData.name} onChange={handleChange} required />
        <input style={styles.input} name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input style={styles.input} name="role" placeholder="Job Title" value={formData.role} onChange={handleChange} required />
        <input style={styles.input} name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
        <input style={styles.input} name="salary" type="number" placeholder="Salary (₹)" value={formData.salary} onChange={handleChange} required />
        <button style={styles.submitBtn} type="submit">Submit Registration</button>
      </form>

      {submittedData && (
        <div style={styles.previewCard}>
          <h4 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>Submitted Record:</h4>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>Name: {submittedData.name}</p>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>Email: {submittedData.email}</p>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>Position: {submittedData.role} ({submittedData.department})</p>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>Salary: ₹{submittedData.salary}</p>
        </div>
      )}
    </div>
  );
}