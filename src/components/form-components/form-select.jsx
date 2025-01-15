import PropTypes from "prop-types"

import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material"
import { Controller } from "react-hook-form"


export const FormSelect = ({ name, control, label, sx, variant, selectItems, fullWidth = true }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={(renderProps) => (
                // <TextField
                //     label={label}
                //     size="small"
                //     value={renderProps.field.value}
                //     onChange={renderProps.field.onChange}
                //     error={!!renderProps.fieldState.error}
                //     helperText={renderProps.fieldState.error?.message ?? null}
                //     sx={sx}
                //     variant={variant}
                //     placeholder={placeholder}
                // />
                <FormControl
                    className="mb-3"
                    size="small"
                    fullWidth={fullWidth}
                    error={!!renderProps.fieldState.error}
                >
                    <InputLabel id={name}>{label}</InputLabel>
                    <Select
                        label={label}
                        value={renderProps.field.value}
                        onChange={renderProps.field.onChange}
                        sx={sx}
                        variant={variant}
                        size="small"
                    >
                        {
                            selectItems
                        }
                    </Select>
                    {
                        renderProps.fieldState.error && <FormHelperText>{renderProps.fieldState.error.message}</FormHelperText>
                    }
                </FormControl>
            )}
        />
    )
}

FormSelect.propTypes = {
    label: PropTypes.string,
    variant: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    sx: PropTypes.object,
    control: PropTypes.object,
    selectItems: PropTypes.node,
    fullWidth: PropTypes.bool
}