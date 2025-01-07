import PropTypes from "prop-types"

function PincodeAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

PincodeAuthorPage.propTypes = {
    title: PropTypes.string
}

export default PincodeAuthorPage