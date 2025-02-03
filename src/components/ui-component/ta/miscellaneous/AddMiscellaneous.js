'use client';

import PropTypes from 'prop-types';
import {useEffect} from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';

// project imports
import * as yup from 'yup';
import {gridSpacing} from 'store/constant';
import {useSelector} from "../../../../store";
import {useFormik} from "formik";
import {randomKey} from "../../../../utils/key-generator";

const validationSchema = yup.object({
    description: yup.object().required('Location is required'),
    amount: yup.number().min(0.1, 'Invalid amount').required('Amount is required'),
})

const filter = createFilterOptions();

function AddMiscellaneous({handleAddItem, setAddItemClicked}) {
    const miscellaneous = useSelector((state) => state.miscellaneous);
    const formik = useFormik({
        initialValues: {
            description: null,
            amount: 0.1
        },
        validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            if (values) {
                const {description, amount} = values;
                const data = {
                    _id: randomKey(),
                    description,
                    amount: parseFloat(amount),
                };
                handleAddItem(data);
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={9}>
                    <Autocomplete
                        fullWidth
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        freeSolo
                        id="description"
                        options={miscellaneous}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                formik.setFieldValue('description', {title: newValue, id: randomKey(), amount: 0.1});
                            } else if (newValue && newValue.inputValue) {
                                // Create a new value from the user input
                                formik.setFieldValue('description', {
                                    title: newValue.inputValue,
                                    id: randomKey(),
                                    amount: 0.1
                                });
                            } else {
                                formik.setFieldValue('description', newValue);
                                if (newValue)
                                    formik.setFieldValue('amount', newValue.amount);
                            }
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            const {inputValue} = params;
                            // Suggest the creation of a new value
                            const isExisting = options.some((option) => inputValue === option.title);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    title: `Add "${inputValue}"`,
                                });
                            }
                            return filtered;
                        }}
                        getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // Regular option
                            return option.title;
                        }}
                        renderOption={(props, option) => {
                            const {key, ...optionProps} = props;
                            return (
                                <li key={key} {...optionProps}>
                                    {option.title}
                                </li>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Description"
                                id='description'
                                name="description"
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}/>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        id="amount"
                        label="Amount"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="amount"
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                        alue={formik.values.amount}/>
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

AddMiscellaneous.propTypes = {
    handleAddItem: PropTypes.func,
    setAddItemClicked: PropTypes.func
};

export default AddMiscellaneous;
