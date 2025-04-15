
import { useEffect, useRef, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// third-party

// project imports
import ApprovalCard from 'components/ui-component/approval/ApprovalCard';
import { roles, statuses } from 'constants/index';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { updateAdvanceStatus } from 'store/slices/advanceSlice';
import { setSubmitCallback } from "../../../store/slices/dialog";


const ApprovalForm = ({advanceId, selectedAdvance}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);

    const handleApproval = (advanceId, approved, comment = "") => {
        let newStatus;

        if (currentUser.role.includes(roles.SUPERVISOR)) {
            newStatus = approved ? statuses.PENDING_COST_CENTRE_OWNER : statuses.REJECTED_SUPERVISOR;
        } else if (currentUser.role.includes(roles.COST_CENTRE_OWNER)) {
            newStatus = approved ? statuses.PENDING_FINANCE : statuses.REJECTED_COST_CENTRE_OWNER;
        } else if (currentUser.role.includes(roles.FINANCE)) {
            newStatus = approved ? statuses.APPROVED_FINANCE : statuses.REJECTED_FINANCE;
        }

        dispatch(updateAdvanceStatus({
            id: advanceId,
            status: newStatus,
            comment
        }));
    }
    const [, setApproval] = useState({});
    
    const approvalForm = useRef(null);

     const submitCallback = () => {
        approvalForm.current.click()
    }

    useEffect(() => {
        dispatch(setSubmitCallback({submitCallback: submitCallback}));
    });

    return (
        <>
            {/* <Grid container spacing={gridSpacing}> */}
                {/* <Grid item xs={12} flex> */}
                    <ApprovalCard formRef={approvalForm} setData={setApproval} handleApproval={handleApproval} advanceId={advanceId} selectedAdvance={selectedAdvance}/>
                {/* </Grid> */}
            {/* </Grid> */}
        </>
    );
};

export default ApprovalForm;