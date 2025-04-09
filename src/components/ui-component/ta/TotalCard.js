import PropTypes from 'prop-types';

// material-ui
import {useTheme} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import SubCard from 'components/ui-component/cards/SubCard';
import {ThemeMode} from 'config';

// ==============================|| TOTAL-SUBCARD ||============================== //

function TotalCard({incidentals, allAmounts}) {
    const theme = useTheme();

    console.log(incidentals);
    console.log(allAmounts);

    return (
        <>
            {incidentals.length ? (
                <Grid item xs={12}>
                    <SubCard sx={{
                        mx: 0,
                        mb: 0,
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light'
                    }}>
                        <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item sm={6} md={4}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <Typography align="right" variant="subtitle1">
                                                    Meals & Incidental :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right" variant="body2">
                                                    ZMK {allAmounts.incidentals}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right" variant="subtitle1">
                                                    Lodging :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right" variant="body2">
                                                    ZMK {allAmounts.lodging}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right" variant="subtitle1">
                                                    Miscellaneous :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right" variant="body2">
                                                    ZMK {allAmounts.miscellaneous}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider sx={{bgcolor: 'dark.main'}}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <Typography align="right" color="primary" variant="subtitle1">
                                                    Total :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right" color="primary" variant="subtitle1">
                                                    ZMK {allAmounts.totalAmount}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            ) : null}
        </>
    );
}

TotalCard.propTypes = {
    incidentals: PropTypes.array,
    allAmounts: PropTypes.object
};

export default TotalCard;
