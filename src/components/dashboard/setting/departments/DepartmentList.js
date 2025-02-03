'use client';

// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// table data
function createData(shortName, name, employeesCount) {
    return {shortName, name, employeesCount};
}

const rows = [
    createData('SD', 'Software Development', 5),
    createData('ITSS', 'IT Services and Support', 30),
    createData('TAD', 'Talent Acquisition and Development', 3),
    createData('AM', 'Asset Management', 3),
    createData('Procurement', 'Procurement', 4)
];

function DepartmentList() {
    return (
        <TableContainer>
            <Table sx={{minWidth: 350}} aria-label="department table">
                <TableHead>
                    <TableRow>
                        <TableCell>Short name</TableCell>
                        <TableCell>Department name</TableCell>
                        <TableCell align="right">Number of employees</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow hover key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.shortName}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.employeesCount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DepartmentList;
