// File for Product Maker
// screenAction: product-maker
import PropTypes from "prop-types"

function ProductMakerPage({ title }) {
    return (
        <div>{title}</div>
    )
}

ProductMakerPage.propTypes = {
    title: PropTypes.string
}

export default ProductMakerPage