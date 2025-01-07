import PropTypes from "prop-types"

function StateAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

StateAuthorPage.propTypes = {
    title: PropTypes.string
}

export default StateAuthorPage