// File for KYC Document Author
// screenAction: kyc-document-author
import React from 'react'
import PropTypes from "prop-types"

function KycDocumentAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

KycDocumentAuthorPage.propTypes = {
    title: PropTypes.string
}

export default KycDocumentAuthorPage