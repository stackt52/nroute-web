'use client';

import React, {useEffect, useState} from 'react';

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// third-party
import * as yup from 'yup';
import {useFormik} from 'formik';

// project imports
import {gridSpacing} from 'store/constant';
import InputLabel from 'components/ui-component/extended/Form/InputLabel';
import Incidental from "../../ui-component/ta/incidental/Incidental";
import AddIncidental from "../../ui-component/ta/incidental/AddIncidental";
import TotalCard from "../../ui-component/ta/TotalCard";
import {useDispatch, useSelector} from 'react-redux';
import {createRetirement, updateRetirementStatus} from 'store/slices/retirementSlice';
import {roles} from 'constants/index';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SubCard from "../../ui-component/cards/SubCard";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import {ThemeMode} from "../../../config";
import LodgingCard from "../../ui-component/retirement/LodgingCard";
import MiscellaneousCard from "../../ui-component/retirement/MiscellaneousCard";
import IncidentalCard from "../../ui-component/retirement/IncidentalCard";
import {enqueueSnackbar} from "notistack";
import {closeDialog, setRetireCallback} from "../../../store/slices/dialog";

// yup validation-schema
const validationSchema = yup.object({
    officialStation: yup.string().required('Official Station is Required'),
    email: yup.string().email('Enter a valid email').required('Email is Required'),
    phoneNumber: yup.string().min(10, 'Phone number should be of minimum 10 characters').required('Phone is Required'),
});

// ==============================|| RETIREMENT DETAILS ||============================== //

export default function RetirementForm({selectedAdvance}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const retirements = useSelector((state) => state.retirements.retirements);
    const [selectedFiles, setSelectedFiles] = useState({})
    const theme = useTheme();
    const avatar = '/assets/images/users/avatar-2.png';
    const { lodging, miscellaneous, incidentals, totalAmount, details } = selectedAdvance
    const headerData = [
        { header: 'No. of Days', value: 5 },
        { header: 'Destination', value: `${details.destination.town}` },
        { header: 'Official Station', value: `${details.officialStation.town}` },
        { header: 'Total Amount', value: `ZMK ${totalAmount}` },
        { header: 'Cost Center', value: `${details.costCenter.name}` },
        { header: 'Purpose', value: `${details.purpose}` },
        { header: 'Date of Travel', value: `${details.dateOfTravel}` },
    ];

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


    // State to store updated data from child components
    const [updatedData, setUpdatedData] = useState({
        lodging: lodging.map(item => ({ ...item, amountSpent: '', comment: '' })),
        miscellaneous: miscellaneous.map(item => ({ ...item, amountSpent: '', comment: '' })),
        incidentals: incidentals.map(item => ({ ...item, amountSpent: '', comment: '' })),
    });

    // Callback function to update the parent state when child data changes
    const handleLodgingUpdate = (index, field, value) => {
        setUpdatedData(prevData => {
            const updatedLodging = [...prevData.lodging];
            updatedLodging[index][field] = value;
            return { ...prevData, lodging: updatedLodging };
        });
    };

    const handleMiscellaneousUpdate = (index, field, value) => {
        setUpdatedData(prevData => {
            const updatedMiscellaneous = [...prevData.miscellaneous];
            updatedMiscellaneous[index][field] = value;
            return { ...prevData, miscellaneous: updatedMiscellaneous };
        });
    };

    const retireCallback = () => {

        dispatch(createRetirement({
            id: selectedAdvance.id,
            userId: currentUser.id,
            amountSpent: updatedData.lodging.reduce((sum, item) => sum + (parseFloat(item.amountSpent) || 0), 0) +
        updatedData.miscellaneous.reduce((sum, item) => sum + (parseFloat(item.amountSpent) || 0), 0),
            // files: files.map(f => ({
            //     name: f.name,
            //     size: f.size,
            //     type: f.type
            // }))
        }))

        enqueueSnackbar('Successfully submitted travel authorization retirement', {
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
            },
            variant: 'success'
        });
        dispatch(closeDialog(true));
    };

    useEffect(() => {
        dispatch(setRetireCallback({ retireCallback }));
    }, [dispatch]);

    const sxDivider = {
        borderColor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.light'
    };

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
                                                    icon={<Incidental/>}
                                                />
                                                <TotalCard
                                                    total={retirement.advance.amount - retirement.advance.amountSpent}
                                                    label="Balance"
                                                    icon={<Incidental/>}
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
                                        <Divider sx={{my: 3}}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard>
                    <Grid container spacing={gridSpacing}>
                        <Box sx={{p: 2.5}}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} md={4} lg={3}>
                                    <Grid container spacing={1.25}>
                                        <Grid item>
                                            <Avatar alt="User 1" src={avatar} sx={{width: 64, height: 64}}/>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="h2">{selectedAdvance.traveler}</Typography>
                                                {/*<TimelapseIcon color="warning" fontSize="small"/>*/}
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Typography variant="subtitle2" noWrap>
                                                    Software Developer
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={sxDivider}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="space-between" spacing={8}>
                                        {headerData.map((data, index) => (
                                            <Grid item key={index} xs={8} sm="auto">
                                                <Stack spacing={1} alignItems={{xs: 'center', sm: 'flex-start'}}>
                                                    <Typography variant="subtitle2">{data.header}</Typography>
                                                    <Typography variant="h5">{data.value}</Typography>
                                                </Stack>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <LodgingCard data={lodging} onUpdate={handleLodgingUpdate}/>
                    </Grid>
                    <Grid item xs={12}>
                        <MiscellaneousCard data={miscellaneous} onUpdate={handleMiscellaneousUpdate}/>
                    </Grid>
                    <Grid item xs={12}>
                        <IncidentalCard data={incidentals}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

