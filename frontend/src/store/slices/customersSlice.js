import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client.js';

export const fetchCustomers = createAsyncThunk('customers/fetch', async (params, { rejectWithValue }) => {
  try {
    const { page = 1, limit = 10, search = '' } = params || {};
    const { data } = await api.get('/customers', { params: { page, limit, search } });
    return data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || 'Failed to fetch customers');
  }
});

export const createCustomer = createAsyncThunk('customers/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/customers', payload);
    return data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || 'Failed to create');
  }
});

export const updateCustomer = createAsyncThunk('customers/update', async ({ id, updates }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/customers/${id}`, updates);
    return data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || 'Failed to update');
  }
});

export const deleteCustomer = createAsyncThunk('customers/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/customers/${id}`);
    return id;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || 'Failed to delete');
  }
});

const customersSlice = createSlice({
  name: 'customers',
  initialState: { items: [], total: 0, page: 1, pages: 1, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchCustomers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createCustomer.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const idx = state.items.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export default customersSlice.reducer;


