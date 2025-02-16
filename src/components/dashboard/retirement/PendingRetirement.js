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
import {openDialog} from "../../../store/slices/dialog";


export default function PendingRetirement() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const advances = useSelector((state) => state.advances.advances);
    const retirements = useSelector((state) => state.retirements.retirements);

    const [selectedFiles, setSelectedFiles] = useState({});

    const filteredAdvances = advances.filter(advance => advance.status === statuses.APPROVED_FINANCE && advance.userId === currentUser.id);

    const openRetirementDialog = (selectedAdvance) => {
        dispatch(openDialog({
            title: 'Retirement Details',
            open: true,
            content: <RetirementForm selectedAdvance={selectedAdvance} />,
            actionButton: null,
            fullWidth: true,
            dismissButtonLabel: 'Close',
            mode: 'retire'
        }));
    }
    console.log(advances)

    return <TableContainer>
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
                {advances.map((row, index) => (
                    <TableRow hover key={index}>
                        <TableCell sx={{pl: 3}}>
                            <Typography variant="subtitle1">{row.details.destination.town}</Typography>
                            <Typography variant="subtitle2">{row.details.purpose}</Typography>
                        </TableCell>
                        <TableCell align="right">{row.details.dateOfTravel}</TableCell>
                        <TableCell align="right">{row.totalAmount}</TableCell>
                        <TableCell align="right" sx={{pr: 3}}>
                                <span>
                                    <Button color="error" size="small" variant="outlined"
                                            onClick={() => openRetirementDialog(row)}>
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
