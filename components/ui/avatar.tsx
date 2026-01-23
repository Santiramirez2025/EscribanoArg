"use client";

import { useState } from "react";
import Image from "next/image";
import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Avatar({ src, alt = "", fallback, size = "md", className }: AvatarProps) {
  const [error, setError] = useState(false);

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  };

  const initials = fallback || getInitials(alt || "U");

  if (!src || error) {
    return (
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-900 font-medium",
          sizes[size],
          className
        )}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={cn("relative shrink-0 rounded-full overflow-hidden", sizes[size], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}
