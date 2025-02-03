// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

// project imports
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

const NewUser = () => (
    <>
        <Alert severity="success" variant="outlined" sx={{borderColor: 'info.dark', mb:5}}>
            <AlertTitle>Add user</AlertTitle>
            Enter details below to allow user to sign in.
            <strong> Password will be created upon first sign-in</strong>
        </Alert>
        <form noValidate autoComplete="off">
            <Grid container spacing={gridSpacing} sx={{mb: 1.75}}>
                <Grid item xs={12} md={6}>
                    <TextField id="first-name" fullWidth label="First name"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="last-name" fullWidth label="Last name"/>
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} sx={{mb: 1.75}}>
                <Grid item xs={12} md={6}>
                    <TextField type="email" id="email" fullWidth label="Email" placeholder="juma@ihmafrica.org"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="phone" fullWidth label="Contact Phone"/>
                </Grid>
            </Grid>
        </form>
        <Grid spacing={2} container justifyContent="flex-end" sx={{mt: 3}}>
            <Grid item>
                <Button sx={{color: 'error.main'}}>Clear</Button>
            </Grid>
            <Grid item>
                <AnimateButton>
                    <Button variant="contained">Add user</Button>
                </AnimateButton>
            </Grid>
        </Grid>
    </>
);

export default NewUser;
