import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client.js';

export const fetchLeads = createAsyncThunk('leads/fetch', async ({ customerId, status }, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/customers/${customerId}/leads`, { params: { status } });
    return { customerId, leads: data };
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || 'Failed to fetch leads');
  }
});

export const createLead = createAsyncThunk('leads/create', async ({ customerId, payload }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/customers/${customerId}/leads`, payload);
    return { customerId, lead: data };
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || 'Failed to create lead');
  }
});

export const updateLead = createAsyncThunk('leads/update', async ({ customerId, leadId, updates }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/customers/${customerId}/leads/${leadId}`, updates);
    return { customerId, lead: data };
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || 'Failed to update lead');
  }
});

export const deleteLead = createAsyncThunk('leads/delete', async ({ customerId, leadId }, { rejectWithValue }) => {
  try {
    await api.delete(`/customers/${customerId}/leads/${leadId}`);
    return { customerId, leadId };
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || 'Failed to delete lead');
  }
});

const leadsSlice = createSlice({
  name: 'leads',
  initialState: { byCustomerId: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.byCustomerId[action.payload.customerId] = action.payload.leads;
      })
      .addCase(fetchLeads.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createLead.fulfilled, (state, action) => {
        const arr = state.byCustomerId[action.payload.customerId] || [];
        arr.unshift(action.payload.lead);
        state.byCustomerId[action.payload.customerId] = arr;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        const arr = state.byCustomerId[action.payload.customerId] || [];
        const idx = arr.findIndex((l) => l._id === action.payload.lead._id);
        if (idx !== -1) arr[idx] = action.payload.lead;
        state.byCustomerId[action.payload.customerId] = arr;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        const arr = state.byCustomerId[action.payload.customerId] || [];
        state.byCustomerId[action.payload.customerId] = arr.filter((l) => l._id !== action.payload.leadId);
      });
  },
});

export default leadsSlice.reducer;


