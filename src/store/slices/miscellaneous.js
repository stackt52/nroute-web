import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {amount: 500, title: 'Fuel', id: 1},
    {amount: 1200, title: 'Car rent', id: 2},
    {amount: 500, title: 'Transport', id: 3},
];

const miscellaneous = createSlice({
    name: 'miscellaneous',
    initialState,
    reducers: {
        updateMiscellaneous(state, action) {
            const {id, title, amount} = action.payload;
            const previousState = state.filter(entry => entry.id !== id);
            state = [...previousState, {id, title, amount}];
        }
    }
});

export const {updateMiscellaneous} = miscellaneous.actions;

export default miscellaneous.reducer;
