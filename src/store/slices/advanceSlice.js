import { createSlice } from '@reduxjs/toolkit';
import { statuses } from 'constants/index';

const initialState = {
    advances: [],
    loading: false,
    error: null,
}

const advanceSlice = createSlice({
  name: 'advances',
  initialState,
  reducers: {
    createAdvance: (state, action) => {
      state.advances.push({
        ...action.payload,
        id: Date.now().toString(),
        status: statuses.PENDING_SUPERVISOR,
        createdAt: new Date().toISOString(),
        history: [{
          status: statuses.CREATED,
          timestamp: new Date().toISOString(),
          comment: '',
        }],
      });
    },
    updateAdvanceStatus: (state, action) => {
      const { id, status, comment } = action.payload;
      const advance = state.advances.find(a => a.id === id);
      if (advance) {
        advance.status = status;
        advance.history.push({
          status,
          timestamp: new Date().toISOString(),
          comment,
        });
      }
    },
    deleteAdvance: (state, action) => {
      state.advances = state.advances.filter(a => a.id !== action.payload);
    },
  },
});

export const { createAdvance, updateAdvanceStatus, deleteAdvance } = advanceSlice.actions;
export default advanceSlice.reducer;