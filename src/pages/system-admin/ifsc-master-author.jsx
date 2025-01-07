import PropTypes from "prop-types"

function IfscMasterAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

IfscMasterAuthorPage.propTypes = {
    title: PropTypes.string
}

export default IfscMasterAuthorPage