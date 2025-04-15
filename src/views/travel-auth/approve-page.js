'use client';

import ApprovalForm from "components/dialog/form/ApprovalForm";
import { roles, statuses } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import MainCard from "../../components/ui-component/cards/MainCard";
import { openDialog } from "../../store/slices/dialog";
// material-ui
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function ApprovePage() {
    const dispatch = useDispatch();
    const advances = useSelector((state) => state.advances.advances);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const getRelevantAdvances = () => {
      if (currentUser.role.includes(roles.SUPERVISOR)) {
        return advances.filter(a => 
          a.supervisorId === currentUser.id && 
          a.status === statuses.PENDING_SUPERVISOR
      );
    } else if (currentUser.role.includes(roles.COST_CENTRE_OWNER)) {
    return advances.filter(a => 
      a.status === statuses.PENDING_COST_CENTRE_OWNER
    );
  } else if (currentUser.role.includes(roles.FINANCE)) {
    return advances.filter(a => 
      a.status === statuses.PENDING_FINANCE
    );
  } else {
    return [];
  }
  };

    const filteredAdvances = getRelevantAdvances();

    const openApprovalDialog = (advanceId, selectedAdvance) => {
        dispatch(openDialog({
            title: "Approval",
            open: true,
            content: <ApprovalForm advanceId={advanceId} selectedAdvance={selectedAdvance}/>,
            fullWidth: true,
            dismissButtonLabel: "Close"
        }))
    }

    return <MainCard
        title="Travel Advance Approval"
        content={false}>
            {filteredAdvances.length === 0 ? (
                <h1>No travel Advances require your approval</h1>
            ): (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Date applied</TableCell>
                                <TableCell sx={{pl: 3}}>Trip</TableCell>
                                <TableCell>Trip Date</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAdvances.map((advance, index) => (
                                <TableRow hover key={index}>
                                    <TableCell>{advance.traveler}</TableCell>
                                    <TableCell>{advance.dateSubmitted}</TableCell>
                                    <TableCell sx={{pl: 3}}>{advance.details.purpose}</TableCell>
                                    <TableCell>{advance.details.dateOfTravel}</TableCell>
                                    <TableCell align="right">{advance.totalAmount}</TableCell>
                                    <TableCell align="right" sx={{pr: 3}}>
                                        <Button variant="contained"
                                    size="small" onClick={() => openApprovalDialog(advance.id, advance)}>Review</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
    </MainCard>
}

