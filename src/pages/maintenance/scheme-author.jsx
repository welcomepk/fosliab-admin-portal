// File for Scheme Author
// screenAction: scheme-author
import PropTypes from "prop-types"

function SchemeAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

SchemeAuthorPage.propTypes = {
    title: PropTypes.string
}

export default SchemeAuthorPage