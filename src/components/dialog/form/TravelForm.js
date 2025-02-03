'use client';

import React, {useEffect, useRef, useState} from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// third-party
import {enqueueSnackbar} from 'notistack';

// project imports
import {gridSpacing} from 'store/constant';
import TotalCard from "../../ui-component/ta/TotalCard";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import LodgingCard from "../../ui-component/ta/./LodgingCard";
import IncidentalCard from "../../ui-component/ta/IncidentalCard";
import {useDispatch} from "../../../store";
import MiscellaneousCard from "../../ui-component/ta/MiscellaneousCard";
import {closeDialog, setSubmitCallback} from "../../../store/slices/dialog";
import DetailsCard from "../../ui-component/ta/details/DetailsCard";
import {randomKey} from "../../../utils/key-generator";
import {addTravelAuthorization} from "../../../store/slices/travelAuthorization";

const RetirementForm = () => {
    const detailsForm = useRef(null);

    const [details, setDetails] = useState({});
    const [incidentals, setIncidentals] = useState([]);
    const [lodging, setLodgingData] = useState([]);
    const [miscellaneous, setMiscellaneous] = useState([]);

    const [allAmounts, setAllAmounts] = useState({
        incidentals: 0,
        lodging: 0,
        miscellaneous: 0,
        totalAmount: 0
    });

    const dispatch = useDispatch();

    // Register submit callback for the dialog form (TravelForm)
    const submitCallback = () => {
        detailsForm.current.click()
    }

    useEffect(() => {
        dispatch(setSubmitCallback({submitCallback: submitCallback}));
    })

    useEffect(() => {
        if (Object.keys(details).length > 0) {
            if (incidentals.length === 0) {
                enqueueSnackbar('Please enter incidental details', {
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    },
                    variant: 'error'
                })
                setDetails({})
            } else {
                const payload = {
                    id: randomKey(),
                    details,
                    incidentals,
                    lodging,
                    miscellaneous,
                    totalAmount: allAmounts.totalAmount,
                    status: 'pending',
                    dateSubmitted: new Date().toISOString().split('T')[0],
                }
                // Update travel authorization
                dispatch(addTravelAuthorization(payload))

                enqueueSnackbar('Successfully submitted travel authorization request', {
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    },
                    variant: 'success'
                })
                dispatch(closeDialog(true))
            }
        }
    }, [details]);

    // calculates costs when order-details change
    useEffect(() => {
        const amounts = {
            incidentals: 0,
            lodging: 0,
            miscellaneous: 0,
            totalAmount: 0
        };
        incidentals.forEach((item) => {
            amounts.incidentals += item.total;
        });

        lodging.forEach((item) => {
            amounts.lodging += item.total;
        });

        miscellaneous.forEach((item) => {
            amounts.miscellaneous += item.amount;
        });

        amounts.totalAmount = amounts.incidentals + amounts.lodging + amounts.miscellaneous;
        setAllAmounts(amounts);
    }, [incidentals, lodging, miscellaneous]);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Alert severity="info" variant="outlined">
                        <AlertTitle>Apply for travel authorization</AlertTitle>
                        Fill-out form below to apply for
                        <strong> travel authorization</strong>
                    </Alert>
                </Grid>
                <Grid item xs={12} flex>
                    <DetailsCard formRef={detailsForm} setData={setDetails}/>
                </Grid>

                <Grid item xs={12}>
                    <IncidentalCard setData={setIncidentals}/>
                </Grid>

                <Grid item xs={12}>
                    <LodgingCard setData={setLodgingData}/>
                </Grid>

                <Grid item xs={12}>
                    <MiscellaneousCard setData={setMiscellaneous}/>
                </Grid>

                <TotalCard incidentals={incidentals} allAmounts={allAmounts}/>
            </Grid>
        </>
    );
};

export default RetirementForm;
