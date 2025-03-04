import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SubCard from "../../cards/SubCard";
import AddReLodging from "./AddRetirementLodging";
import TextField from "@mui/material/TextField";
import Lodging from "../lodging/Lodging";

export default function LodgingRetirementCard({data, setData}) {

    const [lodgingRetirementData, setLodgingRetirementData] = useState([]);
    const [addLodgingClicked, setRetireItemClicked] = useState(false);

    const deleteRetirementLodging = (id) => {
        setLodgingRetirementData(lodgingRetirementData.filter((item) => item.id !== id));
    };

    // Add Retirement Handler
    const handleRetireItem = (data) => {
        const updatedData = [
            ...lodgingRetirementData,
            {
                id: data._id,
                amountSpent: data.amountSpent,
                lodgeName: data.lodgeName,
                comment: data.comment,
                file: data.file,
            },
        ];
        setLodgingRetirementData(updatedData);
        setData(updatedData);
        setRetireItemClicked(false);
    };

    useEffect(() => {
        setData([...lodgingRetirementData]);
    }, [lodgingRetirementData])

    return (
        <SubCard title="Lodging" content={false} sx={{p: 2}}>
            <Grid item xs={12} container spacing={2} sx={{ mb: 2, mt: 2 }} >
                {data.map((row, index) => (
                    <Grid item xs={12} key={index} container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                label="Location"
                                disabled
                                fullWidth
                                value={row.location.town || ""}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Check-in Date"
                                disabled
                                fullWidth
                                value={row.startDate || ""}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Check-out Date"
                                disabled
                                fullWidth
                                value={row.endDate || ""}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Total"
                                disabled
                                fullWidth
                                value={row.total || ""}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                ))}
                <Lodging data={lodgingRetirementData} deleteRetirementLodging={deleteRetirementLodging}/>
                {addLodgingClicked ? (
                    <Grid item xs={12} sx={{mt: 2}}>
                        <AddReLodging handleRetireItem={handleRetireItem}
                                      setRetireItemClicked={setRetireItemClicked}/>
                    </Grid>
                ) : (
                    <Grid item xs={12} sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="text"
                                onClick={() => setRetireItemClicked(true)}>
                            + Add Retirement
                        </Button>
                    </Grid>
                )}
            </Grid>
        </SubCard>
    );
};