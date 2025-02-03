import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {rate: 3200, town: 'Lusaka', id: 1, province: 'Lusaka'},
    {rate: 3200, town: 'Ndola', id: 2, province: 'Copperbelt'},
    {rate: 2700, town: 'Kitwe', id: 3, province: 'Copperbelt'},
    {rate: 3200, town: 'Livingston', id: 4, province: 'Southern'},
    {rate: 2300, town: 'Kabwe', id: 5, province: 'Central'},
    {rate: 2300, town: 'Chongwe', id: 6, province: 'Lusaka'},
    {rate: 2300, town: 'Mansa', id: 7, province: 'Northern'}
];

const localLocation = createSlice({
    name: 'localLocation',
    initialState,
    reducers: {
        updateLocation(state, action) {
            const {id, town, province, rate} = action.payload;
            const previousState = state.filter(entry => entry.id !== id);
            state = [...previousState, {id, town, province, rate}];
        }
    }
});

export const {updateLocation} = localLocation.actions;

export default localLocation.reducer;
