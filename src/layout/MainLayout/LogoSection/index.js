import NextLink from 'next/link';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'components/ui-component/Logo';
import Typography from "@mui/material/Typography";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <NextLink href={DASHBOARD_PATH} aria-label="theme logo" style={{ textDecoration: 'none' }}>
    <Typography variant="h2">n-Route</Typography>
  </NextLink>
);

export default LogoSection;
