

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" +
  " hover:scale-105 hover:shadow-lg" +
  " bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-[length:200%_200%] animate-gradient-x",
  {
    variants: {
      variant: {
        default: "border-transparent text-white",
        secondary: "border-transparent text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
        destructive: "border-transparent text-white bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500",
        outline: "border border-current text-current bg-transparent shadow-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, ...props }, ref) => {
  return <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
})
Badge.displayName = "Badge"

export { Badge, badgeVariants }
