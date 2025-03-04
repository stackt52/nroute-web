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

// assets
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

function Miscellaneous({data, deleteMiscellaneousRetirement}) {
    return (
        <>
            {data.length ? (
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Amount Spent</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>File</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.amountSpent}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.file ? row.file.name : 'No file uploaded'}</TableCell>
                                        <TableCell sx={{pr: 1}} align="right">
                                            <IconButton color="error" size="small"
                                                        onClick={() => deleteMiscellaneousRetirement(row.id)}>
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
    )
}

Miscellaneous.propTypes = {
    data: PropTypes.array,
    deleteRetirementMiscellaneous: PropTypes.func
};

export default Miscellaneous;