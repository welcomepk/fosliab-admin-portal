import PropTypes from "prop-types"

function DeviceMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

DeviceMakerPage.propTypes = {
    title: PropTypes.string
}

export default DeviceMakerPage