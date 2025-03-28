import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import SubCard from "../../cards/SubCard";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeMode } from "../../../../config";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

export default function LodgingCard({ retirementData, advanceData, onCommentChange }) {
    const [expandedFile, setExpandedFile] = useState(null);
    const theme = useTheme();

    const handleFileClick = (file) => {
        setExpandedFile(expandedFile === file ? null : file);
    };

    const sxDivider = {
        borderColor: theme.palette.mode === ThemeMode.DARK ? "divider" : "primary.light"
    };

    return (
        <SubCard title="Lodging" content={false} sx={{ p: 2 }}>
            {/* Table for Advance Data */}
            <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "25%" }}>Total</TableCell>
                                <TableCell sx={{ width: "25%" }}>Location</TableCell>
                                <TableCell sx={{ width: "25%" }}>Check-in Date</TableCell>
                                <TableCell sx={{ width: "25%" }}>Check-out Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {advanceData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.total || ""}</TableCell>
                                    <TableCell>{row.location.town || ""}</TableCell>
                                    <TableCell>{row.startDate || ""}</TableCell>
                                    <TableCell>{row.endDate || ""}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Table for Retirement Data */}
            <Grid item xs={12}>
                <Typography sx={{ ml: 2, mb: 2, mt: 4 }} variant="h5" align="left">
                    Retirements
                </Typography>
                <Grid item xs={12}>
                    <Divider sx={sxDivider} />
                </Grid>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "25%" }}>Amount Spent</TableCell>
                                <TableCell sx={{ width: "25%" }}>Lodge Name</TableCell>
                                <TableCell sx={{ width: "50%" }}>File</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {retirementData.map((row, index) => (
                                <React.Fragment key={index}>
                                    <TableRow>
                                        <TableCell>{row.amountSpent}</TableCell>

                                        {/* Lodge Name with Tooltip */}
                                        <TableCell>
                                            <Tooltip title={row.lodgeName} arrow placement="top">
                                                <Typography
                                                    sx={{
                                                        maxWidth: 200,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {row.lodgeName}
                                                </Typography>
                                            </Tooltip>
                                        </TableCell>

                                        {/* File Name with Tooltip and Clickable Preview */}
                                        <TableCell>
                                            {row.file ? (
                                                <Tooltip title={row.file.name} arrow placement="top">
                                                    <Typography
                                                        sx={{
                                                            cursor: "pointer",
                                                            maxWidth: 200,
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap"
                                                        }}
                                                        onClick={() => handleFileClick(row.file)}
                                                    >
                                                        Preview Attachment
                                                    </Typography>
                                                </Tooltip>
                                            ) : (
                                                "No file uploaded"
                                            )}
                                        </TableCell>
                                    </TableRow>

                                    {/* File Preview (Expanded on Click) */}
                                    {expandedFile === row.file && (
                                        <TableRow>
                                            <TableCell colSpan={4}>
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
        </SubCard>
    );
}