import PropTypes from 'prop-types';

// material-ui
import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-import
import Chip from 'components/ui-component/extended/Chip';
import {ThemeMode} from 'config';

// assets
import {IconBuildingStore} from '@tabler/icons-react';

// styles
const ListItemWrapper = ({children}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                '&:hover': {
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light'
                }
            }}
        >
            {children}
        </Box>
    );
};

ListItemWrapper.propTypes = {
    children: PropTypes.node
};

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
    const theme = useTheme();

    const containerSX = {pl: 7};

    return (
        <List sx={{width: '100%', maxWidth: {xs: 300, md: 330}, py: 0}}>
            <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                color: 'success.dark',
                                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'success.light'
                            }}
                        >
                            <IconBuildingStore stroke={1.5} size="20px"/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">TA approved</Typography>}/>
                    <ListItemSecondaryAction>
                        <Stack direction="row" alignItems="center" justifyContent="flex-end">
                            <Typography variant="caption">2 min ago</Typography>
                        </Stack>
                    </ListItemSecondaryAction>
                </ListItem>
                <Stack spacing={2} sx={containerSX}>
                    <Typography variant="subtitle2">Mustafa has approved your travel authorization.</Typography>
                    <Chip
                        label="Unread"
                        chipcolor="error"
                        variant="outlined"
                        size="small"
                        sx={{
                            width: 'min-content',
                            border: 'none',
                            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'orange.light'
                        }}
                    />
                </Stack>
            </ListItemWrapper>

        </List>
    );
};

export default NotificationList;
