import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SubCard from "../cards/SubCard";
import React, {useEffect, useState} from "react";
import Lodging from "./lodging/Lodging";
import AddLodging from "./lodging/AddLodging";



export default function LodgingCard ({setData}) {
    const [lodgingData, setLodgingData] = useState([]);
    const [addLodgingClicked, setLodgingClicked] = useState(false);

    // to delete row in order details
    const deleteCostItem = (id) => {
        setLodgingData(lodgingData.filter((item) => item.id !== id));
    };

    // add item handler
    const handleAddLodging = (addingData) => {
        setLodgingData([
            ...lodgingData,
            {
                id: addingData._id,
                location: addingData.location,
                days: addingData.days,
                rate: addingData.rate,
                total: addingData.total,
                startDate: addingData.startDate,
                endDate: addingData.endDate
            }
        ]);
        setLodgingClicked(false);
    };

    useEffect(() => {
        setData([...lodgingData]);
    },[lodgingData])

    return (
        <SubCard title='Lodging' darkTitle>
            <Lodging data={lodgingData} deleteCostItem={deleteCostItem}/>

            {addLodgingClicked ? (
                <Grid item xs={12} sx={{mt: 2}}>
                    <AddLodging handleAddItem={handleAddLodging} setAddItemClicked={setLodgingClicked}/>
                </Grid>
            ) : (
                <Grid item sx={{mt: 2}}>
                    <Button variant="text" onClick={() => setLodgingClicked(true)}>
                        + Add lodging
                    </Button>
                </Grid>
            )}
        </SubCard>
    )
}