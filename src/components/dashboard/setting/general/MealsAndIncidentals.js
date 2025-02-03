// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// assets
import IconButton from "@mui/material/IconButton";
import {IconPencil, IconPencilOff} from "@tabler/icons-react";
import SubCard from "../../../ui-component/cards/SubCard";
import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import Button from "@mui/material/Button";

const ratingEntries = [
    {id: 1, title: 'Local', amount: 'ZMK 700'},
    {id: 2, title: 'International', amount: '$ 93'},
]

export default function MealsAndIncidentals() {
    const [editing, setEditing] = React.useState(false);

    return (
        <div>
            <SubCard
                title='Meals and Incidental Stipends'
                footer={editing ? <AnimateButton>
                    <Button variant="contained" size="small" type="submit">
                        Save
                    </Button>
                </AnimateButton> : null}
                secondary={
                    <IconButton aria-label="edit" onClick={() => setEditing(!editing)}>
                        {editing ? <IconPencilOff/> : <IconPencil/>}
                    </IconButton>
                }>
                {/** card content **/}
                {ratingEntries.map((entry, index) => (
                    <>
                        <Grid container direction="column" id={entry.id}>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            {entry.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                {
                                                    editing ?
                                                        <TextField
                                                            size="small"
                                                            value={entry.amount}
                                                            slotProps={{
                                                                input: {
                                                                    startAdornment: <InputAdornment
                                                                        position="start">ZMK</InputAdornment>
                                                                }
                                                            }}
                                                        />
                                                        :
                                                        <Typography variant="subtitle1" color="inherit">
                                                             {entry.amount}
                                                        </Typography>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {index !== (ratingEntries.length - 1) && (<Divider sx={{mt: 1.5, mb: 1.5}}/>)}
                    </>
                ))}
            </SubCard>
        </div>
    );
}
