
import SubCard from "../../cards/SubCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function IncidentalCard({ data }) {
    return (
        <SubCard title="Meals & Incidental" content={false} sx={{ p: 2 }}>
            <TableContainer component={Paper} sx={{ mb: 2, mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Location</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.location?.town || ""}</TableCell>
                                <TableCell>{row.amount || ""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </SubCard>
    );
}