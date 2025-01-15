import PropTypes from "prop-types"

import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"


export const FormInputTextArea = ({ name, control, label, sx, variant, placeholder, rows = 2 }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={(renderProps) => (
                <TextField
                    label={label}
                    size="small"
                    value={renderProps.field.value}
                    onChange={renderProps.field.onChange}
                    error={!!renderProps.fieldState.error}
                    helperText={renderProps.fieldState.error?.message ?? null}
                    sx={sx}
                    variant={variant}
                    placeholder={placeholder}
                    rows={rows}
                    multiline
                />
            )}
        />
    )
}

FormInputTextArea.propTypes = {
    label: PropTypes.string,
    variant: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    sx: PropTypes.object,
    control: PropTypes.object,
    rows: PropTypes.number
}