"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { Table as DataTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox" // Add this import for Checkbox component
import DataTableHeader from "./data-table-header"
import { cn } from "@/lib/utils"
// import NoData from "../NoData"
import { DataTableProps } from "./data.table.type"
import DataTablePagination from "./data-table-pagination"
import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const EmptyArray: any[] = []
const EmptyObject: Record<string, any> = {}

const sortedIcons = {
    asc: <ArrowDown className="size-3" />,
    desc: <ArrowUp className="size-3" />,
}

function Table<TData, TValue>({
    columns,
    data,
    children,
    className,
    classes,
    preSelectedItems = EmptyArray,
    onSelectionChange = selectedItems => {},
    onPaginationChange = newPagination => {},
    isCheckbox = false,
    NoDataInfo,
    primaryKey,
    onRowClick = row => {},
    isPaginated = true,
    isFilterable = true,
    isShortable = false, // Note: Consider renaming to 'isSortable' for clarity
}: DataTableProps<TData, TValue> & React.HTMLAttributes<HTMLDivElement>) {
    const [globalFilter, setGlobalFilter] = useState<string>("")
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    })

    useEffect(() => {
        if (preSelectedItems.length > 0 && data.length > 0) {
            const newRowSelection: Record<string, boolean> = {}

            data.forEach((row: any, index: number) => {
                if (primaryKey && preSelectedItems.includes(row[primaryKey as keyof typeof row])) {
                    newRowSelection[`${index}`] = true // Ensure key is string for row.id consistency
                }
            })

            setRowSelection(newRowSelection)
        }
    }, [data, preSelectedItems, primaryKey])

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        ...(isPaginated && { getPaginationRowModel: getPaginationRowModel() }),
        ...(isFilterable && { getFilteredRowModel: getFilteredRowModel() }),
        ...(isShortable && { getSortedRowModel: getSortedRowModel() }),
        state: {
            ...(isPaginated && { pagination }),
            ...(isFilterable && { globalFilter }),
            ...(isShortable && { sorting }),
            rowSelection,
        },
        onPaginationChange: setPagination,
        ...(isFilterable && { onGlobalFilterChange: setGlobalFilter }),
        ...(isShortable && { onSortingChange: setSorting }),
        enableRowSelection: isCheckbox,
        enableMultiRowSelection: isCheckbox,
        onRowSelectionChange: setRowSelection,
        // Optional: If you want select-all to only affect current page (with pagination), add:
        // meta: { selectAllMode: 'page' } // But default is 'all' for full dataset
    })

    useEffect(() => {
        if (isCheckbox) {
            const selectedRowIds = table.getSelectedRowModel().rows.map(row => {
                const original = row.original as Record<string, any>
                return primaryKey ? original[primaryKey] : row.id
            })

            onSelectionChange(selectedRowIds)
        }
    }, [rowSelection, table, isCheckbox, onSelectionChange, primaryKey]) // Add primaryKey to deps if used

    // Notify parent about pagination changes
    useEffect(() => {
        onPaginationChange(table.getState().pagination)
    }, [table.getState().pagination, onPaginationChange])

    const getTableWapperSpecificClassName = useCallback(() => {
        const hasPaginatedRows = isPaginated && table.getRowModel().rows?.length > 0
        const hasChildrenOrFilter = typeof children !== "undefined" || isFilterable

        if (!hasPaginatedRows && !hasChildrenOrFilter) return "p-0"
        if (!hasPaginatedRows && hasChildrenOrFilter) return "pb-0"
        if (hasPaginatedRows && !hasChildrenOrFilter) return "pt-0"
        return "p-2"
    }, [isPaginated, isFilterable, children, table.getRowModel().rows?.length])

    return (
        <div className={cn("w-full flex flex-col gap-2 border border-primary-border bg-secondary-background rounded p-2", getTableWapperSpecificClassName(), className)}>
            {(typeof children !== "undefined" || isFilterable) && (
                <DataTableHeader table={table} onGlobalFilterChange={setGlobalFilter} isFilterable={isFilterable} className={classes?.toolbar}>
                    {children}
                </DataTableHeader>
            )}

            {table.getRowModel().rows?.length ? (
                <div
                    className={cn(
                        "bg-primary-background text-secondary-foreground overflow-hidden flex flex-col gap-2 items-center justify-between rounded  h-full",
                        classes?.root
                    )}
                >
                    <DataTable className={classes?.table?.root}>
                        <TableHeader className={cn("sticky top-0 bg-primary-background h-full", classes?.table?.header?.root)}>
                            {table.getHeaderGroups().map(headerGroup => {
                                return (
                                    <TableRow key={headerGroup.id} className={cn("border-b-primary-border", classes?.table?.header?.row)}>
                                        {isCheckbox && (
                                            <TableHead className={cn("text-secondary-foreground cursor-pointer select-none w-5", classes?.table?.header?.head)}>
                                                <Checkbox
                                                    checked={table.getIsAllRowsSelected()}
                                                    indeterminate={table.getIsSomeRowsSelected()}
                                                    onChange={(evt) => {
                                                        evt.stopPropagation() // Prevent row click if header is clickable
                                                        table.toggleAllRowsSelected(evt.target.checked)
                                                    }}
                                                />
                                            </TableHead>
                                        )}
                                        {headerGroup.headers.map(header => {
                                            return (
                                                <TableHead
                                                    key={header.id}
                                                    className={cn(
                                                        "text-secondary-foreground cursor-pointer select-none ",
                                                        header.column.columnDef?.className ? header.column.columnDef?.className : "max-w-10",
                                                        classes?.table?.header?.head
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between  w-full pr-2">
                                                        <div className="w-full truncate">
                                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                        </div>

                                                        {isShortable && header.column.getCanSort() && !header.isPlaceholder && (
                                                            <Button
                                                                variant="ghost"
                                                                className="p-0 bg-transparent hover:bg-transparent hover:text-secondary-foreground"
                                                                onClick={() => header.column.toggleSorting()}
                                                            >
                                                                {header.column.getIsSorted() ? (
                                                                    sortedIcons[header.column.getIsSorted() as keyof typeof sortedIcons]
                                                                ) : (
                                                                    <ArrowDownUp className="size-3" />
                                                                )}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableHeader>
                        <TableBody className={classes?.table?.body?.root}>
                            {table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={cn("cursor-pointer text-secondary-foreground border-b-primary-border ", classes?.table?.body?.row)}
                                    onClick={() => onRowClick(row?.original || EmptyObject)}
                                >
                                    {isCheckbox && (
                                        <TableCell className={cn("py-2 w-5", classes?.table?.body?.cell)}> {/* Fixed 'spy-2' to 'py-2' */}
                                            <Checkbox 
                                                checked={row.getIsSelected()} 
                                                onChange={(evt) => {
                                                    evt.stopPropagation() // Prevent bubbling to row onClick
                                                    row.toggleSelected(evt.target.checked)
                                                }} 
                                            />
                                        </TableCell>
                                    )}
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id} className={cn("p-0 py-1.5 px-2  max-w-10 truncate", classes?.table?.body?.cell)}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </DataTable>
                    {isPaginated && table.getRowModel().rows?.length > 0 && <DataTablePagination className={classes?.pagination} table={table} />}
                </div>
            ) : NoDataInfo ? (
                <NoData
                    {...NoDataInfo}
                    className="bg-primary-background text-secondary-foreground overflow-hidden flex flex-col gap-2 items-center justify-center rounded  h-full w-full"
                />
            ) : (
                <p className="bg-primary-background text-secondary-foreground overflow-hidden flex flex-col gap-2 items-center justify-center rounded  h-full w-full">
                    No results found
                </p>
            )}
        </div>
    )
}

export default Table