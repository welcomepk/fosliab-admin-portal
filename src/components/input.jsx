import PropTypes from "prop-types"
import { TextField } from "@mui/material"
const Input = ({ label, variant, onChange, name, id, placeholder, sx }) => {
    return (
        <TextField sx={sx} onChange={onChange} id={id} name={name} placeholder={placeholder} label={label} variant={variant} />
    )
}
Input.propTypes = {
    label: PropTypes.string,
    variant: PropTypes.string,
    onChange: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    sx: PropTypes.object
}

export default Input