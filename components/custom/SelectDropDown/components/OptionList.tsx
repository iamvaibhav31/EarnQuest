// components/SelectDropDown/OptionList.tsx
import React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

type OptionListProps = {
    options: { value: string; label: string }[]
    value: string
    selectedValues: string[]
    isMultiple: boolean
    classes: any
    handleSelect: (val: string) => void
}

const OptionList: React.FC<OptionListProps> = ({ options, value, selectedValues, isMultiple, classes, handleSelect }) => {
    return (
        <div className="max-h-[250px] overflow-auto" role="listbox">
            {options.length > 0 ? (
                options.map(opt => {
                    const isSelected = isMultiple ? selectedValues.includes(opt.value) : opt.value === value

                    return (
                        <div
                            key={opt.value}
                            role="option"
                            aria-selected={isSelected}
                            tabIndex={0}
                            data-selected={isSelected}
                            className={cn(
                                "flex items-center justify-between px-3 py-1 cursor-pointer text-inherit font-sans text-sm font-normal hover:bg-primary-background/50 transition-colors focus:outline-none focus:bg-primary-background/70",
                                isSelected && "bg-primary-background",
                                classes.item
                            )}
                            onClick={() => handleSelect(opt.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault()
                                    handleSelect(opt.value)
                                } else if (e.key === "ArrowDown") {
                                    e.preventDefault()(e.currentTarget.nextElementSibling as HTMLElement)?.focus()
                                } else if (e.key === "ArrowUp") {
                                    e.preventDefault()(e.currentTarget.previousElementSibling as HTMLElement)?.focus()
                                }
                            }}
                        >
                            <span className="truncate">{opt.label}</span>
                            {isSelected && <Check size={16} className="text-inherit flex-shrink-0 ml-2" />}
                        </div>
                    )
                })
            ) : (
                <div className="px-3 py-6 text-center text-secondary-foreground/60 text-sm">No options found</div>
            )}
        </div>
    )
}

export default OptionList
