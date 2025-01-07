import PropTypes from "prop-types"

function LoginAuditTrailPage({ title }) {
    return (
        <div>{title}</div>
    )
}

LoginAuditTrailPage.propTypes = {
    title: PropTypes.string
}

export default LoginAuditTrailPage