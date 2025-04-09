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
import Stack from '@mui/material/Stack';

// project imports
import useConfig from 'hooks/useConfig';
import {gridSpacing} from 'store/constant';
import SubCard from 'components/ui-component/cards/SubCard';

// project import
import {ThemeMode} from 'config';

// assets
import {IconFileDescription, IconHistory} from '@tabler/icons-react';
import PendingRetirement from "./PendingRetirement";
import History from "./RetirementHistory";
import FinanceReview from "../(finance)/FinanceReview";


// tab content
function TabPanel({children, value, index, ...other}) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`}
             aria-labelledby={`vertical-tab-${index}`} {...other}>
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


export default function RetirementContent() {
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
                            icon={<IconFileDescription/>}
                            label={
                                <Grid container direction="column">
                                    <Typography variant="subtitle1" color="inherit">
                                        Pending retirements
                                    </Typography>
                                    <Typography variant="caption" >
                                        3 unsubmitted
                                    </Typography>
                                </Grid>
                            }
                            {...a11yProps(0)}
                        />
                        <Tab
                            icon={<IconHistory/>}
                            label={
                                <Grid container direction="column">
                                    <Typography variant="subtitle1" color="inherit">
                                        History
                                    </Typography>
                                    <Typography variant="caption" sx={{textTransform: 'capitalize'}}>
                                        Submitted retirements
                                    </Typography>
                                </Grid>
                            }
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <TabPanel value={value} index={0}>
                        <SubCard>
                            <Stack spacing={gridSpacing}>
                                <PendingRetirement/>
                            </Stack>
                        </SubCard>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SubCard>
                            <Stack spacing={gridSpacing}>
                                <History/>
                            </Stack>
                        </SubCard>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SubCard>
                            <Stack spacing={gridSpacing}>
                                <FinanceReview/>
                            </Stack>
                        </SubCard>
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    );
}
