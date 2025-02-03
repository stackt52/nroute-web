'use client';

// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {useSelector} from "../../../../store";


function CostCenterList() {
    const costCenter = useSelector((state) => state.costCenter);

    return (
        <TableContainer>
            <Table sx={{minWidth: 350}} aria-label="cost center table">
                <TableHead>
                    <TableRow>
                        <TableCell>Short name</TableCell>
                        <TableCell>Cost center name</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell align="right" sx={{pr: 3}}/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {costCenter.map((row) => (
                        <TableRow hover key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.shortName}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.owner}</TableCell>
                            <TableCell sx={{pr: 1}} align="right">
                                <IconButton color="error" size="small" >
                                    <DeleteTwoToneIcon fontSize="small"/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CostCenterList;
