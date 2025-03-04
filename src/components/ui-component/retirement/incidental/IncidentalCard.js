// material-ui
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from "react";
import SubCard from "../../cards/SubCard";
import TextField from "@mui/material/TextField";


// ==============================|| DISPLAY INCIDENTAL DATA ||============================== //

function IncidentalCard({data}) {
    return (
        <>
            <SubCard title="Meals & Incidental" content={false} sx={{p: 2}}>
                <Grid item xs={12} container spacing={2} sx={{ mb: 2, mt: 2 }}>
                    {data.map((row, index) => (
                        <Grid item xs={12} key={index} container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    label="Location"
                                    disabled
                                    fullWidth
                                    value={row.location.town || ""}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Amount"
                                    disabled
                                    fullWidth
                                    value={row.amount || ""}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </SubCard>
        </>
    )
        ;
}

export default IncidentalCard;
