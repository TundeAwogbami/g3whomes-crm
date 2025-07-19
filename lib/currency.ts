// Currency formatting utilities for Nigerian Naira
export function formatNaira(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || amount === "") {
    return "₦0"
  }

  const numAmount = typeof amount === "string" ? Number.parseFloat(amount) : amount

  if (isNaN(numAmount)) {
    return "₦0"
  }

  // Format with Nigerian number formatting (commas for thousands)
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(numAmount)
    .replace("NGN", "₦")
}

// Format Naira with decimal places for precise amounts
export function formatNairaWithDecimals(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || amount === "") {
    return "₦0.00"
  }

  const numAmount = typeof amount === "string" ? Number.parseFloat(amount) : amount

  if (isNaN(numAmount)) {
    return "₦0.00"
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(numAmount)
    .replace("NGN", "₦")
}

// Parse Naira string back to number (removes ₦ and commas)
export function parseNaira(nairaString: string): number {
  if (!nairaString) return 0

  // Remove ₦ symbol, commas, and any whitespace
  const cleanString = nairaString.replace(/[₦,\s]/g, "")
  const parsed = Number.parseFloat(cleanString)

  return isNaN(parsed) ? 0 : parsed
}

// Format large amounts with K, M, B suffixes
export function formatNairaCompact(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || amount === "") {
    return "₦0"
  }

  const numAmount = typeof amount === "string" ? Number.parseFloat(amount) : amount

  if (isNaN(numAmount)) {
    return "₦0"
  }

  if (numAmount >= 1000000000) {
    return `₦${(numAmount / 1000000000).toFixed(1)}B`
  } else if (numAmount >= 1000000) {
    return `₦${(numAmount / 1000000).toFixed(1)}M`
  } else if (numAmount >= 1000) {
    return `₦${(numAmount / 1000).toFixed(1)}K`
  } else {
    return formatNaira(numAmount)
  }
}

// Input component for Naira amounts
export function formatNairaInput(value: string): string {
  // Remove all non-numeric characters except decimal point
  const numericValue = value.replace(/[^\d.]/g, "")

  // Ensure only one decimal point
  const parts = numericValue.split(".")
  if (parts.length > 2) {
    return parts[0] + "." + parts.slice(1).join("")
  }

  return numericValue
}

// Convert common property price ranges to Naira
export const PROPERTY_PRICE_RANGES = {
  BUDGET: { min: 5000000, max: 15000000, label: "₦5M - ₦15M" },
  MID_RANGE: { min: 15000000, max: 50000000, label: "₦15M - ₦50M" },
  LUXURY: { min: 50000000, max: 200000000, label: "₦50M - ₦200M" },
  ULTRA_LUXURY: { min: 200000000, max: 1000000000, label: "₦200M+" },
}

// Commission calculation helpers
export function calculateCommission(propertyValue: number, commissionRate = 5): number {
  return (propertyValue * commissionRate) / 100
}

export function formatCommissionRate(rate: number): string {
  return `${rate}%`
}
