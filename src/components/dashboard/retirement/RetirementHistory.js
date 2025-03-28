// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// project imports
import Chip from "../../ui-component/extended/Chip";
import { useSelector } from "react-redux";
import {dispatch} from "../../../store";
import {openDialog} from "../../../store/slices/dialog";
import FinanceReviewForm from "../../dialog/form/FinanceReviewForm";
import RetirementEditForm from "../../dialog/form/RetirementEditForm";

const colorFun = (status) => {
    switch (status) {
        case 'paid':
            return 'success';
        case 'pending':
            return 'default';
        case 'rejected':
        case 'rejected finance':
            return 'error';
        default:
            return 'primary';
    }
};

export default function RetirementHistory() {
    const retirements = useSelector((state) => state.retirements.retirements);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const filteredRetirements = retirements.filter(retirement =>
        retirement.userId === currentUser.id
    );

    const handleEdit = (selectedRetirement) => {
        dispatch(openDialog({
            title: 'Retirement Details',
            open: true,
            content: <RetirementEditForm selectedRetirement={selectedRetirement} />,
            actionButton: null,
            fullWidth: true,
            dismissButtonLabel: 'Close',
            mode: 'finance'
        }));
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 4 }}>Trip</TableCell>
                        <TableCell sx={{ pl: 4 }}>Trip Date</TableCell>
                        <TableCell sx={{ pl: 4 }}>Amount Retirable</TableCell>
                        <TableCell sx={{ pl: 4 }}>Amount Retired</TableCell>
                        <TableCell sx={{ pl: 4 }}>Balance</TableCell>
                        <TableCell sx={{ pr: 4 }}>Status</TableCell>
                        <TableCell sx={{ pr: 4 }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRetirements.map((row, index) => (
                        <TableRow hover key={index}>
                            <TableCell sx={{ pl: 4 }}>
                                <Typography variant="subtitle1">{row.details.destination.town}</Typography>
                                <Typography variant="subtitle2">{row.details.purpose}</Typography>
                            </TableCell>
                            <TableCell sx={{ pl: 4 }}>{row.details.dateOfTravel}</TableCell>
                            <TableCell sx={{ pl: 4 }}>{row.amountRetirable}</TableCell>
                            <TableCell sx={{ pl: 4 }}>{row.totalAmountSpent}</TableCell>
                            <TableCell sx={{ pl: 4 }}>{row.balance}</TableCell>
                            <TableCell sx={{ pr: 4 }}>
                                {row.status !== '' && (
                                    <Chip variant="outlined" chipcolor={colorFun(row.status)} label={row.status} />
                                )}
                            </TableCell>
                            <TableCell sx={{ pr: 4 }}>
                                {row.status === "rejected finance" && (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEdit(row)}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}