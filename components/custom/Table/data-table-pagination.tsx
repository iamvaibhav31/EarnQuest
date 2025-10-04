import { ChevronLeft, ChevronRight } from "lucide-react"
import { DataTablePaginationProps } from "./data.table.type"
import { Button } from "@/components/ui/button"
import SelectDropDown from "../SelectDropDown"
import { cn } from "@/lib/utils"

const pageSizes = [
    {
        label: "10",
        value: "10",
    },
    {
        label: "20",
        value: "20",
    },
    {
        label: "30",
        value: "30",
    },
    {
        label: "40",
        value: "40",
    },
    {
        label: "50",
        value: "50",
    },
]

function DataTablePagination<TData>({ table, pageSizeOptions = pageSizes, className }: DataTablePaginationProps<TData>) {
    return (
        <div
            className={cn(
                "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-hidden p-1 px-2 border-t-1 border-t-primary-border sm:flex-row sm:gap-8 min-h-10",
                className
            )}
        >
            {(table.options.enableMultiRowSelection || table.options.enableRowSelection) && (
                <div className="flex-1 whitespace-nowrap  text-sm text-secondary-foreground select-none">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
            )}

            <div
                className={`flex flex-col-reverse items-center gap-4  sm:flex-row sm:gap-6 lg:gap-8  ${
                    !(table.options.enableMultiRowSelection || table.options.enableRowSelection) && "w-full justify-between"
                }`}
            >
                <div className="flex items-center space-x-2">
                    <p className="whitespace-nowrap font-medium text-sm text-secondary-foreground select-none">Rows per page</p>
                    <SelectDropDown
                        options={pageSizeOptions}
                        classes={{
                            root: "py-0 shadow-none",
                        }}
                        value={`${table.getState().pagination.pageSize}`}
                        onChange={value => {
                            table.setPageSize(Number(value))
                        }}
                    />
                </div>
                <div className="flex items-center justify-center font-medium text-sm text-secondary-foreground select-none">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        className="border border-primary-border bg-primary-background  hover:bg-primary-background  text-secondary-foreground py-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                        className="border border-primary-border bg-primary-background  hover:bg-primary-background  text-secondary-foreground py-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="size-4" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DataTablePagination
