import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import customersReducer from './slices/customersSlice.js';
import leadsReducer from './slices/leadsSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    leads: leadsReducer,
  },
});

export default store;


