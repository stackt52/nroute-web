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
import AuthLogin from 'components/authentication/auth-forms/AuthLogin';
import AuthFooter from 'components/ui-component/cards/AuthFooter';
import AuthWrapper2 from 'components/authentication/AuthWrapper2';
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import Logo from 'components/ui-component/Logo';
import AuthSlider from 'components/ui-component/cards/AuthSlider';

// assets
const mainImage = '/assets/images/auth/bag.png'

// carousel items
const items = [
	{
		title: 'Adventure Awaits!',
		description: 'Start your journey by getting the green light from your supervisor.'
	},
	{
		title: 'Pack Your Dreams!',
		description: 'Submit your travel request and explore the world, one trip at a time.'
	},
	{
		title: 'On the Road to Success',
		description: 'Every great journey begins with an approved travel plan.'
	},
	{
		title: 'The World is Yours to Explore',
		description: 'Get authorized, get moving. Your next adventure starts here!'
	},
	{
		title: 'Plan, Request, Go!',
		description: 'Your travel plans, approved with just a few clicks.'
	},
	{
		title: 'Get the Green Light',
		description: 'Approval is the first step toward your next big destination.'
	},
	{
		title: 'Ready to Take Off?',
		description: 'Submit your travel request and prepare for takeoff with supervisor approval.'
	},
	{
		title: 'The Journey Begins with Approval',
		description: 'Let’s make travel simple, smooth, and exciting!'
	}
];

// ================================|| AUTH2 - LOGIN ||================================ //

const Login = () => {
	const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
	const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

	return (
		<AuthWrapper2>
			<Grid container justifyContent={{ xs: 'center', md: 'space-between' }} alignItems="center">
				<Grid item md={6} lg={7} xs={12} sx={{ minHeight: '100vh' }}>
					<Grid
						sx={{ minHeight: '100vh' }}
						container
						alignItems={{ xs: 'center', md: 'flex-start' }}
						justifyContent={{ xs: 'center', md: 'space-between' }}
					>
						<Grid item sx={{ display: { xs: 'none', md: 'block' }, m: 3 }}>
							<Link href="/" aria-label="theme logo" style={{paddingLeft: 0, textDecoration: 'none'}}>
								<Typography variant="h2">n-Route</Typography>
							</Link>
						</Grid>
						<Grid
							item
							xs={12}
							container
							justifyContent="center"
							alignItems="center"
							sx={{ minHeight: { xs: 'calc(100vh - 68px)', md: 'calc(100vh - 152px)' } }}
						>
							<Stack justifyContent="center" alignItems="center" spacing={5} m={2}>
								<Box component={Link} href="#" sx={{ display: { xs: 'block', md: 'none' } }}>
									<Logo />
								</Box>
								<AuthCardWrapper border={downLG}>
									<Grid container spacing={2} justifyContent="center">
										<Grid item>
											<Stack alignItems="center" justifyContent="center" spacing={1}>
												<Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
													Hi, Welcome Back
												</Typography>
												<Typography variant="caption" fontSize="16px" textAlign={downMD ? 'center' : 'inherit'}>
													Enter your credentials to continue
												</Typography>
											</Stack>
										</Grid>
										<Grid item xs={12}>
											<AuthLogin loginprop={2} />
										</Grid>
										<Grid item xs={12}>
											<Divider />
										</Grid>
										{/* <Grid item xs={12}>
											<Grid item container direction="column" alignItems="center" xs={12}>
												<Typography
													component={Link}
													href="/register"
													variant="subtitle1"
													sx={{ textDecoration: 'none' }}
												>
													Don&apos;t have an account?
												</Typography>
											</Grid>
										</Grid> */}
									</Grid>
								</AuthCardWrapper>
							</Stack>
						</Grid>
						<Grid item xs={12} sx={{ m: 3 }}>
							<AuthFooter />
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' }, overflow: 'hidden' }}>
						<Grid item container justifyContent="center" sx={{zIndex: 3, position: 'absolute', top: 100}}>
							<Grid item xs={12}>
								<Grid item container justifyContent="center" sx={{ pb: 8 }}>
									<Grid item xs={10} lg={8} sx={{ '& .slick-list': { pb: 2 } }}>
										<AuthSlider items={items} />
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<img src={mainImage} style={{position: 'absolute', top: 0, left: 0, right: 0, width: '100%', zIndex: 1}} />
				</Grid>
			</Grid>
		</AuthWrapper2>
	);
};

export default Login;
