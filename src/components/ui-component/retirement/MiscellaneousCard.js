import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SubCard from "../cards/SubCard";
import Typography from "@mui/material/Typography";

// ==============================|| DISPLAY MISCELLANEOUS DATA ||============================== //

function MiscellaneousCard({ data = [], onUpdate }) {
    const [miscellaneousData, setMiscellaneousData] = useState(
        data.map(() => ({ amountSpent: "", comment: "", file: null }))
    );

    const handleChange = (index, field, value) => {
        setMiscellaneousData(prevData => {
            const updatedData = [...prevData];
            updatedData[index][field] = value;
            return updatedData;
        });

        // Notify the parent component about the change
        onUpdate(index, field, value);
    };

    return (
        <SubCard title="Miscellaneous" content={false} sx={{ p: 3 }}>
            <Grid container sx={{ p: 2 }}>
                {data.map((row, index) => (
                    <Grid item xs={12} key={index} container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                            <TextField
                                label="Description"
                                disabled
                                fullWidth
                                value={row.description.title || ""}
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

                        {/* Editable Fields */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Amount Spent"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={miscellaneousData[index]?.amountSpent || ""}
                                onChange={(e) => handleChange(index, "amountSpent", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Comment"
                                variant="outlined"
                                fullWidth
                                rows={2}
                                value={miscellaneousData[index]?.comment || ""}
                                onChange={(e) => handleChange(index, "comment", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} container justifyContent="flex-end" alignItems="center">
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ ml: 2 }}
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleChange(index, "file", e.target.files[0])}
                                />
                            </Button>
                            {miscellaneousData[index]?.file && (
                                <Typography variant="body2" sx={{ mt: 1, ml: 2 }}>
                                    Selected File: {miscellaneousData[index].file.name}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </SubCard>
    );
}

export default MiscellaneousCard;
