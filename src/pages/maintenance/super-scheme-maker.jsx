
import { TextField, Paper } from "@mui/material"
import PropTypes from "prop-types"
import PageWrapper from "../../components/page-wrapper"
import DataTable from "../../components/table/data-table"
import { useState } from "react";

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Dessert (100g serving)',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Calories',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Fat (g)',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Carbs (g)',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Protein (g)',
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

function SuperSchemeMakerPage({ title }) {
    const [selected, setSelected] = useState([]);  // for data-table
    const [desert, setDesert] = useState("")
    const filteredRows = filterItems(items, { name: desert })
    console.log(filteredRows);

    title = "Super Scheme Master - Maker"
    return (
        <PageWrapper>
            <Paper variant="outlined" className="p-2" sx={{ backgroundColor: "#d8107b57", }}>
                <h5 className="text-center m-0">{title}</h5>
            </Paper>
            <Paper variant="outlined" className="p-2">
                <TextField onChange={e => setDesert(e.target.value)} size="small" id="dis" placeholder="search desert" label="Dessert" variant="filled" />
            </Paper>
            <DataTable
                rows={filteredRows}
                headCells={headCells}
                selected={selected}
                setSelected={setSelected}
                selectable={false}
            />
        </PageWrapper>
    )
}

SuperSchemeMakerPage.propTypes = {
    title: PropTypes.string
}

export default SuperSchemeMakerPage