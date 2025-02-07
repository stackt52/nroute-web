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
import { statuses } from 'constants/index';

// project imports

// assets
import {ThemeMode} from "../../../config";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useSelector } from 'react-redux';

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
    const advances = useSelector((state) => state.advances.advances);

    const getStatusLabel = (status) => {
        switch (status) {
            case statuses.PENDING_SUPERVISOR:
                return "Pending Supervisor Approval";
            case statuses.PENDING_COST_CENTRE_OWNER:
                return "Pending Cost Centre Owner Approval";
            case statuses.PENDING_FINANCE:
                return "Pending Finance Approval";
            case statuses.APPROVED_SUPERVISOR:
                return "Approved by Supervisor";
            case statuses.APPROVED_COST_CENTRE_OWNER:
                return "Approved by Cost Centre Owner";
            case statuses.APPROVED_FINANCE:
                return "Approved by Finance";
            case statuses.REJECTED_SUPERVISOR:
                return "Rejected by Supervisor";
            case statuses.REJECTED_COST_CENTRE_OWNER:
                return "Rejected by Cost Centre Owner";
            case statuses.REJECTED_FINANCE:
                return "Rejected by Finance";
            case statuses.PENDING_DOCUMENTS:
                return "Pending Documents";
            case statuses.COMPLETED:
                return "Completed";
            case statuses.REJECTED:
                return "Rejected";
            case statuses.CREATED:
                return "Created";
            default:
                return "Unknown Status";
        }
    };

   return (
        <>
            <Stack direction='column' sx={{p: 3}}>
                <Typography variant="h4">Trip to {selectedItem.details.destination.town}</Typography>
                <Typography variant="subtitle2">{selectedItem.details.purpose}</Typography>
                <Typography variant='caption' component='div'>{selectedItem.details.dateOfTravel}</Typography>
            </Stack>

            <Timeline
                align="left"
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
                        <Typography variant="h6">{getStatusLabel(selectedItem.status)}</Typography>
                        <Typography variant="body2">{selectedItem.dateSubmitted}</Typography>
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
                                <ListItemText primary={selectedItem.description}/>
                            </ListItem>
                            <Divider/>
                        </List>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </>
    );
};

