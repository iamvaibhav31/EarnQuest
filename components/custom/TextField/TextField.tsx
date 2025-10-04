import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TextFieldProps } from "./TextField.type"
import { cn } from "@/lib/utils"

const InputField: React.FC<TextFieldProps> = ({
    id,
    type,
    value,
    required,
    readOnly = false,
    placeholder,
    className,
    adornment,
    error,
    onClick,
    helpText,
    isMultiline = false,
    classes,
    ...props
}) => {
    return (
        <div className={cn("relative w-full", !isMultiline && "h-9", className)} aria-invalid={error}>
            {isMultiline ? (
                <Textarea
                    id={id}
                    value={value}
                    required={required}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    onClick={onClick}
                    aria-invalid={error}
                    aria-describedby={helpText ? id : undefined}
                    className={cn(
                        "w-full peer border border-primary-border bg-secondary-background text-secondary-foreground placeholder:text-secondary-foreground/60 font-sans text-base font-normal focus-visible:ring-0",
                        adornment?.position === "start" ? "pl-10" : "",
                        adornment?.position === "end" ? "pr-10" : "",
                        classes?.multiline
                    )}
                    {...props}
                />
            ) : (
                <Input
                    id={id}
                    type={type}
                    value={value}
                    required={required}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    onClick={onClick}
                    aria-invalid={error}
                    aria-describedby={helpText ? id : undefined}
                    className={cn(
                        "w-full peer  border border-primary-border bg-secondary-background text-secondary-foreground  placeholder:text-secondary-foreground/60 font-sans text-base font-normal",
                        adornment?.position === "start" ? "pl-10" : "",
                        adornment?.position === "end" ? "pr-10" : "",
                        classes?.input
                    )}
                    {...props}
                />
            )}
            {adornment && (
                <div
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2 text-secondary-foreground ",
                        adornment.position === "start" ? "left-3" : "",
                        adornment.position === "end" ? "right-3" : "",
                        adornment.className
                    )}
                >
                    {adornment.component}
                </div>
            )}
        </div>
    )
}

const TextField: React.FC<TextFieldProps> = props => {
    const { id, label, subLabel, helpText, error, ...rest } = props

    return (
        <div className={cn("w-full flex flex-col items-start", label && "gap-1.5", rest?.classes?.root)}>
            <div>
                {label && (
                    <Label htmlFor={id} className={cn("flex text-[14px] text-secondary-foreground font-sans text-base font-normal", rest?.classes?.label)}>
                        {label} {rest.required && <span className="text-highlight">*</span>}
                    </Label>
                )}
                {subLabel && <span className="text-[12px] text-secondary-foreground">{subLabel}</span>}
            </div>

            <div className={cn("flex flex-col  w-full items-start", error && "gap-1", rest?.classes?.container)}>
                <InputField {...rest} />
                {(error || helpText) && (
                    <span id={id} className={cn("text-highlight text-xs", rest?.classes?.error)}>
                        {helpText}
                    </span>
                )}
            </div>
        </div>
    )
}

export default TextField
