"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface NairaInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number | string
  onValueChange: (value: number) => void
}

const NairaInput = React.forwardRef<HTMLInputElement, NairaInputProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/[^0-9.]/g, "") // Remove non-numeric except dot
      const numericValue = Number.parseFloat(rawValue)
      if (!isNaN(numericValue)) {
        onValueChange(numericValue)
      } else {
        onValueChange(0) // Or handle as appropriate for empty/invalid input
      }
    }

    const formattedValue = typeof value === "number" ? value.toLocaleString("en-NG") : value

    return (
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
        <Input
          ref={ref}
          className={cn("pl-8", className)}
          value={formattedValue}
          onChange={handleChange}
          type="text" // Use text type to allow custom formatting
          inputMode="numeric"
          pattern="[0-9]*[.,]?[0-9]*"
          {...props}
        />
      </div>
    )
  },
)
NairaInput.displayName = "NairaInput"

export { NairaInput }
