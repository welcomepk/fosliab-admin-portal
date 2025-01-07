// File for Parameter Maker
// screenAction: parameter-maker

import React from 'react'
import PropTypes from "prop-types"

function ParameterMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

ParameterMakerPage.propTypes = {
    title: PropTypes.string
}

export default ParameterMakerPage