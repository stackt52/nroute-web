// material-ui
import Button from '@mui/material/Button';
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
import RetirementForm from 'components/dialog/form/RetirementForm';
import { statuses } from 'constants/index';
import {openDialog} from "../../../store/slices/dialog";


export default function PendingRetirement() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const advances = useSelector((state) => state.advances.advances);

    // To be change filtering condition
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

    return <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{pl: 4}}>Trip</TableCell>
                    <TableCell sx={{pl: 4}}>Date</TableCell>
                    <TableCell sx={{pl: 4}}>Amount Disbursed</TableCell>
                    <TableCell sx={{pl: 4}}>Amount Retirable</TableCell>
                    <TableCell sx={{pr: 4}}>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredAdvances.map((row, index) => (
                    <TableRow hover key={index}>
                        <TableCell sx={{pl: 4}}>
                            <Typography variant="subtitle1">{row.details.destination.town}</Typography>
                            <Typography variant="subtitle2">{row.details.purpose}</Typography>
                        </TableCell>
                        <TableCell sx={{pl: 4}}>{row.details.dateOfTravel}</TableCell>
                        <TableCell sx={{pl: 4}}>{row.totalAmount}</TableCell>
                        <TableCell sx={{pl: 4}}>
                            {row.totalAmount - row.incidentals.reduce((sum, incidental) => sum + (parseFloat(incidental.total) || 0), 0)}
                        </TableCell>
                        <TableCell sx={{pr: 4}}>
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
