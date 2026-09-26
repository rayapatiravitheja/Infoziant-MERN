import React, { useEffect, useState } from 'react';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/users';

export const fetchRemoteUsers = createAsyncThunk('users/fetch', async () => {
  const res = await axios.get(API);
  return res.data;
});

export const addRemoteUser = createAsyncThunk('users/add', async (user) => {
  const res = await axios.post(API, user);
  return { ...user, id: res.data.id || Date.now() };
});

export const removeRemoteUser = createAsyncThunk('users/delete', async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

const userSlice = createSlice({
  name: 'remoteUsers',
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRemoteUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchRemoteUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addRemoteUser.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(removeRemoteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(u => u.id !== action.payload);
      });
  }
});

const store = configureStore({ reducer: { users: userSlice.reducer } });

function AsyncReduxView() {
  const { items, loading } = useSelector(s => s.users);
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(fetchRemoteUsers());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addRemoteUser({ name, email: `${name.toLowerCase()}@test.com` }));
    setName('');
  };

  return (
    <div style={{ padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h2>Redux Toolkit + Axios Integration</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: '14px' }}>
        <input
          style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
          placeholder="New Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button style={{ padding: '8px 12px', marginLeft: '8px', cursor: 'pointer' }} type="submit">
          Add Asynchronously
        </button>
      </form>
      {loading ? <p>Loading data...</p> : (
        <ul style={{ paddingLeft: '20px' }}>
          {items.map(u => (
            <li key={u.id} style={{ margin: '6px 0' }}>
              {u.name} ({u.email})
              <button onClick={() => dispatch(removeRemoteUser(u.id))} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Problem14() {
  return (
    <Provider store={store}>
      <AsyncReduxView />
    </Provider>
  );
}