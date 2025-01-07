import PropTypes from "prop-types"

function ServiceAuditTrailPage({ title }) {
    return (
        <div>{title}</div>
    )
}

ServiceAuditTrailPage.propTypes = {
    title: PropTypes.string
}

export default ServiceAuditTrailPage