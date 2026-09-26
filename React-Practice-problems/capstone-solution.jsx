import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/users';

// ==========================================
// 1. CONTEXT API: THEME SWITCHING
// ==========================================
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{
        backgroundColor: isDark ? '#0f172a' : '#f8fafc',
        color: isDark ? '#f8fafc' : '#0f172a',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'background-color 0.2s, color 0.2s'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// ==========================================
// 2. REDUX TOOLKIT & ASYNC THUNKS[cite: 1]
// ==========================================
export const fetchStaff = createAsyncThunk('staff/fetch', async () => {
  const res = await axios.get(API);
  return res.data;
});

export const addStaff = createAsyncThunk('staff/add', async (newStaff) => {
  const res = await axios.post(API, newStaff);
  return { ...newStaff, id: res.data.id || Date.now() };
});

export const updateStaff = createAsyncThunk('staff/update', async ({ id, updatedData }) => {
  await axios.put(`${API}/${id}`, updatedData);
  return { id: Number(id), updatedData };
});

export const deleteStaff = createAsyncThunk('staff/delete', async (id) => {
  await axios.delete(`${API}/${id}`);
  return Number(id);
});

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload.updatedData };
        }
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

const store = configureStore({
  reducer: { staff: staffSlice.reducer }
});

// ==========================================
// 3. UI COMPONENTS & PAGES[cite: 1]
// ==========================================
function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 28px',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <span style={{ fontWeight: '700', fontSize: '18px', color: '#2563eb' }}>EMS Portal</span>
        <Link to="/" style={{ color: isDark ? '#cbd5e1' : '#475569', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
        <Link to="/employees" style={{ color: isDark ? '#cbd5e1' : '#475569', textDecoration: 'none', fontWeight: '500' }}>Employees</Link>
        <Link to="/add-employee" style={{ color: isDark ? '#cbd5e1' : '#475569', textDecoration: 'none', fontWeight: '500' }}>Add Employee</Link>
      </div>
      <button
        onClick={toggleTheme}
        style={{
          padding: '6px 14px',
          backgroundColor: isDark ? '#334155' : '#f1f5f9',
          color: isDark ? '#f8fafc' : '#0f172a',
          border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500'
        }}
      >
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </nav>
  );
}

function Home() {
  const { theme } = useContext(ThemeContext);
  const { items, loading } = useSelector((s) => s.staff);

  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ fontSize: '26px', marginBottom: '8px' }}>Employee Management Dashboard</h1>
      <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b', marginBottom: '24px' }}>
        Complete MERN-React Capstone integrating Context API, Redux Toolkit, and Axios.[cite: 1]
      </p>
      <div style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
          border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
          borderRadius: '8px',
          padding: '20px',
          minWidth: '200px'
        }}>
          <h4 style={{ margin: 0, color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Total Staff</h4>
          <p style={{ fontSize: '32px', fontWeight: '700', margin: '8px 0 0 0', color: '#2563eb' }}>
            {loading ? '...' : items.length}
          </p>
        </div>
        <div style={{
          backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
          border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
          borderRadius: '8px',
          padding: '20px',
          minWidth: '200px'
        }}>
          <h4 style={{ margin: 0, color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Active Theme</h4>
          <p style={{ fontSize: '24px', fontWeight: '700', margin: '14px 0 0 0', color: '#10b981' }}>
            {theme.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmployeeList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((s) => s.staff);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteStaff(id));
    }
  };

  if (loading) return <p style={{ padding: '32px' }}>Loading staff records from API...</p>;
  if (error) return <p style={{ padding: '32px', color: '#ef4444' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '32px' }}>
      <h2 style={{ fontSize: '22px', marginBottom: '16px' }}>Staff Directory</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`
      }}>
        <thead>
          <tr style={{ backgroundColor: isDark ? '#334155' : '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '12px 16px' }}>ID</th>
            <th style={{ padding: '12px 16px' }}>Name</th>
            <th style={{ padding: '12px 16px' }}>Email</th>
            <th style={{ padding: '12px 16px' }}>Role / Company</th>
            <th style={{ padding: '12px 16px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((emp) => (
            <tr key={emp.id} style={{ borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f0'}` }}>
              <td style={{ padding: '12px 16px' }}>{emp.id}</td>
              <td style={{ padding: '12px 16px' }}>
                <Link to={`/employees/${emp.id}`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>
                  {emp.name}
                </Link>
              </td>
              <td style={{ padding: '12px 16px' }}>{emp.email}</td>
              <td style={{ padding: '12px 16px' }}>{emp.role || emp.company?.name || 'Developer'}</td>
              <td style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
                <Link to={`/edit-employee/${emp.id}`}>
                  <button style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#0ea5e9',
                    color: '#ffffff',
                    cursor: 'pointer'
                  }}>
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(emp.id, emp.name)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmployeeDetails() {
  const { id } = useParams();
  const { items } = useSelector((s) => s.staff);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const emp = items.find(e => e.id === Number(id));

  if (!emp) return <p style={{ padding: '32px' }}>Staff profile not found.</p>;

  return (
    <div style={{ padding: '32px' }}>
      <div style={{
        maxWidth: '420px',
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
        borderRadius: '8px',
        padding: '24px'
      }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>{emp.name}</h2>
        <p style={{ margin: '6px 0' }}><strong>ID:</strong> {emp.id}</p>
        <p style={{ margin: '6px 0' }}><strong>Username:</strong> {emp.username || 'N/A'}</p>
        <p style={{ margin: '6px 0' }}><strong>Email:</strong> {emp.email}</p>
        <p style={{ margin: '6px 0' }}><strong>Phone:</strong> {emp.phone || 'N/A'}</p>
        <p style={{ margin: '6px 0' }}><strong>Role:</strong> {emp.role || 'Software Engineer'}</p>
        <p style={{ margin: '6px 0' }}><strong>Company:</strong> {emp.company?.name || 'Infoziant Labs'}</p>
        <div style={{ marginTop: '20px' }}>
          <Link to="/employees" style={{ color: '#2563eb', textDecoration: 'none' }}>&larr; Back to Directory</Link>
        </div>
      </div>
    </div>
  );
}

function AddEmployee() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [form, setForm] = useState({ name: '', username: '', email: '', phone: '', role: '' });

  useEffect(() => {
    // Auto focus first input element on mount using useRef[cite: 1]
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStaff(form));
    navigate('/employees');
  };

  const inputStyle = {
    padding: '10px 12px',
    borderRadius: '6px',
    border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`,
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    color: isDark ? '#ffffff' : '#000000',
    fontSize: '14px',
    outline: 'none'
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{
        maxWidth: '380px',
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
        borderRadius: '8px',
        padding: '24px'
      }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>Add Employee Profile</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input ref={inputRef} style={inputStyle} placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input style={inputStyle} placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <input style={inputStyle} type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input style={inputStyle} placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input style={inputStyle} placeholder="Role / Position" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <button type="submit" style={{
            padding: '10px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '8px'
          }}>
            Register Employee
          </button>
        </form>
      </div>
    </div>
  );
}

function EditEmployee() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((s) => s.staff);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const existing = items.find(e => e.id === Number(id));

  const [form, setForm] = useState({ name: '', username: '', email: '', phone: '', role: '' });

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name || '',
        username: existing.username || '',
        email: existing.email || '',
        phone: existing.phone || '',
        role: existing.role || ''
      });
    }
  }, [existing]);

  if (!existing) return <p style={{ padding: '32px' }}>Employee profile not found.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStaff({ id, updatedData: form }));
    navigate('/employees');
  };

  const inputStyle = {
    padding: '10px 12px',
    borderRadius: '6px',
    border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`,
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    color: isDark ? '#ffffff' : '#000000',
    fontSize: '14px',
    outline: 'none'
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{
        maxWidth: '380px',
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
        borderRadius: '8px',
        padding: '24px'
      }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>Edit Staff #{id}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input style={inputStyle} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <input style={inputStyle} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input style={inputStyle} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <button type="submit" style={{
            padding: '10px',
            backgroundColor: '#10b981',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '8px'
          }}>
            Save Updates
          </button>
        </form>
      </div>
    </div>
  );
}

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default function CapstoneSolution() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}