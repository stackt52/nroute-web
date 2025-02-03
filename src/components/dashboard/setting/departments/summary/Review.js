import * as React from 'react';

// material-ui
import DepartmentChart from "./DepartmentChart";
import Typography from "@mui/material/Typography";



export default function Review() {
    return (
        <>
            <Typography variant="h5" gutterBottom sx={{mb: 2}}>
                Software Engineer Departments
            </Typography>
            <DepartmentChart/>
        </>
    );
}
