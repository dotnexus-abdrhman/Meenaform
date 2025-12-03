"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base styles
        "peer shrink-0 rounded-md border-2 shadow-sm transition-all duration-200 outline-none",
        "h-5 w-5",
        // Unchecked state
        "border-gray-300 bg-white",
        // Hover state
        "hover:border-primary/50 hover:shadow-md",
        // Focus state
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        // Checked state - using data attribute selector
        "data-[state=checked]:bg-[#1a56db] data-[state=checked]:border-[#1a56db] data-[state=checked]:text-white",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="h-4 w-4" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
