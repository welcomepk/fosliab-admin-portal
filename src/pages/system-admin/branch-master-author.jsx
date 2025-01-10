import PropTypes from "prop-types"

function BranchMasterAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

BranchMasterAuthorPage.propTypes = {
    title: PropTypes.string
}

export default BranchMasterAuthorPage