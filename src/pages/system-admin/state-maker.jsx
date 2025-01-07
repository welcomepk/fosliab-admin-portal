import PropTypes from "prop-types"

function StateMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

StateMakerPage.propTypes = {
    title: PropTypes.string
}

export default StateMakerPage