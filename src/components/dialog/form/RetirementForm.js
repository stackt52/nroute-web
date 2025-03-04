'use client';

import React, {useEffect, useState} from 'react';

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// project imports
import {gridSpacing} from 'store/constant';
import Incidental from "../../ui-component/ta/incidental/Incidental";
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
import IncidentalCard from "../../ui-component/retirement/incidental/IncidentalCard";
import {enqueueSnackbar} from "notistack";
import {closeDialog, setRetireCallback} from "../../../store/slices/dialog";
import LodgingRetirementCard from "../../ui-component/retirement/lodging/LodgingCard";
import MiscellaneousRetirementCard from "../../ui-component/retirement/miscellaneous/MiscellaneousCard";

// ==============================|| RETIREMENT DETAILS ||============================== //

export default function RetirementForm({selectedAdvance}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const retirements = useSelector((state) => state.retirements.retirements);
    const advances = useSelector((state) => state.advances.advances);
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
    const [lodgingRetirement, setLodgingData] = useState([]);
    const [miscellaneousRetirement, setMiscellaneousData] = useState([]);

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

    const retireCallback = () => {
        // Validate if lodging or miscellaneous retirement data is provided
        if (lodgingRetirement.length === 0 && miscellaneousRetirement.length === 0) {
            enqueueSnackbar("Please add lodging or miscellaneous retirement data before submitting.", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            });
            return; // Stop submission if no data is provided
        }

        // Calculate totals
        const totalAmountSpent = [...lodgingRetirement, ...miscellaneousRetirement]
            .reduce((sum, item) => sum + (parseFloat(item.amountSpent) || 0), 0);

        const totalIncidental = [...incidentals]
            .reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);

        const total = totalAmountSpent + totalIncidental;

        // Submit retirement data
        dispatch(createRetirement({
            advanceId: selectedAdvance.id,
            userId: currentUser.id,
            traveler: selectedAdvance.traveler,
            details: details,
            lodging: lodgingRetirement,
            miscellaneous: miscellaneousRetirement,
            totalAmountSpent: total,
            totalAmountDisbursed:totalAmount,
            travelerRole: "Software Developer",
            balance: totalAmount - total,
        }));

        enqueueSnackbar("Successfully submitted travel authorization retirement", { variant: "success" });
        dispatch(closeDialog(true));
    };

    useEffect(() => {
        dispatch(setRetireCallback({ retireCallback }));
    }, [dispatch, lodgingRetirement, miscellaneousRetirement]);


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
                        <LodgingRetirementCard data={lodging} setData={setLodgingData} />
                    </Grid>
                    <Grid item xs={12}>
                        <MiscellaneousRetirementCard data={miscellaneous} setData={setMiscellaneousData} />
                    </Grid>
                    <Grid item xs={12}>
                        <IncidentalCard data={incidentals} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};