// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-around">
    <Typography variant="subtitle2" component={Link} href="/#" target="_blank" underline="hover">
      &copy; Tuso Business Dynamics
    </Typography>
  </Stack>
);

export default AuthFooter;
