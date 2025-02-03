
// project imports
import {IconPlus} from "@tabler/icons-react";
import SubCard from "../../../ui-component/cards/SubCard";
import Typography from "@mui/material/Typography";
import Accordion from 'components/ui-component/extended/Accordion';
import CostCenterList from "./CostCenterList";
import NewCostCenter from "./NewCostCenter";


const newCostCenterContent = [
    {
        id: 'new-cost-center',
        defaultExpand: false,
        title: (
            <>
                <Typography variant="h3" color="primary">
                    Create new cost center
                </Typography>
            </>
        ),
        content: (
            <NewCostCenter/>
        )
    }
];

const CostCenter = () => (
    <>
        <SubCard title="Cost center">
            <Accordion expandIcon={<IconPlus/>} data={newCostCenterContent}/>
        </SubCard>
        <CostCenterList />
    </>
);

export default CostCenter;