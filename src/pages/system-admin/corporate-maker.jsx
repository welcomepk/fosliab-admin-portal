import PropTypes from "prop-types"

function CorporateMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

CorporateMakerPage.propTypes = {
    title: PropTypes.string
}

export default CorporateMakerPage