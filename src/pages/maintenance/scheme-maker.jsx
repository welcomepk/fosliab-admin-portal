// File for Scheme Maker
// screenAction: scheme-maker
import PropTypes from "prop-types"

function SchemeMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

SchemeMakerPage.propTypes = {
    title: PropTypes.string
}

export default SchemeMakerPage