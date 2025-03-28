import React, {useState} from "react";
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
import {useTheme} from "@mui/material/styles";
import {ThemeMode} from "../../../../config";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

export default function MiscellaneousCard({retirementData, advanceData}) {
    const [expandedFile, setExpandedFile] = useState(null);
    const theme = useTheme();

    const handleFileClick = (file) => {
        setExpandedFile(expandedFile === file ? null : file);
    };

    const sxDivider = {
        borderColor: theme.palette.mode === ThemeMode.DARK ? "divider" : "primary.light"
    };

    return (
        <SubCard title="Miscellaneous" content={false} sx={{p: 2}}>
            <Grid item xs={12} sx={{mb: 2, mt: 2}}>
                <TableContainer>
                    {/* Table for Advance Data */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{width: "25%"}}>Amount</TableCell>
                                <TableCell sx={{width: "75%"}}>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {advanceData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.amount || ""}</TableCell>
                                    <TableCell>{row.description?.title || ""}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Retirements Section */}
                    <Typography sx={{ml: 2, mb: 2, mt: 4}} variant="h5" align="left">
                        Retirements
                    </Typography>
                    <Divider sx={sxDivider}/>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{width: "25%"}}>Amount Spent</TableCell>
                                <TableCell sx={{width: "25%"}}>Description</TableCell>
                                <TableCell sx={{width: "50%"}}>File</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {retirementData && retirementData.map((row, index) => (
                                <React.Fragment key={index}>
                                    <TableRow>
                                        <TableCell>{row.amountSpent || ""}</TableCell>

                                        {/* Description with Tooltip & Ellipsis */}
                                        <TableCell>
                                            <Tooltip title={row.description || ""} arrow placement="top">
                                                <Typography
                                                    sx={{
                                                        maxWidth: 200,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        cursor: "pointer",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    {row.description || ""}
                                                </Typography>
                                            </Tooltip>
                                        </TableCell>

                                        {/* File Name with Tooltip & Clickable Preview */}
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
                                            <TableCell colSpan={3}>
                                                <Box sx={{ textAlign: "center", p: 2 }}>
                                                    {row.file.type?.includes("image") ? (
                                                        <img
                                                            src={URL.createObjectURL(row.file)}
                                                            alt="Preview"
                                                            style={{ maxWidth: "100%", maxHeight: "500px" }}
                                                        />
                                                    ) : (
                                                        <iframe
                                                            src={URL.createObjectURL(row.file)}
                                                            width="100%"
                                                            height="500px"
                                                            title="File Preview"
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