'use client';

import MainCard from "../../components/ui-component/cards/MainCard";
import {useDispatch} from "react-redux";
import {useState} from "react";
import RetirementHistory from "../../components/dashboard/retirement/RetirementHistory";

export default function HistoryPage() {
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState(null);

    return <MainCard
        title="Retirements - History"
        content={false}>
        <RetirementHistory />
    </MainCard>
}

