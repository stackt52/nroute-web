import React, {useState, useRef} from "react";
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
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function EditMiscellaneousCard({data, advanceData, setData}) {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    const fileInputRef = useRef(null);

    const handleEditClick = (index, row) => {
        setEditingIndex(index);
        setEditedData(row); // Initialize editedData with the current row data
    };

    const handleSaveClick = (index) => {
        // Create a copy of the current data array
        const newData = [...data];

        // Update the specific row with the edited data
        newData[index] = editedData;

        // Call setData to update the parent state
        setData(newData);

        // Exit edit mode
        setEditingIndex(null);
    };

    const handleChange = (e, field) => {
        // Update the editedData state as the user types
        setEditedData({...editedData, [field]: e.target.value});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Update the editedData state with the new file
            setEditedData({...editedData, file});
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <SubCard title="Miscellaneous" content={false} sx={{p: 2}}>
            <TableContainer component={Paper} sx={{mb: 2, mt: 2}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: "25%"}}>Amount</TableCell>
                            <TableCell sx={{width: "25%"}}>Description</TableCell>
                            <TableCell sx={{width: "50%"}}>&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {advanceData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.amount || ""}</TableCell>
                                <TableCell>{row.description?.title || ""}</TableCell>
                                <TableCell>&nbsp;</TableCell>
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
                                <TableCell sx={{width: "25%"}}>Amount Spent</TableCell>
                                <TableCell sx={{width: "25%"}}>Description</TableCell>
                                <TableCell sx={{width: "50%"}}>File</TableCell>
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
                                    <TableCell>
                                        {editingIndex === index ? (
                                            <TextField
                                                value={editedData.description || ""}
                                                onChange={(e) => handleChange(e, "description")}
                                            />
                                        ) : (
                                            <Tooltip title={row.description || ""} arrow placement="top">
                                                <div style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: "200px",
                                                }}>
                                                    {row.description}
                                                </div>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingIndex === index ? (
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <IconButton onClick={triggerFileInput}>
                                                    <UploadFileIcon/>
                                                </IconButton>
                                                <input
                                                    type="file"
                                                    hidden
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                />
                                                <Tooltip
                                                    title={editedData.file ? editedData.file.name : "No file uploaded"}
                                                    arrow placement="top">
                                                                <span style={{
                                                                    marginLeft: "8px",
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    maxWidth: "200px",
                                                                }}>
                                                                {editedData.file ? editedData.file.name : "No file uploaded"}
                                                            </span>
                                                </Tooltip>
                                            </div>
                                        ) : (
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <UploadFileIcon/>
                                                <Tooltip title={row.file ? row.file.name : "No file uploaded"} arrow
                                                         placement="top">
                        <span style={{
                            marginLeft: "8px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "200px",
                        }}>
                            {row.file ? row.file.name : "No file uploaded"}
                        </span>
                                                </Tooltip>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{pr: 1}} align="right">
                                        {editingIndex === index ? (
                                            <Button onClick={() => handleSaveClick(index)}>Update</Button>
                                        ) : (
                                            <>
                                                <IconButton
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleEditClick(index, row)}
                                                >
                                                    <EditTwoToneIcon fontSize="small"/>
                                                </IconButton>
                                            </>
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