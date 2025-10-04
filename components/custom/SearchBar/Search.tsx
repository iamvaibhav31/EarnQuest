import React from "react"
import { ISearchProps } from "./Search.type"
import { SearchIcon } from "lucide-react"
import TextField from "../TextField"

const Search: React.FC<ISearchProps> = ({ adornmentIconPostion = "start", ...props }) => {
    return (
        <TextField
            {...props}
            adornment={{
                className: "select-none",
                position: adornmentIconPostion,
                component: <SearchIcon className="size-4 text-inherit" />,
            }}
        />
    )
}

export default Search
