import {createSlice} from '@reduxjs/toolkit';

function createData(id, shortName, name, owner) {
    return {id, shortName, name, owner};
}

const initialState = [
    createData(1,'SD', 'Software Development', 'Mustafa'),
    createData(2,'ITSS', 'IT Services and Support', 'Aka M.'),
    createData(3, 'TAD', 'Talent Acquisition and Development', 'PB'),
    createData(4,'AM', 'Asset Management', 'Glory S.'),
    createData(5,'Procurement', 'Procurement', 'Lisa Ngenda'),
    createData(6,'Health Informatics', 'Health Informatics', 'Patrick Shabangu')
];

const costCenter = createSlice({
    name: 'costCenter',
    initialState,
    reducers: {
        updateCostCenter(state, action) {
            const {id, shortName, name, owner} = action.payload;
            const previousState = state.filter(entry => entry.id !== id);
            state = [...previousState, {id, shortName, name, owner}];
        }
    }
});

export const {updateLocation} = costCenter.actions;

export default costCenter.reducer;
