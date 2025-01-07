// File for Parameter Author
// screenAction: parameter-author
import React from 'react'
import PropTypes from "prop-types"

function ParameterAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

ParameterAuthorPage.propTypes = {
    title: PropTypes.string
}

export default ParameterAuthorPage