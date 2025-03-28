'use client';

import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// project imports
import * as yup from 'yup';
import { gridSpacing } from 'store/constant';
import { useFormik } from 'formik';
import { randomKey } from '../../../../utils/key-generator';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Typography from "@mui/material/Typography";

const validationSchema = yup.object({
    amountSpent: yup.number().required('Amount Spent is required'),
    lodgeName: yup.string().required('Lodge Name is required'),
    file: yup.mixed().required('File is required'),
});

function AddRetirementLodging({ handleRetireItem, setRetireItemClicked }) {
    const formik = useFormik({
        initialValues: {
            amountSpent: '',
            lodgeName: '',
            comment: '',
            file: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const { amountSpent, lodgeName, comment, file } = values;
            const data = {
                _id: randomKey(),
                amountSpent,
                lodgeName,
                comment,
                file
            };
            handleRetireItem(data);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        label="Amount Spent"
                        id="amountspent"
                        name="amountSpent"
                        type="number"
                        value={formik.values.amountSpent || ''}
                        onChange={(e) => {
                            formik.setFieldValue("amountSpent", e.target.value ? parseFloat(e.target.value) : '');
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.touched.amountSpent && Boolean(formik.errors.amountSpent)}
                        helperText={formik.touched.amountSpent && formik.errors.amountSpent}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        label="Lodge Name"
                        id="lodgename"
                        name="lodgeName"
                        value={formik.values.lodgeName || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lodgeName && Boolean(formik.errors.lodgeName)}
                        helperText={formik.touched.lodgeName && formik.errors.lodgeName}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Comment"
                        id="comment"
                        name="comment"
                        value={formik.values.comment || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.comment && Boolean(formik.errors.comment)}
                        helperText={formik.touched.comment && formik.errors.comment}
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {formik.values.file && (
                            <Typography variant="body1"
                                        sx={{
                                            flexGrow: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '150px'
                                        }}>
                                {formik.values.file.name}
                            </Typography>
                        )}
                        <Button variant="contained" component="label">
                            <UploadFileIcon />
                            <input
                                type="file"
                                hidden
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    formik.setFieldValue("file", file);
                                }}
                            />
                        </Button>
                    </Stack>
                    {formik.touched.file && formik.errors.file && (
                        <Typography variant="caption" color="error">
                            {formik.errors.file}
                        </Typography>
                    )}
                </Grid>

                <Grid item container justifyContent="flex-end">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button color="error" onClick={() => setRetireItemClicked(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" size="small" type="submit">
                            Add
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
}

AddRetirementLodging.propTypes = {
    handleRetireItem: PropTypes.func,
    setRetireItemClicked: PropTypes.func
};

export default AddRetirementLodging;