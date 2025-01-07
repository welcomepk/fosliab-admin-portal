// File for KYC Author
// screenAction: kyc-author

import React from 'react'
import PropTypes from "prop-types"

function KycAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

KycAuthorPage.propTypes = {
    title: PropTypes.string
}

export default KycAuthorPage