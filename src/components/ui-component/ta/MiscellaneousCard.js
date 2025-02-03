import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SubCard from "../cards/SubCard";
import React, {useEffect, useState} from "react";
import AddMiscellaneous from "./miscellaneous/AddMiscellaneous";
import Miscellaneous from "./miscellaneous/Miscellaneous";

export default function MiscellaneousCard ({setData}) {
    const [miscellaneousData, setMiscellaneousData] = useState([]);
    const [addMiscellaneousClicked, setAddMiscellaneousAdded] = useState(false);

    // to delete row in order details
    const deleteCostItem = (id) => {
        setMiscellaneousData(miscellaneousData.filter((item) => item.id !== id));
    };

    // add item handler
    const handleAddLodging = (addingData) => {
        setMiscellaneousData([
            ...miscellaneousData,
            {
                id: addingData._id,
                description: addingData.description,
                amount: addingData.amount
            }
        ]);
        setAddMiscellaneousAdded(false);
    };

    useEffect(() => {
        setData([...miscellaneousData]);
    },[miscellaneousData])

    return (
        <SubCard title='Miscellaneous' darkTitle>
            <Miscellaneous data={miscellaneousData} deleteCostItem={deleteCostItem}/>

            {addMiscellaneousClicked ? (
                <Grid item xs={12} sx={{mt: 2}}>
                    <AddMiscellaneous handleAddItem={handleAddLodging} setAddItemClicked={setAddMiscellaneousAdded}/>
                </Grid>
            ) : (
                <Grid item sx={{mt: 2}}>
                    <Button variant="text" onClick={() => setAddMiscellaneousAdded(true)}>
                        + Add other cost
                    </Button>
                </Grid>
            )}
        </SubCard>
    )
}