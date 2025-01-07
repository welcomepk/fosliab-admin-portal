// File for Product Author
// screenAction: product-author

import PropTypes from "prop-types"

function ProductAuthorPage({ title }) {
    return (
        <div>{title}</div>
    )
}

ProductAuthorPage.propTypes = {
    title: PropTypes.string
}

export default ProductAuthorPage