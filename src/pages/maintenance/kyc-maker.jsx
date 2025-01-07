// File for KYC Maker
// screenAction: kyc-maker
import React from 'react'
import PropTypes from "prop-types"

function KycMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

KycMakerPage.propTypes = {
    title: PropTypes.string
}

export default KycMakerPage