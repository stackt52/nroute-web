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
import {useDispatch} from "../../../store";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import RetirementForm from 'components/dialog/form/RetirementForm';
import { roles, statuses } from 'constants/index';

// table data
function createData(destination, trip, date, amount, badgeText) {
    return {destination, trip, date, amount, badgeText};
}

const rows = [
    createData('Durban, South Africa', '2024 Interoperability workshop', '08/09/2024', '$3,500'),
    createData('Luapula', 'Site visit', '12/06/2024', 'K2,450'),
    createData('Livingstone', 'IAF TWG meeting', '24/05/2024', 'k4,980'),
    createData('Chilanga, Lusaka', 'Dashboards and data pipeline workshop', '02/12/2023', 'K5,650')
];


export default function PendingRetirement() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const advances = useSelector((state) => state.advances.advances);
    const retirements = useSelector((state) => state.retirements.retirements);

    const [selectedFiles, setSelectedFiles] = useState({});

    const filteredAdvances = advances.filter(advance => advance.status === statuses.APPROVED_FINANCE && advance.userId === currentUser.id);

    const openRetirementDialog = (e) => {
        dispatch(openDialog({
            title: 'Retirement details',
            open: true,
            content: <RetirementForm/>,
            actionButton: null,
            fullWidth: true,
            dismissButtonLabel: 'Close'
        }));
    }

    return  <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{pl: 3}}>Trip</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Amount disbursed</TableCell>
                        <TableCell align="right" sx={{pr: 3}}>

                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredAdvances.map((advance, index) => (
                        <TableRow hover key={index}>
                            <TableCell sx={{pl: 3}}>
                                <Typography variant="subtitle1">{advance.details.destination.town}</Typography>
                                <Typography variant="subtitle2">{advance.details.purpose}</Typography>
                            </TableCell>
                            <TableCell align="right">{advance.details.dateOfTravel}</TableCell>
                            <TableCell align="right">{advance.totalAmount}</TableCell>
                            <TableCell align="right" sx={{pr: 3}}>
                                <span>
                                    <Button color="error" size="small" variant="outlined"
                                            onClick={(e) => openRetirementDialog(e)}>
								        Retire
							        </Button>
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

};
