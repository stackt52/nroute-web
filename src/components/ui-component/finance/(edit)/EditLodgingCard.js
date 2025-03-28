import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SubCard from "../../cards/SubCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export default function EditLodgingCard({ data, advanceData, setData }) {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    const fileInputRef = useRef(null);

    const handleEditClick = (index, row) => {
        setEditingIndex(index);
        setEditedData(row); // Initialize editedData with the current row data
    };

    const handleSaveClick = (index) => {
        setData((prevData) => {
            const newData = [...prevData]; // Copy previous state
            newData[index] = { ...editedData }; // Update specific row
            return newData;
        });

        setEditingIndex(null);
    };

    const handleChange = (e, field) => {
        setEditedData({ ...editedData, [field]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedData({ ...editedData, file });
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <SubCard title="Lodging" content={false} sx={{ p: 2 }}>
            <TableContainer component={Paper} sx={{ mb: 2, mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Location</TableCell>
                            <TableCell>Check-in Date</TableCell>
                            <TableCell>Check-out Date</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {advanceData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.location?.town || ""}</TableCell>
                                <TableCell>{row.startDate || ""}</TableCell>
                                <TableCell>{row.endDate || ""}</TableCell>
                                <TableCell>{row.total || ""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Amount Spent</TableCell>
                                <TableCell>Lodge Name</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>File</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {editingIndex === index ? (
                                            <TextField
                                                value={editedData.amountSpent || ""}
                                                onChange={(e) => handleChange(e, "amountSpent")}
                                            />
                                        ) : (
                                            row.amountSpent
                                        )}
                                    </TableCell>

                                    {/* Lodge Name with Tooltip & Ellipsis */}
                                    <TableCell>
                                        {editingIndex === index ? (
                                            <TextField
                                                value={editedData.lodgeName || ""}
                                                onChange={(e) => handleChange(e, "lodgeName")}
                                            />
                                        ) : (
                                            <Tooltip title={row.lodgeName || ""} arrow placement="top">
                                                <Typography
                                                    sx={{
                                                        maxWidth: 200,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    {row.lodgeName || ""}
                                                </Typography>
                                            </Tooltip>
                                        )}
                                    </TableCell>

                                    {/* Comment with Tooltip & Ellipsis */}
                                    <TableCell>
                                        {editingIndex === index ? (
                                            <TextField
                                                value={editedData.comment || ""}
                                                onChange={(e) => handleChange(e, "comment")}
                                            />
                                        ) : (
                                            <Tooltip title={row.comment || ""} arrow placement="top">
                                                <Typography
                                                    sx={{
                                                        maxWidth: 200,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    {row.comment || ""}
                                                </Typography>
                                            </Tooltip>
                                        )}
                                    </TableCell>

                                    {/* File Name with Tooltip & Ellipsis */}
                                    <TableCell>
                                        {editingIndex === index ? (
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <IconButton onClick={triggerFileInput}>
                                                    <UploadFileIcon />
                                                </IconButton>
                                                <input
                                                    type="file"
                                                    hidden
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                />
                                                <Tooltip title={editedData.file?.name || "No file uploaded"} arrow placement="top">
                                                    <span
                                                        style={{
                                                            marginLeft: "8px",
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            maxWidth: "150px",
                                                        }}
                                                    >
                                                        {editedData.file ? editedData.file.name : "No file uploaded"}
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        ) : (
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <UploadFileIcon />
                                                <Tooltip title={row.file?.name || "No file uploaded"} arrow placement="top">
                                                    <span
                                                        style={{
                                                            marginLeft: "8px",
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            maxWidth: "150px",
                                                        }}
                                                    >
                                                        {row.file ? row.file.name : "No file uploaded"}
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        )}
                                    </TableCell>

                                    <TableCell sx={{ pr: 1 }} align="right">
                                        {editingIndex === index ? (
                                            <Button onClick={() => handleSaveClick(index)}>Update</Button>
                                        ) : (
                                            <IconButton
                                                color="primary"
                                                size="small"
                                                onClick={() => handleEditClick(index, row)}
                                            >
                                                <EditTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </SubCard>
    );
}