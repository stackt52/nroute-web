'use client';

import React, {useEffect, useState} from 'react';

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


// third-party
import * as yup from 'yup';
import {useFormik} from 'formik';

// project imports
import {gridSpacing} from 'store/constant';
import InputLabel from 'components/ui-component/extended/Form/InputLabel';
import Incidental from "../../ui-component/ta/incidental/Incidental";
import AddIncidental from "../../ui-component/ta/incidental/AddIncidental";
import TotalCard from "../../ui-component/ta/TotalCard";
import { useDispatch, useSelector } from 'react-redux';
import { createRetirement, updateRetirementStatus } from 'store/slices/retirementSlice';
import { roles } from 'constants/index';

// yup validation-schema
const validationSchema = yup.object({
    officialStation: yup.string().required('Official Station is Required'),
    email: yup.string().email('Enter a valid email').required('Email is Required'),
    phoneNumber: yup.string().min(10, 'Phone number should be of minimum 10 characters').required('Phone is Required'),
});

// ==============================|| RETIREMNT DETAILS ||============================== //

const RetirementForm = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const advances = useSelector((state) => state.advances.advances);
    const retirements = useSelector((state) => state.retirements.retirements);

    const [selectedFiles, setSelectedFiles] = useState({})

    const handleFileChange = (advanceId, e) => {
        setSelectedFiles({
            ...selectedFiles,
            [advanceId]: Array.from(e.target.files)
        })
    }

    const handleSubmitRetirement = (advanceId) => {
        const files = selectedFiles[advanceId];
        
        if (!files?.length) return;

        dispatch(createRetirement({
            advanceId,
            userId: currentUser.id,
            files: files.map(f => ({
                name: f.name,
                size: f.size,
                type: f.type
            }))
        }))

        setSelectedFiles({
            ...selectedFiles,
            [advanceId]: null
        })
    }

    const handleRetirementApproval = (retirementId, approved, comment = "") => {
        dispatch(updateRetirementStatus({
            id: retirementId,
            status: approved ? 'APPROVED' : 'REJECTED',
            comment
        }))
    }

    if (currentUser.role.includes(roles.FINANCE)) {
        return (
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                {retirements.map((retirement, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Stack direction="row" spacing={2}>
                                                <TotalCard
                                                    total={retirement.advance.amount}
                                                    label="Amount"
                                                    icon={<Incidental />}
                                                />
                                                <TotalCard
                                                    total={retirement.advance.amount - retirement.advance.amountSpent}
                                                    label="Balance"
                                                    icon={<Incidental />}
                                                />
                                            </Stack>
                                            <Stack direction="row" spacing={2}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => handleRetirementApproval(retirement.id, true)}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleRetirementApproval(retirement.id, false)}
                                                >
                                                    Reject
                                                </Button>
                                            </Stack>
                                        </Stack>
                                        <Divider sx={{ my: 3 }} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
};

export default RetirementForm;
