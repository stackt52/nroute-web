// material-ui
import Typography from '@mui/material/Typography';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator
} from "@mui/lab";
import {useTheme} from "@mui/material/styles";
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

// project imports

// assets
import {ThemeMode} from "../../../config";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const listBoxSX = { bgcolor: 'background.default', py: 0 };

const dotSX = {
    p: 0,
    '& > svg': {
        width: 14,
        height: 14
    },
    display: { xs: 'none', md: 'flex' }
};

export default function TaStatus({selectedItem}) {
    const theme = useTheme();

    return <>
        <Stack direction='column' sx={{p: 3}}>
            <Typography variant="h4">Trip to {selectedItem.details.destination.town}</Typography>
            <Typography variant="subtitle2">{selectedItem.details.purpose}</Typography>
            <Typography variant='caption' component='div'>{selectedItem.details.dateOfTravel}</Typography>
        </Stack>

        <Timeline
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.5,
                },
                '& > li': {
                    mb: 2.75,
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                        '& > div': {
                            px: 0
                        },
                        '& > div:first-of-type': {
                            textAlign: 'left'
                        }
                    }
                },
                [theme.breakpoints.down('md')]: {
                    p: 0
                }
            }}
        >
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="h6">Request Placed</Typography>
                    <Typography variant="body2">12 jun</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary" sx={dotSX}>
                        <FiberManualRecordIcon/>
                    </TimelineDot>
                    <TimelineConnector sx={{bgcolor: 'primary.main'}}/>
                </TimelineSeparator>
                <TimelineContent sx={{flex: 3}}>
                    <List sx={listBoxSX}>
                        <ListItem>
                            <ListItemText primary="Applied for Travel Authorization."/>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary="Successfully submitted request for approval."/>
                        </ListItem>
                        <Divider/>
                    </List>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="h6">Supervisor approval</Typography>
                    <Typography variant="body2">14 jun</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary" sx={dotSX}>
                        <FiberManualRecordIcon/>
                    </TimelineDot>
                    <TimelineConnector sx={{bgcolor: 'grey.400'}}/>
                </TimelineSeparator>
                <TimelineContent sx={{flex: 3}}>
                    <List sx={listBoxSX}>
                        <ListItem>
                            <ListItemText primary="Request approved successfully."/>
                        </ListItem>
                    </List>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="h6">Cost center approval</Typography>
                    <Typography variant="body2">16 Jun</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot sx={dotSX}>
                        <FiberManualRecordIcon/>
                    </TimelineDot>
                    <TimelineConnector sx={{bgcolor: 'grey.400'}}/>
                </TimelineSeparator>
                <TimelineContent sx={{flex: 3}}>
                    <List sx={listBoxSX}>
                        <ListItem>
                            <ListItemText primary="Pending approval."/>
                        </ListItem>
                    </List>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="h6">Finance approval</Typography>
                    <Typography variant="body2">17 Jun</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot sx={dotSX}>
                        <FiberManualRecordIcon/>
                    </TimelineDot>
                    <TimelineConnector sx={{bgcolor: 'grey.400'}}/>
                </TimelineSeparator>
                <TimelineContent sx={{flex: 3}}>
                    <List sx={listBoxSX}>
                        <ListItem>
                            <ListItemText primary="Pending approval."/>
                        </ListItem>
                    </List>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    </>

};

