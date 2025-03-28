import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SubCard from "../../cards/SubCard";
import AddReLodging from "./AddRetirementLodging";
import Lodging from "../lodging/Lodging";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function LodgingRetirementCard({ data, setData }) {
    const [lodgingRetirementData, setLodgingRetirementData] = useState([]);
    const [addLodgingClicked, setRetireItemClicked] = useState(false);

    const deleteRetirementLodging = (id) => {
        setLodgingRetirementData(lodgingRetirementData.filter((item) => item.id !== id));
    };

    const handleRetireItem = (data) => {
        const updatedData = [
            ...lodgingRetirementData,
            {
                id: data._id,
                amountSpent: data.amountSpent,
                lodgeName: data.lodgeName,
                comment: data.comment,
                file: data.file,
            },
        ];
        setLodgingRetirementData(updatedData);
        setData(updatedData);
        setRetireItemClicked(false);
    };

    useEffect(() => {
        setData([...lodgingRetirementData]);
    }, [lodgingRetirementData]);

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
                        {data.map((row, index) => (
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
            <Lodging data={lodgingRetirementData} deleteRetirementLodging={deleteRetirementLodging} />
            {addLodgingClicked ? (
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <AddReLodging handleRetireItem={handleRetireItem} setRetireItemClicked={setRetireItemClicked} />
                </Grid>
            ) : (
                <Grid item xs={12} sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="text" onClick={() => setRetireItemClicked(true)}>
                        + Add Retirement
                    </Button>
                </Grid>
            )}
        </SubCard>
    );
}