import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SubCard from "../cards/SubCard";
import Typography from "@mui/material/Typography";

function LodgingCard({ data = [], onUpdate }) {
    const [lodgingData, setLodgingData] = useState(
        data.map(() => ({ amountSpent: "", comment: "", file: null }))
    );

    const handleChange = (index, field, value) => {
        setLodgingData(prevData => {
            const updatedData = [...prevData];
            updatedData[index][field] = value;
            return updatedData;
        });

        // Notify the parent component about the change
        onUpdate(index, field, value);
    };

    return (
        <SubCard title="Lodging" content={false} sx={{ p: 2 }}>
            <Grid container sx={{ p: 2 }}>
                {data.map((row, index) => (
                    <Grid item xs={12} key={index} container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                label="Location"
                                disabled
                                fullWidth
                                value={row.location.town || ""}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Check-in Date"
                                disabled
                                fullWidth
                                value={row.startDate || ""}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Check-out Date"
                                disabled
                                fullWidth
                                value={row.endDate || ""}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Total"
                                disabled
                                fullWidth
                                value={row.total || ""}
                                variant="outlined"
                            />
                        </Grid>

                        {/* Editable Fields */}
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Amount Spent"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={lodgingData[index]?.amountSpent || ""}
                                onChange={(e) => handleChange(index, "amountSpent", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                label="Comment"
                                variant="outlined"
                                fullWidth
                                rows={2}
                                value={lodgingData[index]?.comment || ""}
                                onChange={(e) => handleChange(index, "comment", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} container justifyContent="flex-end" alignItems="center">
                            {lodgingData[index]?.file && (
                                <Typography variant="body2" sx={{ mt: 1, ml: 2 }}>
                                    Selected File: {lodgingData[index].file.name}
                                </Typography>
                            )}
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
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </SubCard>
    );
}

export default LodgingCard;