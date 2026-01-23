import { Star } from "lucide-react";
import { cn, getEstrellas } from "@/lib/utils";

interface RatingProps {
  value: number;
  showValue?: boolean;
  totalReviews?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Rating({ value, showValue = false, totalReviews, size = "md", className }: RatingProps) {
  const estrellas = getEstrellas(value);

  const sizes = {
    sm: "h-3.5 w-3.5",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {estrellas.map((tipo, i) => (
          <Star
            key={i}
            className={cn(
              sizes[size],
              tipo === "full" ? "fill-accent-500 text-accent-500" : "text-gray-300"
            )}
          />
        ))}
      </div>
      {showValue && <span className="text-sm font-medium">{value.toFixed(1)}</span>}
      {totalReviews !== undefined && (
        <span className="text-sm text-gray-500">({totalReviews})</span>
      )}
    </div>
  );
}
