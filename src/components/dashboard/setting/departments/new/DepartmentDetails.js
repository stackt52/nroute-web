import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// project imports
import AnimateButton from 'components/ui-component/extended/AnimateButton';

// third-party
import {useFormik} from 'formik';
import * as yup from 'yup';
import React, {useRef} from "react";

const validationSchema = yup.object({
    shortName: yup.string().required('Short name is required'),
    name: yup.string().required('Department name is required')
});


const DepartmentDetails = ({departmentData, setDepartmentData, handleNext, setErrorIndex, formRef}) => {
    const formik = useFormik({
        initialValues: {
            shortName: departmentData.shortName,
            name: departmentData.name
        },
        validationSchema,
        onSubmit: (values) => {
            setDepartmentData({
                shortName: values.shortName,
                name: values.name
            });
            setErrorIndex(0)
            handleNext();
        }
    });

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{mb: 2}}>
                Department details
            </Typography>
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="shortName"
                            name="shortName"
                            label="Short name *"
                            value={formik.values.shortName}
                            onChange={formik.handleChange}
                            error={formik.touched.shortName && Boolean(formik.errors.shortName)}
                            helperText={formik.touched.shortName && formik.errors.shortName}
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="name"
                            name="name"
                            label="Name *"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            fullWidth
                            autoComplete="family-name"
                        />
                    </Grid>

                    <input type='submit' style={{display: 'none'}} ref={formRef}/>

                </Grid>
            </form>
        </>
    );
};

DepartmentDetails.propTypes = {
    departmentData: PropTypes.object,
    setDepartmentData: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func,
    formRef: PropTypes.object
};

export default DepartmentDetails;
