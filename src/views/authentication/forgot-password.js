'use client';

import Link from 'next/link';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthForgotPassword from 'components/authentication/auth-forms/AuthForgotPassword';
import AuthFooter from 'components/ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';
import AuthWrapper1 from 'components/authentication/AuthWrapper1';
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import Logo from 'components/ui-component/Logo';

// ============================|| AUTH3 - FORGOT PASSWORD ||============================ //

const ForgotPassword = () => {
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const {isLoggedIn} = useAuth();

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{minHeight: '100vh'}}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{minHeight: 'calc(100vh - 68px)'}}>
                        <Grid item sx={{m: {xs: 1, sm: 3}, mb: 0}}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{mb: 3}}>
                                        <Link href="/" aria-label="theme-logo" style={{textDecoration: 'none'}}>
                                            <Typography variant="h2">n-Route</Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="center" textAlign="center"
                                              spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography color="secondary.main" gutterBottom
                                                            variant={downMD ? 'h3' : 'h2'}>
                                                    Forgot password?
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="caption" fontSize="16px" textAlign="center">
                                                    Enter your email address below and we&apos;ll send you password
                                                    reset OTP.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthForgotPassword/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={Link}
                                                href={isLoggedIn ? '/pages/authentication/auth3/login' : '/login'}
                                                variant="subtitle1"
                                                sx={{textDecoration: 'none'}}
                                            >
                                                Already have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{m: 3, mt: 1}}>
                    <AuthFooter/>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default ForgotPassword;
