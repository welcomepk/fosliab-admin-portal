// File for KYC Document Maker
// screenAction: kyc-document-maker
import React from 'react'
import PropTypes from "prop-types"

function KycDocumentMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

KycDocumentMakerPage.propTypes = {
    title: PropTypes.string
}

export default KycDocumentMakerPage