'use client';

import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {visuallyHidden} from '@mui/utils';

// project imports
import CSVExport from '../tbl-exports';
import MainCard from 'components/ui-component/cards/MainCard';
import {header} from '../tbl-basic';

// assets
import Button from "@mui/material/Button";
import {IconRestore} from "@tabler/icons-react";

// table data
function createData(firstName, lastName, email, lastLoggedIn) {
    return {
        firstName,
        lastName,
        email,
        lastLoggedIn
    };
}

// table data
const rows = [
    createData('James', 'Banda', 'james@email.com', '2024-10-10 11:34'),
    createData('Juma', 'Phiri', 'jp@ihmafrica.org', '2024-10-11 12:30'),
    createData('Kelvin', 'Sikwibele', 'kv@ihmafrica.org', '2022-10-11 17:42'),
    createData('Fatima', 'Chisenga', 'ft@ihmafrica.org', '2024-10-10 14:21'),
    createData('David', 'Mwaifunga', 'david', '2023-12-02 15:23'),
    createData('Justin', 'Silupumbwe', 'justin@ihmafrica.org', '2024-10-10 11:34'),
    createData('Patrick', 'Banda', 'patrick@ihmafrica.org', '2024-10-27 11:09'),
    createData('Jelidah', 'Nanyangwe', 'nanyangwe.j@ihmafrica.org', '2024-10-23 17:29'),
    createData('Ketty', 'Banda', 'k.banda@ihmafrica.org', '2024-10-23 17:35'),
    createData('Lisa', 'Ngenda', 'lisa.ngenda@ihmafrica', '2024-10-23 09:56'),
    createData('Vincent', 'Sikwibele', 'vincent@ihmafrica.org', '2023-10-23 02:34'),
    createData('Vimbanashi', 'Tsododo', 'vimbanashi@ihmafrica.org', '2024-10-27 12:32'),
    createData('Sicelo', 'Kunene', 'sicelo@ihmafrica.org', '2024-09-30 14:47')
];

// table filter
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header
const headCells = [
    {
        id: 'firstName',
        numeric: false,
        disablePadding: true,
        label: 'First name'
    },
    {
        id: 'lastName',
        numeric: true,
        disablePadding: false,
        label: 'Last name'
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email'
    },
    {
        id: 'lastLoggedIn',
        numeric: true,
        disablePadding: false,
        label: 'Last logged-in'
    }
];

// ==============================|| TABLE - HEADER ||============================== //

function EnhancedTableHead({onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort}) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{pl: 3}}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all users'
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : undefined}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

// ==============================|| TABLE - TOOLBAR ||============================== //
const EnhancedTableToolbar = ({numSelected}) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
                {numSelected} selected
            </Typography>
        ) : (
            <Typography variant="h4" id="tableTitle">
                {/** Heading here **/}
            </Typography>
        )}
        <Box sx={{flexGrow: 1}}/>
        {numSelected > 0 && (
            <Tooltip title="Reset password">
                <Button size="small" startIcon={<IconRestore/>}>Reset password</Button>
            </Tooltip>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

// ==============================|| TABLE - ENHANCED ||============================== //
function UserList() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectedValue, setSelectedValue] = React.useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
            } else {
                const newSelectedId = rows.map((n) => n.email);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        const selectedRowData = rows.filter((row) => newSelected.includes(row.email.toString()));
        setSelectedValue(selectedRowData);
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <>
            <EnhancedTableToolbar numSelected={selected.length}/>

            {/* table */}
            <TableContainer>
                <Table sx={{minWidth: 750}} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row.email);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.email)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.email}
                                        selected={isItemSelected}
                                    >
                                        <TableCell sx={{pl: 3}} padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{row.firstName}</TableCell>
                                        <TableCell>{row.lastName}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.lastLoggedIn}</TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow sx={{height: (dense ? 33 : 53) * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

export default UserList;
