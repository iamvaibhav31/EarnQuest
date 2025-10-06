/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, PaginationState, Table, RowData } from "@tanstack/react-table"
import { NoDataProps } from "../NoData"

type Column<TData, TValue> = ColumnDef<TData, TValue> & {
    isVisible?: boolean
    className?: string
    // className?: string
}

interface classes {
    root?: string
    toolbar?: string
    table?: {
        root?: string
        header?: {
            root?: string
            row?: string
            head?: string
        }
        body?: {
            root?: string
            row?: string
            cell?: string
        }
    }
    pagination?: string
}

export interface DataTableProps<TData extends RowData, TValue> {
    columns: Column<TData, TValue>[]
    data: TData[]
    isCheckbox?: boolean
    preSelectedItems?: any[]
    onSelectionChange?: (selectedItems: any[]) => void
    onPaginationChange?: (pagination: PaginationState) => void
    classes?: classes
    NoDataInfo?: NoDataProps
    primaryKey?: string
    onRowClick?: (row: Record<string, any>) => void
    isFilterable?: boolean
    isPaginated?: boolean
    isShortable?: boolean
}

interface pageSizeOptions {
    label: string
    value: string
}

export interface DataTablePaginationProps<TData> {
    table: Table<TData>
    pageSizeOptions?: pageSizeOptions[]
    className?: string
}

export interface DataTableHeaderProps<TData> {
    table: Table<TData>
    className?: string
    children?: React.ReactNode
    isFilterable?: boolean
    onGlobalFilterChange: (value: string) => void
}
