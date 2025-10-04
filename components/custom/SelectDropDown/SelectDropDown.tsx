// components/SelectDropDown/SelectDropDown.tsx
import React, { useState, useEffect, useMemo, useRef } from "react"
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { SelectDropDownProps } from "./SelectDropDown.type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TagList from "./components/TagList"
import OptionList from "./components/OptionList"

const SelectDropDown: React.FC<SelectDropDownProps> = ({
    id,
    label,
    required,
    value = "",
    defaultValue,
    helpText,
    options = [],
    placeholder,
    onChange,
    alignment = "bottom",
    className = "",
    isMultiple = false,
    error,
    tagLimit = 2,
    delimiter = ",",
    renderTags,
    classes = {},
    isClearable = false,
    size = "default",
}): React.ReactElement => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const searchInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isMultiple && defaultValue) {
            onChange(defaultValue)
        }
    }, [defaultValue, isMultiple, delimiter, onChange])

    const prevSelectedValues = useMemo(() => {
        if (isMultiple && value) {
            return value.split(delimiter) || []
        }
        return []
    }, [isMultiple, value, delimiter])

    const optionsMap = useMemo(() => {
        const map: Record<string, { label: string; value: string }> = {}
        options.forEach(opt => {
            map[opt.value] = opt
        })
        return map
    }, [options])

    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options
        return options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()) || opt.value.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [options, searchTerm])

    const handleSelect = (newValue: string) => {
        if (isMultiple) {
            const updatedValues = prevSelectedValues.includes(newValue) ? prevSelectedValues.filter(v => v !== newValue) : [...prevSelectedValues, newValue]

            onChange(updatedValues.length === 1 ? `${updatedValues[0]}` : updatedValues.join(delimiter))
        } else {
            onChange(newValue)
            setIsOpen(false)
        }
        setSearchTerm("")
    }

    const removeValue = (valueToRemove: string) => {
        const newValues = prevSelectedValues.filter(v => v !== valueToRemove)
        onChange(newValues.join(delimiter))
    }

    const handleClear = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onChange("")
        setSearchTerm("")
    }

    const renderSingleSelectValue = () => {
        if (value && value?.trim() !== "") {
            const option = optionsMap[value]
            return <span className="font-sans font-normal text-secondary-foreground">{option?.label || value}</span>
        }
        return <span className="font-sans font-normal text-secondary-foreground/60">{placeholder || "Select options"}</span>
    }

    const renderTriggerContent = () => {
        const hasValue = isMultiple ? prevSelectedValues.length > 0 : !!value && value?.trim() !== ""
        const showInput = isMultiple && (isOpen || !hasValue)

        return (
            <div className="flex items-center flex-1 min-h-[24px] overflow-hidden ">
                {isMultiple ? (
                    <TagList values={prevSelectedValues} optionsMap={optionsMap} tagLimit={tagLimit} classes={classes} renderTags={renderTags} removeValue={removeValue} />
                ) : (
                    renderSingleSelectValue()
                )}

                {showInput && (
                    <Input
                        ref={searchInputRef}
                        placeholder={hasValue ? "" : placeholder || "Select options"}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className={cn(
                            "border-0 rounded-none outline-0 bg-transparent focus:ring-0 focus:border-0 shadow-none",
                            "placeholder:text-secondary-foreground/60 text-secondary-foreground font-sans font-normal",
                            "p-0 flex-1"
                        )}
                    />
                )}

                {isClearable && value && value.trim() !== "" && (
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleClear}
                        className="h-4 w-4 has-[>svg]:p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-transparent ml-2 mr-1"
                    >
                        <X size={10} />
                    </Button>
                )}
            </div>
        )
    }

    return (
        <div className={cn("w-full flex items-start flex-col", label && "gap-1.5", className)}>
            {label && (
                <Label htmlFor={id} className={cn("flex text-base text-secondary-foreground font-sans font-normal", classes.label)}>
                    {label} {required && <span className="text-highlight">*</span>}
                </Label>
            )}

            <Select
                value="_select_"
                onValueChange={handleSelect}
                aria-labelledby={id}
                open={isOpen}
                onOpenChange={open => {
                    setIsOpen(open)
                    if (open && searchInputRef.current) searchInputRef.current.focus()
                }}
            >
                <SelectTrigger
                    id={id}
                    aria-invalid={!!error} // ✅ normalized
                    aria-describedby={helpText ? `${id}-help` : undefined}
                    size={size}
                    className={cn(
                        "border border-primary-border bg-secondary-background group focus-visible:ring-0 focus-visible:border-primary-border hover:border-primary-border/80 transition-colors",
                        "group flex items-center justify-between w-full py-1 px-3 gap-2 data-[size=default]:min-h-9 data-[size=sm]:min-h-8",
                        error && "border-highlight",
                        classes.root
                    )}
                >
                    {renderTriggerContent()}
                </SelectTrigger>

                {options.length > 0 && (
                    <SelectContent
                        side={alignment}
                        className={cn(
                            "border border-primary-border outline-0 bg-secondary-background text-secondary-foreground w-full max-h-[300px] overflow-hidden p-0",
                            classes.content
                        )}
                    >
                        <OptionList
                            options={filteredOptions}
                            value={value}
                            selectedValues={prevSelectedValues}
                            isMultiple={isMultiple}
                            classes={classes}
                            handleSelect={handleSelect}
                        />
                    </SelectContent>
                )}
            </Select>

            {helpText && (
                <span id={`${id}-help`} className={cn("text-highlight text-right text-xs", classes.helpText)}>
                    {helpText}
                </span>
            )}
        </div>
    )
}

export default SelectDropDown
