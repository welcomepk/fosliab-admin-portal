import PropTypes from "prop-types"

function CorporateAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

CorporateAuthorPage.propTypes = {
    title: PropTypes.string
}

export default CorporateAuthorPage