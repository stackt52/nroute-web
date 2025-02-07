import SubCard from "../../cards/SubCard";
import Grid from "@mui/material/Grid";
import {gridSpacing} from "../../../../store/constant";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import React, {useRef, useState} from "react";
import {useSelector} from "../../../../store";
import {useFormik} from "formik";
import * as yup from 'yup';
import {TADetails} from "../../../../schema";

// yup validation-schema
const validationSchema = TADetails

export default function DetailsCard({setData, formRef}) {

    const localLocation = useSelector((state) => state.localLocation);
    const costCenter = useSelector((state) => state.costCenter);

    const formik = useFormik({
        initialValues: {
            officialStation: null,
            dateOfTravel: null,
            destination: null,
            costCenter: null,
            purpose: ''
        },
        validationSchema,
        onSubmit: (values) => {
            if (values) {
                const {officialStation, dateOfTravel, destination, costCenter, purpose} = values;
                const data = {
                    officialStation,
                    dateOfTravel: dateOfTravel.toISOString().split('T')[0],
                    destination: destination,
                    costCenter,
                    purpose
                }
                setData(data);
            }
        }
    });

    return (
        <SubCard title='Travel Information' darkTitle>
            <Grid component='form' container spacing={gridSpacing} onSubmit={formik.handleSubmit}>
                <Grid item xs={12} md={4}>
                    <Stack>
                        <Autocomplete
                            fullWidth
                            disableClearable
                            filterSelectedOptions
                            options={localLocation}
                            id="officialStation"
                            label='Official station'
                            name="officialStation"
                            value={formik.values.officialStation}
                            onChange={(e, value) => formik.setFieldValue('officialStation', value)}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            placeholder="Select official Station"
                            getOptionLabel={(option) => option.town || ''}
                            renderOption={(props, option) => (
                                <li {...props}>
                                    <ListItemText primary={option.town}
                                                  secondary={option.province}/>
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id='officialStation'
                                    name="officialStation"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.officialStation && Boolean(formik.errors.officialStation)}
                                    helperText={formik.touched.officialStation && formik.errors.officialStation}
                                    label="Official station"/>
                            )}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack>
                        <DatePicker
                            fullWidth
                            disablePast
                            id="dateOfTravel"
                            label='Date of Travel'
                            name="dateOfTravel"
                            value={formik.values.dateOfTravel}
                            onChange={value => formik.setFieldValue('dateOfTravel', value)}
                            onBlur={formik.handleBlur}
                            slotProps={{
                                textField: {
                                    id: 'dateOfTravel',
                                    name: 'dateOfTravel',
                                    variant: "outlined",
                                    onBlur: formik.handleBlur,
                                    error: formik.touched.dateOfTravel && Boolean(formik.errors.dateOfTravel),
                                    helperText: formik.touched.dateOfTravel && formik.errors.dateOfTravel
                                }
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack>
                        <Autocomplete
                            fullWidth
                            disableClearable
                            filterSelectedOptions
                            options={localLocation}
                            id="destination"
                            label='Destination'
                            name="destination"
                            value={formik.values.destination}
                            onChange={(e, value) => formik.setFieldValue('destination', value)}
                            onBlur={formik.handleBlur}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            placeholder="Select destination"
                            getOptionLabel={(option) => option.town}
                            renderOption={(props, option) => (
                                <li key={option.id} {...props}>
                                    <ListItemText primary={option.town}
                                                  secondary={option.province}/>
                                </li>
                            )}
                            renderInput={(params) =>
                                <TextField {...params}
                                           id='destination'
                                           name="destination"
                                           error={formik.touched.destination && Boolean(formik.errors.destination)}
                                           helperText={formik.touched.destination && formik.errors.destination}
                                           label="Destination"/>
                            }
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack>
                        <Autocomplete
                            fullWidth
                            disableClearable
                            filterSelectedOptions
                            options={costCenter}
                            id="costCenter"
                            name="costCenter"
                            label="Cost center"
                            value={formik.values.costCenter}
                            onChange={(e, value) => formik.setFieldValue('costCenter', value)}
                            onBlur={formik.handleBlur}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            placeholder="Select cost center"
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) =>
                                <TextField {...params}
                                           id='costCenter'
                                           name="costCenter"
                                           onBlur={formik.handleBlur}
                                           error={formik.touched.costCenter && Boolean(formik.errors.costCenter)}
                                           helperText={formik.touched.costCenter && formik.errors.costCenter}
                                           label="Cost center"/>
                            }
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Stack>
                        <TextField
                            fullWidth
                            id="purpose"
                            name="purpose"
                            label="Purpose"
                            multiline
                            value={formik.values.purpose}
                            onBlur={formik.handleBlur}
                            error={formik.touched.purpose && Boolean(formik.errors.purpose)}
                            helperText={formik.touched.purpose && formik.errors.purpose}
                            onChange={formik.handleChange}
                            placeholder="Purpose of trip"
                        />
                    </Stack>
                </Grid>
                <input type='submit' style={{display: 'none'}} ref={formRef}/>
            </Grid>
        </SubCard>
    )
}