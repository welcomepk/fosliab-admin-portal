import PropTypes from "prop-types"

function PincodeMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

PincodeMakerPage.propTypes = {
    title: PropTypes.string
}

export default PincodeMakerPage