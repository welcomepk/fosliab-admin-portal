// File for Template Author
// screenAction: template-author

import PropTypes from "prop-types"

function TemplateAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

TemplateAuthorPage.propTypes = {
    title: PropTypes.string
}

export default TemplateAuthorPage