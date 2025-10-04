import { Button } from "@/components/ui/button"
import React from "react"
import { NoDataProps } from "./NoData.type"
import { cn } from "@/lib/utils"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"

const NoData: React.FC<NoDataProps> = ({ 
  icon, 
  label, 
  subLabel, 
  action, 
  className, 
  classes 
}): React.ReactElement => {
  return (
    <Empty className={cn("border-0", className)}>
      <EmptyHeader>
        {icon && (
          <EmptyMedia variant="default" className={classes?.root}>
            {icon}
          </EmptyMedia>
        )}
        <EmptyTitle className={cn(classes?.label)}>
          {label}
        </EmptyTitle>
        {subLabel && (
          <EmptyDescription className={cn(classes?.subLabel)}>
            {subLabel}
          </EmptyDescription>
        )}
      </EmptyHeader>
      
      {action && (
        <EmptyContent>
          <Button
            size="sm"
            onClick={action?.onClick}
            className={cn(
              "flex gap-2 py-1 text-sm px-2 border rounded capitalize border-secondary-border hover:bg-secondary-border bg-tertiary-background backdrop-blur-sm text-secondary-border hover:text-tertiary-foreground dark:text-tertiary-foreground font-sans font-normal",
              action?.className
            )}
          >
            {action?.icon && action?.icon}
            {action.title}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}

export default NoData