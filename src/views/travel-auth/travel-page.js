'use client';

import TravelAuth from "../../components/dashboard/travel/TravelAuth";
import MainCard from "../../components/ui-component/cards/MainCard";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {openDialog} from "../../store/slices/dialog";
import TravelForm from "../../components/dialog/form/TravelForm";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TaStatus from "../../components/dashboard/travel/TaStatus";

export default function TravelPage() {
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState(null);

    const openTravelDialog = (e) => {
        dispatch(openDialog({
            title: 'Travel Authorization',
            open: true,
            content: <TravelForm/>,
            fullWidth: true,
            dismissButtonLabel: 'Close'
        }));
    }

    const getTitle = () => selectedItem === null ? 'Travel authorization' : 'Travel Authorization Status';

    return <MainCard
        title={getTitle()}
        content={false}
        secondary={
            selectedItem === null ?
                <Button variant='contained' onClick={openTravelDialog}>Apply for TA</Button>
                :
                <IconButton onClick={e => setSelectedItem(null)}>
                    <CloseIcon/>
                </IconButton>
        }>
        {selectedItem === null ? <TravelAuth setSelectedItem={setSelectedItem}/> :
            <TaStatus selectedItem={selectedItem}/>}
    </MainCard>
}

