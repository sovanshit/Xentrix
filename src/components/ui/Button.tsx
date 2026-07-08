import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...rest }, ref) => {
    const base = variant === "primary" ? "btn-primary" : "btn-secondary";
    return (
      <button ref={ref} className={`${base} ${className}`} {...rest}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
