'use client';

import React, {useEffect, useState} from 'react';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// project imports
import {gridSpacing} from 'store/constant';
import {useDispatch, useSelector} from 'react-redux';
import {updateRetirementStatus} from 'store/slices/retirementSlice';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SubCard from "../../ui-component/cards/SubCard";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import {ThemeMode} from "../../../config";
import {enqueueSnackbar} from "notistack";
import {closeDialog, setRetireApproveCallback, setRetireRejectCallback} from "../../../store/slices/dialog";
import LodgingCard from "../../ui-component/finance/(review)/LodgingCard";
import MiscellaneousCard from "../../ui-component/finance/(review)/MiscellaneousCard";
import TextField from "@mui/material/TextField";

// ==============================|| RETIREMENT DETAILS ||============================== //

export default function FinanceReviewForm({selectedRetirement}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const theme = useTheme();
    const avatar = '/assets/images/users/avatar-2.png';
    const { lodging, miscellaneous, incidentals, totalAmount, details, comment: initialComment } = selectedRetirement
    const advances = useSelector((state) => state.advances.advances);
    const [comment, setComment] = useState(initialComment);
    const headerData = [
        { header: 'No. of Days', value: 5 },
        { header: 'Destination', value: `${details.destination.town}` },
        { header: 'Official Station', value: `${details.officialStation.town}` },
        { header: 'Total Amount', value: `ZMK ${totalAmount}` },
        { header: 'Cost Center', value: `${details.costCenter.name}` },
        { header: 'Purpose', value: `${details.purpose}` },
        { header: 'Date of Travel', value: `${details.dateOfTravel}` },
    ];

    useEffect(() => {
        const retireApproveCallback = (retirementId) => {
            const updatedRetirement = {
                ...selectedRetirement,
                status: 'approved finance',
                comment: comment
            };

            dispatch(updateRetirementStatus(updatedRetirement));

            enqueueSnackbar('Successfully Approved travel authorization retirement', {
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                variant: 'success'
            });
            dispatch(closeDialog(true));
        };

        const retireRejectCallback = (retirementId) => {
            const updatedRetirement = {
                ...selectedRetirement,
                status: 'rejected finance',
                comment: comment
            };
            dispatch(updateRetirementStatus(updatedRetirement));

            enqueueSnackbar('Successfully Rejected travel authorization retirement',
                {anchorOrigin: { vertical: 'top', horizontal: 'center'},
                    variant: 'error'
                });
            dispatch(closeDialog(true));
        };

        dispatch(setRetireApproveCallback({ retireApproveCallback }));
        dispatch(setRetireRejectCallback({ retireRejectCallback }));
    }, [dispatch, comment]);

    const advanceData = advances.filter(advance =>
        advance.userId === currentUser.id &&
        advance.id === selectedRetirement.advanceId
    );


    const sxDivider = {
        borderColor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.light'
    };

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
                                                <Typography variant="h2">{selectedRetirement.traveler}</Typography>
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
                        {/*Not a Good Way of Passing Data Might Change */}
                        <LodgingCard
                            retirementData={lodging}
                            advanceData={advanceData[0].lodging}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MiscellaneousCard
                            retirementData={miscellaneous}
                            advanceData={advanceData[0].miscellaneous}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Comment"
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </Grid>
        </Grid>
    )
};