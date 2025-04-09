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
import Tooltip from '@mui/material/Tooltip';

// assets
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

function Miscellaneous({ data, deleteMiscellaneousRetirement }) {
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
                                        <TableCell>
                                            <Tooltip title={row.description} arrow placement="top">
                                                <Typography
                                                    variant="body2"
                                                    noWrap
                                                    sx={{
                                                        maxWidth: 200,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {row.description}
                                                </Typography>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={row.file ? row.file.name : 'No file uploaded'} arrow placement="top">
                                                <Typography
                                                    variant="body2"
                                                    noWrap
                                                    sx={{
                                                        maxWidth: 200,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {row.file ? row.file.name : 'No file uploaded'}
                                                </Typography>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell sx={{ pr: 1 }} align="right">
                                            <IconButton color="error" size="small"
                                                        onClick={() => deleteMiscellaneousRetirement(row.id)}>
                                                <DeleteTwoToneIcon fontSize="small" />
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
    deleteMiscellaneousRetirement: PropTypes.func
};

export default Miscellaneous;
