import PropTypes from "prop-types"

function IfscMasterMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

IfscMasterMakerPage.propTypes = {
    title: PropTypes.string
}

export default IfscMasterMakerPage