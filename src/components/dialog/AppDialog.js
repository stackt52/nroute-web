'use client';

import * as React from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import {useDispatch, useSelector} from 'store';
import {useEffect} from "react";
import {closeDialog} from "../../store/slices/dialog";

export default function AppDialog() {
    const dialog = useSelector((state) => state.dialog);
    const dispatch = useDispatch();

    const {title, subtitle, open, content, submitCallback, retireCallback, fullWidth,
        dismissButtonLabel, submitButtonLabel, retireButtonLabel, retireApproveButtonLabel, retireRejectButtonLabel,
        retireApproveCallback, retireRejectCallback} = dialog;

    useEffect(() => {
    }, [dialog])

    const handleClose = () => {
        dispatch(closeDialog({open: false}));
    };

    return (
        <>
            <Dialog fullWidth={fullWidth} maxWidth='lg' open={open} onClose={handleClose}>
                {open && (
                    <>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogContent dividers>
                            <DialogContentText>{subtitle}</DialogContentText>
                            <Box
                                noValidate
                                component="div"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    m: 'auto',
                                    width: 'fit-content'
                                }}
                            >
                                {content}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>{dismissButtonLabel}</Button>
                            {submitCallback && (
                                <Button variant="contained" onClick={submitCallback}>{submitButtonLabel}</Button>
                            )},
                            {retireCallback && (
                                <Button variant="contained" onClick={retireCallback}>{retireButtonLabel}</Button>
                            )},
                            {retireApproveCallback && (
                                <Button variant="contained" onClick={retireApproveCallback}>{retireApproveButtonLabel}</Button>
                            )},
                            {retireRejectCallback && (
                                <Button variant="contained" onClick={retireRejectCallback}>{retireRejectButtonLabel}</Button>
                            )}
                        </DialogActions>

                    </>
                )}
            </Dialog>
        </>
    );
}
