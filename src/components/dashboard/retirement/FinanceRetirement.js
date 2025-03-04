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
import {openDialog} from "../../../store/slices/dialog";
import {dispatch} from "../../../store";
import Button from "@mui/material/Button";
import FinanceForm from "../../dialog/form/FinanceForm";

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

export default function FinanceRetirement() {

    const retirements = useSelector((state) => state.retirements.retirements);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const filteredRetirements = retirements.filter(re =>
        re.status === statuses.PENDING_FINANCE &&
        re.userId === currentUser.id
    );


    const openRetirementDetailsDialog = (selectedRetirement) => {
        dispatch(openDialog({
            title: 'Retirement Details',
            open: true,
            content: <FinanceForm selectedRetirement={selectedRetirement} />,
            actionButton: null,
            fullWidth: true,
            dismissButtonLabel: 'Close',
            mode: 'finance'
        }));
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{pl: 3}}>Date submitted</TableCell>
                        <TableCell sx={{pl: 3}}>Trip</TableCell>
                        <TableCell sx={{pl: 3}}>Trip Date</TableCell>
                        <TableCell sx={{pl: 3}}>Amount</TableCell>
                        <TableCell sx={{pl: 3}}>Balance</TableCell>
                        <TableCell sx={{pr: 3}}>Status</TableCell>
                        <TableCell sx={{pr: 3}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRetirements.map((row, index) => (
                        <TableRow hover key={index}>
                            <TableCell sx={{pl: 3}}>{row.createdAt}</TableCell>
                            <TableCell sx={{pl: 3}}>
                                <Typography variant="subtitle1">{row.details.destination.town}</Typography>
                                <Typography variant="subtitle2">{row.details.purpose}</Typography>
                            </TableCell>
                            <TableCell sx={{pl: 3}}>{row.details.dateOfTravel}</TableCell>
                            <TableCell sx={{pl: 3}}>{row.totalAmountSpent}</TableCell>
                            <TableCell sx={{pl: 3}}>{row.balance}</TableCell>
                            <TableCell sx={{pr: 3}}>
                                <span>
                                    {row.status !== '' &&
                                        <Chip variant="outlined" chipcolor={colorFun(row.status)} label={row.status}/>}
                                </span>
                            </TableCell>
                            <TableCell sx={{pr: 3}}>
                                <span>
                                    <Button color="error" size="small" variant="outlined"
                                            onClick={() => openRetirementDetailsDialog(row)}>
								        Details
							        </Button>
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};
