import PropTypes from "prop-types"

function UserMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

UserMakerPage.propTypes = {
    title: PropTypes.string
}

export default UserMakerPage