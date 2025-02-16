import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    title: "",
    subtitle: "",
    open: false,
    content: <p></p>,
    submitCallback: null,
    retireCallback: null,
    fullWidth: false,
    dismissButtonLabel: 'Close',
    submitButtonLabel: 'Submit',
    retireButtonLabel: 'Retire',
};

const dialog = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog(state, action) {
            const {title, subtitle, open, content, fullWidth, dismissButtonLabel,retireButtonLabel, submitButtonLabel} = action.payload;

            state.title = title || 'Dialog'
            state.subtitle = subtitle || null
            state.content = content || <p/>
            state.fullWidth = fullWidth || false
            state.dismissButtonLabel = dismissButtonLabel || "Close"
            state.submitButtonLabel = submitButtonLabel || "Submit"
            state.retireButtonLabel = retireButtonLabel || "Retire"
            state.retireCallback = null
            state.submitCallback = null
            state.open = true
        },

        closeDialog(state, action) {
            state.open = false
        },

        setSubmitCallback(state, action) {
            const {submitCallback, submitButtonLabel} = action.payload;
            if (submitButtonLabel) {
                state.submitButtonLabel = submitButtonLabel;
            }
            state.submitCallback = submitCallback;
        },

        setRetireCallback(state, action) {
            const {retireCallback, retireButtonLabel} = action.payload;
            if (retireButtonLabel) {
                state.retireButtonLabel = retireButtonLabel;
            }
            state.retireCallback = retireCallback;
        }
    }
});

export const {openDialog, closeDialog, setSubmitCallback,setRetireCallback} = dialog.actions;

export default dialog.reducer;
