import Grid from "@mui/material/Grid";
import {gridSpacing} from "../../../../store/constant";
import TextField from "@mui/material/TextField";
import React from "react";

export default function NewCostCenter() {
    return <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={6}>
            <TextField
                fullWidth
                id="shortCode"
                label='Short code'
                name="shortCode"
                placeholder="Enter cost center code"
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                fullWidth
                id="name"
                label='Name'
                name="name"
                placeholder="Enter cost center name"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                fullWidth
                id="owner"
                label='Cost center owner'
                name="owner"
                placeholder="Enter cost center owner"
            />
        </Grid>
    </Grid>
}