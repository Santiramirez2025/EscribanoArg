import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// VARIANTES CON CVA - Paleta Profesional Escribanía
// =============================================================================

const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium text-sm",
    "rounded-xl",
    "transition-all duration-200 ease-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "active:scale-[0.98]",
    "select-none",
  ],
  {
    variants: {
      variant: {
        // Primary - Acción principal (slate profesional)
        primary: [
          "bg-slate-800 text-white",
          "hover:bg-slate-700",
          "focus-visible:ring-slate-500",
          "shadow-md hover:shadow-lg",
        ],
        // Accent - CTA destacado (gradiente champagne/dorado suave)
        accent: [
          "bg-gradient-to-r from-amber-400 to-amber-500",
          "text-slate-900 font-semibold",
          "hover:from-amber-500 hover:to-amber-600",
          "focus-visible:ring-amber-400",
          "shadow-md hover:shadow-lg hover:shadow-amber-400/20",
        ],
        // Secondary - Acción secundaria
        secondary: [
          "bg-white text-slate-800",
          "border-2 border-slate-200",
          "hover:bg-slate-50 hover:border-slate-300",
          "focus-visible:ring-slate-400",
        ],
        // Outline - Borde sutil
        outline: [
          "bg-transparent text-slate-700",
          "border-2 border-slate-300",
          "hover:bg-slate-50 hover:border-slate-400",
          "focus-visible:ring-slate-400",
        ],
        // Ghost - Sin fondo
        ghost: [
          "bg-transparent text-slate-600",
          "hover:bg-slate-100 hover:text-slate-800",
          "focus-visible:ring-slate-400",
        ],
        // Destructive - Acciones peligrosas (rose más suave)
        destructive: [
          "bg-rose-500 text-white",
          "hover:bg-rose-600",
          "focus-visible:ring-rose-400",
          "shadow-md hover:shadow-lg",
        ],
        // Link - Estilo de enlace
        link: [
          "bg-transparent text-amber-600",
          "hover:text-amber-700 hover:underline",
          "focus-visible:ring-amber-400",
          "p-0 h-auto",
        ],
        // Success - Confirmación (emerald suave)
        success: [
          "bg-emerald-500 text-white",
          "hover:bg-emerald-600",
          "focus-visible:ring-emerald-400",
          "shadow-md hover:shadow-lg",
        ],
        // Soft - Variante suave para acciones menos prominentes
        soft: [
          "bg-slate-100 text-slate-700",
          "hover:bg-slate-200",
          "focus-visible:ring-slate-400",
        ],
        // Accent Outline - CTA secundario dorado
        "accent-outline": [
          "bg-transparent text-amber-600",
          "border-2 border-amber-300",
          "hover:bg-amber-50 hover:border-amber-400",
          "focus-visible:ring-amber-400",
        ],
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-lg",
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-base",
        "2xl": "h-14 px-10 text-lg",
        // Icon only sizes
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-12 w-12 p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

// =============================================================================
// TIPOS
// =============================================================================

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renderiza como Slot para composición con Link, etc */
  asChild?: boolean;
  /** Estado de carga */
  loading?: boolean;
  /** Texto durante loading (opcional) */
  loadingText?: string;
  /** Icono a la izquierda */
  leftIcon?: ReactNode;
  /** Icono a la derecha */
  rightIcon?: ReactNode;
}

// =============================================================================
// COMPONENTE
// =============================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Si asChild es true, usa Slot para pasar props al hijo
    const Comp = asChild ? Slot : "button";

    // Determinar si está deshabilitado
    const isDisabled = disabled || loading;

    // Contenido del botón
    const content = (
      <>
        {/* Loading spinner o icono izquierdo */}
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        ) : null}

        {/* Texto */}
        {loading && loadingText ? loadingText : children}

        {/* Icono derecho (no mostrar durante loading) */}
        {!loading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </>
    );

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = "Button";

// =============================================================================
// EXPORTS ADICIONALES
// =============================================================================

export { buttonVariants };

// =============================================================================
// VARIANTES PRE-CONFIGURADAS
// =============================================================================

/** Botón con icono únicamente */
export const IconButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "leftIcon" | "rightIcon" | "loadingText">
>(({ size = "icon", ...props }, ref) => (
  <Button ref={ref} size={size} {...props} />
));

IconButton.displayName = "IconButton";