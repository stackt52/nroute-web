import Incidental from "./incidental/Incidental";
import Grid from "@mui/material/Grid";
import AddIncidental from "./incidental/AddIncidental";
import Button from "@mui/material/Button";
import SubCard from "../cards/SubCard";
import React, {useEffect, useState} from "react";


export default function IncidentalCard ({setData, dateOfTravel}) {
    const [incidentals, setIncidentals] = useState([]);
    const [addIncidentalClicked, setAddIncidentalClicked] = useState(false);

    // add item handler
    const handleAddIncidental = (addingData) => {
        setIncidentals([
            ...incidentals,
            {
                id: addingData._id,
                location: addingData.location,
                days: addingData.days,
                amount: addingData.amount,
                total: addingData.total,
                startDate: addingData.startDate,
                endDate: addingData.endDate,
                rate: addingData.rate,
            }
        ]);
        setAddIncidentalClicked(false);
    };

    // to delete row in order details
    const deleteCostItem = (id) => {
        setIncidentals(incidentals.filter((item) => item.id !== id));
    };

    useEffect(() => {
        setData([...incidentals]);
    }, [incidentals]);

    return (
        <SubCard title='Meals and Incidental Expenses' darkTitle>
            <Incidental data={incidentals} deleteCostItem={deleteCostItem}/>

            {addIncidentalClicked ? (
                <Grid item xs={12} sx={{mt: 2}}>
                    <AddIncidental handleAddItem={handleAddIncidental} setAddItemClicked={setAddIncidentalClicked}/>
                </Grid>
            ) : (
                <Grid item sx={{mt: 2}}>
                    <Button variant="text" onClick={() => setAddIncidentalClicked(true)}>
                        + Add Incidental cost
                    </Button>
                </Grid>
            )}
        </SubCard>
    )
}