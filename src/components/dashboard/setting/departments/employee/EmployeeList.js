// material-ui
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// assets
import {IconStarFilled} from "@tabler/icons-react";

export default function EmployeeList() {
    const avatarSuccess = {
        width: 16,
        height: 16,
        borderRadius: '5px',
        bgcolor: 'success.light',
        color: 'success.dark',
        ml: 1.875
    };
    const avatarError = {
        width: 16,
        height: 16,
        borderRadius: '5px',
        bgcolor: 'orange.light',
        color: 'orange.dark',
        ml: 1.875
    };

    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                                Gift Mungule
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        supervisor
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar variant="rounded" sx={avatarSuccess}>
                                        <IconStarFilled fontSize="small" color="inherit"/>
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" sx={{color: 'secondary.dark'}}>
                        gift@ihmafrica.org
                    </Typography>
                </Grid>
            </Grid>
            <Divider sx={{mt: 1.5, mb: 1.5}}/>
        </div>
    );
}
