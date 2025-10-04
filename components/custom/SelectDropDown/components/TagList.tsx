// components/SelectDropDown/TagList.tsx
import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

type TagListProps = {
    values: string[]
    optionsMap: Record<string, { label: string; value: string }>
    tagLimit: number
    classes: any
    renderTags?: (option: { label: string; value: string } | undefined, removeValue: (val: string) => void) => React.ReactNode
    removeValue: (val: string) => void
}

const TagList: React.FC<TagListProps> = ({ values, optionsMap, tagLimit, classes, renderTags, removeValue }) => {
    if (values.length === 0) return null

    return (
        <div className="flex gap-1 items-center flex-wrap">
            {values.slice(0, tagLimit).map(val => {
                const option = optionsMap[val]

                return typeof renderTags === "function" ? (
                    renderTags(option, removeValue)
                ) : (
                    <div key={val} className={cn("flex items-center gap-1 bg-primary-background text-secondary-foreground text-xs px-2 py-1 rounded-full", classes.chip)}>
                        <span className={cn("truncate max-w-[100px]", classes.chipLabel)}>{option?.label || val}</span>
                        <Button
                            variant="ghost"
                            className={cn("has-[>svg]:px-0 p-0 h-4 cursor-pointer", classes.chipRemove)}
                            onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                removeValue(val)
                            }}
                        >
                            <X size={10} />
                        </Button>
                    </div>
                )
            })}
            {values.length > tagLimit && <div className="text-xs text-secondary-foreground/60 px-1">+{values.length - tagLimit} more</div>}
        </div>
    )
}

export default TagList
