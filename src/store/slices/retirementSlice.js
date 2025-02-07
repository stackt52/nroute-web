import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  retirements: [],
};

const retirementSlice = createSlice({
  name: 'retirements',
  initialState,
  reducers: {
    createRetirement: (state, action) => {
      state.retirements.push({
        ...action.payload,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
    },
    updateRetirementStatus: (state, action) => {
      const { id, status, comment } = action.payload;
      const retirement = state.retirements.find(r => r.id === id);
      if (retirement) {
        retirement.status = status;
        retirement.comment = comment;
      }
    },
  },
});

export const { createRetirement, updateRetirementStatus } = retirementSlice.actions;
export default retirementSlice.reducer;