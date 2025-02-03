'use client';

import Link from 'next/link';

// material-ui
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthRegister from 'components/authentication/auth-forms/AuthRegister';
import AuthFooter from 'components/ui-component/cards/AuthFooter';
import AuthWrapper2 from 'components/authentication/AuthWrapper2';
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import Logo from 'components/ui-component/Logo';
import BackgroundPattern2 from 'components/ui-component/cards/BackgroundPattern2';
import AuthSlider from 'components/ui-component/cards/AuthSlider';

// assets
const imgMain = '/assets/images/auth/paper-3.png';

// carousel items
const items = [
    {
        title: 'Power of React with Material UI',
        description: 'Powerful and easy to use multipurpose theme'
    },
    {
        title: 'Power of React with Material UI',
        description: 'Powerful and easy to use multipurpose theme'
    },
    {
        title: 'Power of React with Material UI',
        description: 'Powerful and easy to use multipurpose theme'
    }
];

// ===============================|| AUTH2 - REGISTER ||=============================== //

const Register = () => {
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    return (
        <AuthWrapper2>
            <Grid container justifyContent={{xs: 'center', md: 'space-between'}} alignItems="center">
                <Grid item md={6} lg={7} xs={12} sx={{minHeight: '100vh'}}>
                    <Grid
                        sx={{minHeight: '100vh'}}
                        container
                        alignItems={{xs: 'center', md: 'flex-start'}}
                        justifyContent={{xs: 'center', md: 'space-between'}}
                    >
                        <Grid item sx={{display: {xs: 'none', md: 'block'}, m: 3}}>
                            <Link href="/login" aria-label="theme logo" style={{textDecoration: 'none'}}>
                                <Typography variant="h2" >n-Route</Typography>
                            </Link>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                            sx={{minHeight: {xs: 'calc(100vh - 68px)', md: 'calc(100vh - 152px)'}}}
                        >
                            <Stack justifyContent="center" alignItems="center" spacing={5} m={2}>
                                <Box component={Link} href="#" sx={{display: {xs: 'block', md: 'none'}}}>
                                    <Logo/>
                                </Box>
                                <AuthCardWrapper border={downLG}>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={12}>
                                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                <Typography color="secondary.main" gutterBottom
                                                            variant={downMD ? 'h3' : 'h2'}>
                                                    Sign up
                                                </Typography>
                                                <Typography variant="caption" fontSize="16px"
                                                            textAlign={{xs: 'center', md: 'inherit'}}>
                                                    Enter your credentials to continue
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AuthRegister/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Typography
                                                    component={Link}
                                                    href="/login"
                                                    variant="subtitle1"
                                                    sx={{textDecoration: 'none'}}
                                                >
                                                    Already have an account?
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{m: 3}}>
                            <AuthFooter/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} lg={5}
                      sx={{position: 'relative', alignSelf: 'stretch', display: {xs: 'none', md: 'block'}, overflow: 'hidden'}}>
                    <Grid item container justifyContent="center" sx={{zIndex: 3, position: 'absolute', top: 100}}>
                        <Grid item xs={12}>
                            <Grid item container justifyContent="center" sx={{pb: 8}}>
                                <Grid item xs={10} lg={8} sx={{'& .slick-list': {pb: 2}}}>
                                    <Grid  container direction="column" alignItems="center" spacing={3} textAlign="center">
                                        <Grid item>
                                            <Typography variant="h1" sx={{color: '#757575'}}>Bonjour, là!</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1">All rusty but we'll make it better in a few clicks, promise.</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <img src={imgMain}
                         style={{position: 'absolute', top: 0, left: 0, right: 0, width: '100%', zIndex: 1}}/>
                </Grid>
            </Grid>
        </AuthWrapper2>
    );
};

export default Register;
