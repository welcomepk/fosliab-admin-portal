
import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { Box } from '@mui/material';

export default function DataTableHead({ selectable = true, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells }) {

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead sx={{
            backgroundColor: "#d8107b !important"
        }}>
            <TableRow>
                {selectable &&
                    <TableCell
                        sx={{
                            backgroundColor: "transparent",
                            color: "white"
                        }}
                        padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>}
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{
                            backgroundColor: "transparent",
                            color: "white",
                            fontWeight: "bold",
                            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
                        }}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={(headCell.disablePadding && selectable) ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
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

DataTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.array,
    selectable: PropTypes.bool
};