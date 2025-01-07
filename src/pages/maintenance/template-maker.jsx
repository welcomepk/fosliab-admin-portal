// File for Template Maker
// screenAction: template-maker


import PropTypes from "prop-types"

function TemplateMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

TemplateMakerPage.propTypes = {
    title: PropTypes.string
}

export default TemplateMakerPage