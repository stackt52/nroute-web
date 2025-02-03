import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const travelAuthorization = createSlice({
    name: 'travelAuthorization',
    initialState,
    reducers: {
        addTravelAuthorization: (state, action) => {
            state.push(action.payload);
        },
        deleteTravelAuthorization: (state, action) => {
            const index = state.findIndex(i => i.id === action.payload);
            state.splice(index, 1);
        }
    }
});

export const {addTravelAuthorization, deleteTravelAuthorization} = travelAuthorization.actions;

export default travelAuthorization.reducer;
