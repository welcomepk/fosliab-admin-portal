import PropTypes from "prop-types"

function UserAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

UserAuthorPage.propTypes = {
    title: PropTypes.string
}

export default UserAuthorPage