'use client';

import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// project imports
import {gridSpacing} from 'store/constant';
import Autocomplete from "@mui/material/Autocomplete";
import ListItemText from "@mui/material/ListItemText";
import {useSelector} from "../../../../store";
import {useFormik} from "formik";
import * as yup from 'yup';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {randomKey} from "../../../../utils/key-generator";


const validationSchema = yup.object({
    location: yup.object().required('Location is required'),
    startDate: yup.date().required('Start date is required'),
    endDate: yup.date().required('End date is required')
})

function AddLodging({handleAddItem, setAddItemClicked}) {
    const localLocation = useSelector((state) => state.localLocation);

    const formik = useFormik({
        initialValues: {
            location: null,
            startDate: new Date(),
            endDate: null,
            rate: 0,
            days: 0,
            total: 0,
        },
        validationSchema,
        onSubmit: async (values) => {
            const {location, rate, startDate, endDate, total, days} = values;
            const data = {
                _id: randomKey(),
                location,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                rate,
                total,
                days
            };
            handleAddItem(data);
        }
    })

    useEffect(() => {
        const {location, startDate, endDate} = formik.values;
        if (startDate && endDate) {
            startDate.setHours(11, 11, 11, 11);
            endDate.setHours(11, 11, 11, 11);
        }

        if (location && startDate && endDate) {
            const millDay = 86400000
            const days = ((endDate.getTime() - startDate.getTime()) / millDay) + 1
            let total = location.rate * days

            if (formik.values.total !== total && formik.values.days !== days) {
                formik.setFieldValue('rate', location.rate)
                formik.setFieldValue('days', days)
                const t = parseFloat(total).toFixed(2)
                formik.setFieldValue('total', parseFloat(t))
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
                        label='Rate'
                        name="rate"
                        type='number'
                        value={formik.values.rate}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} md={1}>
                    <TextField
                        fullWidth
                        label='Days'
                        name="days"
                        type='number'
                        value={formik.values.days}
                        disabled
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

AddLodging.propTypes = {
    handleAddItem: PropTypes.func,
    setAddItemClicked: PropTypes.func
};

export default AddLodging;
