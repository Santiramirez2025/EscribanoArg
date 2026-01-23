import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "accent" | "success" | "gold" | "outline";
}

export function Badge({ className, variant = "primary", children, ...props }: BadgeProps) {
  const variants = {
    primary: "badge-primary",
    accent: "badge-accent",
    success: "badge-success",
    gold: "badge-gold",
    outline: "badge border border-gray-300 text-gray-700",
  };

  return (
    <span className={cn(variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
