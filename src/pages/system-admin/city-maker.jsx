import PropTypes from "prop-types"

function CityMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

CityMakerPage.propTypes = {
    title: PropTypes.string
}

export default CityMakerPage