import React from "react"

export interface option {
    label: string
    value: string
}

type alignment = "top" | "right" | "bottom" | "left" | undefined

type classes = {
    root?: string
    label?: string
    content?: string
    item?: string
    chip?: string
    chipLabel?: string
    chipRemove?: string
    placeholder?: string
    helpText?: string
}

export interface SelectDropDownProps {
    id?: string
    label?: string
    required?: boolean
    value: string
    defaultValue?: string
    helpText?: string
    options: option[]
    placeholder?: string
    onChange: (value: string) => void
    alignment?: alignment
    className?: string
    isMultiple?: boolean
    error?: boolean | undefined
    tagLimit?: number
    delimiter?: string
    renderTags?: (option: option | undefined, removeTags: (value: string) => void) => React.ReactNode
    classes?: classes
    isClearable?: boolean
    size?: "default" | "sm" | undefined
}
