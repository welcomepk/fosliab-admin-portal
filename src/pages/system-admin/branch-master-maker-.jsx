import PropTypes from "prop-types"

function BranchMasterMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

BranchMasterMakerPage.propTypes = {
    title: PropTypes.string
}

export default BranchMasterMakerPage