import PropTypes from "prop-types"

function CityAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

CityAuthorPage.propTypes = {
    title: PropTypes.string
}

export default CityAuthorPage