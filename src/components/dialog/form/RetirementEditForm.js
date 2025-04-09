'use client';

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateRetirementStatus} from 'store/slices/retirementSlice';
import {enqueueSnackbar} from 'notistack';
import {closeDialog, setSubmitCallback} from 'store/slices/dialog';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import SubCard from '../../ui-component/cards/SubCard';
import {useTheme} from '@mui/material/styles';
import {ThemeMode} from '../../../config';
import {gridSpacing} from 'store/constant';
import EditLodgingCard from '../../ui-component/finance/(edit)/EditLodgingCard';
import EditMiscellaneousCard from '../../ui-component/finance/(edit)/EditMiscellaneousCard';
import TextField from '@mui/material/TextField';

export default function RetirementEditForm({selectedRetirement}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const theme = useTheme();
    const avatar = '/assets/images/users/avatar-2.png';
    const {
        lodging: initialLodging,
        miscellaneous: initialMiscellaneous,
        id,
        totalAmount,
        details,
        comment,
        amountRetirable
    } = selectedRetirement;
    const advances = useSelector((state) => state.advances.advances);

    // State for lodging and miscellaneous edits
    const [editedLodging, setLodging] = useState(initialLodging);
    const [editedMiscellaneous, setMiscellaneous] = useState(initialMiscellaneous);

    const headerData = [
        {header: 'No. of Days', value: 5},
        {header: 'Destination', value: `${details.destination.town}`},
        {header: 'Official Station', value: `${details.officialStation.town}`},
        {header: 'Total Amount', value: `ZMK ${totalAmount}`},
        {header: 'Cost Center', value: `${details.costCenter.name}`},
        {header: 'Purpose', value: `${details.purpose}`},
        {header: 'Date of Travel', value: `${details.dateOfTravel}`},
    ];

    const advanceData = advances.filter(
        (advance) => advance.userId === currentUser.id && advance.id === selectedRetirement.advanceId
    );

    const totalAmountSpent = [...editedLodging, ...editedMiscellaneous]
        .reduce((sum, item) => sum + (parseFloat(item.amountSpent) || 0), 0);

    const saveCallback = () => {
        dispatch(updateRetirementStatus({
            ...selectedRetirement,
            id: id,
            status: 'pending finance',
            comment,
            lodging: editedLodging,
            miscellaneous: editedMiscellaneous,
            balance: amountRetirable - totalAmountSpent,
            totalAmountSpent: totalAmountSpent,
        }));

        enqueueSnackbar('Successfully Approved travel authorization retirement', {
            anchorOrigin: {vertical: 'top', horizontal: 'center'},
            variant: 'success',
        });

        dispatch(closeDialog(true));
    };

    useEffect(() => {
        dispatch(setSubmitCallback({submitCallback: saveCallback}));
    }, [dispatch, editedLodging, editedMiscellaneous]);

    const sxDivider = {
        borderColor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.light',
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
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Comment"
                            variant="outlined"
                            value={comment}
                            disabled={true}
                            color="primary"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        {/* Pass editedLodging state and setLodging function */}
                        <EditLodgingCard data={editedLodging} advanceData={advanceData[0].lodging}
                                         setData={setLodging}/>
                    </Grid>
                    <Grid item xs={12}>
                        {/* Pass editedMiscellaneous state and setMiscellaneous function */}
                        <EditMiscellaneousCard data={editedMiscellaneous} advanceData={advanceData[0].miscellaneous}
                                               setData={setMiscellaneous}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}