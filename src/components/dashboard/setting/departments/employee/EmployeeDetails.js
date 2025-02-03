import Grid from "@mui/material/Grid";
import SubCard from "../../../../ui-component/cards/SubCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";
import {gridSpacing} from "../../../../../store/constant";
import PropTypes from "prop-types";
import * as yup from "yup";
import Button from "@mui/material/Button";
import EmployeeList from "./EmployeeList";
import Stack from "@mui/material/Stack";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";


function createData(firstName, lastName, email) {
    return {
        firstName,
        lastName,
        email,
        isSupervisor: false,
    };
}

// table data
const employees = [
    createData('James', 'Banda', 'james@email.com'),
    createData('Juma', 'Phiri', 'jp@ihmafrica.org'),
    createData('Kelvin', 'Sikwibele', 'kv@ihmafrica.org'),
    createData('Fatima', 'Chisenga', 'ft@ihmafrica.org'),
    createData('David', 'Mwaifunga', 'david'),
    createData('Justin', 'Silupumbwe', 'justin@ihmafrica.org'),
    createData('Patrick', 'Banda', 'patrick@ihmafrica.org'),
    createData('Jelidah', 'Nanyangwe', 'nanyangwe.j@ihmafrica.org'),
    createData('Ketty', 'Banda', 'k.banda@ihmafrica.org'),
    createData('Lisa', 'Ngenda', 'lisa.ngenda@ihmafrica'),
    createData('Vincent', 'Sikwibele', 'vincent@ihmafrica.org'),
    createData('Vimbanashi', 'Tsododo', 'vimbanashi@ihmafrica.org'),
    createData('Sicelo', 'Kunene', 'sicelo@ihmafrica.org')
];

const validationSchema = yup.object({
    shortName: yup.string().required('Short name is required'),
    name: yup.string().required('Department name is required')
});

const EmployeeDetails = ({employeeData, setEmployeeData, handleNext, handleBack, setErrorIndex, formRef}) => {
    return (
        <>
            <Typography variant="h5" gutterBottom sx={{mb: 2}}>
                Software Engineering Employees
            </Typography>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={6}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={employees}
                        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                        renderInput={(params) => <TextField {...params} label="Search employee to add"/>}
                    />
                </Grid>
                <Grid item xs={6} lg={6}>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="Is supervisor"/>
                    <Button variant="contained" color="primary">Add employee</Button>
                </Grid>
                <Grid item xs={6}>
                    <EmployeeList/>
                </Grid>
            </Grid>

            <input type='submit' style={{display: 'none'}} ref={formRef}/>

            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between">
                    <Button onClick={handleBack} sx={{my: 3, ml: 1}}>
                        Back
                    </Button>
                    <AnimateButton>
                        <Button variant="contained" type="submit" sx={{my: 3, ml: 1}}
                                onClick={() => handleNext()}>
                            Next
                        </Button>
                    </AnimateButton>
                </Stack>
            </Grid>
        </>
    )
}


EmployeeDetails.propTypes = {
    employeeData: PropTypes.object,
    setEmployeeData: PropTypes.func,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    setErrorIndex: PropTypes.func,
    formRef: PropTypes.object,
};

export default EmployeeDetails;

