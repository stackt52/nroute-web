import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SubCard from "../../cards/SubCard";
import AddRetirementMiscellaneous from "components/ui-component/retirement/miscellaneous/AddRetirementMiscellaneous";
import Miscellaneous from "./Miscellaneous";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function MiscellaneousTACard({ data, setData }) {
    const [miscellaneousRetirementData, setMiscellaneousRetirementData] = useState([]);
    const [addMiscellaneousClicked, setRetireItemClicked] = useState(false);

    const deleteMiscellaneousRetirement = (id) => {
        setMiscellaneousRetirementData(miscellaneousRetirementData.filter((item) => item.id !== id));
    };

    const handleRetireItem = (data) => {
        setMiscellaneousRetirementData([
            ...miscellaneousRetirementData,
            {
                id: data._id,
                amountSpent: data.amountSpent,
                description: data.description,
                comment: data.comment,
                file: data.file,
            },
        ]);
        setRetireItemClicked(false);
    };

    useEffect(() => {
        setData([...miscellaneousRetirementData]);
    }, [miscellaneousRetirementData]);

    return (
        <SubCard title="Miscellaneous" content={false} sx={{ p: 2 }}>
            <TableContainer component={Paper} sx={{ mb: 2, mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.description?.title || ""}</TableCell>
                                <TableCell>{row.amount || ""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Miscellaneous data={miscellaneousRetirementData} deleteMiscellaneousRetirement={deleteMiscellaneousRetirement} />
        </SubCard>
    );
}