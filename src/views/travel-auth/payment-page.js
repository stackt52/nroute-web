'use client';

import MainCard from "../../components/ui-component/cards/MainCard";
import {useDispatch} from "react-redux";
import {useState} from "react";

export default function ApprovePage() {
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState(null);

    return <MainCard
        title="Travel authorization - Payment"
        content={false}>
        <h1>Payments Page</h1>
    </MainCard>
}

