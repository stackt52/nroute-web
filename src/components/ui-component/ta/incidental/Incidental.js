import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// assets
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

function Incidental({data, deleteCostItem}) {
    return (
        <>
            {data.length ? (
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Date (From - To)</TableCell>
                                    <TableCell align="right">Days</TableCell>
                                    <TableCell align="right">Amount (ZMK)</TableCell>
                                    <TableCell align="right">Rate</TableCell>
                                    <TableCell align="right">Total (ZMK)</TableCell>
                                    <TableCell align="right" sx={{pr: 3}}/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.location.town}</TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1">{row.startDate}</Typography>
                                            <Typography variant="body2">{row.endDate}</Typography>
                                        </TableCell>
                                        <TableCell align="right">{row.days}</TableCell>
                                        <TableCell align="right">{row.amount}</TableCell>
                                        <TableCell align="right">{row.rate}</TableCell>
                                        <TableCell align="right">{row.total}</TableCell>
                                        <TableCell sx={{pr: 1}} align="right">
                                            <IconButton color="error" size="small"
                                                        onClick={() => deleteCostItem(row.id)}>
                                                <DeleteTwoToneIcon fontSize="small"/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            ) : null}
        </>
    );
}

Incidental.propTypes = {
    data: PropTypes.array,
    deleteCostItem: PropTypes.func
};

export default Incidental;
