
import { Paper } from "@mui/material"
import PropTypes from "prop-types"
import PageWrapper from "../../components/page-wrapper"
import DataTable from "../../components/data-table"

function SuperSchemeMakerPage({ title }) {
    title = "Super Scheme Master - Maker"
    return (
        <PageWrapper>
            <Paper variant="outlined" className="p-2">
                <h5 className="text-center p-2">{title}</h5>
            </Paper>
            <DataTable />
        </PageWrapper>
    )
}

SuperSchemeMakerPage.propTypes = {
    title: PropTypes.string
}

export default SuperSchemeMakerPage