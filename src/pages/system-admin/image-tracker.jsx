import PropTypes from "prop-types"

function ImageTrackerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

ImageTrackerPage.propTypes = {
    title: PropTypes.string
}

export default ImageTrackerPage