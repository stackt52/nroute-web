import Grid from "@mui/material/Grid";
import SubCard from "../../../ui-component/cards/SubCard";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import {IconChevronRight} from "@tabler/icons-react";
import {useState} from "react";
import useConfig from "../../../../hooks/useConfig";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import ListItem from "@mui/material/ListItem";

// autocomplete options
const towns = [
    {town: 'Lusaka', id: 1, province: 'Lusaka'},
    {town: 'Ndola', id: 2, province: 'Copperbelt'},
    {town: 'Kitwe', id: 3, province: 'Copperbelt'},
    {town: 'Livingston', id: 4, province: 'Southern'},
    {town: 'Kabwe', id: 5, province: 'Central'},
    {town: 'Chongwe', id: 6, province: 'Lusaka'},
    {town: 'Mansa', id: 7, province: 'Northern'}
];

export default function LocationDetails() {
    const {borderRadius} = useConfig();
    const [selectedIndex, setSelectedIndex] = useState(0)
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <SubCard title="Locations">
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                            sx={{borderRadius: `${borderRadius}px`}}
                        >
                            <ListItemText primary="Provincial Centers"/>
                            <ListItemIcon>
                                <IconChevronRight/>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                            sx={{borderRadius: `${borderRadius}px`, mt: 0.625}}
                        >
                            <ListItemText primary="Tourist Towns"/>
                            <ListItemIcon>
                                <IconChevronRight/>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                            sx={{borderRadius: `${borderRadius}px`, mt: 0.625}}
                        >
                            <ListItemText primary="Metropolitan"/>
                            <ListItemIcon>
                                <IconChevronRight/>
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </SubCard>
            </Grid>
            <Grid item xs={6}>
                <SubCard title="Towns">
                    <Autocomplete
                        multiple
                        disableClearable
                        id="tags-outlined"
                        options={towns}
                        defaultValue={[towns[0], towns[4]]}
                        filterSelectedOptions
                        renderOption={(props, option) => (
                            <li key={option.id} {...props}>
                                <ListItemText primary={option.town}
                                              secondary={option.province}/>
                            </li>
                        )}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => <
                                Chip {...getTagProps({index})} key={option.id}
                                     label={option.town}/>)
                        }
                        renderInput={(params) => <TextField {...params} />}
                    />
                </SubCard>
            </Grid>
        </Grid>
    )
}