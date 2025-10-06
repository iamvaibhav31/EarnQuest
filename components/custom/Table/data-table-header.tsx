"use client"

import { cn } from "@/lib/utils"
import Search from "../SearchBar"
import { DataTableHeaderProps } from "./data.table.type"

function DataTableHeader<TData>({ table, children, className, isFilterable, onGlobalFilterChange }: DataTableHeaderProps<TData>) {
    const handleSearch = (value: string) => {
        onGlobalFilterChange(value)
    }

    return (
        <div role="toolbar" aria-orientation="horizontal" className={cn("flex w-full items-center justify-between  gap-2", className)}>
            {isFilterable && (
                <div className="flex items-center gap-2">
                    <Search
                        placeholder="Search..."
                        value={table.getState().globalFilter}
                        onChange={event => handleSearch(event.target.value)}
                        className="h-8 w-40 lg:w-64 "
                        adornmentIconPostion="end"
                        classes={{
                            input: "rounded bg-primary-background py-0 shadow-none",
                        }}
                    />
                </div>
            )}
            <div className="flex items-center gap-2">{children}</div>
        </div>
    )
}

export default DataTableHeader
