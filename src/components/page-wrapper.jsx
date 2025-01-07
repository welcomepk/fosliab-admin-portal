
import PropTypes from "prop-types"

function PageWrapper({ children }) {
    return (
        <div className='my-4'>
            {children}
        </div>
    )
}

PageWrapper.propTypes = {
    children: PropTypes.node
}

export default PageWrapper