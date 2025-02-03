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

function Miscellaneous({data, deleteCostItem}) {
    return (
        <>
            {data.length ? (
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">Total (ZMK)</TableCell>
                                    <TableCell align="right" sx={{pr: 3}}/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.description.title}</TableCell>
                                        <TableCell align="right">{row.amount}</TableCell>
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

Miscellaneous.propTypes = {
    data: PropTypes.array,
    deleteCostItem: PropTypes.func
};

export default Miscellaneous;
