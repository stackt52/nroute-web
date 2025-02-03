'use client';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {openDialog} from "../../store/slices/dialog";
import NewDepartment from "../../components/dashboard/setting/departments/new/NewDepartment";
import DepartmentList from "../../components/dashboard/setting/departments/DepartmentList";


export default function DepartmentsPage() {
    const dispatch = useDispatch();

    const openTravelDialog = (e) => {
        dispatch(openDialog({
            title: 'Create new department',
            open: true,
            content: <NewDepartment/>,
            dismissButtonLabel: 'Close'
        }));
    }

    return <MainCard title="Departments" secondary={
        <Button variant='contained' onClick={openTravelDialog}>New Department</Button>
    }>
        <DepartmentList/>
    </MainCard>
}

