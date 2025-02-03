'use client';

import PropTypes from 'prop-types';
import {useEffect} from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

// project imports
import * as yup from 'yup';
import {gridSpacing} from 'store/constant';
import Autocomplete from "@mui/material/Autocomplete";
import ListItemText from "@mui/material/ListItemText";
import {useSelector} from "../../../../store";
import {useFormik} from "formik";
import {randomKey} from "../../../../utils/key-generator";
import {enqueueSnackbar} from "notistack";

const validationSchema = yup.object({
    location: yup.object().required('Location is required'),
    startDate: yup.date().default(new Date()).required('Start date is required'),
    endDate: yup.date().default(null)
        .when("startDate",
            (startDate, yup) =>
                startDate && yup.min(startDate, "End date cannot be before start date")),
    rate: yup.string().required('Rate is required'),
    amount: yup.number().required('Amount is required'),
})

function AddIncidental({handleAddItem, setAddItemClicked}) {
    const localLocation = useSelector((state) => state.localLocation);

    const formik = useFormik({
        initialValues: {
            location: null,
            startDate: new Date(),
            endDate: null,
            rate: '',
            amount: null,
            days: 0,
            total: 0
        },
        validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            if (values) {
                const {location, amount, startDate, endDate, rate, total, days} = values;
                const data = {
                    _id: randomKey(),
                    location,
                    startDate: startDate.toISOString().split('T')[0],
                    endDate: endDate.toISOString().split('T')[0],
                    rate,
                    amount,
                    total,
                    days
                };
                handleAddItem(data);
            }
        }
    })

    useEffect(() => {
        const {amount, startDate, endDate, rate} = formik.values;
        if (startDate && endDate) {
            startDate.setHours(11, 11, 11, 11);
            endDate.setHours(11, 11, 11, 11);
        }

        console.log(startDate)
        console.log(endDate)
        if (amount && startDate && endDate && rate) {
            const millDay = 86400000 // milliseconds in a day
            const days = ((endDate.getTime() - startDate.getTime()) / millDay) + 1
            console.log('amount is: '+ amount);
            console.log('days: '+days);

            let total = amount * days
            if (rate === '75%') {
                total = total * 0.75
            }
            if (formik.values.total !== total || formik.values.days !== days || formik.values.rate !== rate) {
                if (days < 1) {
                    enqueueSnackbar('Start date cannot be after end date', {
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center'
                        },
                        variant: 'error'
                    })
                } else {
                    formik.setFieldValue('days', days)
                    const t = parseFloat(total).toFixed(2)
                    formik.setFieldValue('total', parseFloat(t))
                }
            }
        }
    }, [formik.values])

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        fullWidth
                        disableClearable
                        filterSelectedOptions
                        options={localLocation}
                        id="location"
                        onBlur={formik.handleBlur}
                        label='Location'
                        name="location"
                        value={formik.values.location}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(e, value) => formik.setFieldValue('location', value)}
                        getOptionLabel={(option) => option.town}
                        renderOption={(props, option) => (
                            <li key={option.id} {...props}>
                                <ListItemText primary={option.town}
                                              secondary={option.province}/>
                            </li>
                        )}
                        renderInput={(params) =>
                            <TextField {...params}
                                       label="Location"
                                       id='location'
                                       name="location"
                                       error={formik.touched.location && Boolean(formik.errors.location)}
                                       helperText={formik.touched.location && formik.errors.location}
                            />}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <DatePicker
                        fullWidth
                        id="startDate"
                        name="startDate"
                        label='From'
                        disablePast
                        value={formik.values.startDate}
                        onChange={value => formik.setFieldValue('startDate', value)}
                        slotProps={{
                            textField: {
                                id: 'startDate',
                                name: 'startDate',
                                variant: "outlined",
                                onBlur: formik.handleBlur,
                                error: formik.touched.startDate && Boolean(formik.errors.startDate),
                                helperText: formik.touched.startDate && formik.errors.startDate
                            }
                        }}/>
                </Grid>
                <Grid item xs={12} md={2}>
                    <DatePicker
                        fullWidth
                        label='To'
                        id="endDate"
                        name="endDate"
                        disablePast
                        value={formik.values.endDate}
                        onChange={value => formik.setFieldValue('endDate', value)}
                        slotProps={{
                            textField: {
                                id: 'endDate',
                                name: 'endDate',
                                variant: "outlined",
                                onBlur: formik.handleBlur,
                                error: formik.touched.endDate && Boolean(formik.errors.endDate),
                                helperText: formik.touched.endDate && formik.errors.endDate
                            }
                        }}/>
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        fullWidth
                        label='Amount'
                        id='amount'
                        name="amount"
                        type='number'
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                    />
                </Grid>
                <Grid item xs={12} md={1}>
                    <Autocomplete
                        fullWidth
                        disableClearable
                        filterSelectedOptions
                        id='rate'
                        options={['75%', '100%']}
                        onBlur={formik.handleBlur}
                        value={formik.values.rate}
                        onChange={(e, value) => formik.setFieldValue('rate', value)}
                        label='Rate'
                        name="rate"
                        renderInput={(params) =>
                            <TextField {...params}
                                       id="rate"
                                       name="rate"
                                       error={formik.touched.rate && Boolean(formik.errors.rate)}
                                       helperText={formik.touched.rate && formik.errors.rate}
                                       label="Rate"/>
                        }
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField fullWidth name="total" value={formik.values.total} disabled/>
                </Grid>
                <Grid item container justifyContent="flex-end">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button color="error" onClick={() => setAddItemClicked(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            type="submit"
                        >
                            Add
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
}

AddIncidental.propTypes = {
    handleAddItem: PropTypes.func,
    setAddItemClicked: PropTypes.func
};

export default AddIncidental;
