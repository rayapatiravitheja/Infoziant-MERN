import React, { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

const styles = {
  container: {
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  form: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px'
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #cbd5e1'
  },
  btn: {
    padding: '8px 14px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

const employeeSlice = createSlice({
  name: 'empRedux',
  initialState: [
    { id: 101, name: 'Alice Smith', role: 'Developer' }
  ],
  reducers: {
    addEmployee: (state, action) => { state.push(action.payload); },
    removeEmployee: (state, action) => state.filter(e => e.id !== action.payload)
  }
});

const { addEmployee, removeEmployee } = employeeSlice.actions;
const store = configureStore({ reducer: { list: employeeSlice.reducer } });

function ReduxView() {
  const employees = useSelector(s => s.list);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addEmployee({ id: Date.now(), name, role }));
    setName('');
    setRole('');
  };

  return (
    <div style={styles.container}>
      <h2>Redux Toolkit Employee Management (Count: {employees.length})</h2>
      <form onSubmit={handleAdd} style={styles.form}>
        <input style={styles.input} placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input style={styles.input} placeholder="Role" value={role} onChange={e => setRole(e.target.value)} required />
        <button style={styles.btn} type="submit">Push to Store</button>
      </form>
      <ul>
        {employees.map(emp => (
          <li key={emp.id} style={{ margin: '6px 0' }}>
            {emp.name} — {emp.role}
            <button onClick={() => dispatch(removeEmployee(emp.id))} style={{ marginLeft: '12px' }}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Problem13() {
  return (
    <Provider store={store}>
      <ReduxView />
    </Provider>
  );
}