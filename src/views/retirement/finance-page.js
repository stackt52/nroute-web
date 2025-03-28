'use client';

import MainCard from "../../components/ui-component/cards/MainCard";
import Finance from "../../components/dashboard/(finance)/FinanceReview";

export default function FinancePage() {

    return <MainCard
        title="Finance"
        content={false}>
        <Finance />
    </MainCard>
}