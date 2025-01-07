// File for Super Scheme Author
// screenAction: super-scheme-author
import PropTypes from "prop-types"

function SuperSchemeAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

SuperSchemeAuthorPage.propTypes = {
    title: PropTypes.string
}

export default SuperSchemeAuthorPage