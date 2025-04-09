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
        status: 'pending finance',
        createdAt: new Date().toISOString().split('T')[0],
      });
    },
    updateRetirementStatus: (state, action) => {
      const { id, status, comment, lodging, miscellaneous, totalAmountSpent, balance } = action.payload;
      const retirementIndex = state.retirements.findIndex(r => r.id === id);

      if (retirementIndex !== -1) {
        const newRetirements = [...state.retirements];
        newRetirements[retirementIndex] = {
          ...newRetirements[retirementIndex],
          status,
          comment,
          lodging,
          miscellaneous,
          totalAmountSpent,
          balance,
        };

        return {
          ...state,
          retirements: newRetirements,
        };
      }
      return state; // Always return state to avoid breaking Redux
    },
  },
});

export const { createRetirement, updateRetirementStatus } = retirementSlice.actions;
export default retirementSlice.reducer;