"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

// Sidebar Root
const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ className, defaultOpen, open, onOpenChange, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen ?? true)

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      setIsOpen(newOpen)
      onOpenChange?.(newOpen)
    },
    [onOpenChange],
  )

  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      open={open ?? isOpen}
      onOpenChange={handleOpenChange}
      className={cn(
        "relative flex h-full w-64 flex-col border-r bg-background transition-all duration-300 ease-in-out data-[state=closed]:w-16",
        className,
      )}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

// Sidebar Header
const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-16 items-center justify-center px-4 data-[state=closed]:justify-center", className)}
      {...props}
    />
  ),
)
SidebarHeader.displayName = "SidebarHeader"

// Sidebar Content
const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto px-4 py-6", className)} {...props} />
  ),
)
SidebarContent.displayName = "SidebarContent"

// Sidebar Footer
const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-16 items-center justify-center border-t px-4 data-[state=closed]:justify-center",
        className,
      )}
      {...props}
    />
  ),
)
SidebarFooter.displayName = "SidebarFooter"

// Sidebar Trigger (for collapsing)
const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, size = "icon", variant = "ghost", ...props }, ref) => (
    <CollapsiblePrimitive.Trigger asChild>
      <Button
        ref={ref}
        size={size}
        variant={variant}
        className={cn(
          "absolute -right-4 top-1/2 -translate-y-1/2 rounded-full border bg-background data-[state=closed]:rotate-180",
          className,
        )}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </CollapsiblePrimitive.Trigger>
  ),
)
SidebarTrigger.displayName = "SidebarTrigger"

// Sidebar Rail (for collapsed state)
const SidebarRail = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute inset-y-0 left-0 w-16 flex-col items-center justify-center border-r bg-background data-[state=open]:hidden",
        className,
      )}
      {...props}
    />
  ),
)
SidebarRail.displayName = "SidebarRail"

// Sidebar Group
const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-1", className)} {...props} />,
)
SidebarGroup.displayName = "SidebarGroup"

// Sidebar Group Label
const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-3 py-2 text-xs font-semibold uppercase text-muted-foreground data-[state=closed]:hidden",
        className,
      )}
      {...props}
    />
  ),
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

// Sidebar Group Content
const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-1", className)} {...props} />,
)
SidebarGroupContent.displayName = "SidebarGroupContent"

// Sidebar Menu
const SidebarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-1", className)} {...props} />,
)
SidebarMenu.displayName = "SidebarMenu"

// Sidebar Menu Item
const SidebarMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("", className)} {...props} />,
)
SidebarMenuItem.displayName = "SidebarMenuItem"

// Sidebar Menu Button
const sidebarMenuButtonVariants = cva(
  "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground data-[state=closed]:justify-center",
  {
    variants: {
      isActive: {
        true: "bg-dark-orange-100 text-dark-orange-700 hover:bg-dark-orange-100 hover:text-dark-orange-700",
        false: "text-muted-foreground",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
)

interface SidebarMenuButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, isActive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? CollapsiblePrimitive.Trigger : "button"
    return <Comp ref={ref} className={cn(sidebarMenuButtonVariants({ isActive }), className)} {...props} />
  },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

// Sidebar Separator
const SidebarSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("my-4 h-px bg-border data-[state=closed]:hidden", className)} {...props} />
  ),
)
SidebarSeparator.displayName = "SidebarSeparator"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
}
