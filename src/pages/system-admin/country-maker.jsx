import PropTypes from "prop-types"

function CountryMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

CountryMakerPage.propTypes = {
    title: PropTypes.string
}

export default CountryMakerPage