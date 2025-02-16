// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import Chip from "../../ui-component/extended/Chip";
import {useSelector} from "react-redux";
import {statuses} from "../../../constants";
import * as currentUser from "date-fns/locale";

// table data
function createData(submittedDate, destination, trip, tripDate, amount, balanceDue, status) {
    return {submittedDate, destination, trip, tripDate, amount, balanceDue, status};
}

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

export default function RetirementHistory() {

    const advances = useSelector((state) => state.advances.advances);

    // Filter Advances
    const filteredAdvances = advances.filter(advance => advance.status === statuses.PENDING_FINANCE && advance.userId === currentUser.id);

    return <TableContainer>
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
                {advances.map((row, index) => (
                    <TableRow hover key={index}>
                        <TableCell>{row.dateSubmitted}</TableCell>
                        <TableCell sx={{pl: 3}}>
                            <Typography variant="subtitle1">{row.details.destination.town}</Typography>
                            <Typography variant="subtitle2">{row.details.purpose}</Typography>
                        </TableCell>
                        <TableCell>{row.details.dateOfTravel}</TableCell>
                        <TableCell align="right">{row.totalAmount}</TableCell>
                        <TableCell align="right">{row.totalAmount}</TableCell>
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
};
