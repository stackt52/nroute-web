// material-ul
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// third-party
import { enqueueSnackbar } from 'notistack';

// project import
import SubCard from 'components/ui-component/cards/SubCard';

// ==============================|| NOTISTACK - COLOR VARIANTS ||============================== //

export default function ColorVariants() {
  return (
    <SubCard title="Color Variants">
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.700' } }}
            onClick={() => enqueueSnackbar('This is default message.')}
          >
            Default
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" onClick={() => enqueueSnackbar('his is success message', { variant: 'success' })}>
            Success
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="warning" onClick={() => enqueueSnackbar('This is warning message', { variant: 'warning' })}>
            Warning
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="info" onClick={() => enqueueSnackbar('This is info message', { variant: 'info' })}>
            Info
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="error" onClick={() => enqueueSnackbar('This is error message', { variant: 'error' })}>
            Error
          </Button>
        </Grid>
      </Grid>
    </SubCard>
  );
}
