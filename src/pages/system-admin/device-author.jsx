import PropTypes from "prop-types"

function DeviceAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

DeviceAuthorPage.propTypes = {
    title: PropTypes.string
}

export default DeviceAuthorPage