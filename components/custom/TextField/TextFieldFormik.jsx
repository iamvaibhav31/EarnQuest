import React from "react"
import { TextField } from "@mui/material"
import { useField, useFormikContext } from "formik"
import PropTypes from "prop-types"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(() => ({
    errorText: {
        color: "#f44336",
        fontSize: "0.75rem",
        marginTop: "3px",
        marginRight: "2px",
        marginBottom: 0,
        marginLeft: "2px",
        lineHeight: "1.66",
        textAlign: "left",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        letterSpacing: "0.03333em",
    },
    fieldWrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    outlinedLabel: {
        marginBottom: "8px",
        fontSize: "14px",
        fontWeight: 500,
        color: "#374151",
    },
}))

/**
 * TextfieldFormik - A wrapper around Material-UI TextField that integrates with Formik
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Field name (required for Formik integration)
 * @param {string} props.variant - TextField variant (outlined, filled, standard, or outlined-label)
 * @param {string} props.label - TextField label
 * @param {Function} props.onChange - Custom onChange handler
 * @param {Function} props.onBlur - Custom onBlur handler
 * @param {boolean} props.disabled - Is the field disabled
 * @param {Object} props.InputProps - Props for the Input component
 * @param {Object} props.inputProps - Native props for the input element
 * @param {Object} props.FormHelperTextProps - Props for the helper text
 * @param {string} props.helperText - Helper text content
 * @param {boolean} props.required - Is the field required
 * @returns {React.ReactElement} TextfieldFormik component
 */
const TextfieldFormik = ({
    name,
    variant = "outlined",
    label,
    onChange,
    onBlur,
    disabled = false,
    InputProps = {},
    inputProps = {},
    FormHelperTextProps = {},
    helperText,
    required = false,
    ...rest
}) => {
    const classes = useStyles()
    const { setFieldValue, setFieldTouched } = useFormikContext()
    const [field, meta] = useField(name)

    // Handle the custom outlined-label variant
    const isOutlinedLabel = variant === "outlined-label"
    const actualVariant = isOutlinedLabel ? "outlined" : variant

    // Combine error handling
    const hasError = meta.touched && Boolean(meta.error)
    const errorMessage = meta.touched ? meta.error : ""
    const showHelperText = Boolean(helperText) || hasError
    const helperTextContent = hasError ? errorMessage : helperText

    // Handle onChange and onBlur
    const handleChange = e => {
        if (onChange) {
            onChange(e)
        }
        field.onChange(e)
    }

    const handleBlur = e => {
        if (onBlur) {
            onBlur(e)
        }
        field.onBlur(e)
        setFieldTouched(name, true, true)
    }

    // Handle custom setValue for special input types
    const setValue = value => {
        setFieldValue(name, value)
    }

    if (isOutlinedLabel) {
        return (
            <div className={classes.fieldWrapper}>
                {label && (
                    <label htmlFor={name} className={classes.outlinedLabel}>
                        {label} {required && <span style={{ color: "red" }}>*</span>}
                    </label>
                )}
                <TextField
                    {...field}
                    {...rest}
                    id={name}
                    name={name}
                    variant={actualVariant}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={hasError}
                    disabled={disabled}
                    InputProps={{
                        ...InputProps,
                    }}
                    inputProps={{
                        ...inputProps,
                    }}
                    required={required}
                />
                {hasError && !showHelperText && <div className={classes.errorText}>{errorMessage}</div>}
                {showHelperText && <div className={classes.errorText}>{helperTextContent}</div>}
            </div>
        )
    }

    return (
        <TextField
            {...field}
            {...rest}
            id={name}
            name={name}
            label={label}
            variant={actualVariant}
            onChange={handleChange}
            onBlur={handleBlur}
            error={hasError}
            helperText={showHelperText ? helperTextContent : null}
            disabled={disabled}
            InputProps={{
                ...InputProps,
            }}
            inputProps={{
                ...inputProps,
            }}
            FormHelperTextProps={{
                ...FormHelperTextProps,
            }}
            required={required}
        />
    )
}

TextfieldFormik.propTypes = {
    name: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["outlined", "filled", "standard", "outlined-label"]),
    label: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    InputProps: PropTypes.object,
    inputProps: PropTypes.object,
    FormHelperTextProps: PropTypes.object,
    helperText: PropTypes.string,
    required: PropTypes.bool,
}

export default TextfieldFormik
