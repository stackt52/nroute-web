import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SubCard from "../cards/SubCard";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function MiscellaneousCard({ retirementData, advanceData, onCommentChange }) {
    const [expandedFile, setExpandedFile] = useState(null);
    const [comment, setComment] = useState("");

    const handleFileClick = (file) => {
        setExpandedFile(expandedFile === file ? null : file);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
        onCommentChange(e.target.value);
    };


    return (
        <SubCard title="Miscellaneous" content={false} sx={{ p: 2 }}>
            <Grid item xs={12} container spacing={2} sx={{ mb: 2, mt: 2 }}>
                {advanceData.map((row, index) => (
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
                    </Grid>
                ))}
            </Grid>
            {retirementData.length ? (
                <Grid item xs={12}>
                    <Typography variant="h2" align="center">Retirements</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Amount Spent</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>File</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {retirementData.map((row, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <TableCell>{row.amountSpent}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>
                                                {row.file ? (
                                                    <Typography
                                                        sx={{ cursor: "pointer", color: "blue" }}
                                                        onClick={() => handleFileClick(row.file)}
                                                    >
                                                        Preview Attachment
                                                    </Typography>
                                                ) : (
                                                    "No file uploaded"
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        {expandedFile === row.file && (
                                            <TableRow>
                                                <TableCell colSpan={3}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            padding: 2,
                                                        }}
                                                    >
                                                        {row.file.type.includes("image") ? (
                                                            <img
                                                                src={URL.createObjectURL(row.file)}
                                                                alt="Full size"
                                                                style={{ maxWidth: "100%", maxHeight: "500px" }}
                                                            />
                                                        ) : (
                                                            <iframe
                                                                src={URL.createObjectURL(row.file)}
                                                                width="100%"
                                                                height="500px"
                                                                title="PDF Preview"
                                                            />
                                                        )}
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            ) : null}

            {/* Comment Input Field */}
            <TextField
                label="Comment"
                fullWidth
                multiline
                rows={3}
                value={comment}
                onChange={handleCommentChange}
            />
        </SubCard>
    );
}