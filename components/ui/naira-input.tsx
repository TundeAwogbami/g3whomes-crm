"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { formatNairaInput, parseNaira, formatNaira } from "@/lib/currency"

interface NairaInputProps {
  value?: number | string
  onChange?: (value: number) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  showSymbol?: boolean
}

export function NairaInput({
  value = "",
  onChange,
  placeholder = "Enter amount",
  className,
  disabled = false,
  showSymbol = true,
}: NairaInputProps) {
  const [displayValue, setDisplayValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (value !== undefined && value !== "") {
      const numValue = typeof value === "string" ? parseNaira(value) : value
      if (!isFocused) {
        setDisplayValue(showSymbol ? formatNaira(numValue) : numValue.toString())
      }
    } else {
      setDisplayValue("")
    }
  }, [value, isFocused, showSymbol])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (isFocused) {
      // When focused, allow raw numeric input
      const formatted = formatNairaInput(inputValue)
      setDisplayValue(formatted)

      const numericValue = Number.parseFloat(formatted) || 0
      onChange?.(numericValue)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    // Show raw number when focused
    const numValue = parseNaira(displayValue.toString())
    setDisplayValue(numValue > 0 ? numValue.toString() : "")
  }

  const handleBlur = () => {
    setIsFocused(false)
    // Format with currency when not focused
    const numValue = Number.parseFloat(displayValue) || 0
    if (showSymbol && numValue > 0) {
      setDisplayValue(formatNaira(numValue))
    }
  }

  return (
    <div className="relative">
      {showSymbol && !isFocused && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">₦</span>
      )}
      <Input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${showSymbol && !isFocused ? "pl-8" : ""} ${className}`}
        disabled={disabled}
      />
    </div>
  )
}
