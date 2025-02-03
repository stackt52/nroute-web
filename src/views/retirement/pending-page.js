'use client';

import MainCard from "../../components/ui-component/cards/MainCard";
import {useDispatch} from "react-redux";
import {useState} from "react";
import PendingRetirement from "../../components/dashboard/retirement/PendingRetirement";

export default function PendingPage() {
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState(null);

    return <MainCard
        title="Pending Retirements"
        content={false}>
        <PendingRetirement />
    </MainCard>
}

