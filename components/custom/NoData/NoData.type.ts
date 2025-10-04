import { JSX } from "react"

interface Action {
    icon?: string
    title: string
    className: string | undefined
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

interface classes {
    root: string
    label: string
    subLabel: string
}

export interface NoDataProps {
    icon: JSX.Element
    label: string
    subLabel?: string
    className: string | undefined
    action?: Action
    classes?: classes | undefined
}
