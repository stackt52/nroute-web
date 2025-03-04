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
    const retirements = useSelector((state) => state.retirements.retirements);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const filteredRetirements = retirements.filter(retirement =>
        retirement.userId === currentUser.id
    );

    return <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{pl: 4}}>Date submitted</TableCell>
                    <TableCell sx={{pl: 4}}>Trip</TableCell>
                    <TableCell sx={{pl: 4}}>Trip Date</TableCell>
                    <TableCell sx={{pl: 4}}>Amount</TableCell>
                    <TableCell sx={{pl: 4}}>Balance</TableCell>
                    <TableCell sx={{pr: 4}}>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredRetirements.map((row, index) => (
                    <TableRow hover key={index}>
                        <TableCell sx={{pl: 4}}>{row.createdAt}</TableCell>
                        <TableCell sx={{pl: 4}}>
                            <Typography variant="subtitle1">{row.details.destination.town}</Typography>
                            <Typography variant="subtitle2">{row.details.purpose}</Typography>
                        </TableCell>
                        <TableCell sx={{pl: 4}}>{row.details.dateOfTravel}</TableCell>
                        <TableCell sx={{pl: 4}}>{row.totalAmountSpent}</TableCell>
                        <TableCell sx={{pl: 4}}>{row.balance}</TableCell>
                        <TableCell sx={{pr: 4}}>
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
