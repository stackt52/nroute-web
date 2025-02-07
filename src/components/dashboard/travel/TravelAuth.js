// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import Chip from "../../ui-component/extended/Chip";
import {useSelector} from "../../../store";

/**
 * Determines the color category based on the payment status.
 *
 * @param {string} status - The status of the payment which can be 'paid', 'pending', 'rejected', or any other string.
 * @returns {string} - Returns 'success' if the status is 'paid', 'default' if 'pending', 'error' if 'rejected', or
 * 'primary' for any other status.
 */
const colorFun = (status) => {
    switch (status) {
        case 'paid':
            return 'success';
        case 'pending':
            return 'default';
        case 'rejected':
            return 'error';
        default:
            return 'primary';
    }
}

/**
 * Component that renders a list of travel authorizations in a table format.
 *
 * @param {object} props - The component props.
 * @param {Function} props.setSelectedItem - Function to set the selected travel authorization item.
 *
 * @return {JSX.Element} Returns a JSX element that displays travel authorizations in a table.
 */
export default function TravelAuth({setSelectedItem}) {
    const handleTAStatus = (ta) => {
        console.log(ta)
        setSelectedItem(ta)
    }

    const currentUser = useSelector((state) => state.auth.currentUser);
    const travelAuthorizations = useSelector((state) => state.advances.advances);

    const getRelevantAdvances = () => {
        return travelAuthorizations.filter(ta => ta.userId === currentUser.id);
    }

    const filteredAdvances = getRelevantAdvances();

    return <>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date applied</TableCell>
                        <TableCell sx={{pl: 3}}>Trip</TableCell>
                        <TableCell>Trip Date</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right" >Status</TableCell>
                        <TableCell align="right" sx={{pr: 3}}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredAdvances.map((ta, index) => (
                        <TableRow hover key={index}>
                            <TableCell>{ta.dateSubmitted}</TableCell>
                            <TableCell sx={{pl: 3}}>
                                <Typography variant="subtitle1">{ta.details.destination.town}</Typography>
                                <Typography variant="subtitle2">{ta.details.purpose}</Typography>
                            </TableCell>
                            <TableCell>{ta.details.dateOfTravel}</TableCell>
                            <TableCell align="right">{ta.totalAmount}</TableCell>
                            <TableCell align="right" sx={{pr: 3}}>
                                <span>
                                    {ta.status !== '' &&
                                        <Chip id={ta.id} chipcolor={colorFun(ta.status)} label={ta.status}
                                              onClick={() => handleTAStatus(ta)}/>}
                                </span>
                            </TableCell>
                            <TableCell align="right" sx={{pr: 3}}>
                                <Button variant='outlined' size='small'>Details</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <CardActions sx={{justifyContent: 'flex-end'}}>
            <Button variant="text" size="small">
                Load more
            </Button>
        </CardActions>
    </>
};

