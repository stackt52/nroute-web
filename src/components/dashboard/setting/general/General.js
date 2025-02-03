'use client';

import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// project imports
import useConfig from 'hooks/useConfig';
import {gridSpacing} from 'store/constant';

// project import
import {ThemeMode} from 'config';

// assets
import {IconBuildingCommunity, IconCup, IconMapPinFilled, IconWand} from '@tabler/icons-react';
import LodgingRate from "./LodgingRate";
import LocationDetails from "./LocationDetails";
import MealsAndIncidentals from "./MealsAndIncidentals";


// tab content
function TabPanel({children, value, index, ...other}) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`}
             {...other}>
            {value === index && (
                <Box
                    sx={{
                        p: 0
                    }}
                >
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}


export default function General() {
    const theme = useTheme();
    const {borderRadius} = useConfig();

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={4} md={3}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        orientation="vertical"
                        variant="scrollable"
                        sx={{
                            '& .MuiTabs-flexContainer': {
                                borderBottom: 'none'
                            },
                            '& button': {
                                borderRadius: `${borderRadius}px`,
                                color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                                minHeight: 'auto',
                                minWidth: '100%',
                                py: 1.5,
                                px: 2,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                textAlign: 'left',
                                justifyContent: 'flex-start'
                            },
                            '& button.Mui-selected': {
                                color: 'primary.main',
                                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50'
                            },
                            '& button > svg': {
                                marginBottom: '0px !important',
                                marginRight: 1.25,
                                marginTop: 1.25,
                                height: 20,
                                width: 20
                            },
                            '& button > div > span': {
                                display: 'block'
                            },
                            '& > div > span': {
                                display: 'none'
                            }
                        }}
                    >
                        <Tab
                            icon={<IconCup/>}
                            label={
                                <Grid container direction="column">
                                    <Typography variant="subtitle1" color="inherit">
                                        Meals & Incidental
                                    </Typography>
                                    <Typography variant="caption">
                                        Local / international
                                    </Typography>
                                </Grid>
                            }
                            {...a11yProps(0)}
                        />
                        <Tab
                            icon={<IconBuildingCommunity/>}
                            label={
                                <Grid container direction="column">
                                    <Typography variant="subtitle1" color="inherit">
                                        Lodging
                                    </Typography>
                                    <Typography variant="caption">
                                        Local towns
                                    </Typography>
                                </Grid>
                            }
                            {...a11yProps(1)}
                        />
                        <Tab
                            icon={<IconMapPinFilled/>}
                            label={
                                <Grid container direction="column">
                                    <Typography variant="subtitle1" color="inherit">
                                        Location
                                    </Typography>
                                    <Typography variant="caption">
                                        Towns
                                    </Typography>
                                </Grid>
                            }
                            {...a11yProps(2)}
                        />
                        <Tab
                            icon={<IconWand/>}
                            label={
                                <Grid container direction="column">
                                    <Typography variant="subtitle1" color="inherit">
                                        Miscellaneous
                                    </Typography>
                                    <Typography variant="caption">
                                        Other costs
                                    </Typography>
                                </Grid>
                            }
                            {...a11yProps(3)}
                        />
                    </Tabs>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <TabPanel value={value} index={0}>
                        <MealsAndIncidentals />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <LodgingRate />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <LocationDetails />
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    );
}
