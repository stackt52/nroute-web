import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    title: "",
    subtitle: "",
    open: false,
    content: <p></p>,
    submitCallback: null,
    fullWidth: false,
    dismissButtonLabel: 'Close',
    submitButtonLabel: 'Submit',
};

const dialog = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog(state, action) {
            const {title, subtitle, open, content, fullWidth, dismissButtonLabel, submitButtonLabel} = action.payload;

            state.title = title || 'Dialog'
            state.subtitle = subtitle || null
            state.content = content || <p/>
            state.fullWidth = fullWidth || false
            state.dismissButtonLabel = dismissButtonLabel || "Close"
            state.submitButtonLabel = submitButtonLabel || "Submit"
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
        }
    }
});

export const {openDialog, closeDialog, setSubmitCallback} = dialog.actions;

export default dialog.reducer;
