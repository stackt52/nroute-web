import React, { useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SubCard from "../../cards/SubCard";
import AddRetirementMiscellaneous from "./AddRetirementMiscellaneous";
import Miscellaneous from "./Miscellaneous";

// ==============================|| DISPLAY MISCELLANEOUS DATA ||============================== //

export default function MiscellaneousRetirementCard({data, setData}) {

    const [miscellaneousRetirementData, setMiscellaneousRetirementData] = useState([]);
    const [addMiscellaneousClicked, setRetireItemClicked] = useState(false);

    const deleteMiscellaneousRetirement = (id) => {
        setMiscellaneousRetirementData(miscellaneousRetirementData.filter((item) => item.id !== id));
    };

    // Add Retirement Handler
    const handleRetireItem = (data) => {
        setMiscellaneousRetirementData([...miscellaneousRetirementData, {
            id: data._id, amountSpent: data.amountSpent, description: data.description, comment: data.comment, file: data.file
        }]);
        setRetireItemClicked(false);
    };

    useEffect(() => {
        setData([...miscellaneousRetirementData]);
    },[miscellaneousRetirementData])

    return (
        <SubCard title="Miscellaneous" content={false} sx={{p: 2}}>
            <Grid item xs={12} container spacing={2} sx={{ mb: 2, mt: 2 }}>
                {data.map((row, index) => (
                    <Grid item xs={12} key={index} container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                            <TextField
                                label="Description"
                                disabled
                                fullWidth
                                value={row.description.title || ""}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Amount"
                                disabled
                                fullWidth
                                value={row.amount || ""}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>))}
                <Miscellaneous data={miscellaneousRetirementData} deleteMiscellaneousRetirement={deleteMiscellaneousRetirement}/>
                {addMiscellaneousClicked ? (
                    <Grid item xs={12} sx={{mt: 2}}>
                        <AddRetirementMiscellaneous handleRetireItem={handleRetireItem}
                                                    setRetireItemClicked={setRetireItemClicked}/>
                    </Grid>) : (<Grid item xs={12} sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="text"
                            onClick={() => setRetireItemClicked(true)}>
                        + Add Retirement
                    </Button>
                </Grid>)}
            </Grid>
        </SubCard>);
}
