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
    retireButtonLabel: 'Retiring',
    retireApproveButtonLabel: 'Approve',
    retireRejectButtonLabel: 'Reject',
};

const dialog = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog(state, action) {
            const {title, subtitle, open, content, fullWidth, dismissButtonLabel,
                retireButtonLabel, submitButtonLabel, retireApproveButtonLabel, retireRejectButtonLabel} = action.payload;

            state.title = title || 'Dialog'
            state.subtitle = subtitle || null
            state.content = content || <p/>
            state.fullWidth = fullWidth || false
            state.dismissButtonLabel = dismissButtonLabel || "Close"
            state.submitButtonLabel = submitButtonLabel || "Submit"
            state.retireButtonLabel = retireButtonLabel || "Retire"
            state.retireApproveButtonLabel = retireApproveButtonLabel || "Approve"
            state.retireRejectButtonLabel = retireRejectButtonLabel || "Reject"
            state.retireCallback = null
            state.submitCallback = null
            state.retireApproveCallback = null
            state.retireRejectCallback = null
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
        },

        setRetireRejectCallback(state, action) {
            const {retireRejectCallback, retireRejectButtonLabel} = action.payload;
            if (retireRejectButtonLabel) {
                state.retireRejectButtonLabel = retireRejectButtonLabel;
            }
            state.retireRejectCallback = retireRejectCallback;
        },

        setRetireApproveCallback(state, action) {
            const {retireApproveCallback, retireApproveButtonLabel} = action.payload;
            if (retireApproveButtonLabel) {
                state.retireApproveButtonLabel = retireApproveButtonLabel;
            }
            state.retireApproveCallback = retireApproveCallback;
        }
    }
});

export const {openDialog, closeDialog,
    setSubmitCallback,setRetireCallback,  setRetireApproveCallback,
    setRetireRejectCallback} = dialog.actions;

export default dialog.reducer;
