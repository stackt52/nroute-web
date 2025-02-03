// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import Chip from "../../ui-component/extended/Chip";

// table data
function createData(submittedDate, destination, trip, tripDate, amount, balanceDue, status) {
    return {submittedDate, destination, trip, tripDate, amount, balanceDue, status};
}

const rows = [
    createData('11/10/2024', 'Durban, South Africa', '2024 Interoperability workshop', '08/09/2024', '$3,500', '-$150', 'pending'),
    createData('10/10/2024', 'Luapula', 'Site visit', '12/06/2024', 'K2,450', 'K500.50', 'paid'),
    createData('09/10/2024', 'Livingstone', 'IAF TWG meeting', '24/05/2024', 'k4,980', '', ''),
    createData('08/10/2024', 'Chilanga, Lusaka', 'Dashboards and data pipeline workshop', '02/12/2023', 'K5,650', '-K1,502.60', 'paid')
];

const colorFun = (status) => {
    switch (status) {
        case 'paid':
            return 'success';
        case 'pending':
            return 'default';
        case 'rejected':
            return 'error';
        default:
            return 'primary';
    }
}

const RetirementHistory = () => (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date submitted</TableCell>
                    <TableCell sx={{pl: 3}}>Trip</TableCell>
                    <TableCell>Trip Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell align="right" sx={{pr: 3}}>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                    <TableRow hover key={index}>
                        <TableCell>{row.submittedDate}</TableCell>
                        <TableCell sx={{pl: 3}}>
                            <Typography variant="subtitle1">{row.destination}</Typography>
                            <Typography variant="subtitle2">{row.trip}</Typography>
                        </TableCell>
                        <TableCell>{row.tripDate}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{row.balanceDue}</TableCell>
                        <TableCell align="right" sx={{pr: 3}}>
                                <span>
                                    {row.status !== '' &&
                                        <Chip variant="outlined" chipcolor={colorFun(row.status)} label={row.status}/>}
                                </span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default RetirementHistory;
