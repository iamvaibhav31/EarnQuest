import React from "react"

export interface adornmentType {
    position: "start" | "end"
    className?: string | undefined
    component: React.ReactNode
}

interface classes {
    root?: string | undefined
    input?: string | undefined
    label?: string | undefined
    multiline?: string | undefined
    error?: string | undefined
    container?: string | undefined
}

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    value?: string
    id?: string
    error?: boolean | undefined
    type?: React.HTMLInputTypeAttribute | undefined
    label?: string
    subLabel?: string
    placeholder?: string
    required?: boolean
    className?: string | undefined
    readOnly?: boolean | undefined
    helpText?: string | undefined
    adornment?: adornmentType | undefined
    isMultiline?: boolean | undefined
    classes?: classes | undefined
    onClick?: React.MouseEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    rows?: number
}
