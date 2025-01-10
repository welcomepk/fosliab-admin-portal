
import { TextField, Paper, Button, Card } from "@mui/material"
import TableCell from '@mui/material/TableCell';

import PropTypes from "prop-types"
import PageWrapper from "../../components/page-wrapper"
import DataTable from "../../components/table/data-table"
import { useState } from "react";

import axios from "axios";
import { baseUrl } from "../../Config";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useAuth } from "../../context/authProvider";

const headCells = [
    {
        id: 'scheme-code',
        numeric: true,
        disablePadding: false,
        label: 'Scheme Code',
    },
    {
        id: 'parameter-number',
        numeric: true,
        disablePadding: false,
        label: 'Parameter Number',
    },
    {
        id: 'scheme-description',
        numeric: true,
        disablePadding: false,
        label: 'Scheme Description',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
];
function filterItems(items, criteria) {
    return items.filter(item =>
        Object.keys(criteria).every(key =>
            String(item[key]).toLowerCase().includes(String(criteria[key]).toLowerCase())
        )
    );
}
const items = [
    { id: 1, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { id: 2, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
    { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { id: 4, name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { id: 6, name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
    { id: 7, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
    { id: 8, name: 'Jelly Bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0 },
    { id: 9, name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
    { id: 10, name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0.0 },
    { id: 11, name: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2.0 },
    { id: 12, name: 'Nougat', calories: 360, fat: 19.0, carbs: 9, protein: 37.0 },
    { id: 13, name: 'Oreo', calories: 437, fat: 18.0, carbs: 63, protein: 4.0 }
]

const fetchUserList = async (authToken) => {
    const response = await axios.post(`${baseUrl}/populateUserList`, {
        "source": "A",
        "makerCd": "pramodk"
    }, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    });
    return response.data;
};

function SuperSchemeMakerPage({ title }) {

    const [selected, setSelected] = useState([]);  // for data-table
    const [desert, setDesert] = useState("")
    const filteredRows = filterItems(items, { name: desert })
    const { authToken } = useAuth();
    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['populateUserList'],
        queryFn: async () => await fetchUserList(authToken),
        // retryOnMount: false
    })
    const renderTableRow = (row, labelId) => {
        return <>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
            // padding={selectable ? "none" : "normal"}
            >
                {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
        </>
    }
    if (isError) {
        Swal.fire({
            icon: "error",
            text: error.message || "Something went worng",
        });
        return (
            <Card variant="outlined" sx={{ height: "calc(100% - 24px)", marginTop: "24px", display: "grid", placeItems: "center" }}>
                <div className="text-center">
                    <h5>{error.message || "Something went worng"}</h5>
                    <Button variant="outlined" onClick={() => refetch()}>Retry</Button>
                </div>
            </Card>
        )
    }
    if (isPending) {
        return <Card variant="outlined" sx={{ height: "calc(100% - 24px)", marginTop: "24px", display: "grid", placeItems: "center" }}>
            <h5>Loading...</h5>
        </Card>

    }
    console.log(data);
    title = "Super Scheme Master - Maker"
    return (
        <PageWrapper>
            <Paper variant="outlined" className="p-2" sx={{ backgroundColor: "#d8107b", color: "white" }}>
                <h5 className="text-center m-0">{title}</h5>
            </Paper>
            <Paper variant="outlined" className="p-2">
                <TextField onChange={e => setDesert(e.target.value)} size="small" id="dis" placeholder="search desert" label="Dessert" variant="filled" />
            </Paper>
            {
                <DataTable
                    rows={filteredRows}
                    headCells={headCells}
                    selected={selected}
                    setSelected={setSelected}
                    selectable={false}
                    renderTableRow={renderTableRow}
                />
            }
        </PageWrapper>
    )
}

SuperSchemeMakerPage.propTypes = {
    title: PropTypes.string
}

export default SuperSchemeMakerPage