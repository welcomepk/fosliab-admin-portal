import PropTypes from "prop-types"

function CountryAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

CountryAuthorPage.propTypes = {
    title: PropTypes.string
}

export default CountryAuthorPage